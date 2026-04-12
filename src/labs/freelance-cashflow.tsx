import { useMemo, useState } from 'react'

type Invoice = {
  id: number
  client: string
  amount: number
  status: 'Paid' | 'Pending'
}

const seedInvoices: Invoice[] = [
  { id: 1, client: 'Northstar Studio', amount: 1200, status: 'Paid' },
  { id: 2, client: 'Atlas Commerce', amount: 850, status: 'Pending' },
  { id: 3, client: 'Quiet Form', amount: 640, status: 'Pending' },
]

function money(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function FreelanceCashflowLab() {
  const [invoices, setInvoices] = useState(seedInvoices)

  const totals = useMemo(() => {
    const paid = invoices
      .filter((invoice) => invoice.status === 'Paid')
      .reduce((total, invoice) => total + invoice.amount, 0)
    const pending = invoices
      .filter((invoice) => invoice.status === 'Pending')
      .reduce((total, invoice) => total + invoice.amount, 0)

    return {
      paid,
      pending,
      runway: Math.round((paid + pending) / 620),
    }
  }, [invoices])

  function markAsPaid(id: number) {
    setInvoices((current) =>
      current.map((invoice) =>
        invoice.id === id ? { ...invoice, status: 'Paid' } : invoice,
      ),
    )
  }

  return (
    <section className="lab-shell">
      <div className="lab-hero">
        <div>
          <p className="lab-kicker">Mini app 03</p>
          <h2>Freelance Cashflow</h2>
          <p className="lab-lede">
            A lightweight finance dashboard for tracking incoming invoice value, payment status, and
            near-term runway.
          </p>
        </div>
        <div className="stat-pair">
          <article>
            <span>Paid revenue</span>
            <strong>{money(totals.paid)}</strong>
          </article>
          <article>
            <span>Runway</span>
            <strong>{totals.runway} wk</strong>
          </article>
        </div>
      </div>

      <div className="inventory-grid">
        {invoices.map((invoice) => (
          <article
            key={invoice.id}
            className="inventory-card"
            data-tone={invoice.status === 'Paid' ? 'healthy' : 'watch'}
          >
            <div className="inventory-head">
              <div>
                <span>Invoice {invoice.id}</span>
                <h3>{invoice.client}</h3>
              </div>
              <strong>{money(invoice.amount)}</strong>
            </div>

            <div className="metric-row">
              <span>Status</span>
              <strong>{invoice.status}</strong>
            </div>
            <div className="metric-row">
              <span>Pending total</span>
              <strong>{money(totals.pending)}</strong>
            </div>

            {invoice.status === 'Pending' ? (
              <button type="button" onClick={() => markAsPaid(invoice.id)}>
                Mark as paid
              </button>
            ) : (
              <button type="button" disabled>
                Payment cleared
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
