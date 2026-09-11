import { Outlet } from 'react-router-dom'
function ToolsLayout() {
  return (
    <section className="min-h-[70vh] bg-[var(--mf-background)]">
      <Outlet />
    </section>
  )
}

export default ToolsLayout
