const riskStudents = [
  {
    id: 1,
    name: 'Rahul Sharma',
    department: 'CSE',
    attendance: 58,
    marks: 36,
    risk: 'High',
  },
  {
    id: 2,
    name: 'Priya Verma',
    department: 'ECE',
    attendance: 64,
    marks: 42,
    risk: 'Medium',
  },
  {
    id: 3,
    name: 'Aman Patel',
    department: 'CSE',
    attendance: 52,
    marks: 31,
    risk: 'High',
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    department: 'ME',
    attendance: 69,
    marks: 48,
    risk: 'Medium',
  },
]

function RiskStudentsTable() {
  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          At-Risk Students
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Students who may need academic attention
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">Department</th>
              <th className="px-5 py-3 font-medium">Attendance</th>
              <th className="px-5 py-3 font-medium">Marks</th>
              <th className="px-5 py-3 font-medium">Risk</th>
            </tr>
          </thead>

          <tbody>
            {riskStudents.map((student) => (
              <tr
                key={student.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-5 py-4 font-medium text-gray-900">
                  {student.name}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {student.department}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {student.attendance}%
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {student.marks}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={
                      student.risk === 'High'
                        ? 'px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700'
                        : 'px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700'
                    }
                  >
                    {student.risk}
                  </span>
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