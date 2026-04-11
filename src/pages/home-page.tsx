import { Link } from 'react-router-dom'
import { labCatalog } from '../data/lab-catalog'

export function HomePage() {
  return (
    <main className="page-shell">
      <section className="masthead">
        <div className="mast-copy">
          <p className="eyebrow">Portfolio Labs</p>
          <h1>Small product ideas, shipped with enough care to be worth showing.</h1>
          <p className="intro">
            A collection of compact front-end projects built to stay presentable, testable, and easy
            to evolve. Each lab is scoped to ship cleanly, document a clear idea, and leave a better
            signal in the portfolio than one oversized side project.
          </p>

          <div className="command-bar">
            <span>Working rhythm</span>
            <code>branch &gt; PR &gt; CI &gt; merge</code>
          </div>
        </div>

        <aside className="mast-panel">
          <div className="panel-card panel-large">
            <span>Approach</span>
            <strong>Ship in small slices</strong>
            <p>Short cycles make the repo easier to maintain and the progress easier to show.</p>
          </div>
          <div className="panel-stack">
            <div className="panel-card">
              <span>Quality gate</span>
              <strong>Lint, test, build</strong>
            </div>
            <div className="panel-card">
              <span>Delivery flow</span>
              <strong>Branch, review, merge</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="gallery">
        <div className="section-copy">
          <p className="eyebrow">Current labs</p>
          <h2>Focused projects with enough shape to stand on their own.</h2>
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
