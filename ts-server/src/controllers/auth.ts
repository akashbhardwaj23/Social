import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"
import User from '../models/User';
import { uploadOnCloudinary } from '../utils/cloudinary'


// Register a new user



export const register = async (req:any, res:any) => {
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
        const salt = await bcryptjs.genSalt();
        const passwordHash = await bcryptjs.hash(password, salt)



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

        const token = await jwt.sign({id : savedUser._id }, process.env.JWT_SECRET || "")

        //@ts-ignore
        delete savedUser.password;

        res.status(201).json({savedUser, token})

        // need to log the password field to see what we get

    } catch (error:any) {
         res.status(500).json({ error: error.message})
    }
}

// Login a user



export const login = async (req:any, res:any) => {
    try {
        const {email, password} = req.body
      // Using Mongoose
        const user = await User.findOne({email:email})

        if(!user) return res.status(400).send({msg:"User Doesnot exist"})

        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch) return res.status(400).send({msg:"Wrong Password"})


        // _id is provided by mongoose
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET || "")
        //@ts-ignore
        delete user.password
        res.status(200).json({token , user})

    } catch (error:any) {
        res.status(500).json({error:error.message})
    }
}
