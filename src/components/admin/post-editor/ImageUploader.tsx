"use client"

import { useState, useRef } from "react"
import imageCompression from "browser-image-compression"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"

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
      // Compress image before uploading
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/webp",
        initialQuality: 0.82,
      })

      const formData = new FormData()
      formData.append("file", compressedFile, "image.webp")

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Image upload failed")
      }

      if (!data.url) {
        throw new Error("Upload succeeded but no image URL was returned")
      }

      onChange(data.url)
    } catch (err) {
      console.error("Upload failed:", err)
      alert(err instanceof Error ? err.message : "Image upload failed")
    } finally {
      setIsUploading(false)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  if (value) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-soft-beige group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt="Featured"
          className="w-full h-48 object-cover"
        />

        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-charcoal/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()

        const file = e.dataTransfer.files?.[0]

        if (file) {
          handleFile(file)
        }
      }}
      className="rounded-xl border-2 border-dashed border-soft-beige hover:border-emerald bg-warm-white h-48 flex flex-col items-center justify-center gap-2 cursor-pointer transition"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]

          if (file) {
            handleFile(file)
          }
        }}
      />

      {isUploading ? (
        <>
          <Loader2 className="h-6 w-6 text-emerald animate-spin" />
          <p className="text-xs text-muted-teal">
            Compressing & uploading...
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
            JPG, PNG, WebP up to 5MB
          </p>
        </>
      )}
    </div>
  )
}
