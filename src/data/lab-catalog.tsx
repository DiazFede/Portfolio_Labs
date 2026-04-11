import type { LabDefinition } from '../types/lab'
// [lab-imports]
import { HabitSignalLab } from '../labs/habit-signal'
import { InventoryPulseLab } from '../labs/inventory-pulse'

export const labCatalog: LabDefinition[] = [
  // [lab-entries]
  {
    slug: 'habit-signal',
    title: 'Habit Signal',
    summary:
      'A daily focus tracker that turns streaks and completion momentum into a lightweight dashboard.',
    dateLabel: 'Apr 2026',
    tags: ['React 19', 'Stateful UI', 'Behavior design'],
    component: HabitSignalLab,
  },
  {
    slug: 'inventory-pulse',
    title: 'Inventory Pulse',
    summary:
      'A fast-moving retail ops dashboard with reorder scoring, live demand signals, and a polished command-center feel.',
    dateLabel: 'Apr 2026',
    tags: ['React 19', 'TypeScript', 'Portfolio-ready'],
    component: InventoryPulseLab,
  },
]

export const labMap = Object.fromEntries(
  labCatalog.map((lab) => [lab.slug, lab]),
) as Record<string, LabDefinition>
