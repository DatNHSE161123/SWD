import AdminLayout from "@/app/components/admin/AdminLayout";
import UserManagement from "@/app/components/admin/UserManagement";

export default function UserManagementPage() {
    return (
        <AdminLayout>
            <UserManagement />
        </AdminLayout>
    );
}
