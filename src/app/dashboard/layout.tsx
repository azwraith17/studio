
import { Logo } from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, History, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center px-4 border-b">
            <Logo />
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/dashboard"><LayoutDashboard /><span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Test History">
                  <Link href="/dashboard/history"><History /><span>Test History</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile">
                  <Link href="/dashboard/profile"><User /><span>Profile</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
          <div className="mt-auto p-4 border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <Link href="/"><LogOut /><span>Logout</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </div>
      </Sidebar>
      <div className="flex flex-col w-full min-h-screen">
          <header className="flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 sticky top-0 z-30">
            <SidebarTrigger />
            <div className="flex-1">
              {/* Can add breadcrumbs or page title here */}
            </div>
            <UserNav />
          </header>
          <main className="flex-1 p-4 sm:p-6 bg-muted/40">
            <SidebarInset>
                {children}
            </SidebarInset>
          </main>
      </div>
    </SidebarProvider>
  );
}
