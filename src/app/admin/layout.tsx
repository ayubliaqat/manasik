import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { isRole } from "@/lib/supabase/permissions"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminTopbar } from "@/components/admin/AdminTopbar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const role = session.user.role

  if (!isRole(role)) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex bg-soft-beige">
      <AdminSidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar userName={session.user.name ?? "User"} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}