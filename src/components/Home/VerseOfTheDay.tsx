"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { ExternalLink, Loader2, Pause, Play } from "lucide-react"

/* ---------------------------------------------------------------
   31 entries: day 1 of the month shows entry 1, day 2 shows entry 2...
   Only today's Quran text is loaded (Uthmani + Sahih International).
   Prophetic duas are stored here with their hadith reference.
---------------------------------------------------------------- */

type Text = { arabic: string; translation: string }

type Entry =
  | {
      kind: "quran"
      surah: number
      ayah: number
      tag: string
      context: string
      note?: string
      fallback?: Text
    }
  | {
      kind: "hadith"
      tag: string
      context: string
      arabic: string
      translation: string
      sourceTitle: string
      sourceDetail: string
      note?: string
      audio?: string // optional: your own recording, e.g. "/audio/talbiyah.mp3"
    }

const SURAHS: Record<number, string> = {
  2: "Al-Baqarah",
  3: "Ali 'Imran",
  5: "Al-Ma'idah",
  14: "Ibrahim",
  22: "Al-Hajj",
}

const ENTRIES: Entry[] = [
  {
    kind: "hadith",
    tag: "Prophetic dua",
    context: "Said when entering ihram, if you fear being prevented from completing",
    arabic: "اللَّهُمَّ مَحِلِّي حَيْثُ حَبَسْتَنِي",
    translation: "O Allah, my place of release is wherever You detain me.",
    sourceTitle: "Sahih Muslim 1207 · Sahih al-Bukhari 5089",
    sourceDetail:
      "Narrated by Aisha (may Allah be pleased with her). The Prophet ﷺ taught it to Duba'ah bint az-Zubayr.",
  },
  {
    kind: "hadith",
    tag: "Talbiyah",
    context: "Recited from ihram until the start of Tawaf (Umrah) or stoning on Eid day (Hajj)",
    arabic:
      "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
    translation:
      "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, grace and sovereignty belong to You. You have no partner.",
    sourceTitle: "Sahih al-Bukhari 1549 · Sahih Muslim 1184",
    sourceDetail:
      "Narrated by Abdullah ibn Umar (may Allah be pleased with him): the talbiyah of the Messenger of Allah ﷺ.",
  },
  { kind: "quran", surah: 22, ayah: 27, tag: "Verse of Hajj", context: "The call of Ibrahim ﷺ to the pilgrims" },
  { kind: "quran", surah: 3, ayah: 96, tag: "Verse of Hajj", context: "The first House built for mankind" },
  { kind: "quran", surah: 3, ayah: 97, tag: "Verse of Hajj", context: "The obligation of Hajj" },
  { kind: "quran", surah: 2, ayah: 196, tag: "Verse of Hajj", context: "Completing Hajj and Umrah for Allah" },
  { kind: "quran", surah: 2, ayah: 197, tag: "Verse of Hajj", context: "The Hajj months, conduct in ihram and the best provision" },
  { kind: "quran", surah: 22, ayah: 26, tag: "Verse of Hajj", context: "Purifying the House for those who circle it" },
  { kind: "quran", surah: 5, ayah: 97, tag: "Verse of Hajj", context: "The Sacred House as a means of stability for mankind" },
  { kind: "quran", surah: 2, ayah: 127, tag: "Quranic dua", context: "Ibrahim and Ismail raising the foundations of the Kaaba" },
  {
    kind: "quran",
    surah: 2,
    ayah: 128,
    tag: "Quranic dua",
    context: "Asking Allah to show us the rites of Hajj",
    fallback: {
      arabic:
        "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا ۖ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ",
      translation:
        "Our Lord, make us Muslims in submission to You, and from our descendants a nation in submission to You. Show us our rites and accept our repentance. Indeed, You are the Accepting of Repentance, the Merciful.",
    },
  },
  { kind: "quran", surah: 2, ayah: 129, tag: "Quranic dua", context: "Ibrahim's prayer, made while building the Kaaba, for a messenger" },
  { kind: "quran", surah: 14, ayah: 35, tag: "Quranic dua", context: "Ibrahim's prayer for a safe Makkah" },
  { kind: "quran", surah: 14, ayah: 37, tag: "Quranic dua", context: "Ibrahim leaving his family beside the Sacred House" },
  { kind: "quran", surah: 14, ayah: 40, tag: "Quranic dua", context: "Ibrahim's prayer for steadfast prayer" },
  { kind: "quran", surah: 14, ayah: 41, tag: "Quranic dua", context: "Ibrahim's prayer for forgiveness" },
  {
    kind: "hadith",
    tag: "Dhikr",
    context: "Said when facing the Black Stone during Tawaf",
    arabic: "اللَّهُ أَكْبَرُ",
    translation: "Allah is the Greatest.",
    sourceTitle: "Sahih al-Bukhari 1613",
    sourceDetail: "Narrated by Abdullah ibn Abbas (may Allah be pleased with them).",
    note: "The Prophet ﷺ pointed to the Black Stone and said Allahu Akbar each time he reached it during Tawaf.",
  },
  {
    kind: "quran",
    surah: 2,
    ayah: 201,
    tag: "Quranic dua",
    context: "Recited between the Yemeni Corner and the Black Stone in Tawaf",
    note: "Taught for this place in Tawaf: Sunan Abi Dawud 1892 (graded hasan by Al-Albani).",
    fallback: {
      arabic:
        "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      translation:
        "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    },
  },
  {
    kind: "quran",
    surah: 2,
    ayah: 125,
    tag: "Verse of Umrah",
    context: "The Station of Ibrahim, recited after Tawaf",
    note: "Recited by the Prophet ﷺ after Tawaf, before praying two rak'ahs behind the Station: Sahih Muslim 1218.",
  },
  {
    kind: "quran",
    surah: 2,
    ayah: 158,
    tag: "Verse of Umrah",
    context: "Recited on approaching Safa before Sa'i",
    note: "Recited by the Prophet ﷺ on approaching Safa: Sahih Muslim 1218.",
  },
  {
    kind: "hadith",
    tag: "Dhikr",
    context: "Said on Safa and Marwa during Sa'i",
    arabic:
      "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ",
    translation:
      "There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is over all things Able. There is no god but Allah alone; He fulfilled His promise, aided His servant, and defeated the confederates alone.",
    sourceTitle: "Sahih Muslim 1218",
    sourceDetail:
      "Narrated by Jabir ibn Abdullah (may Allah be pleased with him) in the long hadith describing the Prophet's ﷺ Hajj.",
    note: "The Prophet ﷺ said this three times on Safa, making dua in between, and did the same on Marwa.",
  },
  {
    kind: "hadith",
    tag: "Prophetic dua",
    context: "Asking for a Hajj free of showing off",
    arabic: "اللَّهُمَّ حَجَّةً لَا رِيَاءَ فِيهَا وَلَا سُمْعَةَ",
    translation:
      "O Allah, [make this] a Hajj in which there is no showing off and no seeking of reputation.",
    sourceTitle: "Sunan Ibn Majah 2890",
    sourceDetail: "Narrated by Anas ibn Malik (may Allah be pleased with him).",
    note: "The Prophet ﷺ performed Hajj on a plain saddle and said this.",
  },
  { kind: "quran", surah: 22, ayah: 28, tag: "Verse of Hajj", context: "Witnessing the benefits of Hajj and remembering Allah's name" },
  {
    kind: "hadith",
    tag: "Dua of Arafah",
    context: "The best dua, made on the Day of Arafah",
    arabic:
      "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    translation:
      "There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him belongs all praise, and He is over all things Able.",
    sourceTitle: "Jami' at-Tirmidhi 3585",
    sourceDetail:
      "Narrated by Amr ibn Shu'ayb, from his father, from his grandfather (may Allah be pleased with them).",
    note: "The Prophet ﷺ called this the best of what he and the Prophets before him said. Graded hasan (Al-Albani).",
  },
  { kind: "quran", surah: 2, ayah: 198, tag: "Verse of Hajj", context: "Remembering Allah at al-Mash'ar al-Haram in Muzdalifah" },
  { kind: "quran", surah: 2, ayah: 199, tag: "Verse of Hajj", context: "Seeking Allah's forgiveness during Hajj" },
  { kind: "quran", surah: 22, ayah: 32, tag: "Verse of Hajj", context: "Honouring the symbols of Allah" },
  { kind: "quran", surah: 22, ayah: 36, tag: "Verse of Hajj", context: "The sacrificial animals as symbols of Allah" },
  { kind: "quran", surah: 2, ayah: 200, tag: "Verse of Hajj", context: "Remembering Allah after completing the rites" },
  { kind: "quran", surah: 2, ayah: 203, tag: "Verse of Hajj", context: "Remembering Allah in the days of Tashreeq" },
  {
    kind: "hadith",
    tag: "Prophetic dua",
    context: "The Prophet's ﷺ prayer for pilgrims who shave their heads after the rites",
    arabic: "اللَّهُمَّ ارْحَمِ الْمُحَلِّقِينَ",
    translation: "O Allah, have mercy on those who shave their heads.",
    sourceTitle: "Sahih al-Bukhari 1727 · Sahih Muslim 1301",
    sourceDetail: "Narrated by Abdullah ibn Umar (may Allah be pleased with them).",
    note: "The Prophet ﷺ then included those who shorten their hair.",
  },
]

const pad3 = (n: number) => String(n).padStart(3, "0")

async function fetchAyah(surah: number, ayah: number): Promise<Text | null> {
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,en.sahih`
    )
    if (!res.ok) return null
    const json = (await res.json()) as { data?: { text?: string }[] }
    const [ar, en] = json.data ?? []
    if (!ar?.text || !en?.text) return null
    return { arabic: ar.text, translation: en.text }
  } catch {
    return null
  }
}

/* ------------------------------ Live date ------------------------------ */

const keyOf = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`

// Re-checks the date every minute and when the tab is revisited,
// so the dua changes by itself when the day changes.
function subscribeDate(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000)
  document.addEventListener("visibilitychange", onChange)
  return () => {
    window.clearInterval(id)
    document.removeEventListener("visibilitychange", onChange)
  }
}
const getDateKey = () => keyOf(new Date())
const getDateKeyServer = () => ""

/* ------------------------------ Scroll reveal ------------------------------ */

type From = "left" | "right" | "up" | "down" | "zoom"

const HIDDEN: Record<From, string> = {
  left: "-translate-x-10",
  right: "translate-x-10",
  up: "translate-y-10",
  down: "-translate-y-10",
  zoom: "scale-90",
}

function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode
  from?: From
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      const t = window.setTimeout(() => setShown(true), 0)
      return () => window.clearTimeout(t)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out
        motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none
        ${
          shown
            ? "translate-x-0 translate-y-0 scale-100 opacity-100"
            : `opacity-0 ${HIDDEN[from]}`
        }
        ${className}
      `}
    >
      {children}
    </div>
  )
}

/* ------------------------------ Dua icon ------------------------------ */

const duaCss = `
@keyframes dua-glow {
  0%, 100% { opacity: .12; transform: scale(.85); }
  50% { opacity: .38; transform: scale(1.15); }
}
@keyframes dua-lift {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-.7px); }
}
@keyframes dua-rise {
  0% { transform: translateY(3px) scale(.5); opacity: 0; }
  35% { opacity: 1; }
  100% { transform: translateY(-4px) scale(1); opacity: 0; }
}
@keyframes dua-twinkle {
  0%, 100% { transform: scale(.5); opacity: .4; }
  50% { transform: scale(1.2); opacity: 1; }
}
@keyframes dua-ring {
  0% { transform: scale(.9); opacity: .5; }
  100% { transform: scale(1.5); opacity: 0; }
}
.dua-glow, .dua-lift, .dua-rise, .dua-twinkle { transform-box: fill-box; transform-origin: center; }
.dua-glow { animation: dua-glow 3.2s ease-in-out infinite; }
.dua-lift { animation: dua-lift 3.2s ease-in-out infinite; }
.dua-rise { animation: dua-rise 3.2s ease-out infinite; }
.dua-twinkle { animation: dua-twinkle 2.4s ease-in-out infinite; }
.dua-ring { animation: dua-ring 3.2s ease-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .dua-glow, .dua-lift, .dua-rise, .dua-twinkle, .dua-ring { animation: none !important; }
}
`

function DuaIcon() {
  return (
    <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12">
      <span
        aria-hidden="true"
        className="dua-ring absolute inset-0 rounded-full border border-gold/40"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-gold/30 bg-gold/[0.08]"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative h-[68%] w-[68%] text-emerald"
      >
        <circle
          className="dua-glow text-gold"
          cx="12"
          cy="10"
          r="5.5"
          fill="currentColor"
          stroke="none"
        />

        <g className="dua-lift">
          <path
            d="M3 10.5 C3.5 15.5 7.5 19 12 19 C16.5 19 20.5 15.5 21 10.5 C18 13 15 14 12 14 C9 14 6 13 3 10.5 Z"
            fill="currentColor"
            fillOpacity="0.14"
          />
          <path d="M12 19 C7.5 19 4 16 3.2 12.2 L3 10.2" />
          <path d="M12 19 C16.5 19 20 16 20.8 12.2 L21 10.2" />
          <path d="M12 19 V15.5" opacity="0.6" />
        </g>

        <g className="text-gold">
          <path
            className="dua-rise"
            d="M12 5.2 L12.7 7 L14.5 7.7 L12.7 8.4 L12 10.2 L11.3 8.4 L9.5 7.7 L11.3 7 Z"
            fill="currentColor"
            strokeWidth="0.5"
          />
          <circle className="dua-twinkle" cx="6.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
          <circle
            className="dua-twinkle"
            cx="17.5"
            cy="6"
            r="0.9"
            fill="currentColor"
            stroke="none"
            style={{ animationDelay: "0.8s" }}
          />
          <circle
            className="dua-twinkle"
            cx="19.5"
            cy="9.5"
            r="0.6"
            fill="currentColor"
            stroke="none"
            style={{ animationDelay: "1.5s" }}
          />
        </g>
      </svg>
    </span>
  )
}

/* -------------------------------- Audio -------------------------------- */

// Only one thing plays at a time.
let activeStop: (() => void) | null = null

const subscribeNoop = () => () => {}
const getCanSpeak = () => "speechSynthesis" in window
const getCanSpeakServer = () => false

function PlayButton({ src, text }: { src?: string; text: string | null }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "playing" | "error">("idle")
  const canSpeak = useSyncExternalStore(subscribeNoop, getCanSpeak, getCanSpeakServer)

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    if (!src) window.speechSynthesis?.cancel()
    setStatus("idle")
  }, [src])

  if (!src && !(canSpeak && text)) return null

  const toggle = async () => {
    if (status === "playing" || status === "loading") {
      stop()
      if (activeStop === stop) activeStop = null
      return
    }

    activeStop?.()
    activeStop = stop

    if (src) {
      const audio = audioRef.current
      if (!audio) return
      setStatus("loading")
      try {
        await audio.play()
        setStatus("playing")
      } catch (e) {
        setStatus((e as DOMException)?.name === "AbortError" ? "idle" : "error")
      }
      return
    }

    if (text) {
      const synth = window.speechSynthesis
      synth.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = "ar-SA"
      u.rate = 0.85
      u.onend = () => setStatus("idle")
      u.onerror = () => setStatus("idle")
      setStatus("playing")
      synth.speak(u)
    }
  }

  const caption = src
    ? src.includes("everyayah")
      ? "Recitation: Mishary Alafasy"
      : "Recorded audio"
    : "Read aloud by your device's Arabic voice"

  return (
    <div className="flex flex-col items-center gap-1.5 lg:items-start">
      {src && (
        <audio
          ref={audioRef}
          src={src}
          preload="none"
          onEnded={() => setStatus("idle")}
          onError={() => setStatus("error")}
        />
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={status === "playing" ? "Pause audio" : "Play audio"}
        className="
          inline-flex items-center gap-2 rounded-full
          border border-gold/50 bg-gold/10
          px-5 py-2 text-xs font-semibold text-gold
          transition-colors hover:bg-gold/20
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
        "
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : status === "playing" ? (
          <Pause className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Play className="h-4 w-4" aria-hidden="true" />
        )}
        {status === "playing" ? "Pause" : "Listen"}
      </button>
      <span className="text-[10px] text-white/50">
        {status === "error" ? "Audio unavailable right now" : caption}
      </span>
    </div>
  )
}

/* --------------------------------- Main --------------------------------- */

export default function VerseOfTheDay() {
  const key = useSyncExternalStore(subscribeDate, getDateKey, getDateKeyServer)
  const [texts, setTexts] = useState<Record<string, Text>>({})

  // Which entry is today's? (day of month, 1 to 31)
  const dayOfMonth = key ? Number(key.split("-")[2]) : 1
  const entry = ENTRIES[(dayOfMonth - 1) % ENTRIES.length]

  const surah = entry.kind === "quran" ? entry.surah : 0
  const ayah = entry.kind === "quran" ? entry.ayah : 0

  // Loads only today's ayah from the browser.
  useEffect(() => {
    if (!surah) return
    let cancelled = false
    fetchAyah(surah, ayah).then((text) => {
      if (cancelled || !text) return
      setTexts((prev) => ({ ...prev, [`${surah}:${ayah}`]: text }))
    })
    return () => {
      cancelled = true
    }
  }, [surah, ayah])

  // Before the browser knows today's date, keep an empty block of similar height.
  if (!key) {
    return <section className="min-h-[360px] bg-dark-teal" aria-hidden="true" />
  }

  const [y, m, d] = key.split("-").map(Number)
  const today = new Date(y, m, d)

  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(today)
  const fullDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(today)

  let arabic: string | null
  let translation: string | null
  let sourceTitle: string
  let sourceDetail: string
  let link: string | undefined
  let audio: string | undefined

  if (entry.kind === "quran") {
    const text = texts[`${entry.surah}:${entry.ayah}`] ?? entry.fallback ?? null
    arabic = text?.arabic ?? null
    translation = text?.translation ?? null
    sourceTitle = `Surah ${SURAHS[entry.surah]} (${entry.surah}:${entry.ayah})`
    sourceDetail = `Qur'an, chapter ${entry.surah}, verse ${entry.ayah}`
    link = `https://quran.com/${entry.surah}/${entry.ayah}`
    audio = `https://everyayah.com/data/Alafasy_128kbps/${pad3(entry.surah)}${pad3(entry.ayah)}.mp3`
  } else {
    arabic = entry.arabic
    translation = entry.translation
    sourceTitle = entry.sourceTitle
    sourceDetail = entry.sourceDetail
    audio = entry.audio
  }

  return (
    <section className="relative overflow-hidden bg-dark-teal py-8 sm:py-10 lg:py-12">
      <style>{duaCss}</style>

      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-1/2 top-[-200px]
          h-[320px] w-[160%] -translate-x-1/2
          rounded-[0_0_50%_50%]
          bg-gradient-to-br from-emerald/[0.12] via-emerald/[0.04] to-gold/[0.07]
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
          {/* LEFT: heading, tag, audio */}
          <Reveal from="left" className="text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <DuaIcon />
              <p className="text-left text-[10px] font-bold uppercase leading-4 tracking-[0.2em] text-gold sm:text-[11px]">
                {weekday}
                <br />
                {fullDate}
              </p>
            </div>

            <h2 className="mt-6 text-balance font-serif text-[22px] font-medium leading-[1.2] tracking-[-0.015em] text-white sm:text-[26px] lg:text-[30px]">
              {/* Hajj &amp; Umrah{" "} */}
              <span className="relative inline-block whitespace-nowrap text-emerald">
                Dua of the Day
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 10"
                  preserveAspectRatio="none"
                  fill="none"
                  className="pointer-events-none absolute left-1/2 top-full mt-[0.05em] h-[0.2em] w-[75%] -translate-x-1/2 text-gold"
                >
                  <path
                    d="M2 5 Q12 0 22 5 T42 5 T62 5 T82 5 T102 5 T118 5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
            </h2>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start">
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  entry.kind === "quran"
                    ? "border-gold/50 text-gold"
                    : "border-emerald/60 text-emerald"
                }`}
              >
                {entry.tag}
              </span>
              <span className="text-xs leading-5 text-white/65">{entry.context}</span>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <PlayButton key={dayOfMonth} src={audio} text={arabic} />
            </div>
          </Reveal>

          {/* RIGHT: verse + source */}
          <Reveal from="right" delay={120}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center sm:p-5">
              {arabic ? (
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-serif text-[20px] leading-[1.85] text-white sm:text-[23px] lg:text-[26px]"
                >
                  {arabic}
                </p>
              ) : (
                <p className="text-sm text-white/60">
                  Loading the verse… or open the source below.
                </p>
              )}

              {translation && (
                <p className="mx-auto mt-3 max-w-xl text-[13px] leading-6 text-white/75 sm:text-sm">
                  “{translation}”
                </p>
              )}

              <div className="mt-4 border-t border-white/10 pt-3 text-left">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="text-[12px] font-semibold text-white">
                    <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                      Source
                    </span>
                    {sourceTitle}
                  </p>
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald hover:underline"
                    >
                      Quran.com
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p className="mt-1 text-[11px] leading-[1.5] text-white/60">
                  {sourceDetail}
                  {entry.note ? ` ${entry.note}` : ""}
                </p>
              </div>
            </div>

            <p className="mt-2 text-center text-[10px] leading-4 text-white/40 lg:text-left">
              Text: Al-Quran Cloud (Sahih International). Recitation: Mishary Alafasy, EveryAyah.
              For rulings, consult a qualified scholar.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}