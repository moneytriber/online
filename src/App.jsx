import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import DashboardLayout from './components/DashboardLayout'
import AssuranceWebinarPage from './pages/AssuranceWebinarPage'
import AboutPage from './pages/AboutPage'
import BudgetPlannerPage from './pages/BudgetPlannerPage'
import CommunityPage from './pages/CommunityPage'
import DashboardPage from './pages/DashboardPage'
import DashboardRemindersPage from './pages/DashboardRemindersPage'
import ClientProfilePage from './pages/ClientProfilePage'
import FinancialHealthPage from './pages/FinancialHealthPage'
import HomePage from './pages/HomePage'
import InvestmentTrackerPage from './pages/InvestmentTrackerPage'
import InvestorProfilePage from './pages/InvestorProfilePage'
import InvestorExperiencePage from './pages/InvestorExperiencePage'
import LearnPage from './pages/LearnPage'
import NetWorthPage from './pages/NetWorthPage'
import PublicProfilePage from './pages/PublicProfilePage'
import ToolsLayout from './pages/ToolsLayout'
import ToolsPage from './pages/ToolsPage'

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ClientProfilePage />} />
        <Route path="risk-profile" element={<InvestorProfilePage />} />
        <Route path="investor-profile" element={<InvestorExperiencePage />} />
        <Route path="financial-health" element={<FinancialHealthPage />} />
        <Route path="net-worth" element={<NetWorthPage />} />
        <Route path="budget" element={<BudgetPlannerPage />} />
        <Route path="investments" element={<InvestmentTrackerPage />} />
        <Route path="reminders" element={<DashboardRemindersPage />} />
      </Route>
      <Route path="/profile" element={<PublicProfilePage />} />

      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route
          path="/webinars/invest-with-assurance-2-0"
          element={<AssuranceWebinarPage />}
        />
        <Route path="/tools" element={<ToolsLayout />}>
          <Route index element={<ToolsPage />} />
          <Route path="risk-calculator" element={<InvestorProfilePage />} />
          <Route path="investor-profile" element={<InvestorExperiencePage />} />
          <Route path="financial-health" element={<FinancialHealthPage />} />
          <Route path="net-worth" element={<NetWorthPage />} />
          <Route path="budget-planner" element={<BudgetPlannerPage />} />
          <Route path="investment-tracker" element={<InvestmentTrackerPage />} />
          <Route
            path="risk-evaluator"
            element={<Navigate to="/tools/risk-calculator" replace />}
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
