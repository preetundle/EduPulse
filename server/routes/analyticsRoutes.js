const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const authorizeRoles = require('../middleware/roleMiddleware')


const { getOverview, getSubjectPerformance, getSubjectAttendance, getAtRiskStudents } = require('../controllers/analyticsController')


router.get('/overview', protect, authorizeRoles('admin','teacher'), getOverview)
router.get('/subject-performance', protect, authorizeRoles('admin','teacher'), getSubjectPerformance)
router.get('/subject-attendance', protect, authorizeRoles('admin','teacher'), getSubjectAttendance)
router.get('/at-risk-students', protect, authorizeRoles('admin','teacher'), getAtRiskStudents)



module.exports = router
