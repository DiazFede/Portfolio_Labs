import { Link, useParams } from 'react-router-dom'
import { labMap } from '../data/lab-catalog'

export function LabPage() {
  const { slug = '' } = useParams()
  const lab = labMap[slug]

  if (!lab) {
    return (
      <main className="detail-shell">
        <div className="detail-header">
          <div>
            <p className="eyebrow">Not found</p>
            <h1>This lab does not exist yet.</h1>
          </div>
          <Link to="/">Back to gallery</Link>
        </div>
      </main>
    )
  }

  const LabComponent = lab.component

  return (
    <main className="detail-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Portfolio lab</p>
          <h1>{lab.title}</h1>
          <p>{lab.summary}</p>
        </div>
        <Link to="/">Back to gallery</Link>
      </div>

      <LabComponent />
    </main>
  )
}
