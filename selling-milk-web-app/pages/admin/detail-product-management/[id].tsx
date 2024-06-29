import AdminLayout from "@/app/components/admin/AdminLayout";
import DetailProductManagement from "@/app/components/admin/DetailProductManagement";
import ModalAddStock from "@/app/components/providers/modal/stock/ModalAddStock";
import ModalDeleteStock from "@/app/components/providers/modal/stock/ModalDeleteStock";

export default function ProductManagementPage() {
    return (
        <AdminLayout>
            <ModalAddStock />
            <ModalDeleteStock />
            <DetailProductManagement />
        </AdminLayout>
    );
}
