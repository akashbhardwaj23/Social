import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/User.js"

/* Register User Authentication */

export const register = async (req, res) => {
    console.log(req.body.picturePath)
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body
        // encryption
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User(
            {
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
            }  
        );

        const savedUser = await newUser.save()

        console.log(savedUser)

        res.status(201).json(savedUser)

        // need to log the password field to see what we get

    } catch (error) {
         res.status(500).json({ error: error.message})
    }
}


/* LOGGING IN */

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
      // Using Mongoose
        const user = await User.findOne({email:email})

        if(!user) return res.status(400).send({msg:"User Doesnot exist"})

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).send({msg:"Wrong Password"})


        // _id is provided by mongoose
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        delete user.password
        res.status(200).json({token , user})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
