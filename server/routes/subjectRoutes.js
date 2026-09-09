const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware')

const { createSubject, getSubjects, getSubjectById, updateSubject, deleteSubject } = require('../controllers/subjectController')

router.post( '/', protect, authorizeRoles('admin'), createSubject, )
router.get( '/', protect, authorizeRoles('admin', 'teacher'), getSubjects, )
router.get( '/:id', protect, authorizeRoles('admin', 'teacher'), getSubjectById, )
router.put( '/:id', protect, authorizeRoles('admin'), updateSubject, )
router.delete( '/:id', protect, authorizeRoles('admin'), deleteSubject, )



module.exports = router