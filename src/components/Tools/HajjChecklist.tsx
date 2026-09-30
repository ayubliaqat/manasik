import Checklist, { type ChecklistGroup } from "./Checklist"

const GROUPS: ChecklistGroup[] = [
  {
    title: "Documents",
    items: [
      { id: "h-passport", label: "Passport valid for at least 6 months" },
      { id: "h-visa", label: "Hajj visa and permit confirmed" },
      { id: "h-vaccine", label: "Required vaccination certificates" },
      { id: "h-insurance", label: "Travel and health insurance" },
      { id: "h-tickets", label: "Flight tickets and accommodation bookings" },
      { id: "h-copies", label: "Copies of all documents, paper and digital" },
    ],
  },
  {
    title: "Spiritual preparation",
    items: [
      { id: "h-niyyah", label: "Make a sincere intention for Hajj" },
      { id: "h-rituals", label: "Learn the rituals step by step" },
      { id: "h-duas", label: "Learn the key duas and talbiyah" },
      { id: "h-forgive", label: "Seek forgiveness and repent" },
      { id: "h-debts", label: "Settle debts and return what is owed" },
      { id: "h-will", label: "Write your will and inform your family" },
    ],
  },
  {
    title: "Health and fitness",
    items: [
      { id: "h-checkup", label: "Medical check-up before travelling" },
      { id: "h-meds", label: "Enough regular medication, with a doctor's letter" },
      { id: "h-walk", label: "Build up walking stamina in advance" },
      { id: "h-firstaid", label: "Small first aid kit and rehydration salts" },
    ],
  },
  {
    title: "Ihram and essentials",
    items: [
      { id: "h-ihram", label: "Ihram clothing ready, two sets for men" },
      { id: "h-modest", label: "Modest, loose clothing for women" },
      { id: "h-footwear", label: "Comfortable footwear for long walks" },
      { id: "h-unscented", label: "Unscented toiletries" },
      { id: "h-bag", label: "Small day bag and money belt" },
    ],
  },
  {
    title: "Money and family",
    items: [
      { id: "h-budget", label: "Set your full trip budget" },
      { id: "h-riyals", label: "Arrange Saudi riyals and a bank card" },
      { id: "h-zakat", label: "Pay your zakat if it is due" },
      { id: "h-contact", label: "Share your itinerary and contacts with family" },
    ],
  },
  {
    title: "Final week",
    items: [
      { id: "h-luggage", label: "Weigh and lock your luggage" },
      { id: "h-charge", label: "Charge your phone and pack a power bank" },
      { id: "h-group", label: "Confirm meeting points with your group" },
      { id: "h-dua", label: "Ask family and friends for their duas" },
    ],
  },
]

export default function HajjChecklist() {
  return <Checklist groups={GROUPS} storageKey="manasik-hajj-checklist" />
}