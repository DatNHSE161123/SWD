import AdminLayout from "@/app/components/admin/AdminLayout";
import TransactionManagement from "@/app/components/admin/TransactionManagement";
import ModalCanceled from "@/app/components/providers/modal/transaction/ModalCanceled";
import ModalShipping from "@/app/components/providers/modal/transaction/ModelShipping";

export default function TransactionManagementPage() {
    return (
        <AdminLayout>
            <ModalShipping />
            <ModalCanceled />
            <TransactionManagement />
        </AdminLayout>
    );
}
