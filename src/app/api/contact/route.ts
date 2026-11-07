import { NextResponse } from "next/server"
import { Resend } from "resend"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const name = String(body.name ?? "").trim()
  const email = String(body.email ?? "").trim()
  const subject = String(body.subject ?? "").trim()
  const message = String(body.message ?? "").trim()
  const honeypot = String(body.website ?? "").trim()

  // Bots fill the hidden field. Pretend it worked and send nothing.
  if (honeypot) {
    return NextResponse.json({ ok: true })
  }

  if (!name || name.length > 100) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 })
  }
  if (!emailPattern.test(email) || email.length > 150) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    )
  }
  if (!subject) {
    return NextResponse.json({ error: "Please choose a topic." }, { status: 400 })
  }
  if (message.length < 10 || message.length > 3000) {
    return NextResponse.json(
      { error: "Please write a message between 10 and 3000 characters." },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    console.error("Contact form is missing environment variables.")
    return NextResponse.json(
      { error: "The contact form isn't set up yet. Please try again later." },
      { status: 500 }
    )
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: `Islam Religion <${from}>`,
      to,
      replyTo: email,
      subject: `[Contact] ${subject} - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${subject}\n\n${message}`,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Contact form error:", err)
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again." },
      { status: 500 }
    )
  }
}