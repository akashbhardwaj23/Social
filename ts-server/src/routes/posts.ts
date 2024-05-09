import express from "express"
import { verifyToken } from "../middlewares/auth";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts";

const router = express.Router();

//Read Routes

router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts);

//Update Routes

router.patch("/:id/like", verifyToken, likePost)

export default router