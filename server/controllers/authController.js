const User = require('../models/User')
const bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')

const registerUser = async(req, res) => {
    try{
        const  { name, email, password, role} = req.body

        const existingUser = await User.findOne({ email })

        if(existingUser){
            return res.status(400).json({
                message: 'User with this email already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
            role,
        })

        res.status(201).json({
            message: 'User registered successfully', 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })

    }  catch(error) {
        res.status(500).json({
            message: 'Failed to register user',
            error: error.message,
        })
    }
}


const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body

        const user = await User.findOne({email})

        if(!user) {
            return res.status(401).json ({
                message: 'Invalid email or password',
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password,

        )

        if(!isPasswordCorrect) {
            return res.status(401).json ({
                message: 'Invalid email or password',
            })
        }

        const token = Jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },

            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            }
        )

        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })

    }  catch (error){
        res.status(500).json({
            message: 'Failed to login',
            error: error.message,
        })
    }
}





module.exports = {
    registerUser,
    loginUser,
}