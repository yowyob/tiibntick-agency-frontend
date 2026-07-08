import AdminGuard from '@/components/admin/AdminGuard';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Administration — TiiBnTick',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}
