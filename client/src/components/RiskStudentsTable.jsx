import { useEffect, useState } from 'react'
import { api } from '../services/api'

function RiskStudentsTable() {
  const [riskStudents, setRiskStudents] = useState([])

  useEffect(() => {
    async function loadRiskStudents() {
      try {
        const data = await api.get('/analytics/at-risk-students')

        console.log('At-risk students:', data)

        setRiskStudents(data)
      } catch (error) {
        console.error('At-risk students error:', error.message)
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
            {riskStudents.map((student) => (
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

                <td className="px-5 py-4 text-slate-400">
                  {student.attendancePercentage}%
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {student.averageMarks}
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {student.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RiskStudentsTable