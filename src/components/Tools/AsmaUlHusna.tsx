// components/Tools/AsmaUlHusna.tsx
"use client"

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import {
  BookmarkCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  RotateCcw,
  Search,
} from "lucide-react"

type Name = {
  number: number
  arabic: string
  transliteration: string
  meaning: string
  explanation: string
}

type SavedState = {
  favorites: number[]
  memorized: number[]
}

type Filter = "all" | "favorites" | "memorized"

const STORAGE_KEY = "manasik-asma-ul-husna-v1"

const NAMES: Name[] = [
  { number: 1, arabic: "الرَّحْمَنُ", transliteration: "Ar-Rahman", meaning: "The Most Compassionate", explanation: "Allah's mercy encompasses all creation, and His compassion is limitless." },
  { number: 2, arabic: "الرَّحِيمُ", transliteration: "Ar-Raheem", meaning: "The Most Merciful", explanation: "Allah continually bestows mercy upon His creation and grants special mercy to the believers." },
  { number: 3, arabic: "الْمَلِكُ", transliteration: "Al-Malik", meaning: "The King", explanation: "Allah is the true Sovereign, whose authority and dominion encompass everything." },
  { number: 4, arabic: "الْقُدُّوسُ", transliteration: "Al-Quddus", meaning: "The Most Holy", explanation: "Allah is perfectly pure and free from every imperfection." },
  { number: 5, arabic: "السَّلَامُ", transliteration: "As-Salam", meaning: "The Source of Peace", explanation: "Allah is free from all imperfection and is the source of peace and security." },
  { number: 6, arabic: "الْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "The Giver of Security", explanation: "Allah grants security and confirms His truth through His signs and guidance." },
  { number: 7, arabic: "الْمُهَيْمِنُ", transliteration: "Al-Muhaymin", meaning: "The Guardian", explanation: "Allah watches over, protects, and oversees all things." },
  { number: 8, arabic: "الْعَزِيزُ", transliteration: "Al-Aziz", meaning: "The Almighty", explanation: "Allah possesses absolute might and honor and can never be overcome." },
  { number: 9, arabic: "الْجَبَّارُ", transliteration: "Al-Jabbar", meaning: "The Compeller", explanation: "Allah's will prevails, and He restores and supports His creation as He wills." },
  { number: 10, arabic: "الْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", meaning: "The Supremely Great", explanation: "True greatness and majesty belong entirely to Allah." },
  { number: 11, arabic: "الْخَالِقُ", transliteration: "Al-Khaliq", meaning: "The Creator", explanation: "Allah creates everything with perfect knowledge and wisdom." },
  { number: 12, arabic: "الْبَارِئُ", transliteration: "Al-Bari", meaning: "The Originator", explanation: "Allah brings creation into existence in the form and order He wills." },
  { number: 13, arabic: "الْمُصَوِّرُ", transliteration: "Al-Musawwir", meaning: "The Fashioner", explanation: "Allah gives each created thing its distinctive form and characteristics." },
  { number: 14, arabic: "الْغَفَّارُ", transliteration: "Al-Ghaffar", meaning: "The Constant Forgiver", explanation: "Allah repeatedly forgives those who sincerely turn to Him." },
  { number: 15, arabic: "الْقَهَّارُ", transliteration: "Al-Qahhar", meaning: "The All-Prevailing", explanation: "Allah has complete power over all creation; nothing can resist His authority." },
  { number: 16, arabic: "الْوَهَّابُ", transliteration: "Al-Wahhab", meaning: "The Bestower", explanation: "Allah gives generously and grants blessings without needing anything in return." },
  { number: 17, arabic: "الرَّزَّاقُ", transliteration: "Ar-Razzaq", meaning: "The Provider", explanation: "Allah provides sustenance for all creation according to His wisdom." },
  { number: 18, arabic: "الْفَتَّاحُ", transliteration: "Al-Fattah", meaning: "The Opener", explanation: "Allah opens the doors of mercy, provision, understanding, and judgment." },
  { number: 19, arabic: "الْعَلِيمُ", transliteration: "Al-Alim", meaning: "The All-Knowing", explanation: "Allah knows everything, whether apparent or hidden, past, present, or future." },
  { number: 20, arabic: "الْقَابِضُ", transliteration: "Al-Qabid", meaning: "The Withholder", explanation: "Allah constricts provision or circumstances according to His perfect wisdom." },
  { number: 21, arabic: "الْبَاسِطُ", transliteration: "Al-Basit", meaning: "The Expander", explanation: "Allah expands provision, mercy, and opportunities as He wills." },
  { number: 22, arabic: "الْخَافِضُ", transliteration: "Al-Khafid", meaning: "The One Who Lowers", explanation: "Allah lowers whom He wills in accordance with His justice and wisdom." },
  { number: 23, arabic: "الرَّافِعُ", transliteration: "Ar-Rafi", meaning: "The One Who Raises", explanation: "Allah raises in rank those whom He wills through His wisdom and grace." },
  { number: 24, arabic: "الْمُعِزُّ", transliteration: "Al-Mu'izz", meaning: "The Giver of Honor", explanation: "Allah grants honor, strength, and dignity to whom He wills." },
  { number: 25, arabic: "الْمُذِلُّ", transliteration: "Al-Mudhill", meaning: "The One Who Humbles", explanation: "Allah alone determines true honor and humiliation in accordance with His justice." },
  { number: 26, arabic: "السَّمِيعُ", transliteration: "As-Sami", meaning: "The All-Hearing", explanation: "Allah hears every sound, prayer, and whisper without limitation." },
  { number: 27, arabic: "الْبَصِيرُ", transliteration: "Al-Basir", meaning: "The All-Seeing", explanation: "Nothing is hidden from Allah's sight, wherever it may be." },
  { number: 28, arabic: "الْحَكَمُ", transliteration: "Al-Hakam", meaning: "The Judge", explanation: "Allah judges with perfect justice, truth, and wisdom." },
  { number: 29, arabic: "الْعَدْلُ", transliteration: "Al-Adl", meaning: "The Utterly Just", explanation: "Allah is perfectly just and never wrongs anyone." },
  { number: 30, arabic: "اللَّطِيفُ", transliteration: "Al-Latif", meaning: "The Most Subtle and Kind", explanation: "Allah knows the finest details and shows kindness in ways we may not notice." },
  { number: 31, arabic: "الْخَبِيرُ", transliteration: "Al-Khabir", meaning: "The All-Aware", explanation: "Allah knows the inner reality of all things and every hidden detail." },
  { number: 32, arabic: "الْحَلِيمُ", transliteration: "Al-Halim", meaning: "The Most Forbearing", explanation: "Allah does not hasten punishment and gives people time to repent." },
  { number: 33, arabic: "الْعَظِيمُ", transliteration: "Al-Azim", meaning: "The Magnificent", explanation: "Allah's greatness is beyond human comprehension." },
  { number: 34, arabic: "الْغَفُورُ", transliteration: "Al-Ghafur", meaning: "The All-Forgiving", explanation: "Allah forgives sins through His mercy when people sincerely seek His forgiveness." },
  { number: 35, arabic: "الشَّكُورُ", transliteration: "Ash-Shakur", meaning: "The Most Appreciative", explanation: "Allah greatly rewards sincere deeds, even when they appear small." },
  { number: 36, arabic: "الْعَلِيُّ", transliteration: "Al-Aliyy", meaning: "The Most High", explanation: "Allah is exalted above all creation in a manner befitting His majesty." },
  { number: 37, arabic: "الْكَبِيرُ", transliteration: "Al-Kabir", meaning: "The Most Great", explanation: "Allah's greatness surpasses everything in existence." },
  { number: 38, arabic: "الْحَفِيظُ", transliteration: "Al-Hafiz", meaning: "The Preserver", explanation: "Allah protects and preserves all things according to His will." },
  { number: 39, arabic: "الْمُقِيتُ", transliteration: "Al-Muqit", meaning: "The Sustainer", explanation: "Allah provides and maintains what His creation needs." },
  { number: 40, arabic: "الْحَسِيبُ", transliteration: "Al-Hasib", meaning: "The Reckoner", explanation: "Allah is sufficient for His servants and accurately accounts for all deeds." },
  { number: 41, arabic: "الْجَلِيلُ", transliteration: "Al-Jalil", meaning: "The Majestic", explanation: "Allah possesses supreme majesty, honor, and greatness." },
  { number: 42, arabic: "الْكَرِيمُ", transliteration: "Al-Karim", meaning: "The Most Generous", explanation: "Allah is abundantly generous, noble, and gracious to His creation." },
  { number: 43, arabic: "الرَّقِيبُ", transliteration: "Ar-Raqib", meaning: "The Ever-Watchful", explanation: "Allah continually observes everything and nothing escapes His knowledge." },
  { number: 44, arabic: "الْمُجِيبُ", transliteration: "Al-Mujib", meaning: "The Responsive One", explanation: "Allah responds to supplications according to His wisdom and mercy." },
  { number: 45, arabic: "الْوَاسِعُ", transliteration: "Al-Wasi", meaning: "The All-Encompassing", explanation: "Allah's knowledge, mercy, and generosity are vast beyond measure." },
  { number: 46, arabic: "الْحَكِيمُ", transliteration: "Al-Hakim", meaning: "The All-Wise", explanation: "Everything Allah decrees and creates reflects His perfect wisdom." },
  { number: 47, arabic: "الْوَدُودُ", transliteration: "Al-Wadud", meaning: "The Most Loving", explanation: "Allah loves His righteous servants and is the source of true love." },
  { number: 48, arabic: "الْمَجِيدُ", transliteration: "Al-Majid", meaning: "The Most Glorious", explanation: "Allah possesses perfect glory, nobility, and honor." },
  { number: 49, arabic: "الْبَاعِثُ", transliteration: "Al-Ba'ith", meaning: "The Resurrector", explanation: "Allah will raise the dead for the Resurrection and final judgment." },
  { number: 50, arabic: "الشَّهِيدُ", transliteration: "Ash-Shahid", meaning: "The All-Witnessing", explanation: "Allah witnesses everything and is never absent from any event." },
  { number: 51, arabic: "الْحَقُّ", transliteration: "Al-Haqq", meaning: "The Absolute Truth", explanation: "Allah is the ultimate reality, and His words and promises are true." },
  { number: 52, arabic: "الْوَكِيلُ", transliteration: "Al-Wakil", meaning: "The Trustee", explanation: "Allah is the perfect One to rely upon and entrust all affairs to." },
  { number: 53, arabic: "الْقَوِيُّ", transliteration: "Al-Qawiyy", meaning: "The All-Strong", explanation: "Allah possesses complete strength and power without weakness." },
  { number: 54, arabic: "الْمَتِينُ", transliteration: "Al-Matin", meaning: "The Firm", explanation: "Allah's strength is absolute, unwavering, and never diminished." },
  { number: 55, arabic: "الْوَلِيُّ", transliteration: "Al-Waliyy", meaning: "The Protecting Friend", explanation: "Allah supports and protects His believing servants." },
  { number: 56, arabic: "الْحَمِيدُ", transliteration: "Al-Hamid", meaning: "The Praiseworthy", explanation: "Allah deserves all praise for His perfection, mercy, and deeds." },
  { number: 57, arabic: "الْمُحْصِي", transliteration: "Al-Muhsi", meaning: "The All-Enumerating", explanation: "Allah knows and counts everything with complete precision." },
  { number: 58, arabic: "الْمُبْدِئُ", transliteration: "Al-Mubdi", meaning: "The Initiator", explanation: "Allah originates creation without any prior example or model." },
  { number: 59, arabic: "الْمُعِيدُ", transliteration: "Al-Mu'id", meaning: "The Restorer", explanation: "Allah will restore creation after death and bring it back as He wills." },
  { number: 60, arabic: "الْمُحْيِي", transliteration: "Al-Muhyi", meaning: "The Giver of Life", explanation: "Allah gives life to creation and brings life from what appears lifeless." },
  { number: 61, arabic: "الْمُمِيتُ", transliteration: "Al-Mumit", meaning: "The Bringer of Death", explanation: "Allah determines death and the end of every creature's appointed life." },
  { number: 62, arabic: "الْحَيُّ", transliteration: "Al-Hayy", meaning: "The Ever-Living", explanation: "Allah possesses perfect, everlasting life that is never affected by death." },
  { number: 63, arabic: "الْقَيُّومُ", transliteration: "Al-Qayyum", meaning: "The Self-Subsisting Sustainer", explanation: "Allah depends on nothing, while everything depends on Him." },
  { number: 64, arabic: "الْوَاجِدُ", transliteration: "Al-Wajid", meaning: "The Finder", explanation: "Nothing is beyond Allah's reach or knowledge, and He lacks nothing." },
  { number: 65, arabic: "الْمَاجِدُ", transliteration: "Al-Maajid", meaning: "The Noble and Glorious", explanation: "Allah possesses perfect nobility, honor, and abundant generosity." },
  { number: 66, arabic: "الْوَاحِدُ", transliteration: "Al-Wahid", meaning: "The One", explanation: "Allah is one without partner, rival, or equal in His divinity." },
  { number: 67, arabic: "الْأَحَدُ", transliteration: "Al-Ahad", meaning: "The Unique One", explanation: "Allah is uniquely one and incomparable in His essence and attributes." },
  { number: 68, arabic: "الصَّمَدُ", transliteration: "As-Samad", meaning: "The Eternal Refuge", explanation: "All creation turns to Allah in need, while He needs nothing." },
  { number: 69, arabic: "الْقَادِرُ", transliteration: "Al-Qadir", meaning: "The All-Powerful", explanation: "Allah has power over everything and nothing can prevent His will." },
  { number: 70, arabic: "الْمُقْتَدِرُ", transliteration: "Al-Muqtadir", meaning: "The All-Determining", explanation: "Allah exercises absolute power and determines all affairs perfectly." },
  { number: 71, arabic: "الْمُقَدِّمُ", transliteration: "Al-Muqaddim", meaning: "The One Who Brings Forward", explanation: "Allah advances whom or what He wills according to His wisdom." },
  { number: 72, arabic: "الْمُؤَخِّرُ", transliteration: "Al-Mu'akhkhir", meaning: "The One Who Delays", explanation: "Allah delays whom or what He wills for reasons known to His wisdom." },
  { number: 73, arabic: "الْأَوَّلُ", transliteration: "Al-Awwal", meaning: "The First", explanation: "Allah existed before everything; nothing preceded Him." },
  { number: 74, arabic: "الْآخِرُ", transliteration: "Al-Akhir", meaning: "The Last", explanation: "Allah remains after all creation passes away; nothing outlasts Him." },
  { number: 75, arabic: "الظَّاهِرُ", transliteration: "Az-Zahir", meaning: "The Manifest", explanation: "Allah's supremacy is evident through His signs and absolute authority." },
  { number: 76, arabic: "الْبَاطِنُ", transliteration: "Al-Batin", meaning: "The Hidden", explanation: "Allah is beyond the reach of creation's senses, yet nothing is hidden from Him." },
  { number: 77, arabic: "الْوَالِي", transliteration: "Al-Wali", meaning: "The Governor", explanation: "Allah governs and directs all affairs throughout creation." },
  { number: 78, arabic: "الْمُتَعَالِي", transliteration: "Al-Muta'ali", meaning: "The Most Exalted", explanation: "Allah is exalted far above every limitation and imperfection." },
  { number: 79, arabic: "الْبَرُّ", transliteration: "Al-Barr", meaning: "The Source of Goodness", explanation: "Allah is abundantly kind and gracious to His servants." },
  { number: 80, arabic: "التَّوَّابُ", transliteration: "At-Tawwab", meaning: "The Accepter of Repentance", explanation: "Allah welcomes sincere repentance and repeatedly grants the opportunity to return to Him." },
  { number: 81, arabic: "الْمُنْتَقِمُ", transliteration: "Al-Muntaqim", meaning: "The Just Retributor", explanation: "Allah administers justice against persistent wrongdoing according to His wisdom." },
  { number: 82, arabic: "الْعَفُوُّ", transliteration: "Al-Afuww", meaning: "The Pardoner", explanation: "Allah erases sins and pardons those who turn to Him." },
  { number: 83, arabic: "الرَّؤُوفُ", transliteration: "Ar-Ra'uf", meaning: "The Most Kind", explanation: "Allah shows profound gentleness and compassion toward His servants." },
  { number: 84, arabic: "مَالِكُ الْمُلْكِ", transliteration: "Malik-ul-Mulk", meaning: "Owner of All Sovereignty", explanation: "All dominion belongs to Allah, and He grants authority as He wills." },
  { number: 85, arabic: "ذُو الْجَلَالِ وَالْإِكْرَامِ", transliteration: "Dhul-Jalali wal-Ikram", meaning: "Lord of Majesty and Honor", explanation: "Allah alone possesses supreme majesty and boundless generosity." },
  { number: 86, arabic: "الْمُقْسِطُ", transliteration: "Al-Muqsit", meaning: "The Equitable", explanation: "Allah establishes justice and gives everyone their due." },
  { number: 87, arabic: "الْجَامِعُ", transliteration: "Al-Jami", meaning: "The Gatherer", explanation: "Allah gathers creation together for the Day of Judgment." },
  { number: 88, arabic: "الْغَنِيُّ", transliteration: "Al-Ghaniyy", meaning: "The Self-Sufficient", explanation: "Allah is completely free of need, while all creation depends upon Him." },
  { number: 89, arabic: "الْمُغْنِي", transliteration: "Al-Mughni", meaning: "The Enricher", explanation: "Allah grants sufficiency and enriches whom He wills." },
  { number: 90, arabic: "الْمَانِعُ", transliteration: "Al-Mani", meaning: "The Withholder", explanation: "Allah may withhold things according to His perfect wisdom and protection." },
  { number: 91, arabic: "الضَّارُّ", transliteration: "Ad-Darr", meaning: "The One Who Allows Adversity", explanation: "Nothing occurs outside Allah's will; hardship may carry wisdom beyond our understanding." },
  { number: 92, arabic: "النَّافِعُ", transliteration: "An-Nafi", meaning: "The Bestower of Benefit", explanation: "All true benefit ultimately occurs by Allah's permission." },
  { number: 93, arabic: "النُّورُ", transliteration: "An-Nur", meaning: "The Light", explanation: "Allah is the Light of the heavens and the earth and guides whom He wills." },
  { number: 94, arabic: "الْهَادِي", transliteration: "Al-Hadi", meaning: "The Guide", explanation: "Allah guides His creation to truth and the straight path." },
  { number: 95, arabic: "الْبَدِيعُ", transliteration: "Al-Badi", meaning: "The Incomparable Originator", explanation: "Allah originates creation in a way without precedent or example." },
  { number: 96, arabic: "الْبَاقِي", transliteration: "Al-Baqi", meaning: "The Everlasting", explanation: "Allah alone remains forever; all created things are temporary." },
  { number: 97, arabic: "الْوَارِثُ", transliteration: "Al-Warith", meaning: "The Inheritor", explanation: "All creation ultimately returns to Allah, whose dominion never ends." },
  { number: 98, arabic: "الرَّشِيدُ", transliteration: "Ar-Rashid", meaning: "The Guide to the Right Way", explanation: "Allah directs all affairs with perfect wisdom and right guidance." },
  { number: 99, arabic: "الصَّبُورُ", transliteration: "As-Sabur", meaning: "The Most Patient", explanation: "Allah does not hasten punishment and deals with His creation according to perfect wisdom." },
]

const DEFAULT_SAVED: SavedState = {
  favorites: [],
  memorized: [],
}

function readSaved(): SavedState {
  if (typeof window === "undefined") return DEFAULT_SAVED

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SAVED

    const parsed = JSON.parse(raw) as Partial<SavedState>

    return {
      favorites: Array.isArray(parsed.favorites)
        ? parsed.favorites.filter(
            (n) => Number.isInteger(n) && n >= 1 && n <= 99,
          )
        : [],
      memorized: Array.isArray(parsed.memorized)
        ? parsed.memorized.filter(
            (n) => Number.isInteger(n) && n >= 1 && n <= 99,
          )
        : [],
    }
  } catch {
    return DEFAULT_SAVED
  }
}

let savedSnapshot: SavedState | null = null
const savedListeners = new Set<() => void>()

function getSavedSnapshot(): SavedState {
  if (typeof window === "undefined") return DEFAULT_SAVED
  if (savedSnapshot === null) savedSnapshot = readSaved()
  return savedSnapshot
}

function getServerSavedSnapshot(): SavedState {
  return DEFAULT_SAVED
}

function subscribeSaved(listener: () => void) {
  savedListeners.add(listener)

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY || event.key === null) {
      savedSnapshot = readSaved()
      savedListeners.forEach((notify) => notify())
    }
  }

  window.addEventListener("storage", handleStorage)

  return () => {
    savedListeners.delete(listener)
    window.removeEventListener("storage", handleStorage)
  }
}

function updateSavedSnapshot(next: SavedState) {
  savedSnapshot = next

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Keep the tool usable if local storage is unavailable.
  }

  savedListeners.forEach((notify) => notify())
}

export default function AsmaUlHusna() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<Filter>("all")
  const [selectedNumber, setSelectedNumber] = useState(1)

  const saved = useSyncExternalStore(
    subscribeSaved,
    getSavedSnapshot,
    getServerSavedSnapshot,
  )

  const filteredNames = useMemo(() => {
    const query = search.trim().toLowerCase()

    return NAMES.filter((name) => {
      const matchesSearch =
        !query ||
        name.transliteration.toLowerCase().includes(query) ||
        name.meaning.toLowerCase().includes(query) ||
        name.arabic.includes(query) ||
        String(name.number).includes(query)

      const matchesFilter =
        filter === "all" ||
        (filter === "favorites" && saved.favorites.includes(name.number)) ||
        (filter === "memorized" && saved.memorized.includes(name.number))

      return matchesSearch && matchesFilter
    })
  }, [search, filter, saved])

  const current =
    filteredNames.find((name) => name.number === selectedNumber) ??
    filteredNames[0]

  const activeIndex = current
    ? filteredNames.findIndex((name) => name.number === current.number)
    : 0

  useEffect(() => {
    if (filteredNames.length < 2) return

    const timer = window.setInterval(() => {
      setSelectedNumber((previousNumber) => {
        const index = filteredNames.findIndex(
          (name) => name.number === previousNumber,
        )
        const nextIndex = index < 0 ? 0 : (index + 1) % filteredNames.length
        return filteredNames[nextIndex].number
      })
    }, 3000)

    return () => window.clearInterval(timer)
  }, [filteredNames, selectedNumber])

  const isFavorite = current
    ? saved.favorites.includes(current.number)
    : false

  const isMemorized = current
    ? saved.memorized.includes(current.number)
    : false

  const toggleNumber = (key: keyof SavedState, number: number) => {
    const values = saved[key]

    const updated = values.includes(number)
      ? values.filter((item) => item !== number)
      : [...values, number].sort((a, b) => a - b)

    updateSavedSnapshot({
      ...saved,
      [key]: updated,
    })
  }

  const goTo = (direction: -1 | 1) => {
    if (!filteredNames.length) return

    const nextIndex = Math.min(
      filteredNames.length - 1,
      Math.max(0, activeIndex + direction),
    )

    setSelectedNumber(filteredNames[nextIndex].number)
  }

  const progress = (saved.memorized.length / 99) * 100

  return (
    <div className="space-y-5">
      {current ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="overflow-hidden rounded-2xl border border-deep-teal/15 bg-card shadow-[0_8px_28px_rgba(6,63,58,0.07)]">
            <div className="px-5 py-5 sm:px-8 sm:py-6">
              <p
                lang="ar"
                dir="rtl"
                className="text-center font-serif text-lg leading-relaxed text-gold"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>

              <p className="mt-0.5 text-center text-[11px] leading-5 text-muted-teal">
                In the name of Allah, the Most Compassionate, the Most Merciful
              </p>

              <div className="mx-auto my-4 h-px max-w-20 bg-gold/35" />

              <div
                key={current.number}
                className="asma-name-transition text-center"
                aria-live="polite"
                aria-atomic="true"
              >
                <p className="text-[11px] tracking-[0.16em] text-muted-teal">
                  NAME {String(current.number).padStart(2, "0")} OF 99
                </p>

                <p
                  lang="ar"
                  dir="rtl"
                  className="mt-3 font-serif text-4xl leading-relaxed text-deep-teal sm:text-5xl"
                >
                  {current.arabic}
                </p>

                <h3 className="mt-2 font-heading text-xl font-medium text-deep-teal sm:text-2xl">
                  {current.transliteration}
                </h3>

                <p className="mt-1 text-base text-emerald sm:text-lg">
                  {current.meaning}
                </p>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-teal">
                  {current.explanation}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleNumber("favorites", current.number)}
                  aria-pressed={isFavorite}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition sm:text-sm ${
                    isFavorite
                      ? "border-gold bg-gold/10 text-deep-teal"
                      : "border-deep-teal/20 text-deep-teal hover:border-emerald hover:bg-emerald/5"
                  }`}
                >
                  <Heart
                    size={15}
                    className={isFavorite ? "fill-gold text-gold" : ""}
                  />
                  {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
                </button>

                <button
                  type="button"
                  onClick={() => toggleNumber("memorized", current.number)}
                  aria-pressed={isMemorized}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition sm:text-sm ${
                    isMemorized
                      ? "border-emerald bg-emerald/10 text-emerald"
                      : "border-deep-teal/20 text-deep-teal hover:border-emerald hover:bg-emerald/5"
                  }`}
                >
                  <Check size={15} />
                  {isMemorized ? "Memorized" : "Mark as Memorized"}
                </button>
              </div>

              <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => goTo(-1)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-deep-teal/20 px-4 py-2.5 text-sm font-normal text-deep-teal transition-colors hover:border-emerald hover:bg-emerald/5 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft size={16} strokeWidth={1.7} />
                  Previous
                </button>

                <button
                  type="button"
                  disabled={activeIndex === filteredNames.length - 1}
                  onClick={() => goTo(1)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-deep-teal px-4 py-2.5 text-sm font-normal text-white transition-colors hover:bg-emerald disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Next
                  <ChevronRight size={16} strokeWidth={1.7} />
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-2xl border-[1.5px] border-deep-teal bg-deep-teal p-5 text-white shadow-[0_8px_24px_rgba(6,63,58,0.18)] sm:p-6 lg:sticky lg:top-24">
              <h3 className="mb-3 border-b border-white/20 pb-2 font-heading text-sm font-semibold text-white">
                Your Progress
              </h3>

              <div className="mt-5 flex items-center gap-4">
                <div
                  className="relative grid size-24 shrink-0 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(#c9a227 ${progress}%, rgba(255,255,255,0.13) ${progress}% 100%)`,
                  }}
                  role="img"
                  aria-label={`${saved.memorized.length} of 99 names memorized`}
                >
                  <div className="grid size-[76px] place-items-center rounded-full bg-deep-teal">
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-gold">
                        {saved.memorized.length}
                      </p>
                      <p className="text-[10px] text-white/70">of 99</p>
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="font-heading text-base font-semibold text-white">
                    Names Memorized
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/70">
                    Keep learning at your own pace.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-white/15 pt-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-white/75">Current name</span>
                  <span className="font-semibold text-gold">
                    {current.number} / 99
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-300"
                    style={{ width: `${(current.number / 99) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Heart size={16} className="mb-2 text-gold" />
                  <p className="text-xl font-semibold text-gold">
                    {saved.favorites.length}
                  </p>
                  <p className="mt-0.5 text-xs text-white/70">Favorites</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <BookmarkCheck size={16} className="mb-2 text-gold" />
                  <p className="text-xl font-semibold text-gold">
                    {saved.memorized.length}
                  </p>
                  <p className="mt-0.5 text-xs text-white/70">Memorized</p>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="asma-jump"
                  className="mb-2 block text-xs font-medium text-white/80"
                >
                  Jump to a name
                </label>

                <select
                  id="asma-jump"
                  value={current.number}
                  onChange={(event) =>
                    setSelectedNumber(Number(event.target.value))
                  }
                  className="w-full rounded-xl border border-white/20 bg-[#064a43] px-3 py-2.5 text-sm text-white outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                >
                  {filteredNames.map((name) => (
                    <option key={name.number} value={name.number}>
                      {name.number}. {name.transliteration}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => {
                    if (activeIndex > 0) goTo(-1)
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/25 px-3 py-2.5 text-sm font-medium text-white transition hover:border-gold hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft size={17} />
                  Previous
                </button>

                <button
                  type="button"
                  disabled={activeIndex === filteredNames.length - 1}
                  onClick={() => {
                    if (activeIndex < filteredNames.length - 1) goTo(1)
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gold bg-gold px-3 py-2.5 text-sm font-semibold text-deep-teal transition hover:bg-[#ddbb55] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Next
                  <ChevronRight size={17} />
                </button>
              </div>

              <p className="mt-4 text-center text-[11px] leading-5 text-white/55">
                Your favorites and memorization progress are saved on this
                device.
              </p>
            </section>

            <button
              type="button"
              onClick={() => {
                setSearch("")
                setFilter("all")
                setSelectedNumber(1)
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-deep-teal/20 bg-card px-4 py-3 text-sm font-medium text-deep-teal transition hover:border-emerald hover:bg-emerald/5"
            >
              <RotateCcw size={15} />
              Reset View
            </button>
          </aside>
        </div>
      ) : (
        <div className="rounded-2xl border border-deep-teal/20 bg-card px-5 py-12 text-center">
          <Search size={28} className="mx-auto text-muted-teal" />
          <h3 className="mt-3 font-heading text-lg font-semibold text-deep-teal">
            No names found
          </h3>
          <p className="mt-1 text-sm text-muted-teal">
            Try another search or choose a different filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("")
              setFilter("all")
            }}
            className="mt-4 rounded-xl border border-deep-teal/30 px-4 py-2 text-sm font-medium text-deep-teal transition hover:bg-emerald hover:text-white"
          >
            Show all names
          </button>
        </div>
      )}

      <div className="rounded-2xl border border-deep-teal/15 bg-card p-4 shadow-[0_2px_10px_rgba(6,63,58,0.05)] sm:p-5">
        <label htmlFor="asma-search" className="sr-only">
          Search the 99 Names of Allah
        </label>

        <div className="relative">
          <Search
            size={18}
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-teal"
          />
          <input
            id="asma-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, meaning, or number..."
            className="w-full rounded-xl border border-deep-teal/20 bg-warm-white py-3 pl-10 pr-4 text-sm text-deep-teal outline-none transition placeholder:text-muted-teal/75 focus:border-emerald focus:ring-2 focus:ring-emerald/15"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {(
            [
              ["all", "All Names"],
              ["favorites", "Favorites"],
              ["memorized", "Memorized"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition sm:text-sm ${
                filter === value
                  ? "border-deep-teal bg-deep-teal text-white"
                  : "border-deep-teal/30 bg-card text-deep-teal hover:border-emerald hover:bg-emerald hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}

          <span className="ml-auto text-xs text-muted-teal">
            {filteredNames.length}{" "}
            {filteredNames.length === 1 ? "name" : "names"}
          </span>
        </div>
      </div>

      <p className="text-center text-xs leading-5 text-muted-teal">
        Translations and explanations are brief learning aids. English
        renderings may vary, and scholars differ on the enumeration of some
        names. Refer to the Qur&apos;an and reliable scholarly sources for
        detailed study.
      </p>

      <style jsx global>{`
        @keyframes asmaFadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .asma-name-transition {
          animation: asmaFadeIn 450ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .asma-name-transition {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}