import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Apex Sales Neural Engine",
  description: "لوحة تحكم Apex - إدارة المبيعات والمحادثات",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
