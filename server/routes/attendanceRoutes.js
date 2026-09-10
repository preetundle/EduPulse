const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware')


const { createAttendance, getAttendance, getAttendanceById, updateAttendance, deleteattendance } = require('../controllers/attendanceController')

router.post('/', protect, authorizeRoles('admin', 'teacher'), createAttendance)
router.get('/', protect, authorizeRoles('admin', 'teacher'), getAttendance)
router.get('/student/:studentId', protect, authorizeRoles('admin', 'teacher'), getAttendanceById)
router.put('/:id', protect, authorizeRoles('admin', 'teacher'), updateAttendance)
router.delete('/:id', protect, authorizeRoles('admin', 'teacher'), deleteattendance)


module.exports = router