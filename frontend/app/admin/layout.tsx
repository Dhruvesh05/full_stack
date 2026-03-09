"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated and not already on login page
    if (pathname !== '/admin/login' && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router, pathname]);

  // If on login page, show login without sidebar/navbar
  if (pathname === '/admin/login') {
    return <div suppressHydrationWarning>{children}</div>;
  }

  // Show consistent layout structure (fixes hydration mismatch)
  return (
    <div className="flex min-h-screen bg-gray-100" suppressHydrationWarning>
      
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="p-6">
          {children}
        </main>
      </div>

    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}