import AdminLayout from "@/app/components/admin/AdminLayout";
import ProductManagement from "@/app/components/admin/ProductManagement";
import ModalDiscount from "@/app/components/providers/modal/product/ModalDiscount";
import ModalDeleteProduct from "@/app/components/providers/modal/product/ModalDiscount copy";
import ModalAddStock from "@/app/components/providers/modal/stock/ModalAddStock";

export default function ProductManagementPage() {
    return (
        <AdminLayout>
            <ModalDiscount />
            <ModalAddStock />
            <ModalDeleteProduct />
            <ProductManagement />
        </AdminLayout>
    );
}
