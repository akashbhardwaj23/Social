import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "./scenes/homePage/HomePage"
import LoginPage from "./scenes/loginPage/LoginPage"
import NavBar from "./scenes/navbar/Navbar"
import ProfilePage from "./scenes/profilePage/ProfilePage"
import  { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme/theme"


function App() {

  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)
  ), 
  [mode])

  const isAuth = Boolean(useSelector((state) => state.token))
  


  return (
    <div className='app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
         {/* //to reset our css */}
        <CssBaseline />
        {/* <NavBar /> */}
      
        <Routes>
           <Route path="/" element={isAuth ? <Navigate to={"/home"} /> : <LoginPage/>} />
           <Route path="/home" element={isAuth ? <HomePage/>: <Navigate to={"/"}/>} />
           <Route path= "/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to={"/"}/>}/>
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
