import { useMemo, useState } from 'react'

type StockItem = {
  sku: string
  label: string
  units: number
  weeklyDemand: number
  leadTime: number
}

const stockSeed: StockItem[] = [
  { sku: 'BL-204', label: 'Bluetooth tracker', units: 18, weeklyDemand: 11, leadTime: 7 },
  { sku: 'KB-109', label: 'Compact keyboard', units: 9, weeklyDemand: 8, leadTime: 14 },
  { sku: 'LT-330', label: 'Desk light', units: 31, weeklyDemand: 6, leadTime: 10 },
]

function reorderScore(item: StockItem) {
  const exposure = item.weeklyDemand * (item.leadTime / 7)
  return Math.round((exposure / Math.max(item.units, 1)) * 100)
}

export function InventoryPulseLab() {
  const [items, setItems] = useState(stockSeed)

  const summary = useMemo(() => {
    const risky = items.filter((item) => reorderScore(item) >= 80).length
    const stable = items.length - risky
    return { risky, stable }
  }, [items])

  function receiveStock(sku: string) {
    setItems((current) =>
      current.map((item) =>
        item.sku === sku ? { ...item, units: item.units + 6 } : item,
      ),
    )
  }

  return (
    <section className="lab-shell">
      <div className="lab-hero">
        <div>
          <p className="lab-kicker">Mini app 01</p>
          <h2>Inventory Pulse</h2>
          <p className="lab-lede">
            A lightweight retail operations view built to surface stock pressure and restock timing
            without feeling like a throwaway dashboard.
          </p>
        </div>
        <div className="stat-pair">
          <article>
            <span>Risky SKUs</span>
            <strong>{summary.risky}</strong>
          </article>
          <article>
            <span>Stable SKUs</span>
            <strong>{summary.stable}</strong>
          </article>
        </div>
      </div>

      <div className="inventory-grid">
        {items.map((item) => {
          const score = reorderScore(item)
          const tone = score >= 80 ? 'critical' : score >= 50 ? 'watch' : 'healthy'

          return (
            <article key={item.sku} className="inventory-card" data-tone={tone}>
              <div className="inventory-head">
                <div>
                  <span>{item.sku}</span>
                  <h3>{item.label}</h3>
                </div>
                <strong>{score}</strong>
              </div>

              <div className="metric-row">
                <span>Units in stock</span>
                <strong>{item.units}</strong>
              </div>
              <div className="metric-row">
                <span>Weekly demand</span>
                <strong>{item.weeklyDemand}</strong>
              </div>
              <div className="metric-row">
                <span>Lead time</span>
                <strong>{item.leadTime} days</strong>
              </div>

              <button type="button" onClick={() => receiveStock(item.sku)}>
                Receive shipment
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
