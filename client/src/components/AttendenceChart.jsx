import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const attendanceData = [
  { department: 'CSE', attendance: 86 },
  { department: 'ECE', attendance: 78 },
  { department: 'ME', attendance: 74 },
  { department: 'CIVIL', attendance: 81 },
]

function AttendanceChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        Attendance Overview
      </h3>

      <p className="text-sm text-gray-500 mt-1 mb-4">
        Average attendance by department
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="department" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="attendance"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AttendanceChart