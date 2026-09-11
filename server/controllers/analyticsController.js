const Student = require('../models/Student')
const Marks = require('../models/Marks')




const getOverview =  async (req, res) => {
    try{
        const totalStudents = await Student.countDocuments()
        
        const marks = await Marks.find()
        const averageMarks = 
        marks.length === 0
        ? 0
        : marks.reduce((sum, record) => sum + record.marks, 0) / marks.length
        
        return res.status(200).json({
            totalStudents,
            averageMarks: Number(averageMarks.toFixed(2)),
        })
        

    }   catch(error) {
        return res.status(500).json({
            message: 'failed to fetch analytics overview',
            error: error.message,
        })
    }
}



module.exports = {
    getOverview,
}