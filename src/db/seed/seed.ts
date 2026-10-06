import { db } from "../index"
import { users } from "../schema"
import bcrypt from "bcryptjs"

async function seed() {
  console.log("Seeding database...")

  const password = "Admin123!"
  const hashedPassword = await bcrypt.hash(password, 12)

  await db.insert(users).values({
    name: "Admin",
    email: "mayub7540@gmail.com",
    password: hashedPassword,
    role: "admin",
  })

  console.log("Seed complete.")
  console.log("Email: mayub7540@gmail.com")
  console.log("Password: Admin123!")

  process.exit(0)
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
