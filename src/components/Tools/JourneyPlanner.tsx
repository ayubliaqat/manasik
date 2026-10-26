"use client";

import { useMemo, useState } from "react";

type TripType = "umrah" | "hajj";
type FirstCity = "makkah" | "madinah";

type Step = {
  key: string;
  date: Date;
  title: string;
  note: string;
  tone: "gold" | "emerald";
};

const CITY_LABEL: Record<FirstCity, string> = {
  makkah: "Makkah",
  madinah: "Madinah",
};

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

export default function JourneyPlanner() {
  const [tripType, setTripType] = useState<TripType>("umrah");
  const [firstCity, setFirstCity] = useState<FirstCity>("makkah");
  const [startDate, setStartDate] = useState("");
  const [makkahNights, setMakkahNights] = useState(5);
  const [madinahNights, setMadinahNights] = useState(4);
  const [travellers, setTravellers] = useState(2);

  const plan = useMemo(() => {
    if (!startDate) return null;

    const start = new Date(`${startDate}T00:00:00`);
    if (Number.isNaN(start.getTime())) return null;

    const secondCity: FirstCity = firstCity === "makkah" ? "madinah" : "makkah";
    const nights: Record<FirstCity, number> = {
      makkah: makkahNights,
      madinah: madinahNights,
    };

    const steps: Step[] = [];
    let cursor = 0;

    steps.push({
      key: "arrive",
      date: addDays(start, cursor),
      title: `Arrive and check in, ${CITY_LABEL[firstCity]}`,
      note:
        firstCity === "makkah"
          ? tripType === "umrah"
            ? "Enter ihram at the miqat, then perform your Umrah: Tawaf, Sa'i and shaving or trimming."
            : "Rest after travel and begin your preparation for Hajj."
          : "Rest, then visit Masjid an-Nabawi and send salutations upon the Prophet ﷺ.",
      tone: "gold",
    });

    cursor += nights[firstCity];

    steps.push({
      key: "transfer",
      date: addDays(start, cursor),
      title: `Travel to ${CITY_LABEL[secondCity]}`,
      note: "Haramain high-speed train or road transfer, roughly 3 to 5 hours depending on the option.",
      tone: "emerald",
    });

    if (secondCity === "makkah" && tripType === "umrah") {
      steps.push({
        key: "umrah",
        date: addDays(start, cursor),
        title: "Enter ihram and perform Umrah",
        note: "Enter ihram before the miqat, then Tawaf, Sa'i and shaving or trimming.",
        tone: "gold",
      });
    }

    cursor += nights[secondCity];

    if (tripType === "hajj") {
      steps.push({
        key: "hajj",
        date: addDays(start, Math.max(cursor - 1, 0)),
        title: "Hajj days",
        note: "Follow your group's schedule for Mina, Arafat, Muzdalifah and the days of Tashreeq.",
        tone: "gold",
      });
    }

    if (secondCity === "makkah") {
      steps.push({
        key: "farewell",
        date: addDays(start, cursor),
        title: "Farewell Tawaf",
        note: "Perform the farewell Tawaf as your last rite before leaving Makkah.",
        tone: "gold",
      });
    }

    steps.push({
      key: "depart",
      date: addDays(start, cursor),
      title: "Check out and fly home",
      note: "Allow plenty of time for the airport transfer and check-in.",
      tone: "emerald",
    });

    return {
      steps,
      totalNights: nights.makkah + nights.madinah,
      returnDate: addDays(start, cursor),
    };
  }, [startDate, tripType, firstCity, makkahNights, madinahNights]);

  const fieldClass =
    "w-full rounded-xl border border-soft-beige bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20";
  const labelClass = "mb-2 block text-sm font-semibold text-charcoal";

  const toggleClass = (active: boolean) =>
    `flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
      active
        ? "border-emerald bg-emerald text-white shadow-sm"
        : "border-soft-beige bg-white text-charcoal hover:border-emerald/50"
    }`;

  return (
    <section className="bg-warm-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Form */}
          <div className="rounded-2xl border border-soft-beige bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold text-deep-teal">
              Plan your <span className="text-gold">journey</span>
            </h2>
            <p className="mt-2 text-sm text-muted-teal">
              Choose your dates and stay lengths to get a day-by-day outline.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <span className={labelClass}>Trip type</span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTripType("umrah")}
                    className={toggleClass(tripType === "umrah")}
                  >
                    Umrah
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType("hajj")}
                    className={toggleClass(tripType === "hajj")}
                  >
                    Hajj
                  </button>
                </div>
              </div>

              <div>
                <span className={labelClass}>Start in</span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFirstCity("makkah")}
                    className={toggleClass(firstCity === "makkah")}
                  >
                    Makkah
                  </button>
                  <button
                    type="button"
                    onClick={() => setFirstCity("madinah")}
                    className={toggleClass(firstCity === "madinah")}
                  >
                    Madinah
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="jp-start" className={labelClass}>
                  Arrival date
                </label>
                <input
                  id="jp-start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div>
                  <label htmlFor="jp-makkah" className={labelClass}>
                    Makkah nights
                  </label>
                  <input
                    id="jp-makkah"
                    type="number"
                    min={1}
                    max={30}
                    value={makkahNights}
                    onChange={(e) =>
                      setMakkahNights(clamp(Number(e.target.value), 1, 30))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="jp-madinah" className={labelClass}>
                    Madinah nights
                  </label>
                  <input
                    id="jp-madinah"
                    type="number"
                    min={1}
                    max={30}
                    value={madinahNights}
                    onChange={(e) =>
                      setMadinahNights(clamp(Number(e.target.value), 1, 30))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="jp-travellers" className={labelClass}>
                    Travellers
                  </label>
                  <input
                    id="jp-travellers"
                    type="number"
                    min={1}
                    max={20}
                    value={travellers}
                    onChange={(e) =>
                      setTravellers(clamp(Number(e.target.value), 1, 20))
                    }
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-2xl border border-soft-beige bg-white p-5 shadow-sm sm:p-6 lg:col-span-3">
            {!plan ? (
              <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-deep-teal text-2xl text-gold-light">
                  ✈
                </div>
                <h3 className="font-serif text-xl font-bold text-deep-teal">
                  Your itinerary will appear here
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-teal">
                  Pick your arrival date to generate a day-by-day plan.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Total nights", value: String(plan.totalNights) },
                    { label: "Travellers", value: String(travellers) },
                    { label: "Return", value: formatDate(plan.returnDate) },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-deep-teal p-3 text-center sm:p-4"
                    >
                      <p className="text-[11px] uppercase tracking-wide text-gold-light sm:text-xs">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-white sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <ol className="mt-6 space-y-5">
                  {plan.steps.map((step) => (
                    <li key={step.key} className="flex gap-4">
                      <span
                        className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${
                          step.tone === "gold" ? "bg-gold" : "bg-emerald"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-teal">
                          {formatDate(step.date)}
                        </p>
                        <h3 className="mt-0.5 font-serif text-lg font-bold text-charcoal">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-teal">
                          {step.note}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <p className="mt-6 rounded-xl bg-warm-white p-4 text-xs leading-relaxed text-muted-teal">
                  This is a general outline. Confirm flights, visas, hotel dates
                  and Hajj schedules with your operator.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}