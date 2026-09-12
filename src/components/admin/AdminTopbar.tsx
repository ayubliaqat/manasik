"use client"

import { signOut } from "next-auth/react"
import { LogOut, Bell } from "lucide-react"

export function AdminTopbar({ userName }: { userName: string }) {
  return (
    <header className="h-16 shrink-0 bg-card border-b border-soft-beige flex items-center justify-between px-6">
      <div>
        <p className="text-sm text-muted-teal">Welcome back,</p>
        <p className="text-sm font-semibold text-charcoal">{userName}</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-muted-teal hover:text-charcoal transition">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-px bg-soft-beige" />
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 text-sm font-medium text-muted-teal hover:text-charcoal transition"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </header>
  )
}
