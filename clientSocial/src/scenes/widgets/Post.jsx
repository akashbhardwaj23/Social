import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetComponent from "../../components/WidgetComponet";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/slice";

const Post = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
    const [isComment, setIsComment] = useState(false)
    const {palette} = useTheme()
    const dispatch =  useDispatch();
   
    const token = useSelector(state => state.token)
    const loggedInUser = useSelector(state => state.user._id)
    const isLiked = Boolean(likes[loggedInUser])
    // Do some work here
    const likedCount = Object.keys(likes).length

    const primary = palette.primary.main;
    const main = palette.neutral.main;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                // see how the loggedIn user looks
                body: JSON.stringify({userId: loggedInUser})
            }
        )

        const updatedPost = await response.json();
        dispatch(setPost({post: updatedPost}))
    }
    
    return (
        <WidgetComponent margin={"2rem 0"}>
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography sx={{marginTop:"2rem"}} color={main}>
                {description}
            </Typography>

            {picturePath && (
                <img width={"100%"} height={"auto"} src={`http://localhost:3001/assets/${picturePath}`} alt="post" style={{borderRadius:"0.75rem", marginTop:"0.75rem"}} />
            )}

            <FlexBetween marginTop={"0.25rem"}>
                <FlexBetween gap={"1rem"}>


                    <FlexBetween gap={"0.3rem"}>
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                               <FavoriteOutlined sx={{color: primary}} /> 
                            ): (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likedCount}</Typography>
                    </FlexBetween>


                <FlexBetween gap={"0.3rem"}>
                     <IconButton onClick={() => setIsComment(!isComment)}>
                        <ChatBubbleOutlineOutlined />
                     </IconButton>
                     <Typography>{comments.length}</Typography>
                </FlexBetween>

                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>

            </FlexBetween>
            {isComment && (
                <Box marginTop={"0.5rem"}>
                    {comments.map((comment,i) => {
                        return (
                            <Box key={`${name}-${i}`}>
                                <Divider />
                                <Typography sx={{color: main, margin:"0.5rem", paddingLeft: "1rem"}}>
                                    {comment}
                                </Typography>
                            </Box>
                        )
                    })}
                    <Divider />
                </Box>
            )}

        </WidgetComponent>
    )

};

export default Post
