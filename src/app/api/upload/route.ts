import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { auth } from "@/auth"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    // Require logged-in user
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

    // Protect the server from unnecessarily large uploads.
    // Your featured-image uploader already compresses images,
    // while Tiptap uploads the original selected image.
    const maxSize = 10 * 1024 * 1024

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Image must be smaller than 10MB" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<{
      secure_url: string
      public_id: string
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "baytullah/posts",
          resource_type: "image",
          use_filename: false,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            reject(error)
            return
          }

          if (!result?.secure_url || !result.public_id) {
            reject(new Error("Cloudinary did not return an image URL"))
            return
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          })
        }
      )

      uploadStream.end(buffer)
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    })
  } catch (error) {
    console.error("Cloudinary upload error:", error)

    return NextResponse.json(
      { error: "Image upload failed. Please try again." },
      { status: 500 }
    )
  }
}