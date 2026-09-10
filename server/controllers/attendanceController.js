const Attendance = require('../models/Attendance')
const Student = require('../models/Student')
const Subject = require('../models/Subject')

const createAttendance = async (req, res) => {
    try{
        const {
            student,
            subject,
            classesConducted,
            classesAttended,
        } = req.body
        
        const existingStudent = await Student.findById(student)

        if(!existingStudent){
          return  res.status(400).json({
            message: 'Student not found',
          })
        }
        
        const existingSubject = await Subject.findById(subject)
        
        if(!existingSubject){
            return res.status(400).json({
                message: 'subject not found',
            })
        }

        const attendance = await Attendance.create({
            student, subject, classesAttended, classesConducted, 
        })


        return res.status(201).json({
            message: 'attendance created successfully',
            attendance,
        })

    }

    catch(error) {
        return res.status(400).json({
            message: 'Failed to create attendance ',
            error: error.message,
        })
    }
}




const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
        .populate('student')
        .populate('subject')

        res.status(200).json(attendance)
    } catch (error) {
        return res.status(500).json({
            message: 'failed to fetch attendance',
            error: error.message
        })
    }
}


const getAttendanceById = async (req, res) => {
    try {
        const { studentId } = req.params

        const attendance = await Attendance.find({
            student: studentId,
        })
        .populate('student')
        .populate('subject')

        return res.status(200).json(attendance)
    } catch(error) {
        res.status(500).json({
            message: 'failed to fetch attendance',
            error: error.message
        })
    }
}


const updateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(req.params.id)

        if(!attendance) {
            return res.status(404).json({
                message: 'Attendance not found',
            })
        }
        
        attendance.classesConducted = req.body.classesConducted
        attendance.classesAttended = req.body.classesAttended

        await attendance.save()

        res.status(200).json({
            message: 'attendance updated successfully ',
            attendance,
        })
    }   catch(error) {
        res.status(400).json({
            message: 'failed to update attendance',
            error: error.message,
        })
    }
}



const deleteattendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id)
        
        if(!attendance) {
            res.status(404).json({
                message: 'attendance not found'
            })
        }

        res.status(200).json({
            message: 'attendance deleted successfully',
            attendance,
        })
    }   catch(error) {
        res.status(500).json({
            message: 'failled to delete attendance',
            error: error.message,
        })
    }
}


module.exports = {
    createAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteattendance,
}