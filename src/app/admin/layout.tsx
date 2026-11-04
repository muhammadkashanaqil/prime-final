import { getCurrentAdminUser } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentAdminUser();
  return <AdminShell userEmail={user?.email}>{children}</AdminShell>;
}
