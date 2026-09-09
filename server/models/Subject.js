const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema(
  {
     name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    credits: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
  
)

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject