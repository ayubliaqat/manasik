import { redirect } from "next/navigation"
import { auth } from "@/auth"

export default async function AdminIndexPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  redirect("/admin/dashboard")
}