import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home-page'
import { LabPage } from './pages/lab-page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/labs/:slug" element={<LabPage />} />
    </Routes>
  )
}

export default App
