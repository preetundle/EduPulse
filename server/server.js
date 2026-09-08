const studentRoutes = require('./routes/studentRoutes')
const authRoutes = require('./routes/authRoutes')

const express = require ('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(express.json())

app.use('/api/students', studentRoutes)
app.use('/api/auth', authRoutes)

const PORT = 5000

app.get('/', (req, res) =>{
  res.send('EduPulse is running')
})

mongoose 
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch((error) => {
    console.error('MongoDB connection failed :', error.message)
  })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})