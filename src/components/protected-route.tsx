
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/contexts/auth-context';
import { Skeleton } from './ui/skeleton';

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      // The default login path if no specific one is found
      let loginPath = '/login';
      // Redirect to the role-specific login page
      if (allowedRoles.includes('admin')) {
        loginPath = '/admin/login';
      } else if (allowedRoles.includes('psychologist')) {
        loginPath = '/psychologist/login';
      }
      router.replace(loginPath);
      return;
    }

    if (!allowedRoles.includes(user.role)) {
       // If the user role is not allowed, redirect them to their own dashboard
      let dashboardPath = '/login';
      if (user.role === 'client') dashboardPath = '/dashboard';
      if (user.role === 'admin') dashboardPath = '/admin/dashboard';
      if (user.role === 'psychologist') dashboardPath = '/psychologist/dashboard';
      router.replace(dashboardPath);
    }
  }, [user, isLoading, router, allowedRoles]);

  if (isLoading || !user || !allowedRoles.includes(user.role)) {
    return (
        <div className="flex flex-col flex-1 h-full p-4 space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <Skeleton className="h-8 w-1/4" />
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </div>
            <Skeleton className="w-full h-[60vh] rounded-xl" />
        </div>
    )
  }

  return <>{children}</>;
}
