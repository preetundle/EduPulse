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



  return (
    <DashboardLayout>
      <div>
        <h1>Marks Management</h1>

        <p>Students: {students.length}</p>
        <p>Subjects: {subjects.length}</p>

        <h2>Add Marks</h2>

        <div>
          {/* Student */}
          <select
            value={marksForm.student}
            onChange={(e) =>
              setMarksForm((prev) => ({
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
            value={marksForm.subject}
            onChange={(e) =>
              setMarksForm((prev) => ({
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

          {/* Exam Type */}
          <select
            value={marksForm.examType}
            onChange={(e) =>
              setMarksForm((prev) => ({
                ...prev,
                examType: e.target.value,
              }))
            }
          >
            <option value="">Select Exam Type</option>
            <option value="internal">Internal</option>
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
          </select>

          {/* Marks */}
          <input
            type="number"
            placeholder="Marks"
            value={marksForm.marks}
            onChange={(e) =>
              setMarksForm((prev) => ({
                ...prev,
                marks: e.target.value,
              }))
            }
          />

          <button onClick={handleAddMarks}>
            Add Marks
          </button>
        </div>

        <h2>Marks Records</h2>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Exam Type</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((mark) => (
              <tr key={mark._id}>
                <td>{mark.student?.name || 'Unknown'}</td>
                <td>{mark.subject?.name || 'Unknown'}</td>
                <td>{mark.examType}</td>
                <td>{mark.marks}</td>
                <td> <button
                onClick={() => handleEditClick(mark)}
                >  
                  Edit
                   </button> 
                    <button onClick={() => handleDeleteMarks(mark._id)}>
    Delete
  </button>
                   </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && editingMark && (
  <div>
    <h2>Edit Marks</h2>

    <select
      value={editingMark.student}
      onChange={(e) =>
        setEditingMark((prev) => ({
          ...prev,
          student: e.target.value,
        }))
      }
    >
      {students.map((student) => (
        <option key={student._id} value={student._id}>
          {student.name}
        </option>
      ))}
    </select>

    <select
      value={editingMark.subject}
      onChange={(e) =>
        setEditingMark((prev) => ({
          ...prev,
          subject: e.target.value,
        }))
      }
    >
      {subjects.map((subject) => (
        <option key={subject._id} value={subject._id}>
          {subject.name}
        </option>
      ))}
    </select>

    <select
      value={editingMark.examType}
      onChange={(e) =>
        setEditingMark((prev) => ({
          ...prev,
          examType: e.target.value,
        }))
      }
    >
      <option value="internal">Internal</option>
      <option value="midterm">Midterm</option>
      <option value="final">Final</option>
    </select>

    <input
      type="number"
      value={editingMark.marks}
      onChange={(e) =>
        setEditingMark((prev) => ({
          ...prev,
          marks: e.target.value,
        }))
      }
    />

    <button onClick={handleUpdateMarks}>
    Save Changes
    </button>

    <button onClick={() => setShowEditModal(false)}>
      Cancel
    </button>
  </div>
)}
    </DashboardLayout>
  )
}

export default Marks