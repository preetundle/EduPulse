const Marks = require('../models/Marks')
const Subject = require('../models/Subject')
const Student = require('../models/Student')






const createMark = async (req, res) => {
    try{
        const { student, subject, examType, marks, maxMarks, } = req.body

        const existingStudent = await Student.findById(student)

        if(!existingStudent){
            return res.status(400).json({
                message: 'Student not found'
            })
        }

        const existingSubject = await Subject.findById(subject)
        if(!existingSubject){
            return res.status(400).json({
                message: 'Subject not found',
            })
        }

        const mark = await Marks.create({
            student, subject, examType, marks, maxMarks, 
        })

        res.status(201).json({
            message: 'Marks created successfully ',
            mark,
        })


    }

    catch(error){
        res.status(400).json({
            message: 'Failed to create marks',
            error: error.message, 
        })
    }
}


const getMarks = async (req, res) => {
    try{
        const marks = await Marks.find()
        .populate('student')
        .populate('subject')
        res.status(200).json(marks)   
    } catch(error) {
        res.status(500).json({
            message: 'Failed to fetch marks',
            error: error.message,
        })
    }
}


const getMarksByStudent = async (req, res) => {
    try{
        const { studentId } = req.params
        
        const marks = await Marks.find({ student: studentId })
        .populate('student')
        .populate('subject')
        res.status(200).json(marks)   
    } catch(error) {
        res.status(500).json({
            message: 'Failed to fetch student marks',
            error: error.message,
        })
    }
}


const updateMarks = async (req, res) => {
    try{
        const marks = await Marks.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )

        if(!marks) {
            return res.status(404).json({
                message: 'marks not found'
            })
        }
        res.status(200).json({
            message: 'marks updated successfully ',
            marks,
        })

    }  catch(error){
        res.status(400).json({
            message: 'failed to update marks',
            error: error.message,
        })
    }
}


const deleteMarks = async (req, res) => {
    try{
        const mark = await Marks.findByIdAndDelete(req.params.id)

        if(!mark){
            return res.status(404).json({
                message: 'marks not found',
            })
        }

        res.status(200).json({
            message: 'marks deleted successfully',
            mark,
        })
    } catch(error) {
        res.status(500).json({
            message: 'failed to delete marks',
            error: error.message,
        })
    }
}



module.exports = {
    createMark,
    getMarks,
    getMarksByStudent,
    updateMarks,
    deleteMarks,
}
