import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { auth } from "@/auth"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const fileName = `${crypto.randomUUID()}.${extension}`
    const filePath = `posts/${fileName}`

    const { error } = await supabase.storage
      .from("post-images")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("Supabase upload error:", error)

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath)

    return NextResponse.json({
      url: publicUrl,
    })
  } catch (error) {
    console.error("Upload error:", error)

    return NextResponse.json(
      { error: "Image upload failed" },
      { status: 500 }
    )
  }
}
