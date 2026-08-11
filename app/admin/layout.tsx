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
    <div className="min-h-screen bg-[#0a0a0f] text-[#f4f4f0] flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
