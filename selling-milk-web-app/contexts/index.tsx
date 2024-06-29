"use client"

import React, { FC, createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { getUserService } from '@/services/user'

interface GlobalStateProps {
    children: React.ReactNode
}

interface User {
    _id: string
    email?: string | null
    avatar?: string | null
    phone?: string | null
    username?: string | null
    role?: string | null
    wallet?: number | null
    address?: string | null
}

interface GlobalContextProps {
    isAuthUser: boolean | null
    setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | null>>
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    isLoading: boolean | null
    setIsLoading: React.Dispatch<React.SetStateAction<boolean | null>>
    isLoadingModal: boolean | null
    setIsLoadingModal: React.Dispatch<React.SetStateAction<boolean | null>>
    isLoadingPage: boolean | null
    setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean | null>>
    isRefresh: boolean | null
    setIsRefresh: React.Dispatch<React.SetStateAction<boolean | null>>
    fetchUser: boolean | null
    setFetchUser: React.Dispatch<React.SetStateAction<boolean | null>>
    searchValue: string | null
    setSearchValue: React.Dispatch<React.SetStateAction<string | null>>
    brand: string | null
    setBrand: React.Dispatch<React.SetStateAction<string | null>>
    price: string | null
    setPrice: React.Dispatch<React.SetStateAction<string | null>>
    discount: string | null
    setDiscount: React.Dispatch<React.SetStateAction<string | null>>
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);

const GlobalState: FC<GlobalStateProps> = ({ children }) => {
    const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean | null>(false)
    const [isLoadingModal, setIsLoadingModal] = useState<boolean | null>(false)
    const [isLoadingPage, setIsLoadingPage] = useState<boolean | null>(false)
    const [isRefresh, setIsRefresh] = useState<boolean | null>(false)
    const [fetchUser, setFetchUser] = useState<boolean | null>(false)
    const [searchValue, setSearchValue] = useState<string | null>("")
    const [brand, setBrand] = useState<string | null>(null)
    const [price, setPrice] = useState<string | null>(null)
    const [discount, setDiscount] = useState<string | null>(null)

    const router = useRouter()

    useEffect(() => {
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true)
            const userData = JSON.parse(localStorage.getItem('user')!) || {}
            setUser(userData)
        } else {
            setIsAuthUser(false)
            setUser(null)
        }
    }, [])

    useEffect(() => {
        const fetch = async () => {
            if (user) {
                const res = await getUserService({ userId: user._id })
                localStorage.setItem('user', JSON.stringify(res))
                setUser(res)
            }
        }

        if (fetchUser) {
            fetch()
            setFetchUser(false)
        }

        const intervalId = setInterval(fetch, 5 * 60 * 1000)

        return () => clearInterval(intervalId)
    }, [fetchUser, user])

    useEffect(() => {
        if (isRefresh) {
            router.reload()
            setIsRefresh(false)
        }
    }, [isRefresh, router])

    return (
        <GlobalContext.Provider
            value={{
                isAuthUser,
                setIsAuthUser,
                user,
                setUser,
                isLoading,
                setIsLoading,
                isLoadingPage,
                setIsLoadingPage,
                searchValue,
                setSearchValue,
                isLoadingModal,
                setIsLoadingModal,
                isRefresh,
                setIsRefresh,
                fetchUser,
                setFetchUser,
                brand,
                setBrand,
                price,
                setPrice,
                discount,
                setDiscount
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;