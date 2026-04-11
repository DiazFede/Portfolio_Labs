import { Link } from 'react-router-dom'
import { labCatalog } from '../data/lab-catalog'

export function HomePage() {
  return (
    <main className="page-shell">
      <section className="masthead">
        <div className="mast-copy">
          <p className="eyebrow">Portfolio Labs</p>
          <h1>Micro-products shipped often, not one giant repo abandoned halfway.</h1>
          <p className="intro">
            A creative playground for small apps that feel presentable, testable, and close to a
            real team workflow. Each lab is meant to ship on its own branch, pass CI, and earn a
            spot in the portfolio.
          </p>

          <div className="command-bar">
            <span>Current rhythm</span>
            <code>feature/habit-signal - PR - merge</code>
          </div>
        </div>

        <aside className="mast-panel">
          <div className="panel-card panel-large">
            <span>Operating mode</span>
            <strong>Build often</strong>
            <p>Quick wins, cleaner commits, better GitHub history.</p>
          </div>
          <div className="panel-stack">
            <div className="panel-card">
              <span>Checks</span>
              <strong>Lint + test + build</strong>
            </div>
            <div className="panel-card">
              <span>Flow</span>
              <strong>Branch, PR, merge</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="gallery">
        <div className="section-copy">
          <p className="eyebrow">Current labs</p>
          <h2>Small enough to ship, strong enough to show.</h2>
        </div>

        <div className="lab-gallery">
          {labCatalog.map((lab) => (
            <article key={lab.slug} className="lab-teaser">
              <div className="teaser-top">
                <span>{lab.dateLabel}</span>
                <span>/{lab.slug}</span>
              </div>
              <h3>{lab.title}</h3>
              <p>{lab.summary}</p>
              <div className="tag-row">
                {lab.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link to={`/labs/${lab.slug}`}>Open lab</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
