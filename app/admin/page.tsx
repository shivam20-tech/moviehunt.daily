import { redirect } from 'next/navigation';

// /admin redirects to the Overview dashboard
export default function AdminRootPage() {
  redirect('/admin/overview');
}
