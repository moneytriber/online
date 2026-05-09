import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import AssuranceWebinarPage from './pages/AssuranceWebinarPage'
import CommunityPage from './pages/CommunityPage'
import HomePage from './pages/HomePage'
import ProblemPage from './pages/ProblemPage'
import RiskEvaluatorPage from './pages/RiskEvaluatorPage'
import SolutionPage from './pages/SolutionPage'
import StartPage from './pages/StartPage'
import ToolsLayout from './pages/ToolsLayout'
import ToolsPage from './pages/ToolsPage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/problem" element={<ProblemPage />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route
          path="/webinars/invest-with-assurance-2-0"
          element={<AssuranceWebinarPage />}
        />
        <Route path="/tools" element={<ToolsLayout />}>
          <Route index element={<ToolsPage />} />
          <Route path="risk-evaluator" element={<RiskEvaluatorPage />} />
        </Route>
        <Route path="/start" element={<StartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
