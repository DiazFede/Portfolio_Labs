import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Portfolio Labs app', () => {
  it('renders the gallery headline on the home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByText(/Small product ideas, shipped with enough care/i),
    ).toBeInTheDocument()
  })

  it('renders the inventory pulse lab page', () => {
    render(
      <MemoryRouter initialEntries={['/labs/inventory-pulse']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getAllByRole('heading', { name: /Inventory Pulse/i }).length,
    ).toBeGreaterThan(0)
  })

  it('updates inventory counts after receiving a shipment', () => {
    render(
      <MemoryRouter initialEntries={['/labs/inventory-pulse']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('18', { selector: 'strong' })).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: /Receive shipment/i })[0])

    expect(screen.getByText('24', { selector: 'strong' })).toBeInTheDocument()
  })

  it('updates habit status and streak after marking a routine as done', () => {
    render(
      <MemoryRouter initialEntries={['/labs/habit-signal']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getAllByText('Pending', { selector: 'strong' }).length).toBeGreaterThan(0)
    expect(screen.getByText('4d', { selector: 'strong' })).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: /Mark today done/i })[0])

    expect(screen.getAllByText('Completed', { selector: 'strong' }).length).toBeGreaterThan(0)
    expect(screen.getByText('5d', { selector: 'strong' })).toBeInTheDocument()
  })

  it('shows a friendly fallback for unknown labs', () => {
    render(
      <MemoryRouter initialEntries={['/labs/does-not-exist']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /This lab is not available yet/i }),
    ).toBeInTheDocument()
  })
})
