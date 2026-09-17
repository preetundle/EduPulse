const Student = require('../models/Student')
const Marks = require('../models/Marks')
const Attendance = require('../models/Attendance')



const getOverview =  async (req, res) => {
    try{
        const totalStudents = await Student.countDocuments()
        
        const marks = await Marks.find()
        const averageMarks = 
        marks.length === 0
        ? 0
        : marks.reduce((sum, record) => sum + record.marks, 0) / marks.length
        
        const attendance = await Attendance.find()

        const attendanceThreshold = 75

        const lowAttendanceRecords = attendance.filter((record) => {
            const percentage = 
            record.classesConducted === 0
            ? 0
            : (record.classesAttended / record.classesConducted) * 100

            return percentage < attendanceThreshold
        })

        
        const lowAttendanceStudentsIds = new Set(
            lowAttendanceRecords.map((record) =>
                record.student.toString()
            )
        )

        const lowAttendanceStudents = lowAttendanceStudentsIds.size

        const totalClassesConducted = attendance.reduce(
            (sum, record) => sum + record.classesConducted,
            0               
        )

        const totalClassesAttended = attendance.reduce(
            (sum, record) => sum + record.classesAttended,
            0
        )


        const averageAttendance = 
        totalClassesConducted === 0
        ? 0
        : (totalClassesAttended / totalClassesConducted) * 100


        return res.status(200).json({
            totalStudents,
            averageMarks: Number(averageMarks.toFixed(2)),
            averageAttendance: Number(averageAttendance.toFixed(2)),
            lowAttendanceStudents,
        })
        

    }   catch(error) {
        return res.status(500).json({
            message: 'failed to fetch analytics overview',
            error: error.message,
        })
    }
}


const getSubjectPerformance = async (req, res) => {
    try {
        const subjectPerformance = await Marks.aggregate(
            [
            {
                $group: {
                    _id: '$subject',
                    averageMarks: {
                        $avg: '$marks',
                    },
                },
            },
            {
                $lookup: {
                    from: 'subjects',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'subject',
                },
            },
            {
                $unwind: '$subject',
            },
            {
                $project: {
                    _id: 0,
                    subject: '$subject.name',
                    code: '$subject.code',
                    averageMarks: {
                        $round: ['$averageMarks', 2],
                    },
                },
            },
            
        ]
    )

        return res.status(200).json(subjectPerformance)
    }   catch(error) {
        return res.status(500).json({
            message: 'Failed to fetch subject performance',
            error: error.message,
        })
    }
}


const getSubjectAttendance = async(req, res) => {
    try {
        const subjectAttendance = await Attendance.aggregate([
            {
                $group: {
                    _id: '$subject',
                    totalClassesConducted: {
                        $sum: '$classesConducted',
                    },
                    totalClassesAttended: {
                        $sum: '$classesAttended',
                    },

                },
            },
            {
                $lookup: {
                    from:  'subjects',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'subject',
                },
            },
            {
                $unwind: '$subject',
            },
            {
                $project: {
                    _id: 0,
                    subject: '$subject.name',
                    code: '$subject.code',
                    averageAttendance: {
                        $round: [
                            {
                                $multiply: [
                                    {
                                        $divide: [
                                            '$totalClassesAttended',
                                            '$totalClassesConducted',
                                        ],
                                    },
                                    100,
                                ],
                            },
                            2,
                        ],
                    },
                },
            },  
        ])

        return res.status(200).json(subjectAttendance)

    }   catch(error) {
        return res.status(500).json({
            message: 'failed to fetch subject performance',
            error: error.message,
        })
    }
}




const getAtRiskStudents = async (req, res) => {
    try {
        const atRiskStudents = await Marks.aggregate([
            {
                $group: {
                    _id: '$student',
                    averageMarks: {
                        $avg: '$marks',
                    },
                },
            },
            {
                $lookup: {
                    from: 'attendances',
                    localField: '_id',
                    foreignField: 'student',
                    as: 'attendance',
                }
            },
            {
                $unwind: '$attendance',
            },
            {
                $project: {
                   _id: 0,
                    student: '$_id',
                    averageMarks: {
                        $round: ['$averageMarks', 2],
                        },
                        attendancePercentage: {
                        $round: [
                          {
                            $multiply: [
                        {
                            $divide: [
                                '$attendance.classesAttended',
                                '$attendance.classesConducted',
                                ],
                            },
                            100,
                     ],
                    },
                    2,
                ],
             },
        },
    }, 
    {
        $match: {
             $or: [
                { attendancePercentage: { $lt: 75} },
                { averageMarks: { $lt: 50} },
            ],
        },
    },
    {
        $lookup: {
            from: 'students',
            localField: 'student',
            foreignField: '_id',
            as: 'studentDetails',
        },
    },  
    {
        $unwind: '$studentDetails',
    },  
    {
        $project: {
            _id: 0,
            student: '$studentDetails.name',
            email: '$studentDetails.email',
            averageMarks: 1,
            attendancePercentage: 1,
            reason: {
    $switch: {
        branches: [
            {
                case: {
                    $and: [
                        { $lt: ['$averageMarks', 50] },
                        { $lt: ['$attendancePercentage', 75] },
                    ],
                },
                then: 'Low marks & low attendance',
            },
            {
                case: {
                    $lt: ['$averageMarks', 50],
                },
                then: 'Low marks',
            },
            {
                case: {
                    $lt: ['$attendancePercentage', 75],
                },
                then: 'Low attendance',
            },
        ],
        default: 'Unknown',
    },
},
        },
    }, 
                
            
        ])

        return res.status(200).json(atRiskStudents)
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch at-risk students',
            error: error.message,
        })
    }
}



module.exports = {
    getOverview,
    getSubjectPerformance,
    getSubjectAttendance,
    getAtRiskStudents,
}
