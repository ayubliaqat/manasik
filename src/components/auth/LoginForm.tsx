"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import {
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null)
    setIsSubmitting(true)

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setServerError("Invalid email or password")
        return
      }

      router.push("/admin/dashboard")
      router.refresh()
    } catch {
      setServerError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
      {serverError && (
        <div className="mb-5 flex items-center gap-2.5 rounded-2xl border border-gold/30 bg-gold-light/20 px-4 py-3 text-sm text-deep-teal shadow-sm">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-deep-teal">
            !
          </div>
          <span>{serverError}</span>
        </div>
      )}

      <div className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 ml-1 block text-xs font-semibold uppercase tracking-wide text-muted-teal"
          >
            Email
          </label>

          <div className="group relative">
            <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-soft-beige/60 transition-all duration-300 group-focus-within:bg-emerald/10">
              <Mail className="h-4 w-4 text-muted-teal transition-colors duration-300 group-focus-within:text-emerald" />
            </div>

            <input
              id="email"
              {...register("email")}
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full border border-soft-beige bg-card pl-12 pr-4 text-base text-charcoal shadow-[0_3px_10px_rgba(23,43,42,0.03)] outline-none transition-all duration-300 placeholder:text-muted-teal/55 hover:border-muted-teal/30 hover:shadow-[0_5px_15px_rgba(23,43,42,0.05)] focus:border-emerald/60 focus:bg-warm-white focus:shadow-[0_8px_22px_rgba(8,127,91,0.09)] focus:ring-4 focus:ring-emerald/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {errors.email && (
            <p className="mt-1.5 ml-1 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 ml-1 block text-xs font-semibold uppercase tracking-wide text-muted-teal"
          >
            Password
          </label>

          <div className="group relative">
            <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-soft-beige/60 transition-all duration-300 group-focus-within:bg-emerald/10">
              <Lock className="h-4 w-4 text-muted-teal transition-colors duration-300 group-focus-within:text-emerald" />
            </div>

            <input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full border border-soft-beige bg-card pl-12 pr-12 text-base text-charcoal shadow-[0_3px_10px_rgba(23,43,42,0.03)] outline-none transition-all duration-300 placeholder:text-muted-teal/55 hover:border-muted-teal/30 hover:shadow-[0_5px_15px_rgba(23,43,42,0.05)] focus:border-emerald/60 focus:bg-warm-white focus:shadow-[0_8px_22px_rgba(8,127,91,0.09)] focus:ring-4 focus:ring-emerald/10 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              disabled={isSubmitting}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-muted-teal transition-all duration-200 hover:bg-soft-beige hover:text-deep-teal disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 ml-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember / Forgot */}
        <div className="flex items-center justify-between px-1 pt-0.5">
          <label className="group flex cursor-pointer items-center gap-2 text-xs text-muted-teal">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded border-soft-beige accent-emerald focus:ring-emerald"
            />
            <span className="transition-colors group-hover:text-charcoal">
              Remember me
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-emerald transition-colors duration-200 hover:text-deep-teal"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-emerald/40 bg-gradient-to-r from-deep-teal via-emerald to-rich-emerald text-sm font-semibold text-warm-white shadow-[0_10px_25px_rgba(8,127,91,0.25),0_3px_8px_rgba(6,63,58,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald/60 hover:shadow-[0_16px_35px_rgba(8,127,91,0.32),0_5px_12px_rgba(6,63,58,0.14)] active:translate-y-[1px] active:shadow-[0_6px_15px_rgba(8,127,91,0.20)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <span className="absolute -left-20 top-0 h-full w-16 skew-x-[-20deg] bg-white/10 blur-md transition-all duration-700 group-hover:left-[120%]" />
          <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/20" />

          {isSubmitting ? (
            <>
              <Loader2 className="relative h-4 w-4 animate-spin" />
              <span className="relative">Signing in...</span>
            </>
          ) : (
            <>
              <span className="relative">Login</span>
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </>
          )}
        </button>

        
      </div>
    </form>
  )
}