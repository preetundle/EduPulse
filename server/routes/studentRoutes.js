const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware')


const { createStudent, getStudent, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentControllers')

router.post('/', protect, authorizeRoles('admin'), createStudent)
router.get('/', protect, authorizeRoles('admin', 'teacher'), getStudent)
router.get('/:id', protect, authorizeRoles('admin', 'teacher'),  getStudentById)
router.put('/:id', protect, authorizeRoles('admin', 'teacher'), updateStudent)
router.delete('/:id', protect, authorizeRoles('admin'), deleteStudent )


module.exports = router