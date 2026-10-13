/**
 * Islamic inheritance (faraid) engine.
 * Follows the widely agreed rules, using the Hanafi position where schools differ
 * (the grandfather blocks siblings like a father; radd excludes the spouse).
 * All shares are exact fractions, so nothing is lost to rounding until amounts are shown.
 */

export type Deceased = "male" | "female"

export type HeirKey =
  | "husband" | "wives" | "sons" | "daughters" | "grandsons" | "granddaughters"
  | "father" | "mother" | "grandfather" | "paternalGrandmother" | "maternalGrandmother"
  | "fullBrothers" | "fullSisters" | "paternalBrothers" | "paternalSisters"
  | "maternalBrothers" | "maternalSisters"

export type Counts = Record<HeirKey, number>
export type Frac = { n: number; d: number }

export type Row = {
  key: HeirKey
  label: string
  count: number
  basis: "fixed" | "remainder" | "fixed + remainder"
  share: Frac // whole group's share of the distributable estate
  each: Frac // share per person
}

export type Result = {
  rows: Row[]
  blocked: { label: string; reason: string }[]
  notes: string[]
  unallocated: Frac
  hasHeirs: boolean
}

export const ORDER: HeirKey[] = [
  "husband", "wives", "sons", "daughters", "grandsons", "granddaughters",
  "father", "mother", "grandfather", "paternalGrandmother", "maternalGrandmother",
  "fullBrothers", "fullSisters", "paternalBrothers", "paternalSisters",
  "maternalBrothers", "maternalSisters",
]

export const LABELS: Record<HeirKey, [string, string]> = {
  husband: ["Husband", "Husband"],
  wives: ["Wife", "Wives"],
  sons: ["Son", "Sons"],
  daughters: ["Daughter", "Daughters"],
  grandsons: ["Son's son", "Son's sons"],
  granddaughters: ["Son's daughter", "Son's daughters"],
  father: ["Father", "Father"],
  mother: ["Mother", "Mother"],
  grandfather: ["Father's father", "Father's father"],
  paternalGrandmother: ["Father's mother", "Father's mother"],
  maternalGrandmother: ["Mother's mother", "Mother's mother"],
  fullBrothers: ["Full brother", "Full brothers"],
  fullSisters: ["Full sister", "Full sisters"],
  paternalBrothers: ["Half-brother (same father)", "Half-brothers (same father)"],
  paternalSisters: ["Half-sister (same father)", "Half-sisters (same father)"],
  maternalBrothers: ["Half-brother (same mother)", "Half-brothers (same mother)"],
  maternalSisters: ["Half-sister (same mother)", "Half-sisters (same mother)"],
}

export const LIMITS: Record<HeirKey, number> = {
  husband: 1, wives: 4, sons: 20, daughters: 20, grandsons: 20, granddaughters: 20,
  father: 1, mother: 1, grandfather: 1, paternalGrandmother: 1, maternalGrandmother: 1,
  fullBrothers: 20, fullSisters: 20, paternalBrothers: 20, paternalSisters: 20,
  maternalBrothers: 20, maternalSisters: 20,
}

export const EMPTY_COUNTS: Counts = ORDER.reduce((o, k) => ({ ...o, [k]: 0 }), {} as Counts)

/* ---------- exact fractions ---------- */
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
export const frac = (n: number, d = 1): Frac => {
  const g = gcd(n, d) || 1
  return { n: n / g, d: d / g }
}
const ZERO = frac(0)
const ONE = frac(1)
const add = (a: Frac, b: Frac) => frac(a.n * b.d + b.n * a.d, a.d * b.d)
const sub = (a: Frac, b: Frac) => frac(a.n * b.d - b.n * a.d, a.d * b.d)
const mul = (a: Frac, b: Frac) => frac(a.n * b.n, a.d * b.d)
const div = (a: Frac, b: Frac) => frac(a.n * b.d, a.d * b.n)
const gt = (a: Frac, b: Frac) => a.n * b.d > b.n * a.d
const isZero = (a: Frac) => a.n === 0
export const toNumber = (a: Frac) => a.n / a.d

const MALE_KEYS: HeirKey[] = ["sons", "grandsons", "father", "grandfather", "fullBrothers", "paternalBrothers"]
const RESIDUE_CLASSES: HeirKey[][] = [
  ["sons", "daughters"],
  ["grandsons", "granddaughters"],
  ["father"],
  ["grandfather"],
  ["fullBrothers", "fullSisters"],
  ["paternalBrothers", "paternalSisters"],
]

export function calculate(input: Counts, deceased: Deceased): Result {
  const c: Counts = { ...input }
  if (deceased === "male") c.husband = 0
  else c.wives = 0

  const hasHeirs = ORDER.some((k) => c[k] > 0)
  const hasMaleDesc = c.sons > 0 || c.grandsons > 0
  const hasFemaleDesc = c.daughters > 0 || c.granddaughters > 0
  const hasDesc = hasMaleDesc || hasFemaleDesc
  const fatherLine = c.father > 0 || c.grandfather > 0
  const siblingsAll =
    c.fullBrothers + c.fullSisters + c.paternalBrothers + c.paternalSisters + c.maternalBrothers + c.maternalSisters

  /* ----- who is blocked (effective counts) ----- */
  const e: Counts = { ...c }
  e.grandsons = c.sons > 0 ? 0 : c.grandsons
  e.granddaughters = c.sons > 0 ? 0 : c.daughters >= 2 && c.grandsons === 0 ? 0 : c.granddaughters
  e.grandfather = c.father > 0 ? 0 : c.grandfather
  e.paternalGrandmother = c.mother > 0 || c.father > 0 ? 0 : c.paternalGrandmother
  e.maternalGrandmother = c.mother > 0 ? 0 : c.maternalGrandmother
  const sibBlocked = hasMaleDesc || fatherLine
  e.fullBrothers = sibBlocked ? 0 : c.fullBrothers
  e.fullSisters = sibBlocked ? 0 : c.fullSisters
  const fullSisterAsaba = e.fullSisters > 0 && e.fullBrothers === 0 && hasFemaleDesc
  const fullSistersFixed = e.fullSisters > 0 && e.fullBrothers === 0 && !hasFemaleDesc
  e.paternalBrothers = sibBlocked || e.fullBrothers > 0 || fullSisterAsaba ? 0 : c.paternalBrothers
  e.paternalSisters =
    sibBlocked || e.fullBrothers > 0 || fullSisterAsaba || (fullSistersFixed && e.fullSisters >= 2 && e.paternalBrothers === 0)
      ? 0
      : c.paternalSisters
  const uterineBlocked = hasDesc || fatherLine
  e.maternalBrothers = uterineBlocked ? 0 : c.maternalBrothers
  e.maternalSisters = uterineBlocked ? 0 : c.maternalSisters

  /* ----- fixed shares ----- */
  const shares: Partial<Record<HeirKey, Frac>> = {}
  const residue = new Set<HeirKey>()
  const notes: string[] = []

  if (c.husband) shares.husband = hasDesc ? frac(1, 4) : frac(1, 2)
  if (c.wives) shares.wives = hasDesc ? frac(1, 8) : frac(1, 4)
  const spouseShare = shares.husband ?? shares.wives ?? ZERO

  if (c.mother) {
    const umariyya = !hasDesc && siblingsAll < 2 && c.father === 1 && c.husband + c.wives > 0
    if (hasDesc || siblingsAll >= 2) shares.mother = frac(1, 6)
    else if (umariyya) {
      shares.mother = mul(sub(ONE, spouseShare), frac(1, 3))
      notes.push("With a spouse and both parents, the mother takes one third of what remains after the spouse's share.")
    } else shares.mother = frac(1, 3)
  }

  for (const k of ["father", "grandfather"] as const) {
    if (e[k] > 0) {
      if (hasMaleDesc) shares[k] = frac(1, 6)
      else if (hasDesc) {
        shares[k] = frac(1, 6)
        residue.add(k)
      } else residue.add(k)
    }
  }

  const gm = e.paternalGrandmother + e.maternalGrandmother
  if (gm > 0) {
    shares.paternalGrandmother = frac(e.paternalGrandmother, 6 * gm)
    shares.maternalGrandmother = frac(e.maternalGrandmother, 6 * gm)
  }

  if (c.sons > 0) {
    residue.add("sons")
    if (c.daughters > 0) residue.add("daughters")
  } else if (c.daughters > 0) shares.daughters = c.daughters === 1 ? frac(1, 2) : frac(2, 3)

  if (e.grandsons > 0) {
    residue.add("grandsons")
    if (e.granddaughters > 0) residue.add("granddaughters")
  } else if (e.granddaughters > 0) {
    shares.granddaughters = c.daughters === 0 ? (e.granddaughters === 1 ? frac(1, 2) : frac(2, 3)) : frac(1, 6)
  }

  const uterine = e.maternalBrothers + e.maternalSisters
  if (uterine > 0) {
    const total = uterine === 1 ? frac(1, 6) : frac(1, 3)
    shares.maternalBrothers = mul(total, frac(e.maternalBrothers, uterine))
    shares.maternalSisters = mul(total, frac(e.maternalSisters, uterine))
  }

  if (e.fullBrothers > 0) {
    residue.add("fullBrothers")
    if (e.fullSisters > 0) residue.add("fullSisters")
  } else if (e.fullSisters > 0) {
    if (fullSisterAsaba) residue.add("fullSisters")
    else shares.fullSisters = e.fullSisters === 1 ? frac(1, 2) : frac(2, 3)
  }

  if (e.paternalBrothers > 0) {
    residue.add("paternalBrothers")
    if (e.paternalSisters > 0) residue.add("paternalSisters")
  } else if (e.paternalSisters > 0) {
    const noFull = e.fullBrothers === 0 && e.fullSisters === 0
    if (noFull && hasFemaleDesc) residue.add("paternalSisters")
    else if (noFull) shares.paternalSisters = e.paternalSisters === 1 ? frac(1, 2) : frac(2, 3)
    else shares.paternalSisters = frac(1, 6)
  }

  /* ----- awl, remainder, radd ----- */
  const keys = Object.keys(shares) as HeirKey[]
  const hadFixed = new Set(keys)
  const total = keys.reduce((s, k) => add(s, shares[k]!), ZERO)
  let unallocated = ZERO
  const residueClass = RESIDUE_CLASSES.find((cls) => cls.some((k) => residue.has(k)))

  if (gt(total, ONE)) {
    for (const k of keys) shares[k] = div(shares[k]!, total)
    notes.push(
      "The fixed shares add up to more than the whole estate, so every share is reduced in proportion ('awl). Nothing is left for residuary heirs."
    )
    residue.clear()
  } else if (gt(ONE, total)) {
    const remaining = sub(ONE, total)
    if (residueClass) {
      const keysIn = residueClass.filter((k) => residue.has(k))
      const weight = (k: HeirKey) => e[k] * (MALE_KEYS.includes(k) ? 2 : 1)
      const W = keysIn.reduce((s, k) => s + weight(k), 0)
      for (const k of keysIn) shares[k] = add(shares[k] ?? ZERO, mul(remaining, frac(weight(k), W)))
    } else {
      const others = keys.filter((k) => k !== "husband" && k !== "wives")
      const T = others.reduce((s, k) => add(s, shares[k]!), ZERO)
      if (!isZero(T)) {
        const factor = div(sub(ONE, spouseShare), T)
        for (const k of others) shares[k] = mul(shares[k]!, factor)
        notes.push(
          "There is no residuary heir and the fixed shares add up to less than the whole, so the remainder is returned to the heirs other than the spouse, in proportion to their shares (radd)."
        )
      } else unallocated = remaining
    }
  }

  /* ----- rows and blocked ----- */
  const rows: Row[] = []
  const blocked: { label: string; reason: string }[] = []
  const label = (k: HeirKey) => LABELS[k][c[k] > 1 ? 1 : 0]

  for (const k of ORDER) {
    if (c[k] === 0) continue
    const share = shares[k]
    if (share && !isZero(share)) {
      const inRes = residue.has(k)
      rows.push({
        key: k,
        label: label(k),
        count: c[k],
        basis: inRes && hadFixed.has(k) ? "fixed + remainder" : inRes ? "remainder" : "fixed",
        share,
        each: div(share, frac(c[k])),
      })
    } else {
      blocked.push({ label: label(k), reason: blockReason(k) })
    }
  }

  function blockReason(k: HeirKey): string {
    if (e[k] > 0) return "Nothing remains after the fixed shares are paid."
    switch (k) {
      case "grandsons": return "Blocked by a son."
      case "granddaughters":
        return c.sons > 0 ? "Blocked by a son." : "Two or more daughters already take the full two thirds."
      case "grandfather": return "Blocked by the father."
      case "paternalGrandmother": return c.mother > 0 ? "Blocked by the mother." : "Blocked by the father."
      case "maternalGrandmother": return "Blocked by the mother."
      case "fullBrothers": case "fullSisters":
        return hasMaleDesc ? "Blocked by a son or son's son." : "Blocked by the father or grandfather."
      case "paternalBrothers": case "paternalSisters":
        if (hasMaleDesc) return "Blocked by a son or son's son."
        if (fatherLine) return "Blocked by the father or grandfather."
        return "Blocked by full siblings who inherit before them."
      case "maternalBrothers": case "maternalSisters":
        return hasDesc ? "Blocked by children or a son's children." : "Blocked by the father or grandfather."
      default: return "Does not inherit in this case."
    }
  }

  if (c.grandfather > 0 && c.father === 0 && siblingsAll > 0) {
    notes.push(
      "Schools differ when a grandfather and siblings inherit together. This calculator follows the Hanafi view, where the grandfather blocks full and half siblings like a father. Ask a scholar if this applies to you."
    )
  }
  if (e.fullBrothers > 0 && isZero(shares.fullBrothers ?? ZERO) && uterine >= 2) {
    notes.push(
      "The full brothers receive nothing here because the fixed shares use up the whole estate. The Maliki and Shafi'i schools let them share the maternal half-siblings' third (the Mushtaraka case). This calculator follows the Hanafi view, so ask a scholar if this applies to you."
    )
  }
  if (!isZero(unallocated)) {
    notes.push(
      "Part of the estate is left over. It passes to other relatives, such as uncles, aunts, nephews or nieces, or as a scholar rules. This calculator does not cover them."
    )
  }
  return { rows, blocked, notes, unallocated, hasHeirs }
}