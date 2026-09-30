
const VERSES = [
  { ref: "2:127", context: "Ibrahim and Ismail raising the Kaaba" },
  { ref: "2:201", context: "A dua made during Tawaf" },
  { ref: "2:128", context: "Asking Allah to show us the rites" },
  { ref: "2:158", context: "The reminder behind the Sa'i" },
  { ref: "3:96", context: "The first House built for mankind" },
  { ref: "3:97", context: "The obligation of Hajj" },
  { ref: "2:199", context: "Seeking Allah's forgiveness during Hajj" },
  { ref: "22:27", context: "The call of Ibrahim to the pilgrims" },
  { ref: "22:32", context: "Honouring the symbols of Allah" },
  { ref: "14:35", context: "Ibrahim's prayer for a safe Makkah" },
  { ref: "14:40", context: "Ibrahim's prayer for steadfast prayer" },
]

// Shown only if the API cannot be reached.
const FALLBACK = [
  {
    arabic:
      "رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
    translation:
      "Our Lord, accept this from us. Indeed, You are the Hearing, the Knowing.",
    reference: "Surah Al-Baqarah 2:127 (excerpt)",
  },
  {
    arabic:
      "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    translation:
      "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    reference: "Surah Al-Baqarah 2:201 (excerpt)",
  },
  {
    arabic:
      "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا ۖ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ",
    translation:
      "Our Lord, make us Muslims in submission to You, and from our descendants a nation in submission to You. Show us our rites and accept our repentance. Indeed, You are the Accepting of Repentance, the Merciful.",
    reference: "Surah Al-Baqarah 2:128",
  },
]

type ApiAyah = {
  number: number
  numberInSurah: number
  text: string
  surah: {
    number: number
    englishName: string
  }
}

async function fetchVerse(ref: string) {
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/ayah/${ref}/editions/quran-uthmani,en.sahih`,
      {
        next: {
          revalidate: 60 * 60 * 24,
        },
      }
    )

    if (!res.ok) return null

    const json = (await res.json()) as {
      data?: ApiAyah[]
    }

    const [ar, en] = json.data ?? []

    if (!ar?.text || !en?.text) return null

    return {
      arabic: ar.text,
      translation: en.text,
      reference: `Surah ${ar.surah.englishName} ${ar.surah.number}:${ar.numberInSurah}`,
    }
  } catch {
    return null
  }
}

export default async function VerseOfTheDay() {
  const now = new Date()

  const dateKey = Number(
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(now)
      .replace(/\D/g, "")
  )

  const item = VERSES[dateKey % VERSES.length]

  const live = await fetchVerse(item.ref)

  const verse = live ?? FALLBACK[dateKey % FALLBACK.length]

  const day = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(now)

  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now)

  return (
    <section className="relative overflow-hidden bg-dark-teal py-10 sm:py-12 lg:py-14">
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-[-180px]
          h-[300px] w-[120%]
          -translate-x-1/2
          rounded-[0_0_50%_50%]
          bg-gradient-to-br
          from-emerald/[0.14]
          via-emerald/[0.05]
          to-gold/[0.08]
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-gold
              sm:text-xs
            "
          >
            {day} · {date}
          </p>

     <h2
  className="
    mt-3
    font-serif
    text-[25px]
    font-medium
    leading-[1.2]
    tracking-[-0.015em]
    text-white
    sm:text-[30px]
    md:text-[34px]
    lg:text-[38px]
  "
>
  Verse{" "}
  <span className="relative inline-block whitespace-nowrap text-emerald">
    of the Day
    <svg
      aria-hidden="true"
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      fill="none"
      className="
        pointer-events-none absolute
        left-1/2 top-full
        mt-[0.05em]
        h-[0.2em] w-[75%]
        -translate-x-1/2
        text-gold
      "
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

          <p
            dir="rtl"
            lang="ar"
            className="
              mt-7
              font-serif
              text-[24px]
              leading-[2]
              text-white
              sm:mt-8
              sm:text-[28px]
              md:text-[32px]
              lg:text-[36px]
            "
          >
            {verse.arabic}
          </p>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-white/75
              sm:mt-6
              sm:text-[15px]
              lg:text-base
            "
          >
            “{verse.translation}”
          </p>

          <p className="mt-4 text-xs font-medium text-gold sm:text-[13px]">
            {verse.reference}
          </p>
        </div>
      </div>
    </section>
  )
}