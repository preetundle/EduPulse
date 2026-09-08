const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
     {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    attendance: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
)

const Student = mongoose.model('Student', studentSchema)

module.exports = Student