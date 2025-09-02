
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
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { ProtectedRoute } from "@/components/protected-route";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
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
                    <Link href="/admin/dashboard">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Psychologists">
                    <Link href="/admin/dashboard">
                      <Users />
                      <span>Psychologists</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
            <div className="mt-auto border-t p-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Logout">
                    <Link href="/admin/login">
                      <LogOut />
                      <span>Logout</span>
                    </Link>
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
              <div className="flex-1">{/* Can add page title here */}</div>
              <UserNav />
            </header>
            <main className="flex-1 bg-muted/40 p-4 sm:p-6">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
