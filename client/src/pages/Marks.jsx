import DashboardLayout from '../layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

function Marks() {
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [marks, setMarks] = useState([])

  const [marksForm, setMarksForm] = useState({
    student: '',
    subject: '',
    examType: '',
    marks: '',
  })

  const [showEditModal, setShowEditModal] = useState(false)
  const [editingMark, setEditingMark] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const studentsData = await api.get('/students')
        const subjectsData = await api.get('/subjects')
        const marksData = await api.get('/marks')

        setStudents(studentsData)
        setSubjects(subjectsData)
        setMarks(marksData)
      } catch (error) {
        console.error('Marks page error:', error.message)
      }
    }

    loadData()
  }, [])

  async function handleAddMarks() {
    try {
      await api.post('/marks', marksForm)

      const updatedMarks = await api.get('/marks')

      setMarks(updatedMarks)

      setMarksForm({
        student: '',
        subject: '',
        examType: '',
        marks: '',
      })
    } catch (error) {
      console.error('Add marks error:', error.message)
    }
  }

  function handleEditClick(mark) {
    setEditingMark({
      ...mark,
      student: mark.student?._id || mark.student,
      subject: mark.subject?._id || mark.subject,
    })

    setShowEditModal(true)
  }

  async function handleUpdateMarks() {
    try {
      await api.put(`/marks/${editingMark._id}`, {
        student: editingMark.student,
        subject: editingMark.subject,
        examType: editingMark.examType,
        marks: editingMark.marks,
      })

      const updatedMarks = await api.get('/marks')

      setMarks(updatedMarks)
      setShowEditModal(false)
      setEditingMark(null)
    } catch (error) {
      console.error('Update marks error:', error.message)
    }
  }

  async function handleDeleteMarks(markId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this marks record?'
    )

    if (!confirmed) return

    try {
      await api.delete(`/marks/${markId}`)

      const updatedMarks = await api.get('/marks')

      setMarks(updatedMarks)
    } catch (error) {
      console.error('Delete marks error:', error.message)
    }
  }

  function getMarksStyle(markValue) {
    const value = Number(markValue)

    if (value < 50) {
      return 'bg-red-500/10 text-red-400'
    }

    if (value < 75) {
      return 'bg-amber-500/10 text-amber-400'
    }

    return 'bg-emerald-500/10 text-emerald-400'
  }

  function getExamTypeStyle(examType) {
    if (examType === 'internal') {
      return 'bg-indigo-500/10 text-indigo-400'
    }

    if (examType === 'midterm') {
      return 'bg-amber-500/10 text-amber-400'
    }

    if (examType === 'final') {
      return 'bg-emerald-500/10 text-emerald-400'
    }

    return 'bg-slate-500/10 text-slate-400'
  }

  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Marks Management
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage and track student academic performance
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-500">
              Students
            </p>

            <p className="mt-2 text-2xl font-semibold text-white">
              {students.length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Available for marks entry
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-500">
              Subjects
            </p>

            <p className="mt-2 text-2xl font-semibold text-white">
              {subjects.length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Available subjects
            </p>
          </div>
        </div>

        {/* Add Marks */}
        <div className="mb-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Add Marks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Record academic performance for a student
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {/* Student */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Student
              </label>

              <select
                value={marksForm.student}
                onChange={(e) =>
                  setMarksForm((prev) => ({
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
                value={marksForm.subject}
                onChange={(e) =>
                  setMarksForm((prev) => ({
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

            {/* Exam Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Exam Type
              </label>

              <select
                value={marksForm.examType}
                onChange={(e) =>
                  setMarksForm((prev) => ({
                    ...prev,
                    examType: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
              >
                <option value="">
                  Select Exam Type
                </option>

                <option value="internal">
                  Internal
                </option>

                <option value="midterm">
                  Midterm
                </option>

                <option value="final">
                  Final
                </option>
              </select>
            </div>

            {/* Marks */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Marks
              </label>

              <input
                type="number"
                placeholder="Enter marks"
                value={marksForm.marks}
                onChange={(e) =>
                  setMarksForm((prev) => ({
                    ...prev,
                    marks: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Add Button */}
            <div className="flex items-end">
              <button
                onClick={handleAddMarks}
                className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-400 active:scale-[0.98]"
              >
                Add Marks
              </button>
            </div>
          </div>
        </div>

        {/* Marks Records */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl">
          <div className="border-b border-white/[0.08] p-5">
            <h2 className="text-lg font-semibold text-white">
              Marks Records
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage recorded academic performance
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
                    Exam Type
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Marks
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {marks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-5 py-12 text-center"
                    >
                      <p className="text-sm text-slate-400">
                        No marks records found.
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        Add a marks record using the form above.
                      </p>
                    </td>
                  </tr>
                ) : (
                  marks.map((mark) => (
                    <tr
                      key={mark._id}
                      className="border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.03]"
                    >
                      {/* Student */}
                      <td className="px-5 py-4">
                        <span className="font-medium text-white">
                          {mark.student?.name || 'Unknown'}
                        </span>
                      </td>

                      {/* Subject */}
                      <td className="px-5 py-4">
                        <span className="text-slate-300">
                          {mark.subject?.name || 'Unknown'}
                        </span>
                      </td>

                      {/* Exam Type */}
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getExamTypeStyle(
                            mark.examType
                          )}`}
                        >
                          {mark.examType}
                        </span>
                      </td>

                      {/* Marks */}
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getMarksStyle(
                            mark.marks
                          )}`}
                        >
                          {mark.marks}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(mark)}
                            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteMarks(mark._id)
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
      {showEditModal && editingMark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0d1120] p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">
                Edit Marks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the student's academic record
              </p>
            </div>

            <div className="space-y-4">
              {/* Student */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Student
                </label>

                <select
                  value={editingMark.student}
                  onChange={(e) =>
                    setEditingMark((prev) => ({
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
                  value={editingMark.subject}
                  onChange={(e) =>
                    setEditingMark((prev) => ({
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

              {/* Exam Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Exam Type
                </label>

                <select
                  value={editingMark.examType}
                  onChange={(e) =>
                    setEditingMark((prev) => ({
                      ...prev,
                      examType: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-white/[0.08] bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                >
                  <option value="internal">
                    Internal
                  </option>

                  <option value="midterm">
                    Midterm
                  </option>

                  <option value="final">
                    Final
                  </option>
                </select>
              </div>

              {/* Marks */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Marks
                </label>

                <input
                  type="number"
                  value={editingMark.marks}
                  onChange={(e) =>
                    setEditingMark((prev) => ({
                      ...prev,
                      marks: e.target.value,
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
                  setEditingMark(null)
                }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateMarks}
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

export default Marks