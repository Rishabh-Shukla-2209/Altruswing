import Navbar from "@/components/shared/Navbar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MobileNav } from "@/components/shared/MobileNav";

export default function SubscriberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">
      <Navbar />
      <DashboardSidebar />
      <div className="lg:ml-64 pt-28 px-8 pb-20 max-w-[1600px] mx-auto">
        {children}
      </div>
      <MobileNav />
    </div>
  );
}
