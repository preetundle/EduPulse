const express = require('express')

const router = express.Router()

const protect = require('..//middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware')

const { createMark, getMarks, getMarksByStudent, updateMarks, deleteMarks } = require('../controllers/marksController')

router.post('/', protect, authorizeRoles('admin', 'teacher'), createMark )
router.get('/', protect, authorizeRoles('admin', 'teacher'), getMarks )
router.get('/student/:studentId', protect, authorizeRoles('admin', 'teacher'), getMarksByStudent )
router.put('/:id', protect, authorizeRoles('admin', 'teacher'), updateMarks )
router.delete('/:id', protect, authorizeRoles('admin'), deleteMarks )




module.exports = router