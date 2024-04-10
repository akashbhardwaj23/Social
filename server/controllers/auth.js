import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js'

/* Register User Authentication */

export const register = async (req, res) => {
    console.log(req.body.picturePath);
    console.log(req.file.path)
    
    const localfilePath = req?.file?.path

    if(!localfilePath) return res.status(404).json({message : "No File Found"});
    console.log("here")

    const profilePicture = await uploadOnCloudinary(localfilePath);

    console.log("I am Here ")
    console.log(profilePicture)
    if(!profilePicture) return res.status(403).json({message : "Upload on Cloudinary"})
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
            picturePath : profilePicture?.url,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
            }  
        );

        const savedUser = await newUser.save()

        console.log(savedUser);

        const token = await jwt.sign({id : savedUser._id }, process.env.JWT_SECRET)


        delete savedUser.password;

        res.status(201).json({savedUser, token})

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
