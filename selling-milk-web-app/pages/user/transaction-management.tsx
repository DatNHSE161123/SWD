import Container from '@/app/components/hero/Container'
import ModalCanceled from '@/app/components/providers/modal/transaction/ModalCanceled'
import ModalDelivered from '@/app/components/providers/modal/transaction/ModalDelivered'
import TransactionManagement from '@/app/components/user/TransactionManagement'
import Layout from '@/app/layout'

const TransactionManagementPage = () => {
    return (
        <Layout>
            <ModalCanceled />
            <ModalDelivered />
            <Container>
                <div className="relative my-10">
                    <div className="flex justify-center">
                        <h1 className="text-primary-cus font-semibold md:text-4xl text-3xl">
                            Quản lý đơn hàng
                        </h1>
                    </div>
                </div>
                <div className="relative mb-10">
                    <TransactionManagement />
                </div>
            </Container>
        </Layout>
    )
}

export default TransactionManagementPage