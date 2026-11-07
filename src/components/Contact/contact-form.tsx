"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"

type Status = "idle" | "sending" | "success" | "error"

const fieldClass =
  "w-full rounded-lg border border-soft-beige bg-white px-3.5 py-2.5 text-[15px] text-charcoal placeholder:text-muted-teal/70 outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"

const labelClass = "mb-1.5 block text-sm font-semibold text-deep-teal"

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus("sending")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setErrorMessage(
          result?.error ?? "Something went wrong. Please try again."
        )
        setStatus("error")
        return
      }

      form.reset()
      setStatus("success")
    } catch {
      setErrorMessage("We couldn't send your message. Please try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="py-6 text-center" role="status">
        <h3 className="font-heading text-xl font-semibold text-deep-teal">
          Thank you, your message is on its way
        </h3>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-charcoal">
          We read every message and will reply as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-full border border-emerald px-5 py-2 text-sm font-semibold text-emerald transition-colors hover:bg-emerald hover:text-white"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={150}
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          What is it about?
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue=""
          className={fieldClass}
        >
          <option value="" disabled>
            Choose a topic
          </option>
          <option>General question</option>
          <option>Mistake in a tool or guide</option>
          <option>Suggest a new tool</option>
          <option>Privacy or my data</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          placeholder="Tell us how we can help"
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Spam trap: real people never see or fill this in */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-xs leading-relaxed text-muted-teal">
        We only use your details to reply to you. Read our{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-emerald underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-deep-teal"
        >
          Privacy Policy
        </Link>{" "}
        to see how we look after them.
      </p>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-emerald px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-deep-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  )
}