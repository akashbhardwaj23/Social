import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import Navbar from '../navbar/Navbar'
import { useSelector } from 'react-redux'
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from "../widgets/MyPostWidget"
import Posts from '../widgets/Posts'
import AdWidget from '../widgets/AdWidget'
import FriendsList from '../widgets/FriendsList'

function HomePage() {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)")
  const {_id, picturePath} = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  console.log(token)
  console.log(_id)

  return (
    <Box>
        <Navbar />
        <Box
        width={"100%"}
        padding={"2rem 6%"}
        display={isNonMobileScreen ? "flex": "block"}
        gap={"0.5rem"}
        justifyContent={"space-between"}
        >
          <Box flexBasis={isNonMobileScreen ? "26%" : undefined }>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          <Box flexBasis={isNonMobileScreen ? "42%": undefined}
            marginTop={isNonMobileScreen ? undefined: "2rem"}
          >
            <MyPostWidget picturePath={picturePath}/>
            <Posts userId={_id} />
          </Box>
          {isNonMobileScreen && (
            <Box flexBasis={"26%"}>
               <AdWidget /> 
              <Box margin={"2rem 0"}/> 
              <FriendsList userId={_id} />
            </Box>
          )}
      </Box>
    </Box>
  )
}

export default HomePage