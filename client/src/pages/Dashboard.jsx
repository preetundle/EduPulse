import { api } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import KpiGrid from '../components/kpi/KpiGrid'
import PerformanceChart from '../components/PerformanceChart'
import AttendanceChart from '../components/AttendanceChart'
import RiskStudentsTable from '../components/RiskStudentsTable'
import { useEffect, useState } from 'react'

function Dashboard() {
  
  const [overview, setOverview] = useState(null)

  useEffect(() => {
  async function loadOverview() {
    try {
      const data = await api.get('/analytics/overview')

      console.log('Dashboard overview:', data)

      setOverview(data)
    } catch (error) {
      console.error('Overview error:', error.message)
    }
  }

  loadOverview()
}, [])



  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="mt-1 text-slate-400">
            Welcome back, Admin. Here's what's happening with your students.
          </p>
        </div>

        <KpiGrid overview={overview} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PerformanceChart />
          <AttendanceChart />
        </div>

        <div className="mt-6">
          <RiskStudentsTable />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
