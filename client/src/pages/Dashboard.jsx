import DashboardLayout from '../layouts/DashboardLayout'
import DashboardCard from '../components/DashboardCard'
import PerformanceChart from '../components/PerformanceChart'
import AttendanceChart from '../components/AttendenceChart'
import RiskStudentsTable from '../components/RiskStudentsTable'


function Dashboard() {
  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h2>

          <p className="mt-1 text-gray-500">
            Welcome back, Admin. Here's what's happening with your students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <DashboardCard
            title="Total Students"
            value="1,250"
            description="Currently enrolled"
          />

          <DashboardCard
            title="Average Marks"
            value="72.4%"
            description="Across all subjects"
          />

          <DashboardCard
            title="Attendance"
            value="81.6%"
            description="Overall attendance"
          />

          <DashboardCard
            title="Pass Percentage"
            value="87.2%"
            description="Current semester"
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
            <PerformanceChart />
            <AttendanceChart />
            <RiskStudentsTable />
        </div>

      </div>
    </DashboardLayout>
  )
}

export default Dashboard