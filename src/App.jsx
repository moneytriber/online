import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import AssuranceWebinarPage from './pages/AssuranceWebinarPage'
import AboutPage from './pages/AboutPage'
import BudgetPlannerPage from './pages/BudgetPlannerPage'
import CommunityPage from './pages/CommunityPage'
import DashboardPage from './pages/DashboardPage'
import FinancialHealthPage from './pages/FinancialHealthPage'
import HomePage from './pages/HomePage'
import InvestmentTrackerPage from './pages/InvestmentTrackerPage'
import InvestorProfilePage from './pages/InvestorProfilePage'
import LearnPage from './pages/LearnPage'
import NetWorthPage from './pages/NetWorthPage'
import ToolsLayout from './pages/ToolsLayout'
import ToolsPage from './pages/ToolsPage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/webinars/invest-with-assurance-2-0"
          element={<AssuranceWebinarPage />}
        />
        <Route path="/tools" element={<ToolsLayout />}>
          <Route index element={<ToolsPage />} />
          <Route path="investor-profile" element={<InvestorProfilePage />} />
          <Route path="financial-health" element={<FinancialHealthPage />} />
          <Route path="net-worth" element={<NetWorthPage />} />
          <Route path="budget-planner" element={<BudgetPlannerPage />} />
          <Route path="investment-tracker" element={<InvestmentTrackerPage />} />
          <Route
            path="risk-evaluator"
            element={<Navigate to="/tools/investor-profile" replace />}
          />
        </Route>
        <Route path="/problem" element={<Navigate to="/learn" replace />} />
        <Route path="/solution" element={<Navigate to="/" replace />} />
        <Route path="/start" element={<Navigate to="/tools" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
