import { Box, Typography, Divider, useTheme } from "@mui/material";
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material"
import UserImage from "../../components/UserImage"
import FlexBetween from "../../components/FlexBetween"
import WidgetComponent from "../../components/WidgetComponet";
import { useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";


const UserWidget = ({ userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector(state => state.token);
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    const getUser = async () => {
        const response = await fetch(`${BACKEND_URL}/users/${userId}`, 
        {
           method: "GET",
           headers:{
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
           }
    });
    const data  = await response.json();
    setUser(data);

};

useEffect(() => {
    getUser();
}, []) // eslint-disable-line react-hooks/exhaustive-deps

if(!user) return null;



const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends
} = user;

    return (
        <WidgetComponent>
            {/* FIRST ROW */}


            <FlexBetween
             gap={"0.5rem"}
             paddingBottom={"1.1rem"}
             onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap={"1rem"}>
                    <UserImage image = {user?.picturePath}/>
                    {console.log(user?.picturePath)}
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight={"500"}
                            sx={
                                {
                                 "&:hover":   {
                                    color:  palette.primary.light,
                                    cursor:"pointer"
                                 }
                                }
                            }
                        >
                            {firstName} {lastName}

                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                        
                    </Box>   
                </FlexBetween>
                <ManageAccountsOutlined />
                </FlexBetween>

                <Divider />

                {/* SECOND */}

                <Box
                    padding={"1rem 0"}
                >
                    <Box display={"flex"} alignContent={"center"} gap={"1rem"} marginBottom={"0.5rem"}>
                            <LocationOnOutlined fontSize="large" sx={{color:main}} />
                            <Typography color={medium} >{location}</Typography>
                    </Box>
                    <Box display={"flex"} alignContent={"center"} gap={"1rem"} >
                            <WorkOutlineOutlined fontSize="large" sx={{color:main}} />
                            <Typography color={medium} >{occupation}</Typography>
                    </Box>
                </Box>

                <Divider />

                {/* THIRD */}

                <Box padding={"1rem 0"} >
                    <FlexBetween marginBottom={"0.5rem"}>
                        <Typography color={medium}>
                            Who's Viewed Your Profile
                        </Typography>
                        <Typography color={main} fontWeight={"500"}>
                           {viewedProfile}
                        </Typography>
                    </FlexBetween>

                    <FlexBetween>
                        <Typography color={medium}>
                            Impression Of your Posts
                        </Typography>
                        <Typography color={main} fontWeight={"500"}>
                           {impressions}
                        </Typography>
                    </FlexBetween>
                </Box>

                <Divider />

                {/* FORTH ROW */}

                <Box padding={"1rem 0"}>
                    <Typography fontSize={"1rem"} color={main} fontWeight={"500"} marginBottom={"1rem"}>
                        Social Profile
                    </Typography>
                    <FlexBetween gap={"1rem"} marginBottom={"0.5rem"}>
                        <FlexBetween gap={"1rem"}>
                            <img src="../../../assets/twitter.png" alt="twitter" />
                            <Box>
                                <Typography color={main} fontWeight={"500"}>
                                    Twitter
                                </Typography>
                                <Typography color={medium}>
                                    Social Network
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}} />
                    </FlexBetween>

                    <FlexBetween gap={"1rem"}>
                        <FlexBetween gap={"1rem"}>
                            <img src="../../../assets/linkedin.png" alt="Linkdenin" />
                            <Box>
                                <Typography color={main} fontWeight={"500"}>
                                    LinkedIn
                                </Typography>
                                <Typography color={medium}>
                                   Network PlatForm
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}} />
                    </FlexBetween>
                </Box>

            

           
        </WidgetComponent>
    )

}



export default UserWidget



