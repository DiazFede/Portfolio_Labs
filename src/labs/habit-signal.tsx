import { useMemo, useState } from 'react'

type Habit = {
  id: number
  label: string
  streak: number
  completedToday: boolean
}

const seed: Habit[] = [
  { id: 1, label: 'Deep work block', streak: 6, completedToday: true },
  { id: 2, label: 'Workout', streak: 4, completedToday: false },
  { id: 3, label: 'Ship one improvement', streak: 9, completedToday: false },
]

export function HabitSignalLab() {
  const [habits, setHabits] = useState(seed)

  const completedCount = useMemo(
    () => habits.filter((habit) => habit.completedToday).length,
    [habits],
  )

  const momentumScore = useMemo(() => {
    const base = habits.reduce((total, habit) => total + habit.streak, 0)
    return Math.round((base / (habits.length * 10)) * 100)
  }, [habits])

  function toggleHabit(id: number) {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedToday: !habit.completedToday,
              streak: habit.completedToday ? Math.max(habit.streak - 1, 0) : habit.streak + 1,
            }
          : habit,
      ),
    )
  }

  return (
    <section className="lab-shell">
      <div className="lab-hero">
        <div>
          <p className="lab-kicker">Mini app 02</p>
          <h2>Habit Signal</h2>
          <p className="lab-lede">
            A compact tracker for personal routines, designed to feel more intentional than a generic
            checklist app.
          </p>
        </div>
        <div className="stat-pair">
          <article>
            <span>Done today</span>
            <strong>{completedCount}</strong>
          </article>
          <article>
            <span>Momentum</span>
            <strong>{momentumScore}%</strong>
          </article>
        </div>
      </div>

      <div className="inventory-grid">
        {habits.map((habit) => (
          <article
            key={habit.id}
            className="inventory-card"
            data-tone={habit.completedToday ? 'healthy' : habit.streak >= 7 ? 'watch' : 'critical'}
          >
            <div className="inventory-head">
              <div>
                <span>Routine {habit.id}</span>
                <h3>{habit.label}</h3>
              </div>
              <strong>{habit.streak}d</strong>
            </div>

            <div className="metric-row">
              <span>Status</span>
              <strong>{habit.completedToday ? 'Completed' : 'Pending'}</strong>
            </div>

            <button type="button" onClick={() => toggleHabit(habit.id)}>
              {habit.completedToday ? 'Undo today' : 'Mark today done'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
