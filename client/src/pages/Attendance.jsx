import DashboardLayout from '../layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

function Attendance() {
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [attendance, setAttendance] = useState([])

  const [attendanceForm, setAttendanceForm] = useState({
    student: '',
    subject: '',
    classesConducted: '',
    classesAttended: '',
  })

  const [showEditModal, setShowEditModal] = useState(false)
  const [editingAttendance, setEditingAttendance] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const studentsData = await api.get('/students')
      const subjectsData = await api.get('/subjects')
      const attendanceData = await api.get('/attendance')

      setStudents(studentsData)
      setSubjects(subjectsData)
      setAttendance(attendanceData)
    } catch (error) {
      console.error('Attendance page error:', error.message)
    }
  }

  async function handleAddAttendance() {
    try {
      if (
        !attendanceForm.student ||
        !attendanceForm.subject ||
        !attendanceForm.classesConducted ||
        !attendanceForm.classesAttended
      ) {
        alert('Please fill all fields')
        return
      }

      if (
        Number(attendanceForm.classesAttended) >
        Number(attendanceForm.classesConducted)
      ) {
        alert('Classes attended cannot exceed classes conducted')
        return
      }

      await api.post('/attendance', {
        student: attendanceForm.student,
        subject: attendanceForm.subject,
        classesConducted: Number(attendanceForm.classesConducted),
        classesAttended: Number(attendanceForm.classesAttended),
      })

      await loadData()

      setAttendanceForm({
        student: '',
        subject: '',
        classesConducted: '',
        classesAttended: '',
      })
    } catch (error) {
      console.error('Add attendance error:', error.message)
      alert(error.message)
    }
  }

  function handleEditClick(record) {
    setEditingAttendance({
      ...record,
      student: record.student?._id || record.student,
      subject: record.subject?._id || record.subject,
    })

    setShowEditModal(true)
  }

  async function handleUpdateAttendance() {
    try {
      if (
        Number(editingAttendance.classesAttended) >
        Number(editingAttendance.classesConducted)
      ) {
        alert('Classes attended cannot exceed classes conducted')
        return
      }

      await api.put(`/attendance/${editingAttendance._id}`, {
        student: editingAttendance.student,
        subject: editingAttendance.subject,
        classesConducted: Number(
          editingAttendance.classesConducted
        ),
        classesAttended: Number(
          editingAttendance.classesAttended
        ),
      })

      await loadData()

      setShowEditModal(false)
      setEditingAttendance(null)
    } catch (error) {
      console.error('Update attendance error:', error.message)
      alert(error.message)
    }
  }

  async function handleDeleteAttendance(attendanceId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this attendance record?'
    )

    if (!confirmed) return

    try {
      await api.delete(`/attendance/${attendanceId}`)

      await loadData()
    } catch (error) {
      console.error('Delete attendance error:', error.message)
      alert(error.message)
    }
  }

  function calculatePercentage(attended, conducted) {
    if (!conducted) return 0

    return ((attended / conducted) * 100).toFixed(1)
  }

  function getAttendanceStyle(attended, conducted) {
    const percentage = Number(
      calculatePercentage(attended, conducted)
    )

    if (percentage < 75) {
      return 'bg-red-500/10 text-red-400'
    }

    if (percentage < 85) {
      return 'bg-amber-500/10 text-amber-400'
    }

    return 'bg-emerald-500/10 text-emerald-400'
  }

  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Attendance Management
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Track and manage student attendance records
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Students */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-500">
              Students
            </p>

            <p className="mt-2 text-2xl font-semibold text-white">
              {students.length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Students available
            </p>
          </div>

          {/* Subjects */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-500">
              Subjects
            </p>

            <p className="mt-2 text-2xl font-semibold text-white">
              {subjects.length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Subjects being tracked
            </p>
          </div>

          {/* Attendance Records */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-500">
              Attendance Records
            </p>

            <p className="mt-2 text-2xl font-semibold text-white">
              {attendance.length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Total records
            </p>
          </div>
        </div>

        {/* Add Attendance */}
        <div className="mb-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Add Attendance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Record attendance for a student and subject
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {/* Student */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Student
              </label>

              <select
                value={attendanceForm.student}
                onChange={(e) =>
                  setAttendanceForm((prev) => ({
                    ...prev,
                    student: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
              >
                <option value="">
                  Select Student
                </option>

                {students.map((student) => (
                  <option
                    key={student._id}
                    value={student._id}
                  >
                    {student.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Subject
              </label>

              <select
                value={attendanceForm.subject}
                onChange={(e) =>
                  setAttendanceForm((prev) => ({
                    ...prev,
                    subject: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
              >
                <option value="">
                  Select Subject
                </option>

                {subjects.map((subject) => (
                  <option
                    key={subject._id}
                    value={subject._id}
                  >
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Classes Conducted */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Classes Conducted
              </label>

              <input
                type="number"
                min="1"
                placeholder="Classes conducted"
                value={attendanceForm.classesConducted}
                onChange={(e) =>
                  setAttendanceForm((prev) => ({
                    ...prev,
                    classesConducted: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Classes Attended */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Classes Attended
              </label>

              <input
                type="number"
                min="0"
                placeholder="Classes attended"
                value={attendanceForm.classesAttended}
                onChange={(e) =>
                  setAttendanceForm((prev) => ({
                    ...prev,
                    classesAttended: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Add Button */}
            <div className="flex items-end">
              <button
                onClick={handleAddAttendance}
                className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-400 active:scale-[0.98]"
              >
                Add Attendance
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Records */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl">
          <div className="border-b border-white/[0.08] p-5">
            <h2 className="text-lg font-semibold text-white">
              Attendance Records
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage student attendance
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-left text-slate-500">
                  <th className="px-5 py-4 font-medium">
                    Student
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Subject
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Classes Conducted
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Classes Attended
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Attendance
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-5 py-12 text-center"
                    >
                      <p className="text-sm text-slate-400">
                        No attendance records found.
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        Add an attendance record using the form above.
                      </p>
                    </td>
                  </tr>
                ) : (
                  attendance.map((record) => (
                    <tr
                      key={record._id}
                      className="border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.03]"
                    >
                      {/* Student */}
                      <td className="px-5 py-4">
                        <span className="font-medium text-white">
                          {record.student?.name || 'Unknown'}
                        </span>
                      </td>

                      {/* Subject */}
                      <td className="px-5 py-4">
                        <span className="text-slate-300">
                          {record.subject?.name || 'Unknown'}
                        </span>
                      </td>

                      {/* Classes Conducted */}
                      <td className="px-5 py-4 text-slate-400">
                        {record.classesConducted}
                      </td>

                      {/* Classes Attended */}
                      <td className="px-5 py-4 text-slate-400">
                        {record.classesAttended}
                      </td>

                      {/* Attendance Percentage */}
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getAttendanceStyle(
                            record.classesAttended,
                            record.classesConducted
                          )}`}
                        >
                          {calculatePercentage(
                            record.classesAttended,
                            record.classesConducted
                          )}
                          %
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              handleEditClick(record)
                            }
                            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteAttendance(record._id)
                            }
                            className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingAttendance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0d1120] p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">
                Edit Attendance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the student's attendance record
              </p>
            </div>

            <div className="space-y-4">
              {/* Student */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Student
                </label>

                <select
                  value={editingAttendance.student}
                  onChange={(e) =>
                    setEditingAttendance((prev) => ({
                      ...prev,
                      student: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                >
                  {students.map((student) => (
                    <option
                      key={student._id}
                      value={student._id}
                    >
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Subject
                </label>

                <select
                  value={editingAttendance.subject}
                  onChange={(e) =>
                    setEditingAttendance((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                >
                  {subjects.map((subject) => (
                    <option
                      key={subject._id}
                      value={subject._id}
                    >
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Classes Conducted */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Classes Conducted
                </label>

                <input
                  type="number"
                  min="1"
                  value={editingAttendance.classesConducted}
                  onChange={(e) =>
                    setEditingAttendance((prev) => ({
                      ...prev,
                      classesConducted: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              {/* Classes Attended */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Classes Attended
                </label>

                <input
                  type="number"
                  min="0"
                  value={editingAttendance.classesAttended}
                  onChange={(e) =>
                    setEditingAttendance((prev) => ({
                      ...prev,
                      classesAttended: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setEditingAttendance(null)
                }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateAttendance}
                className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Attendance