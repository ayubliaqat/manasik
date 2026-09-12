"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Users,
  FolderTree,
  Tag,
  MessageSquare,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "All Posts",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    label: "Add Post",
    href: "/admin/blog/new",
    icon: PlusCircle,
  },
  {
    label: "All Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    label: "Tags",
    href: "/admin/tags",
    icon: Tag,
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`shrink-0 bg-card border-r border-soft-beige min-h-screen flex flex-col transition-all duration-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between gap-2.5 px-4 py-5">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="h-8 w-8 rounded-lg bg-deep-teal flex items-center justify-center shrink-0">
            <Moon className="h-4 w-4 text-gold" />
          </div>

          {!collapsed && (
            <span className="text-charcoal font-semibold tracking-tight whitespace-nowrap">
              Manasik
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-muted-teal hover:text-charcoal transition shrink-0"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4.5 w-4.5" />
          ) : (
            <PanelLeftClose className="h-4.5 w-4.5" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {!collapsed && (
          <p className="px-3 pt-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-teal/70">
            Menu
          </p>
        )}

        {navItems.map((item) => {
          const Icon = item.icon

          const isActive =
            pathname === item.href ||
            (item.href === "/admin/blog" &&
              pathname.startsWith("/admin/blog/"))

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors border ${
                isActive
                  ? "bg-emerald border-emerald text-gold-light shadow-sm"
                  : "border-transparent text-muted-teal hover:bg-soft-beige/60 hover:text-charcoal"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isActive ? "text-gold-light" : "text-muted-teal"
                }`}
              />

              {!collapsed && item.label}
            </Link>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="p-3">
          <div className="rounded-xl bg-soft-beige/60 p-4">
            <p className="text-xs font-semibold text-charcoal mb-0.5">
              Manasik Admin
            </p>

            <p className="text-[11px] text-muted-teal leading-relaxed">
              Manage guides, users &amp; content
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}
