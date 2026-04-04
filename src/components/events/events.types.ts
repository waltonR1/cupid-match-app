import type { EventStatus } from '@/mock/events'

export interface EventFieldLabels {
  date: string
  city: string
  venue: string
  format: string
  audience: string
  seats: string
}

export interface EventStatItem {
  label: string
  value: string
}

export interface EventOverviewItem {
  id: string
  title: string
  summary: string
  date: string
  city: string
  venue: string
  format: string
  audience: string
  seats: string
  status: EventStatus
  statusLabel: string
}
