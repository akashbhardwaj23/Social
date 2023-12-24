import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetComponent from "../../components/WidgetComponet";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state/slice";

const FriendsList = ({userId}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const token = useSelector(state => state.token);
    const friends = useSelector(state => state.user.friends);

    console.log(friends)

    console.log(userId)


    const getFriends = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )

        const data = await response.json();
        dispatch(setFriends({friends: data}))
    };

    useEffect(() => {
        getFriends();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <WidgetComponent>
            <Typography
                color={theme.palette.neutral.dark}
                variant="h5"
                fontWeight={"500"}
                sx={{marginBottom: "1.5rem"}}
            >
                Friend List
            </Typography>
            <Box display={"flex"} flexDirection={"column"} gap={"1.5rem"} marginBottom={"2rem"}>
                {friends.map(friend => (
                  
                        <Friend
                            key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName}${friend.lastName}`}
                            subtitle={friend.occupation}
                            userPicturePath={friend.picturePath}
                            isFriendList
                            />
                            )
                )}
            </Box>
        </WidgetComponent>
    )



}

export default FriendsList;