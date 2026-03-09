"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/add-project", label: "Add Project" },
    { href: "/admin/manage-projects", label: "Manage Projects" },
    { href: "/admin/uploads", label: "Uploads" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-6">

      <h2 className="text-xl font-bold mb-8">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2">

        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href}
              href={link.href}
              className={`p-3 rounded transition-colors ${
                isActive 
                  ? "bg-red-600 text-white" 
                  : "hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

      </nav>

      <div className="mt-8 pt-8 border-t">
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to Main Site
        </Link>
      </div>

    </aside>
  );
}