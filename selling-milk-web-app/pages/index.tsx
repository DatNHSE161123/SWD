import Banner from '@/app/components/home/Banner'
import Layout from '@/app/layout'
import BestSales from '@/app/components/home/BestSales'
import NewProduct from '@/app/components/home/NewProduct'
import QuickProduct from '@/app/components/home/QuickProduct'
import QuickBlog from '@/app/components/home/QuickBlog'

const Home = () => {
    return (
        <Layout style={true}>
            <Banner />
            <NewProduct />
            <BestSales />
            <QuickProduct />
            <QuickBlog />
        </Layout>
    )
}

export default Home