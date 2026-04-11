import type { ComponentType } from 'react'

export type LabDefinition = {
  slug: string
  title: string
  summary: string
  dateLabel: string
  tags: string[]
  component: ComponentType
}
