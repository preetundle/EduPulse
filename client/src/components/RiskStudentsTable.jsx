import { useEffect, useState } from 'react'
import { api } from '../services/api'
import AsyncState from './AsyncState'

function RiskStudentsTable() {
  const [riskStudents, setRiskStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadRiskStudents() {
      try {
        const data = await api.get('/analytics/at-risk-students')

        console.log('At-risk students:', data)

        setRiskStudents(data)
      } catch (error) {
        console.error('At-risk students error:', error.message)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadRiskStudents()
  }, [])

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl">
      <div className="border-b border-white/[0.08] p-5">
        <h3 className="text-lg font-semibold text-white">At-Risk Students</h3>

        <p className="mt-1 text-sm text-slate-500">
          Students who may need academic attention
        </p>
      </div>
    <AsyncState loading={loading} error={error}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-slate-500">
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Attendance</th>
              <th className="px-5 py-3 font-medium">Marks</th>
              <th className="px-5 py-3 font-medium">Reason</th>
            </tr>
          </thead>

          <tbody>
  {riskStudents.length === 0 ? (
    <tr>
      <td
        colSpan="5"
        className="px-5 py-10 text-center text-slate-500"
      >
        No students currently require attention.
      </td>
    </tr>
  ) : (
    riskStudents.map((student) => (
      <tr
        key={student.student}
        className="border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.03]"
      >
        <td className="px-5 py-4 font-medium text-white">
          {student.student}
        </td>

        <td className="px-5 py-4 text-slate-400">
          {student.email}
        </td>

        <td
  className={`px-5 py-4 ${
    student.attendancePercentage < 75
      ? 'font-medium text-red-400'
      : 'text-slate-400'
  }`}
>
  {student.attendancePercentage}%
</td>

        <td
  className={`px-5 py-4 ${
    student.averageMarks < 50
      ? 'font-medium text-red-400'
      : 'text-slate-400'
  }`}
>
  {student.averageMarks}
</td>

        <td className="px-5 py-4">
  <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
    {student.reason}
  </span>
</td>
      </tr>
    ))
  )}
          </tbody>
        </table>
      </div>
      </AsyncState>
    </div>
  )
}

export default RiskStudentsTable