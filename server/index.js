import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js"
import User from "./models/User.js"
import Post from "./models/Post.js"
import { users, posts } from "./data/index.js"


/* Configuration */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}))
app.use(cors());
// set the dir on where we keep our assets (images)
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))


/* FILE STORAGE */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // console.log(req)
        // console.log(file)
        cb(null, "public/assets");
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
});
// for upload
const upload = multer({ storage })

// routes with files

/* THE KEY IN THE FRONTEND SHOULD BE NAMED picture */
/* app.Method(route,Middleware,calllbackFn) */


app.post("/auth/register", upload.single('picture'), register)
app.post("/post", verifyToken, upload.single('picture'), createPost);


/* ROUTES */
app.use("/auth", authRoutes)

app.use("/users", userRoutes)

app.use("/posts", postRoutes)

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
    /* ADD DATA ONE TIME */

    // User.insertMany(users)
    // Post.insertMany(posts)

}).catch(err => console.log(err))

// Authentication and Authorization


