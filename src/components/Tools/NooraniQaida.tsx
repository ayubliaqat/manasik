"use client"

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { Check, ChevronDown, ChevronLeft, ChevronRight, Eye, EyeOff, RotateCcw, Shuffle, Volume2 } from "lucide-react"

type Letter = { id: string; ch: string; arName: string; name: string; base: string; hint: string; how: string }
type Item = { id: string; forms: string[]; say: string[]; title: string; detail: string; how: string }
type LessonId = "letters" | "harakat" | "tanween" | "sukoon" | "shaddah" | "madd"
type Lesson = { id: LessonId; label: string; about: string; items: Item[] }
type AudioError = "" | "missing" | "loading" | "novoice" | "voicefail"

/* ---------- Audio ---------- */

// Lessons that have teacher recordings in /public/audio/qaida/<lesson>/<letter>.mp3
// Add a lesson id here only after ALL of its recordings are in place and have been checked by a teacher.
// Lessons not listed here use the device's Arabic computer voice instead.
const AUDIO_LESSONS: LessonId[] = []

// "letters:ba" -> "/audio/qaida/letters/ba.mp3"
const audioSrc = (id: string) => `/audio/qaida/${id.replace(":", "/")}.mp3`

const AUDIO_MESSAGES: Record<Exclude<AudioError, "">, string> = {
  missing: "Audio for this one is not available yet.",
  loading: "Voices are still loading. Tap Listen again in a moment.",
  novoice: "No Arabic voice was found on this device. Use the tips in “How to say it”.",
  voicefail: "The computer voice could not play on this device.",
}

let currentAudio: HTMLAudioElement | null = null
let speechToken = 0 // lets old speech callbacks know they are out of date

const hasSpeech = () => typeof window !== "undefined" && "speechSynthesis" in window
const isArabic = (v: SpeechSynthesisVoice) => v.lang.toLowerCase().startsWith("ar")

function stopAudio() {
  speechToken += 1
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    currentAudio = null
  }
  if (hasSpeech()) window.speechSynthesis.cancel()
}

function findArabicVoice(): SpeechSynthesisVoice | null {
  if (!hasSpeech()) return null
  const arabic = window.speechSynthesis.getVoices().filter(isArabic)
  return arabic.find((v) => v.lang.toLowerCase() === "ar-sa") ?? arabic[0] ?? null
}

// Voices load a moment after the page does, so the component watches them as an external store
function subscribeVoices(cb: () => void) {
  if (!hasSpeech()) return () => {}
  const synth = window.speechSynthesis
  synth.addEventListener("voiceschanged", cb)
  return () => synth.removeEventListener("voiceschanged", cb)
}
const getVoiceCount = () => (hasSpeech() ? window.speechSynthesis.getVoices().length : 0)
const getArabicCount = () => (hasSpeech() ? window.speechSynthesis.getVoices().filter(isArabic).length : 0)
const getServerCount = () => 0

/* ---------- Lesson data ---------- */

const FATHA = "\u064E"
const KASRA = "\u0650"
const DAMMA = "\u064F"
const SUKOON = "\u0652"
const SHADDAH = "\u0651"
const SEAT_A = "\u0623" + FATHA // hamza-on-alif with fatha, carries the starting vowel

const LETTERS: Letter[] = [
  {
    id: "alif", ch: "ا", arName: "ألف", name: "Alif", base: "",
    hint: "Long “aa”, or a seat that carries a vowel",
    how: "Open your mouth and hold a long “aa”, like the a in “father”. On its own, alif only carries a vowel.",
  },
  {
    id: "ba", ch: "ب", arName: "باء", name: "Ba", base: "b",
    hint: "b as in book",
    how: "Press both lips together, then let go: b as in “book”.",
  },
  {
    id: "ta", ch: "ت", arName: "تاء", name: "Ta", base: "t",
    hint: "t as in tea",
    how: "Touch the tip of your tongue behind the upper front teeth and release: a light, clear t as in “tea”.",
  },
  {
    id: "tha", ch: "ث", arName: "ثاء", name: "Tha", base: "th",
    hint: "th as in think",
    how: "Put the tip of your tongue lightly between your teeth and blow out air: th as in “think”.",
  },
  {
    id: "jeem", ch: "ج", arName: "جيم", name: "Jeem", base: "j",
    hint: "j as in jam",
    how: "Lift the middle of your tongue to the roof of your mouth: j as in “jam”.",
  },
  {
    id: "haa", ch: "ح", arName: "حاء", name: "Haa", base: "ḥ",
    hint: "Soft, breathy h from the throat",
    how: "Push a soft, breathy sound from the middle of your throat, with a little squeeze. It is deeper than ه.",
  },
  {
    id: "khaa", ch: "خ", arName: "خاء", name: "Khaa", base: "kh",
    hint: "Rough h, like “loch”",
    how: "Raise the back of your tongue and push air through the top of your throat, like the ch in “loch”.",
  },
  {
    id: "daal", ch: "د", arName: "دال", name: "Daal", base: "d",
    hint: "d as in door",
    how: "Touch the tip of your tongue behind the upper front teeth with your voice on: d as in “door”.",
  },
  {
    id: "dhaal", ch: "ذ", arName: "ذال", name: "Dhaal", base: "dh",
    hint: "th as in this",
    how: "Put the tip of your tongue lightly between your teeth with your voice on: th as in “this”.",
  },
  {
    id: "ra", ch: "ر", arName: "راء", name: "Ra", base: "r",
    hint: "Rolled r",
    how: "Tap the tip of your tongue once against the roof of your mouth: a light rolled r.",
  },
  {
    id: "zay", ch: "ز", arName: "زاي", name: "Zay", base: "z",
    hint: "z as in zoo",
    how: "Keep your teeth close and buzz: z as in “zoo”.",
  },
  {
    id: "seen", ch: "س", arName: "سين", name: "Seen", base: "s",
    hint: "s as in sun",
    how: "Keep your teeth close and hiss: s as in “sun”.",
  },
  {
    id: "sheen", ch: "ش", arName: "شين", name: "Sheen", base: "sh",
    hint: "sh as in ship",
    how: "Spread your tongue flat and push air out: sh as in “ship”.",
  },
  {
    id: "saad", ch: "ص", arName: "صاد", name: "Saad", base: "ṣ",
    hint: "Heavy s, said deep in the mouth",
    how: "A heavy s. Raise the back of your tongue toward the roof of your mouth and say s with a full, deep sound.",
  },
  {
    id: "daad", ch: "ض", arName: "ضاد", name: "Daad", base: "ḍ",
    hint: "Heavy d, said deep in the mouth",
    how: "A heavy d. The side of your tongue presses the upper side teeth and the sound is full and deep. It is the hardest letter for new learners, so learn it with a teacher.",
  },
  {
    id: "taa", ch: "ط", arName: "طاء", name: "Taa", base: "ṭ",
    hint: "Heavy t, said deep in the mouth",
    how: "A heavy t. The tip of your tongue touches behind the upper front teeth, the back of your tongue is raised, and the sound is full and deep.",
  },
  {
    id: "zaa", ch: "ظ", arName: "ظاء", name: "Zaa", base: "ẓ",
    hint: "Heavy th, as in this, but fuller",
    how: "A heavy th, as in “this”. The tip of your tongue is between the teeth, the back is raised, and the sound is full and deep.",
  },
  {
    id: "ayn", ch: "ع", arName: "عين", name: "Ayn", base: "ʿ",
    hint: "Deep sound from the throat",
    how: "Squeeze the middle of your throat and let your voice come through. There is no English sound like it, so listen to a teacher.",
  },
  {
    id: "ghayn", ch: "غ", arName: "غين", name: "Ghayn", base: "gh",
    hint: "Gargled r, like the French r",
    how: "Gargle softly at the top of your throat, like the French r.",
  },
  {
    id: "fa", ch: "ف", arName: "فاء", name: "Fa", base: "f",
    hint: "f as in fish",
    how: "Touch your upper teeth to your lower lip: f as in “fish”.",
  },
  {
    id: "qaaf", ch: "ق", arName: "قاف", name: "Qaaf", base: "q",
    hint: "Deep k from the back of the throat",
    how: "Press the back of your tongue against the soft roof of your mouth, deeper than k, with a full sound.",
  },
  {
    id: "kaaf", ch: "ك", arName: "كاف", name: "Kaaf", base: "k",
    hint: "k as in king",
    how: "Touch the back of your tongue to the roof of your mouth, a little further forward than qaaf: k as in “king”.",
  },
  {
    id: "laam", ch: "ل", arName: "لام", name: "Laam", base: "l",
    hint: "l as in light",
    how: "Touch the tip of your tongue behind the upper front teeth: l as in “light”.",
  },
  {
    id: "meem", ch: "م", arName: "ميم", name: "Meem", base: "m",
    hint: "m as in moon",
    how: "Close your lips and hum through your nose: m as in “moon”.",
  },
  {
    id: "noon", ch: "ن", arName: "نون", name: "Noon", base: "n",
    hint: "n as in noon",
    how: "Touch the tip of your tongue to the gum behind the upper teeth: n as in “noon”.",
  },
  {
    id: "ha", ch: "ه", arName: "هاء", name: "Ha", base: "h",
    hint: "h as in hat",
    how: "A light breath from the bottom of your throat: h as in “hat”.",
  },
  {
    id: "waw", ch: "و", arName: "واو", name: "Waw", base: "w",
    hint: "w as in water",
    how: "Round your lips: w as in “water”.",
  },
  {
    id: "ya", ch: "ي", arName: "ياء", name: "Ya", base: "y",
    hint: "y as in yes",
    how: "Lift the middle of your tongue toward the roof of your mouth: y as in “yes”.",
  },
]

const CONSONANTS = LETTERS.filter((l) => l.id !== "alif")

function build(
  lessonId: LessonId,
  list: Letter[],
  make: (l: Letter) => { forms: string[]; detail: string; how: string; say?: string[] }
): Item[] {
  return list.map((l) => {
    const m = make(l)
    return { id: `${lessonId}:${l.id}`, title: l.name, forms: m.forms, detail: m.detail, how: m.how, say: m.say ?? m.forms }
  })
}

// Adds the letter's own tip after a lesson rule
const withTip = (l: Letter, rule: string) => `${rule} ${l.name}: ${l.how}`

const LESSONS: Lesson[] = [
  {
    id: "letters",
    label: "Letters",
    about:
      "The Arabic alphabet has 28 letters. Arabic is written and read from right to left, and each letter has a name and a sound.",
    items: build("letters", LETTERS, (l) => ({ forms: [l.ch], detail: l.hint, how: l.how, say: [l.arName] })),
  },
  {
    id: "harakat",
    label: "Harakat",
    about:
      "Harakat are small marks above or below a letter that give it a short vowel. Fatha is a small slanted line above, kasra is a small slanted line below, and damma is a small curl above.",
    items: build("harakat", LETTERS, (l) =>
      l.id === "alif"
        ? {
            forms: ["\u0623\u064E", "\u0625\u0650", "\u0623\u064F"],
            detail: "a · i · u",
            how: "Begin each one with a light catch in the throat, then add the vowel. Fatha is “a”, kasra is “i” and damma is “u”.",
          }
        : {
            forms: [l.ch + FATHA, l.ch + KASRA, l.ch + DAMMA],
            detail: `${l.base}a · ${l.base}i · ${l.base}u`,
            how: withTip(
              l,
              "Say the letter quickly with each vowel, in order. Fatha is a short “a” (like the a in “about”), kasra is a short “i” (like “sit”) and damma is a short “u” (like “put”)."
            ),
          }
    ),
  },
  {
    id: "tanween",
    label: "Tanween",
    about:
      "Tanween is a doubled mark at the end of a word: two fathas (an), two kasras (in) or two dammas (un). It adds a light “n” sound.",
    items: build("tanween", LETTERS, (l) =>
      l.id === "alif"
        ? {
            forms: ["\u0623\u064B", "\u0625\u064D", "\u0623\u064C"],
            detail: "an · in · un",
            how: "Begin with a light catch in the throat, say the vowel, then add a light “n” at the end: an, in, un.",
          }
        : {
            forms: [l.ch + "\u064B", l.ch + "\u064D", l.ch + "\u064C"],
            detail: `${l.base}an · ${l.base}in · ${l.base}un`,
            how: withTip(l, "Say the vowel, then add a light “n” at the end: an, in, un. Keep it short and clean."),
          }
    ),
  },
  {
    id: "sukoon",
    label: "Sukoon",
    about: "Sukoon is a small circle above a letter. It tells you the letter has no vowel, so you stop on it.",
    items: build("sukoon", CONSONANTS, (l) => ({
      forms: [SEAT_A + l.ch + SUKOON],
      detail: `a${l.base}`,
      how: withTip(l, `Say “a”, then close on the letter with no vowel after it: a${l.base}. Do not add an extra vowel.`),
    })),
  },
  {
    id: "shaddah",
    label: "Shaddah",
    about: "Shaddah is a small mark above a letter, shaped a little like the letter w. It tells you to double the letter.",
    items: build("shaddah", CONSONANTS, (l) => ({
      forms: [SEAT_A + l.ch + SHADDAH + FATHA],
      detail: `a${l.base}${l.base}a`,
      how: withTip(
        l,
        `Press the letter firmly and hold it for a moment before you release it with the vowel: a${l.base}${l.base}a. A shaddah counts as two of the same letter.`
      ),
    })),
  },
  {
    id: "madd",
    label: "Madd",
    about:
      "Madd means stretching. A fatha before an alif, a kasra before a ya, or a damma before a waw makes a long vowel.",
    items: build("madd", CONSONANTS, (l) => ({
      forms: [l.ch + FATHA + "ا", l.ch + KASRA + "ي", l.ch + DAMMA + "و"],
      detail: `${l.base}aa · ${l.base}ee · ${l.base}oo`,
      how: withTip(
        l,
        `Stretch the vowel for about two counts: ${l.base}aa · ${l.base}ee · ${l.base}oo. Fatha + alif gives “aa”, kasra + ya gives “ee” and damma + waw gives “oo”.`
      ),
    })),
  },
]

const LESSON_BY_ID = Object.fromEntries(LESSONS.map((l) => [l.id, l])) as Record<LessonId, Lesson>
const ALL_IDS = new Set(LESSONS.flatMap((l) => l.items.map((i) => i.id)))
const TOTAL_ITEMS = ALL_IDS.size

/* ---------- Saved progress (localStorage as an external store) ---------- */

type Saved = { lessonId: LessonId; index: number; learned: string[] }

const STORAGE_KEY = "manasik-qaida-v1"
const DEFAULTS: Saved = { lessonId: "letters", index: 0, learned: [] }

const listeners = new Set<() => void>()
let memoryRaw: string | null = null // fallback when storage is blocked, and keeps writes instant

function subscribe(cb: () => void) {
  listeners.add(cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) {
      memoryRaw = null // another tab changed it: read from storage again
      cb()
    }
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener("storage", onStorage)
  }
}

function getSnapshot(): string | null {
  if (memoryRaw !== null) return memoryRaw
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const getServerSnapshot = (): string | null => null

function parse(raw: string | null): Saved {
  if (!raw) return DEFAULTS
  try {
    const s = JSON.parse(raw) as Partial<Saved>
    const lessonId: LessonId = LESSONS.some((l) => l.id === s.lessonId) ? (s.lessonId as LessonId) : DEFAULTS.lessonId
    const len = LESSON_BY_ID[lessonId].items.length
    const index =
      typeof s.index === "number" && Number.isInteger(s.index) && s.index >= 0 && s.index < len ? s.index : 0
    const learned = Array.isArray(s.learned)
      ? Array.from(new Set(s.learned.filter((id): id is string => typeof id === "string" && ALL_IDS.has(id))))
      : []
    return { lessonId, index, learned }
  } catch {
    return DEFAULTS
  }
}

// Always applies the change to the freshest saved state
function update(updater: (s: Saved) => Partial<Saved>) {
  const current = parse(getSnapshot())
  const next: Saved = { ...current, ...updater(current) }
  const raw = JSON.stringify(next)
  memoryRaw = raw
  try {
    window.localStorage.setItem(STORAGE_KEY, raw)
  } catch {
    // private mode or quota: the in-memory copy keeps it working for this session
  }
  listeners.forEach((l) => l())
}

/* ---------- UI helpers ---------- */

const cardShadow =
  "shadow-[inset_0_0_14px_rgba(6,63,58,0.2),0_2px_4px_rgba(6,63,58,0.1),0_12px_26px_rgba(6,63,58,0.18)]"

const chipClass = (active: boolean) => `
  shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors duration-300
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
  ${
    active
      ? "border-deep-teal bg-deep-teal text-white"
      : "border-deep-teal/40 text-deep-teal hover:border-emerald hover:bg-emerald hover:text-white"
  }
`

const secondaryBtn = `
  flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-deep-teal/40 px-2 py-2
  text-xs font-semibold text-deep-teal transition-colors duration-300
  hover:border-emerald hover:bg-emerald hover:text-white
  disabled:pointer-events-none disabled:opacity-50
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
`

const summaryClass = `
  flex cursor-pointer list-none items-center justify-between gap-2 rounded-xl px-3 py-2
  text-xs font-semibold text-deep-teal [&::-webkit-details-marker]:hidden
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
`

export default function NooraniQaida() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const voiceCount = useSyncExternalStore(subscribeVoices, getVoiceCount, getServerCount)
  const arabicCount = useSyncExternalStore(subscribeVoices, getArabicCount, getServerCount)
  const saved = useMemo(() => parse(raw), [raw])
  const { lessonId, index, learned } = saved
  const [revealed, setRevealed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState<AudioError>("")

  // Stop any sound when leaving the page
  useEffect(() => stopAudio, [])

  const lesson = LESSON_BY_ID[lessonId]
  const items = lesson.items
  const item = items[index] ?? items[0]
  const learnedSet = useMemo(() => new Set(learned), [learned])
  const isLearned = learnedSet.has(item.id)
  const lessonLearned = items.filter((i) => learnedSet.has(i.id)).length
  const lessonPct = Math.round((lessonLearned / items.length) * 100)
  const overallPct = Math.round((learned.length / TOTAL_ITEMS) * 100)
  const multi = item.forms.length > 1
  const detailParts = item.detail.split(" · ")
  const hasRecording = AUDIO_LESSONS.includes(lessonId)
  // Voices have loaded and none of them is Arabic: rely on the written tips
  const needsText = !hasRecording && voiceCount > 0 && arabicCount === 0
  const what = lessonId === "letters" ? `${item.title} is letter ${index + 1} of ${items.length}. ${lesson.about}` : lesson.about

  const halt = () => {
    stopAudio()
    setPlaying(false)
    setAudioError("")
  }

  const play = () => {
    stopAudio()
    setAudioError("")

    if (hasRecording) {
      // Teacher recording
      const audio = new Audio(audioSrc(item.id))
      currentAudio = audio

      const fail = () => {
        if (currentAudio !== audio) return
        currentAudio = null
        setPlaying(false)
        setAudioError("missing")
      }

      audio.onended = () => {
        if (currentAudio !== audio) return
        currentAudio = null
        setPlaying(false)
      }
      audio.onerror = fail

      setPlaying(true)
      audio.play().catch(fail)
      return
    }

    // Computer voice (uses the device's own Arabic voice)
    if (!hasSpeech()) {
      setAudioError("novoice")
      return
    }
    if (voiceCount === 0) {
      setAudioError("loading")
      return
    }
    const voice = findArabicVoice()
    if (!voice) {
      setAudioError("novoice")
      return
    }

    const token = speechToken
    const synth = window.speechSynthesis
    item.say.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text)
      u.voice = voice
      u.lang = voice.lang
      u.rate = 0.75
      const last = i === item.say.length - 1
      u.onend = () => {
        if (last && speechToken === token) setPlaying(false)
      }
      u.onerror = (e) => {
        if (speechToken !== token) return
        if (e.error === "canceled" || e.error === "interrupted") return
        setPlaying(false)
        setAudioError("voicefail")
      }
      synth.speak(u)
    })
    setPlaying(true)
  }

  const go = (i: number) => {
    halt()
    setRevealed(false)
    update(() => ({ index: i }))
  }
  const next = () => go((index + 1) % items.length)
  const prev = () => go((index - 1 + items.length) % items.length)
  const random = () => {
    if (items.length < 2) return
    let i = index
    while (i === index) i = Math.floor(Math.random() * items.length)
    go(i)
  }

  const chooseLesson = (id: LessonId) => {
    halt()
    setRevealed(false)
    update(() => ({ lessonId: id, index: 0 }))
  }

  const toggleLearned = () =>
    update((s) => {
      const set = new Set(s.learned)
      if (set.has(item.id)) set.delete(item.id)
      else set.add(item.id)
      return { learned: Array.from(set) }
    })

  const resetLesson = () =>
    update((s) => ({ learned: s.learned.filter((id) => !id.startsWith(`${lessonId}:`)) }))

  const resetAll = () => {
    halt()
    setRevealed(false)
    update(() => ({ lessonId: "letters", index: 0, learned: [] }))
  }

  const hint = revealed
    ? isLearned
      ? "Marked as learned. Move on to the next one."
      : "Did you say it right? Tap Learned when you are confident."
    : "Say it out loud, then tap Show sound to check."

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      {/* Practice (hero) */}
      <section className={`rounded-2xl border-[1.5px] border-deep-teal/60 bg-card px-3 py-4 sm:px-6 sm:py-6 ${cardShadow}`}>
        <div
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Choose lesson"
        >
          {LESSONS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => chooseLesson(l.id)}
              aria-pressed={l.id === lessonId}
              className={chipClass(l.id === lessonId)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-3 w-full max-w-[340px] sm:max-w-[440px] xl:max-w-[500px]">
          {/* Flashcard */}
          <div
            className={`
              relative flex min-h-[200px] flex-col items-center justify-center rounded-3xl border-[1.5px] bg-warm-white
              px-4 pb-3 pt-9 transition-colors duration-300 sm:min-h-[240px]
              ${isLearned ? "border-emerald" : "border-deep-teal/60"} ${cardShadow}
            `}
          >
            <span className="absolute left-3 top-3 rounded-full border border-deep-teal/20 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-deep-teal">
              {index + 1} / {items.length}
            </span>
            {isLearned && (
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald/10 px-2.5 py-1 text-[11px] font-semibold text-emerald">
                <Check className="h-3 w-3" aria-hidden="true" />
                Learned
              </span>
            )}

            <div
              className={`flex flex-row-reverse flex-wrap items-center justify-center font-serif leading-[1.6] text-deep-teal ${
                multi
                  ? "gap-x-5 text-4xl sm:gap-x-7 sm:text-5xl xl:text-6xl"
                  : "text-[72px] sm:text-[96px] xl:text-[104px]"
              }`}
            >
              {item.forms.map((f) => (
                <span key={f} lang="ar" dir="rtl">
                  {f}
                </span>
              ))}
            </div>

            <div className="mt-1 min-h-[2.5rem] text-center" aria-live="polite">
              {revealed ? (
                <>
                  <p className="text-sm font-semibold text-deep-teal">{item.title}</p>
                  {multi ? (
                    <p className="flex flex-row-reverse justify-center gap-x-5 text-xs text-muted-teal">
                      {detailParts.map((p) => (
                        <span key={p}>{p}</span>
                      ))}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-teal">{item.detail}</p>
                  )}
                </>
              ) : (
                <p className="text-xs text-muted-teal/70">Sound hidden</p>
              )}
            </div>
          </div>

          <p
            aria-live="polite"
            className={`mt-3 text-center text-[11px] leading-relaxed ${
              revealed && isLearned ? "font-semibold text-emerald" : "text-muted-teal"
            }`}
          >
            {hint}
          </p>

          {/* Controls */}
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={prev} className={secondaryBtn}>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </button>
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              aria-pressed={revealed}
              className="
                flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald px-2 py-2
                text-xs font-semibold text-white transition-colors duration-300 hover:bg-deep-teal
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
              "
            >
              {revealed ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
              {revealed ? "Hide sound" : "Show sound"}
            </button>
            <button type="button" onClick={next} className={secondaryBtn}>
              Next
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={play}
              disabled={needsText}
              aria-label={`Listen to ${item.title}${hasRecording ? "" : " (computer voice)"}`}
              className={secondaryBtn}
            >
              <Volume2
                className={`h-4 w-4 ${playing ? "animate-pulse motion-reduce:animate-none" : ""}`}
                aria-hidden="true"
              />
              {playing ? "Playing…" : "Listen"}
            </button>
            <button
              type="button"
              onClick={toggleLearned}
              aria-pressed={isLearned}
              aria-label={isLearned ? "Marked as learned" : "Mark as learned"}
              className={`
                flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-2 py-2
                text-xs font-semibold transition-colors duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
                ${
                  isLearned
                    ? "border-emerald bg-emerald/10 text-emerald"
                    : "border-deep-teal/40 text-deep-teal hover:border-emerald hover:bg-emerald hover:text-white"
                }
              `}
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              Learned
            </button>
            <button type="button" onClick={random} disabled={items.length < 2} className={secondaryBtn}>
              <Shuffle className="h-4 w-4" aria-hidden="true" />
              Random
            </button>
          </div>

          {!hasRecording && (
            <p className="mt-2 text-center text-[11px] leading-relaxed text-muted-teal/80">
              {needsText
                ? "No Arabic voice on this device. Use the tips in “How to say it” below."
                : "Computer voice, may not be exact. Confirm with a teacher."}
            </p>
          )}
          {audioError && (
            <p role="status" className="mt-1 text-center text-[11px] leading-relaxed text-muted-teal">
              {AUDIO_MESSAGES[audioError]}
            </p>
          )}

          {/* English explanation */}
          <details open={needsText} className="group mt-3 rounded-xl border border-deep-teal/20 bg-deep-teal/5">
            <summary className={summaryClass}>
              How to say it
              <ChevronDown
                className="h-4 w-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </summary>
            <div className="space-y-2 px-3 pb-3 text-xs leading-relaxed text-muted-teal">
              <p>
                <span className="font-semibold text-deep-teal">What it is: </span>
                {what}
              </p>
              <p>
                <span className="font-semibold text-deep-teal">How to say it: </span>
                {item.how}
              </p>
              <p className="text-[11px] italic text-muted-teal/80">
                Written tips only help a little. A teacher is best for correct pronunciation.
              </p>
            </div>
          </details>

          {/* Jump to an item */}
          <details className="group mt-2 rounded-xl border border-deep-teal/20">
            <summary className={summaryClass}>
              Jump to an item ({items.length})
              <ChevronDown
                className="h-4 w-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </summary>
            <div className="grid grid-cols-5 gap-2 px-3 pb-3 sm:grid-cols-7">
              {items.map((it, i) => {
                const done = learnedSet.has(it.id)
                const active = i === index
                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`${it.title}${done ? ", learned" : ""}`}
                    aria-current={active ? "true" : undefined}
                    className={`
                      flex aspect-square items-center justify-center rounded-xl border font-serif text-xl leading-normal
                      transition-colors duration-300
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/50
                      ${
                        active
                          ? "border-deep-teal bg-deep-teal text-white"
                          : done
                            ? "border-emerald/50 bg-emerald/10 text-deep-teal hover:border-emerald"
                            : "border-deep-teal/30 text-deep-teal hover:border-emerald hover:bg-emerald hover:text-white"
                      }
                    `}
                  >
                    <span lang="ar" dir="rtl">
                      {it.forms[0]}
                    </span>
                  </button>
                )
              })}
            </div>
          </details>
        </div>
      </section>

      {/* Side column: progress */}
      <aside
        aria-live="polite"
        className="
          rounded-2xl border-[1.5px] border-deep-teal bg-deep-teal p-4 text-white sm:p-6
          shadow-[0_4px_8px_rgba(6,63,58,0.2),0_18px_34px_rgba(6,63,58,0.28)]
          lg:sticky lg:top-24
        "
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">{lesson.label} progress</p>
        <p className="mt-1 font-serif text-[34px] font-medium leading-tight text-gold sm:text-[38px]">
          {lessonLearned} / {items.length}
        </p>
        <p className="mt-1 text-xs text-white/80">Learned in this lesson</p>

        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-white/15"
          role="progressbar"
          aria-label="Lesson progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={lessonPct}
        >
          <div className="h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${lessonPct}%` }} />
        </div>

        <dl className="mt-4 space-y-2 border-t border-white/15 pt-3 text-xs">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Current item</dt>
            <dd className="font-semibold">
              {index + 1} of {items.length}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">This lesson</dt>
            <dd className="font-semibold">{lessonPct}%</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">All lessons learned</dt>
            <dd className="font-semibold">
              {learned.length} / {TOTAL_ITEMS}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-white/70">Overall</dt>
            <dd className="font-semibold">{overallPct}%</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={resetLesson}
            disabled={lessonLearned === 0}
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl border border-white/30 px-3.5 py-2
              text-xs font-semibold text-white
              transition-colors duration-300 hover:bg-white/10
              disabled:pointer-events-none disabled:opacity-50
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
            "
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset this lesson
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl border border-white/30 px-3.5 py-2
              text-xs font-semibold text-white
              transition-colors duration-300 hover:bg-white/10
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60
            "
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset everything
          </button>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-white/60">
          Your progress is saved on this device only and is never sent anywhere. This is a practice aid. Please learn
          to read the Quran with a qualified teacher who can correct your pronunciation.
        </p>
      </aside>
    </div>
  )
}