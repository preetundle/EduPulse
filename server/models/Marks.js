const mongoose = require('mongoose')

const marksSchema = new mongoose.Schema(
    {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },

    examType: {
      type: String,
      enum: ['internal', 'midterm', 'final'],
      required: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    maxMarks: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
)

marksSchema.index(
  { student: 1, subject: 1, examType: 1 },
  { unique: true }
)


const Marks = mongoose.model('Marks', marksSchema)

module.exports = Marks