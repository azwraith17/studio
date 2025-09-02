
"use client";

import { Logo } from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { LayoutDashboard, History, LogOut, User, ClipboardList } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { ProtectedRoute } from "@/components/protected-route";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarProvider>
        <Sidebar>
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-4">
              <Logo />
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/dashboard">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Tests">
                    <Link href="/dashboard/tests">
                      <ClipboardList />
                      <span>Tests</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Test History">
                    <Link href="/dashboard/history">
                      <History />
                      <span>Test History</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Profile">
                    <Link href="/dashboard/profile">
                      <User />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
            <div className="mt-auto border-t p-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={logout} tooltip="Logout">
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </div>
        </Sidebar>
        <SidebarInset>
          <div className="flex min-h-screen w-full flex-col">
            <header className="flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
              <SidebarTrigger />
              <div className="flex-1">
                {/* Can add breadcrumbs or page title here */}
              </div>
              <UserNav />
            </header>
            <main className="flex-1 bg-muted/40 p-4 sm:p-6">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
