import type { Metadata } from "next";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { getContentFresh, storageEnabled } from "@/lib/content";
import LoginForm from "@/components/admin/LoginForm";
import AdminApp from "@/components/admin/AdminApp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <LoginForm configured={adminConfigured()} />;
  }
  const content = await getContentFresh();
  return <AdminApp initial={content} storageReady={storageEnabled()} />;
}
