import { useEffect, useState } from 'react'
import { api } from '../services/api'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'



function AttendanceChart() {
  
  const [attendanceData, setAttendanceData] = useState([])
  
  useEffect(() => {
    async function loadAttendance() {
    try {
      const data = await api.get('/analytics/subject-attendance')

      console.log('subject attendance:', data)

      setAttendanceData(data)
    } catch(error) {
      console.log('Attendance error:', error.message)
    }
  }

  loadAttendance()
  }, [])



  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl">
      <h3 className="text-lg font-semibold text-white">Attendance Overview</h3>

      <p className="mt-1 mb-4 text-sm text-slate-500">
        Average attendance by subject
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />

            <XAxis dataKey="code" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />

            <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />

            <Tooltip
              contentStyle={{
                background: '#0d1120',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                color: '#f1f5f9',
              }}
              labelStyle={{ color: '#94a3b8' }}
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            />

            <Bar dataKey="averageAttendance" fill="#818cf8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AttendanceChart
