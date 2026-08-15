import { redirect } from 'next/navigation';

// /admin/parser redirects to the upgraded /admin/publish workspace
export default function AdminParserRedirectPage() {
  redirect('/admin/publish');
}
