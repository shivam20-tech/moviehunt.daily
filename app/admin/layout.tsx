import type { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

/**
 * Admin Layout — Server Component.
 *
 * Wraps all /admin/* routes (except /admin/login which has its own layout).
 * The primary route guard is middleware.ts — this layout is a secondary layer.
 *
 * Does NOT import Navbar or Footer from the public site.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0a0a0f',
        color: '#f4f4f0',
      }}
    >
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 36px',
          minWidth: 0,
        }}
      >
        {children}
      </main>
    </div>
  );
}
