import DashboardLayout from '../layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const [showAddModal, setShowAddModal] = useState(false)

  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    department: '',
    semester: '',
    attendance: '',
    marks: '',
  })

  const [showEditModal, setShowEditModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  function handleEditClick(student) {
    setEditingStudent(student)
    setShowEditModal(true)
  }

  function handleEditChange(e) {
    const { name, value } = e.target

    setEditingStudent((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

async function handleUpdateStudent() {
  try {
    const updatedStudent = await api.put(
      `/students/${editingStudent._id}`,
      editingStudent
    )

    setStudents((prev) =>
      prev.map((student) =>
        student._id === updatedStudent._id
          ? updatedStudent
          : student
      )
    )

    setShowEditModal(false)
    setEditingStudent(null)
  } catch (error) {
    console.error('Update student error:', error.message)
  }
}

async function handleDeleteStudent(studentId) {
  const confirmed = window.confirm(
    'Are you sure you want to delete this student?'
  )

  if (!confirmed) return

  try {
    await api.delete(`/students/${studentId}`)

    setStudents((prev) =>
      prev.filter((student) => student._id !== studentId)
    )
  } catch (error) {
    console.error('Delete student error:', error.message)
  }
}




  function handleFormChange(e) {
    const { name, value } = e.target

    setStudentForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleAddStudent() {
    try {
      const newStudent = await api.post('/students', studentForm)

      setStudents((prev) => [...prev, newStudent])

      setStudentForm({
        name: '',
        email: '',
        department: '',
        semester: '',
        attendance: '',
        marks: '',
      })

      setShowAddModal(false)
    } catch (error) {
      console.error('Add student error:', error.message)
    }
  }

  useEffect(() => {
    async function loadStudent() {
      try {
        const data = await api.get('/students')
        setStudents(data)
      } catch (error) {
        console.log('Student error:', error.message)
      } finally {
        setLoading(false)
      }
    }

    loadStudent()
  }, [])

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Students
          </h2>

          <p className="mt-1 text-slate-400">
            Browse and manage enrolled students.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400"
        >
          Add Student
        </button>
      </div>

      {/* Student Directory */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl">
        <div className="border-b border-white/[0.08] px-5 py-4">
          <h3 className="text-lg font-semibold text-white">
            Student Directory
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {students.length} students currently enrolled
          </p>
        </div>

        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-slate-500">
            Loading students...
          </div>
        ) : students.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-slate-500">
            No students found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-left text-slate-500">
                  <th className="px-5 py-3 font-medium">
                    Name
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Email
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Department
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Semester
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Attendance
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Marks
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student._id}
                    className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4 font-medium text-white">
                      {student.name}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {student.email}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {student.department}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {student.semester}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {student.attendance}%
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {student.marks}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleEditClick(student)}
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                      onClick={() => handleDeleteStudent(student._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f1420] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Add Student
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new student to EduPulse.
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm text-slate-400">
                  Name
                </label>

                <input
                  name="name"
                  value={studentForm.name}
                  onChange={handleFormChange}
                  placeholder="Enter student name"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-400/50"
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm text-slate-400">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={studentForm.email}
                  onChange={handleFormChange}
                  placeholder="student@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-400/50"
                />
              </div>

              {/* Department */}
              <div>
                <label className="mb-1.5 block text-sm text-slate-400">
                  Department
                </label>

                <input
                  name="department"
                  value={studentForm.department}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      department: e.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="CSIT"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-400/50"
                />
              </div>

              {/* Semester */}
              <div>
                <label className="mb-1.5 block text-sm text-slate-400">
                  Semester
                </label>

                <input
                  type="number"
                  name="semester"
                  value={studentForm.semester}
                  onChange={handleFormChange}
                  placeholder="6"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-400/50"
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="mb-1.5 block text-sm text-slate-400">
                  Attendance
                </label>

                <input
                  type="number"
                  name="attendance"
                  value={studentForm.attendance}
                  onChange={handleFormChange}
                  placeholder="85"
                  min="0"
                  max="100"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-400/50"
                />
              </div>

              {/* Marks */}
              <div>
                <label className="mb-1.5 block text-sm text-slate-400">
                  Marks
                </label>

                <input
                  type="number"
                  name="marks"
                  value={studentForm.marks}
                  onChange={handleFormChange}
                  placeholder="80"
                  min="0"
                  max="100"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-400/50"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAddStudent}
                className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f1420] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Edit Student
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Update student information.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowEditModal(false)
                  setEditingStudent(null)
                }}
                className="text-slate-400 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm text-slate-400">
                  Name
                </label>

                <input
                  name="name"
                  value={editingStudent.name}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-400/50"
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm text-slate-400">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={editingStudent.email}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-400/50"
                />
              </div>

              {/* Department */}
              <div>
                <label className="mb-1.5 block text-sm text-slate-400">
                  Department
                </label>

                <input
                  name="department"
                  value={editingStudent.department}
                  onChange={(e) =>
                    setEditingStudent((prev) => ({
                      ...prev,
                      department: e.target.value.toUpperCase(),
                    }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-400/50"
                />
              </div>

              {/* Semester */}
              <div>
                <label className="mb-1.5 block text-sm text-slate-400">
                  Semester
                </label>

                <input
                  type="number"
                  name="semester"
                  value={editingStudent.semester}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-400/50"
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="mb-1.5 block text-sm text-slate-400">
                  Attendance
                </label>

                <input
                  type="number"
                  name="attendance"
                  value={editingStudent.attendance}
                  onChange={handleEditChange}
                  min="0"
                  max="100"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-400/50"
                />
              </div>

              {/* Marks */}
              <div>
                <label className="mb-1.5 block text-sm text-slate-400">
                  Marks
                </label>

                <input
                  type="number"
                  name="marks"
                  value={editingStudent.marks}
                  onChange={handleEditChange}
                  min="0"
                  max="100"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-400/50"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false)
                  setEditingStudent(null)
                }}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdateStudent}
                className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400"
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

export default Students