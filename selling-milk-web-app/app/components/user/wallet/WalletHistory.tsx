"use client"

import { GlobalContext } from "@/contexts"
import { HistoryTransactionData } from "@/types"
import { useContext, useState } from "react"
import useSWR from "swr"
import ReactPaginate from "react-paginate"
import * as XLSX from 'xlsx'
import axiosInstance from "@/lib/axios"
import DownMetalBtn from "../../providers/DownMetailBtn"
import Search from "../../providers/form/Search"
import { LoadingFullScreen } from "../../providers/loader"
import { formatCurrency, formatTime, removeVietnameseTones } from "@/utils/format"

interface TableHistoryWalletProps {
    listItem: HistoryTransactionData[],
    currentPage: number,
    itemsPerPage: number,
}

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data)

const listTitleHistoryWallet = [
    { title: "#" },
    { title: "Thời gian" },
    { title: "Thao tác" },
    { title: "Trạng thái" },
    { title: "Số tiền" },
]

const deposit = "deposit"
const withdraw = "withdraw"
const payment = "payment"
const refund = "refund"
const success = "success"
const failure = "failure"

const exportToExcel = (listItem: HistoryTransactionData[]) => {
    const headers = listTitleHistoryWallet.slice(1, 5).map(item => item.title)

    const data = listItem.map(item => [
        formatTime(item.date),
        item.action,
        item.status,
        formatCurrency(item.amount),
    ])

    data.unshift(headers)

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

    XLSX.writeFile(workbook, "Lịch sử giao dịch.xlsx")
}

const TableHistoryWallet: React.FC<TableHistoryWalletProps> = ({ listItem, currentPage, itemsPerPage }) => {
    const startIndex = currentPage * itemsPerPage

    return (
        <table className="table-auto border-separate border border-black border-opacity-10 rounded-2xl text-sm sm:text-lg md:text-xl text-center">
            <thead>
                <tr>
                    {listTitleHistoryWallet.map((item, index) => (
                        <th className={`
                                    font-semibold 
                                    py-3 
                                    ${index < listTitleHistoryWallet.length - 1 ?
                                "border-r border-b border-black border-opacity-10" :
                                "border-b"
                            }`}
                            key={index}
                        >
                            {item.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {listItem.map((item, index) => {

                    const totalIndex = startIndex + index + 1

                    return (
                        <tr key={index}>
                            <td className="py-2 border-r border-black border-opacity-10">{totalIndex}</td>
                            <td className="py-2 border-r border-black border-opacity-10">{formatTime(item.date)}</td>
                            <td className="py-2 border-r border-black border-opacity-10">
                                {item.action === deposit ? (
                                    <span className="text-green-500 font-semibold">Nạp Tiền</span>
                                ) : item.action === withdraw ? (
                                    <span className="text-yellow-500 font-semibold">Rút Tiền</span>
                                ) : item.action === payment ? (
                                    <span className="text-primary-cus font-semibold">Thanh Toán</span>
                                ) : item.action === refund ? (
                                    <span className="text-blue-500 font-semibold">Hoàn tiền</span>
                                ) : (
                                    <span className="text-gray-600 font-semibold">Chưa xác định</span>
                                )}
                            </td>
                            <td className="py-2 border-r border-black border-opacity-10 font-semibold">
                                {item.status === success ? (
                                    <span className="text-green-500 font-semibold">Thành Công</span>
                                ) : (
                                    <span className="text-red-500 font-semibold">Thất Bại</span>
                                )}
                            </td>
                            <td className="py-2 font-semibold text-center px-2">
                                {(item.action === withdraw || item.action === payment) ? (
                                    <span className="text-red-500 font-semibold">-{formatCurrency(item.amount)}</span>
                                ) : (
                                    <span className="text-green-500 font-semibold">+{formatCurrency(item.amount)}</span>
                                )}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const WalletHistory = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { user } = useContext(GlobalContext) || {}

    const { data: listHistoryWallet, isLoading } = useSWR<HistoryTransactionData[]>(user ? `/wallet/getHistory?userId=${user._id}` : null, fetcher, { refreshInterval: 1000 })

    const filterHistoryWallet = listHistoryWallet && listHistoryWallet.filter(history => removeVietnameseTones(formatTime(history.date)) && removeVietnameseTones(formatTime(history.date)).trim().toLowerCase().includes(removeVietnameseTones(searchTerm).trim().toLowerCase()))

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(filterHistoryWallet ? filterHistoryWallet.length / itemsPerPage : 0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = filterHistoryWallet && filterHistoryWallet.length > 0 ? filterHistoryWallet.slice(startIndex, endIndex) : []

    return (
        <div className="flex flex-col gap-5 text-gray-600">
            <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-3 transition-all duration-500">
                <div className="font-semibold md:text-4xl text-3xl flex-shrink-0">
                    Lịch sử giao dịch
                </div>
                <div className="flex gap-3 flex-col md:flex-row justify-between transition-all duration-500">
                    <DownMetalBtn onClick={() => {
                        if (listHistoryWallet)
                            exportToExcel(listHistoryWallet)
                    }} />
                    <div className="flex flex-col space-y-1 md:w-auto w-full transition-all duration-500">
                        <Search value={searchTerm} onChange={setSearchTerm} style="w-full" />
                    </div>
                </div>
            </div>
            {isLoading ? (
                <LoadingFullScreen loading={isLoading} />
            ) : !listHistoryWallet || !filterHistoryWallet || listHistoryWallet.length === 0 ? (
                <div className="flex items-center justify-center text-primary-blue-cus h-96 md:text-4xl text-3xl font-semibold text-center">
                    Bạn chưa thực hiện giao dịch nào cả!
                </div>
            ) : filterHistoryWallet && filterHistoryWallet.length === 0 ? (
                <div className="flex items-center justify-center h-96 text-primary-blue-cus md:text-4xl text-3xl font-semibold text-center">
                    Bạn chưa thực hiện giao dịch nào cả!
                </div>
            ) : (
                <>
                    <TableHistoryWallet listItem={visibleItems} currentPage={currentPage} itemsPerPage={itemsPerPage} />
                    {pageCount > 1 && (
                        <div className="flex justify-center mt-10 text-base font-semibold">
                            <ReactPaginate
                                pageCount={pageCount}
                                pageRangeDisplayed={4}
                                marginPagesDisplayed={1}
                                onPageChange={handlePageChange}
                                containerClassName="pagination flex p-0 m-0"
                                activeClassName="text-gray-400 bg-gray-200"
                                previousLabel="<"
                                nextLabel=">"
                                pageClassName="border-2 px-4 py-2"
                                previousClassName="border-2 px-4 py-2"
                                nextClassName="border-2 px-4 py-2"
                                pageLinkClassName="pagination-link"
                                nextLinkClassName="pagination-link"
                                breakClassName="pagination-items border-2 px-3 py-2"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default WalletHistory