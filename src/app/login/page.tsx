import Link from "next/link"
import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Sign In | Manasik",
  description: "Sign in to your Manasik account.",
}

function CornerFlourish({ position }: { position: "top-left" | "bottom-right" }) {
  const isTop = position === "top-left"
  return (
    <svg
      viewBox="0 0 140 140"
      aria-hidden="true"
      className={`absolute h-28 w-28 pointer-events-none ${
        isTop ? "top-0 left-0 -scale-x-100 -scale-y-100" : "bottom-0 right-0"
      }`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`grad-${position}`} x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-deep-teal)" />
          <stop offset="100%" stopColor="var(--color-emerald)" />
        </linearGradient>
      </defs>
      <path
        d="M140,140 L140,40 C110,60 90,30 60,50 C30,70 50,110 20,140 Z"
        fill={`url(#grad-${position})`}
      />
      <path
        d="M140,140 L140,40 C110,60 90,30 60,50 C30,70 50,110 20,140 Z"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1.2"
        opacity="0.5"
      />
    </svg>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-beige px-4 py-8 sm:py-12">
      <div className="relative w-full max-w-sm rounded-[2rem] bg-card shadow-xl overflow-hidden">
        <CornerFlourish position="top-left" />
        <CornerFlourish position="bottom-right" />

        <div className="relative pt-10 sm:pt-14 pb-10 px-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-deep-teal mb-1.5">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-teal leading-relaxed">
              Sign in to continue your journey
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-muted-teal">
            New here?{" "}
            <Link href="/signup" className="text-gold font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}