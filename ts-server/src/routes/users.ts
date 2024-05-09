import express from "express"
import { verifyToken } from "../middlewares/auth";
import { addRemoveFriend, getUser, getUserFriends } from "../controllers/users";

const router = express.Router();

//Read Routes

router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)

//Update Routes

router.patch("/:id/:friendId", verifyToken, addRemoveFriend)


export default router
