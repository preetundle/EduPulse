const Student = require('../models/Student')

const createStudent = async (req , res) => {
    try{
        const student = await Student.create(req.body)

        res.status(201).json({
            message: 'Student created successfully',
            student,
        })
    }
    catch(error){
        res.status(400).json({
            message: 'failed to create student',
            error: error.message,
        })
    }
}

const getStudent = async (req , res) => {
    try{
        const students = await Student.find()
        res.status(200).json(students)
    }
    catch(error){
        res.status(500).json({
            message: 'Failed to Fetch students',
            error: error.message,
        })
    }
}

const getStudentById = async ( req, res) => {
    try{
        const student = await Student.findById(req.params.id)

        if(!student){
            return res.status(404).json({
                message: 'student not found',
            })
        }
        res.status(200).json(student)
    }
    catch(error){
        res.status(500).json({
            message: 'faild to fetch student',
            error: error.message,
        })
    }
}

const updateStudent = async ( req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true}
    )

        if(!student){
            return res.status(404).json({
                message: 'student not found',
            })
        }
        res.status(200).json({
            message: 'Student created successfully',
            student,
        })
    }
    catch(error){
        res.status(500).json({
            message: 'faild to fetch student',
            error: error.message,
        })
    }
}



const deleteStudent = async ( req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id)

        if(!student){
            return res.status(404).json({
                message: 'student not found',
            })
        }
        res.status(200).json({
            message: 'Student deleted successfully',
            student,
        })
    }
    catch(error){
        res.status(500).json({
            message: 'faild to fetch student',
            error: error.message,
        })
    }
}



module.exports = {
    createStudent,
    getStudent,
    getStudentById,
    updateStudent,
    deleteStudent
}