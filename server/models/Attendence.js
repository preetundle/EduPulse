const mongoose = require('mongoose')

const attendenceSchema = new mongoose.Schema(
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

    classesConducted: {
      type: Number,
      required: true,
      min: 0,
    },

    classesAttended: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (value) {
        return value <= this.classesConducted
       },
          message: 'Classes attended cannot exceed classes conducted',
    }, 
      
    },
  },
  {
    timestamps: true,
  }
)

attendanceSchema.index(
  { student: 1, subject: 1 },
  { unique: true }
)


const Attendence = mongoose.model('Attendence', attendenceSchema)

module.exports = Attendence