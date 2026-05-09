import { Outlet } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'

function ToolsLayout() {
  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Tools"
        title="Practical money tools that turn plans into action."
        description="MoneyFlex Tribe is more than inspiration. These built-in tools help you measure progress, make smarter decisions, and stay consistent."
        align="center"
      />

      <Outlet />
    </section>
  )
}

export default ToolsLayout
