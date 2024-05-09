import express from 'express'
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import multer from "multer"
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import authRoutes from "./routes/auth"
import userRoutes from "./routes/users"
import postRoutes from "./routes/posts"
import { verifyToken } from './middlewares/auth'
import { register } from './controllers/auth'
import { createPost } from './controllers/posts'



dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "../public/assets")));



const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "public/assets");
        console.log("file", file);
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
})


const upload = multer({storage});

//@ts-ignore
app.post("/auth/register", upload.single('picture'),register);
//@ts-ignore
app.post("/post", verifyToken, upload.single('picture'), createPost);

app.use("/auth", authRoutes)

app.use("/users", userRoutes)

app.use("/posts", postRoutes)


mongoose.connect(process.env.MONGO_URL || "").then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log(err);
})