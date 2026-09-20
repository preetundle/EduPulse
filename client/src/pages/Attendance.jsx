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

  return (
    <DashboardLayout>
      <div>
        <h1>Attendance Management</h1>

        <p>Students: {students.length}</p>
        <p>Subjects: {subjects.length}</p>
        <p>Attendance Records: {attendance.length}</p>

        <h2>Add Attendance</h2>

        <div>
          {/* Student */}
          <select
            value={attendanceForm.student}
            onChange={(e) =>
              setAttendanceForm((prev) => ({
                ...prev,
                student: e.target.value,
              }))
            }
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>

          {/* Subject */}
          <select
            value={attendanceForm.subject}
            onChange={(e) =>
              setAttendanceForm((prev) => ({
                ...prev,
                subject: e.target.value,
              }))
            }
          >
            <option value="">Select Subject</option>

            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>

          {/* Classes Conducted */}
          <input
            type="number"
            min="1"
            placeholder="Classes Conducted"
            value={attendanceForm.classesConducted}
            onChange={(e) =>
              setAttendanceForm((prev) => ({
                ...prev,
                classesConducted: e.target.value,
              }))
            }
          />

          {/* Classes Attended */}
          <input
            type="number"
            min="0"
            placeholder="Classes Attended"
            value={attendanceForm.classesAttended}
            onChange={(e) =>
              setAttendanceForm((prev) => ({
                ...prev,
                classesAttended: e.target.value,
              }))
            }
          />

          <button onClick={handleAddAttendance}>
            Add Attendance
          </button>
        </div>

        <h2>Attendance Records</h2>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Classes Conducted</th>
              <th>Classes Attended</th>
              <th>Attendance %</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((record) => (
              <tr key={record._id}>
                <td>
                  {record.student?.name || 'Unknown'}
                </td>

                <td>
                  {record.subject?.name || 'Unknown'}
                </td>

                <td>{record.classesConducted}</td>

                <td>{record.classesAttended}</td>

                <td>
                  {calculatePercentage(
                    record.classesAttended,
                    record.classesConducted
                  )}
                  %
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleEditClick(record)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteAttendance(record._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        {showEditModal && editingAttendance && (
          <div>
            <h2>Edit Attendance</h2>

            {/* Student */}
            <select
              value={editingAttendance.student}
              onChange={(e) =>
                setEditingAttendance((prev) => ({
                  ...prev,
                  student: e.target.value,
                }))
              }
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

            {/* Subject */}
            <select
              value={editingAttendance.subject}
              onChange={(e) =>
                setEditingAttendance((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }))
              }
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

            {/* Classes Conducted */}
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
            />

            {/* Classes Attended */}
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
            />

            <button onClick={handleUpdateAttendance}>
              Save Changes
            </button>

            <button
              onClick={() => {
                setShowEditModal(false)
                setEditingAttendance(null)
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Attendance