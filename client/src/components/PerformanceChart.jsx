import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const performanceData = [
  { semester: 'Sem 1', performance: 62 },
  { semester: 'Sem 2', performance: 66 },
  { semester: 'Sem 3', performance: 64 },
  { semester: 'Sem 4', performance: 71 },
  { semester: 'Sem 5', performance: 75 },
  { semester: 'Sem 6', performance: 78 },
]

function PerformanceChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        Performance Overview
      </h3>

      <p className="text-sm text-gray-500 mt-1 mb-4">
        Average student performance by semester
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="semester" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="performance"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PerformanceChart