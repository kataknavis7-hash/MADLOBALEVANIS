import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

// Code Splitting + Lazy Loading: თითო გვერდი ცალკე chunk-ია
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))
const CoursesPage = lazy(() => import('./pages/CoursesPage.jsx'))
const CoursePage = lazy(() => import('./pages/CoursePage.jsx'))
const AchievementsPage = lazy(() => import('./pages/AchievementsPage.jsx'))

export default function App() {
  return (
    <>
      <a className="skip" href="#main">მთავარ შინაარსზე გადასვლა</a>
      <Navbar />
      <main id="main" className="container">
        <Suspense fallback={<p className="loading" role="status">იტვირთება…</p>}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="*" element={<p>გვერდი ვერ მოიძებნა.</p>} />
          </Routes>
        </Suspense>
      </main>
    </>
  )
}
