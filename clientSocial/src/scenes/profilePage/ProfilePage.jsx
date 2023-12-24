import React, {useState, useEffect} from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../../scenes/navbar/Navbar'
import FriendsList from '../widgets/FriendsList'
import MyPostWidget from '../widgets/MyPostWidget'
import UserWidget from '../widgets/UserWidget'
import Posts from '../widgets/Posts'


function ProfilePage() {
  const [user, setUser] = useState(null)
  const {userId} = useParams()
  const token = useSelector(state => state.token)
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)")

  console.log(token)

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      }
    );

    const data = await response.json();
    console.log(data)

    setUser(data)
  }


  useEffect(() => {
    getUser();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  if(!user) return null

  return (
        <Box>
          <Navbar />

          <Box
        width={"100%"}
        padding={"2rem 6%"}
        display={isNonMobileScreen ? "flex": "block"}
        gap={"2rem"}
        justifyContent={"center"}
        >
          <Box flexBasis={isNonMobileScreen ? "26%" : undefined }>
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box margin={"2rem 0"} />
            <FriendsList userId={userId} />
          </Box>
          <Box flexBasis={isNonMobileScreen ? "42%": undefined}
            marginTop={isNonMobileScreen ? undefined: "2rem"}
          >
            <MyPostWidget picturePath={user.picturePath}/>
            <Posts userId={userId} isProfile={true} />
          </Box>
         
      </Box>

        </Box>
  )
}

export default ProfilePage