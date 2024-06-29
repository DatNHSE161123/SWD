import Container from '@/app/components/hero/Container'
import FilterCus from '@/app/components/product/list-product/FilterCus'
import ListProduct from '@/app/components/product/list-product/ListProduct'
import Layout from '@/app/layout'

const ListProductPage = () => {
    return (
        <Layout>
            <Container>
                <div className="py-10">
                    <div className="grid lg:grid-cols-4 col-span-1 gap-5">
                        <FilterCus />
                        <ListProduct />
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default ListProductPage