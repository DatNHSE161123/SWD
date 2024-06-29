import Container from '@/app/components/hero/Container';
import ModalRecharge from '@/app/components/providers/modal/wallet/ModalRecharge';
import ModalWithdraw from '@/app/components/providers/modal/wallet/ModalWithdraw';
import WalletHistory from '@/app/components/user/wallet/WalletHistory';
import WalletOverview from '@/app/components/user/wallet/WalletOverview';
import Layout from '@/app/layout';

const WalletPage = () => {
    return (
        <Layout>
            <ModalRecharge />
            <ModalWithdraw />
            <Container>
                <div className="relative md:py-10 py-5">
                    <div className="flex flex-col md:gap-10 gap-5">
                        <WalletOverview />
                        <WalletHistory />
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default WalletPage