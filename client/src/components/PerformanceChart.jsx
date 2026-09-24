import { useEffect, useState } from 'react'
import { api } from '../services/api'
import AsyncState from './AsyncState'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'


function PerformanceChart() {

  const [performanceData, setPerformanceData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    async function loadPerformance() {
      try {
        const data = await api.get('/analytics/subject-performance')
        console.log('Subject performance:', data)
        setPerformanceData(data)
      }  catch (error) {
        console.log('performance error : ', error.message)
        setError(error.message)
      } finally{
        setLoading(false)
      }
    }
    loadPerformance()
  }, [])

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl">
      <h3 className="text-lg font-semibold text-white">Performance Overview</h3>

      <p className="mt-1 mb-4 text-sm text-slate-500">
        Average marks by subject
      </p>

      <AsyncState loading={loading} error={error}>
        {performanceData.length === 0 ? (
    <p className="py-20 text-center text-slate-500">
      No performance data available.
    </p>
  ) : (
  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={performanceData}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.06)"
        />

        <XAxis
          dataKey="code"
          stroke="#64748b"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />

        <YAxis
          stroke="#64748b"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />

        <Tooltip
          contentStyle={{
            background: '#0d1120',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            color: '#f1f5f9',
          }}
          labelStyle={{ color: '#94a3b8' }}
        />

        <Line
          type="monotone"
          dataKey="averageMarks"
          stroke="#818cf8"
          strokeWidth={3}
          dot={{ fill: '#818cf8', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
  )}
</AsyncState>
    </div>
  )
}

export default PerformanceChart
