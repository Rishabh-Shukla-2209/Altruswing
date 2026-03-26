import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen flex flex-col">
        <AdminTopBar />
        <div className="p-8 space-y-8 flex-1">{children}</div>
        <footer className="py-8 px-8 border-t border-outline-variant/10 text-on-surface-variant text-[10px] font-label uppercase tracking-widest flex justify-between">
          <div>© 2024 ALTRUSWING | SYSTEM VERSION 4.2.1-STABLE</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">
              Compliance Log
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Security Audit
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Encrypted Trace
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
