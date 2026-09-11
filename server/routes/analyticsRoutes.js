const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const authorizeRoles = require('../middleware/roleMiddleware')


const { getOverview, } = require('../controllers/analyticsController')


router.get('/overview', protect, authorizeRoles('admin','teacher'), getOverview)



module.exports = router
