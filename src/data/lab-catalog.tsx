import type { LabDefinition } from '../types/lab'
// [lab-imports]
import { FreelanceCashflowLab } from '../labs/freelance-cashflow'
import { HabitSignalLab } from '../labs/habit-signal'
import { InventoryPulseLab } from '../labs/inventory-pulse'

export const labCatalog: LabDefinition[] = [
  // [lab-entries]
  {
    slug: 'freelance-cashflow',
    title: 'Freelance Cashflow',
    summary:
      'A compact cashflow tracker focused on invoice status, paid revenue, and short-term runway.',
    dateLabel: 'Apr 2026',
    tags: ['React 19', 'Finance UI', 'Product design'],
    component: FreelanceCashflowLab,
  },
  {
    slug: 'habit-signal',
    title: 'Habit Signal',
    summary:
      'A compact routine tracker built around streaks, completion state, and a calmer productivity signal.',
    dateLabel: 'Apr 2026',
    tags: ['React 19', 'Stateful UI', 'Product thinking'],
    component: HabitSignalLab,
  },
  {
    slug: 'inventory-pulse',
    title: 'Inventory Pulse',
    summary:
      'A retail operations dashboard centered on reorder pressure, lead-time exposure, and quick decision support.',
    dateLabel: 'Apr 2026',
    tags: ['React 19', 'TypeScript', 'Operations UI'],
    component: InventoryPulseLab,
  },
]

export const labMap = Object.fromEntries(
  labCatalog.map((lab) => [lab.slug, lab]),
) as Record<string, LabDefinition>
