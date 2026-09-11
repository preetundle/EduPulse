const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware')


const { createAttendance, getAttendance, getAttendanceByStudent, getLowAttendance, updateAttendance, deleteattendance } = require('../controllers/attendanceController')

router.post('/', protect, authorizeRoles('admin', 'teacher'), createAttendance)
router.get('/', protect, authorizeRoles('admin', 'teacher'), getAttendance)
router.get('/low', protect, authorizeRoles('admin','teacher'), getLowAttendance)
router.get('/student/:studentId', protect, authorizeRoles('admin', 'teacher'), getAttendanceByStudent)
router.put('/:id', protect, authorizeRoles('admin', 'teacher'), updateAttendance)
router.delete('/:id', protect, authorizeRoles('admin', 'teacher'), deleteattendance)


module.exports = router