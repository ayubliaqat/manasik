"use client"

import { useRef, useState } from "react"
import imageCompression from "browser-image-compression"
import { ImageIcon, Loader2, X } from "lucide-react"

export function ImageUploader({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.")
      return
    }

    setIsUploading(true)

    try {
      // Compress before sending to Cloudinary.
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/webp",
        initialQuality: 0.82,
      })

      const formData = new FormData()
      formData.append("file", compressedFile, "featured-image.webp")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      let result: {
        url?: string
        publicId?: string
        error?: string
      }

      try {
        result = await response.json()
      } catch {
        throw new Error("Invalid response from upload server")
      }

      if (!response.ok) {
        throw new Error(result.error || "Image upload failed")
      }

      if (!result.url) {
        throw new Error(
          "Upload succeeded but Cloudinary did not return an image URL"
        )
      }

      onChange(result.url)
    } catch (error) {
      console.error("Cloudinary image upload failed:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Image upload failed. Please try again."
      )
    } finally {
      setIsUploading(false)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  function removeImage() {
    onChange("")
  }

  if (value) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-soft-beige group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt="Featured image"
          className="w-full h-48 object-cover"
        />

        <button
          type="button"
          onClick={removeImage}
          disabled={isUploading}
          aria-label="Remove featured image"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-charcoal/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition disabled:cursor-not-allowed"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      onClick={() => {
        if (!isUploading) {
          fileInputRef.current?.click()
        }
      }}
      onDragOver={(event) => {
        event.preventDefault()

        if (!isUploading) {
          event.dataTransfer.dropEffect = "copy"
        }
      }}
      onDrop={(event) => {
        event.preventDefault()

        if (isUploading) {
          return
        }

        const file = event.dataTransfer.files?.[0]

        if (file) {
          handleFile(file)
        }
      }}
      className={`rounded-xl border-2 border-dashed border-soft-beige bg-warm-white h-48 flex flex-col items-center justify-center gap-2 transition ${
        isUploading
          ? "cursor-wait opacity-80"
          : "cursor-pointer hover:border-emerald"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        disabled={isUploading}
        onChange={(event) => {
          const file = event.target.files?.[0]

          if (file) {
            handleFile(file)
          }
        }}
      />

      {isUploading ? (
        <>
          <Loader2 className="h-6 w-6 text-emerald animate-spin" />

          <p className="text-xs text-charcoal font-medium">
            Compressing & uploading...
          </p>

          <p className="text-[11px] text-muted-teal">
            Uploading to Cloudinary
          </p>
        </>
      ) : (
        <>
          <div className="h-10 w-10 rounded-xl bg-emerald/10 flex items-center justify-center">
            <ImageIcon className="h-5 w-5 text-emerald" />
          </div>

          <p className="text-xs text-charcoal font-medium">
            Click or drag image to upload
          </p>

          <p className="text-[11px] text-muted-teal">
            JPG, PNG, WebP or GIF
          </p>
        </>
      )}
    </div>
  )
}