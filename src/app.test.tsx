import { render, screen } from '@testing-library/react'
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
      screen.getByText(/Micro-products shipped often/i),
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
})
