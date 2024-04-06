import React, {useState} from 'react'
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from '@mui/material'
import EditOutlinedIcon  from '@mui/icons-material/EditOutlined'
import { Formik } from 'formik'
import * as yup from "yup"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from '../../state/slice'
import Dropzone from 'react-dropzone'
import FlexBetween from '../../components/FlexBetween'
import { BACKEND_URL } from '../../config'


// Dropzone - to handle file upload

// schema how yup is saving the data from the form

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invaild email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invaild email").required("required"),
    password: yup.string().required("password is required")
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""     
}

const initialValueLogin = {
    email: "",
    password:""
}


function Form() {
    const [pageType, setPageType] = useState("login")
    const {palette} = useTheme()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNotMobile = useMediaQuery("(min-width:1000px)")


    const register = async (values, onSubmitProps) => {
        // this allows us to send data info with image
        const formData = new FormData();
        for(let value in values) {
            console.log(value ," ", values[value])
            formData.append(value, values[value])
        }   

        // picture Path will be the name of the file
        formData.append("picturePath", values.picture.path)

        console.log(values.picture.path)

        const savedUserResponse = await fetch(`${BACKEND_URL}/auth/register`, 
            {
                method: "POST",
                body: formData
            }
        )
        const savedUser = await savedUserResponse.json()


        // onsubmitProps comes from formik
        onSubmitProps.resetForm()

        if(savedUser) {
            setPageType("login")
        }
    }

    const login = async (values, onSubmitProps) => {
        const loggedUserResponse = await fetch(
            `${BACKEND_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)

            }

        )

        const loggedIn = await loggedUserResponse.json();
        if(loggedIn){
            dispatch(
                setLogin(
                    {
                        user: loggedIn.user,
                        token: loggedIn.token
                    }
                )
            );
            navigate("/home");
        }
        if(!loggedIn){
            alert("Invalid Credentials")
        }

    }




    // arguments will come from formik
    const handleFormSubmit = async (values, onSubmitProps) => {
        if(pageType === "login") await login(values, onSubmitProps);
        if(pageType === "register") await register(values, onSubmitProps);
    }

  return (
    <Formik
        onSubmit={handleFormSubmit}
        initialValues={pageType === "login" ? initialValueLogin : initialValuesRegister}
        validationSchema={pageType === "login" ? loginSchema : registerSchema}
    >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm
        }) => (
            <form onSubmit={handleSubmit}>
                <Box 
                    display={"grid"}
                    gap={"30px"}
                    gridTemplateColumns={"repeat(4,minmax(0, 1fr))"}
                    sx={
                        {
                            "& > div": {gridColumn: isNotMobile ? undefined: "span 4"},
                        }
                    }
                >
                    {console.log('in the form')}

                    {/* REGISTER */}

                    {pageType === "register" && (
                        <>
                         {console.log("Whats up")}
                            <TextField
                            label="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            name = {"firstName"}
                            error= {Boolean(touched.firstName) && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                            sx={
                                {
                                    gridColumn: "span 2"
                                }
                            }
                            >

                            </TextField>

                            <TextField
                            label="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name = {"lastName"}
                            error= {Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            sx={
                                {
                                    gridColumn: "span 2"
                                }
                            }
                            >

                            </TextField>
                                {console.log("in the textField")}
                            <TextField
                            label="Location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            name = {"location"}
                            error= {Boolean(touched.location) && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                            sx={
                                {
                                    gridColumn: "span 4"
                                }
                            }
                            >

                            </TextField>

                            <TextField
                            label="Occupation"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.occupation}
                            name = {"occupation"}
                            error= {Boolean(touched.occupation) && Boolean(errors.occupation)}
                            helperText={touched.occupation && errors.occupation}
                            sx={
                                {
                                    gridColumn: "span 4"
                                }
                            }
                            >

                            </TextField>


                            {/* File Upload */}

                            <Box
                                gridColumn={"span 4"}
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius={"5px"}
                                padding={"1rem"}
                            >

                                <Dropzone
                                    acceptedFiles = ".jpg,.jpeg,.png"
                                    multiple= {false}
                                    onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0] )}
                                >
                                    {({
                                        getRootProps, getInputProps
                                    }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            padding={'1rem'}
                                            sx={{
                                                "&:hover": {
                                                   cursor:"pointer" 
                                                }
                                            }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p>Add Pictures</p>
                                            ): (
                                                <FlexBetween>
                                                    <Typography>
                                                        {values.picture.name}
                                                    </Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}

                                        </Box>
                                    )}
                                </Dropzone>

                            </Box>
                        </>
                    )}


                        <TextField
                            label="Email"
                            type='email'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name = {"email"}
                            error= {Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={
                                {
                                    gridColumn: "span 4"
                                }
                            }
                            />

                        <TextField
                            label="Password"
                            type='password'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name = {"password"}
                            error= {Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={
                                {
                                    gridColumn: "span 4"
                                }
                            }
                            />

                </Box>


                {/* BUTTONS */}

                <Box>
                    <Button 
                     type='submit'
                     fullWidth
                     sx= {
                        {
                            margin:"2rem 0",
                            padding: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": {color:palette.primary.main}
                        }
                     }
                    >
                        {pageType === "login" ? "LOGIN":"REGISTER"}
                    </Button>
                    <Typography
                        onClick = {() => {
                        setPageType(pageType === "login" ? "register":"login");
                        resetForm();
                    }}
                    sx={
                        {
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&:hover": {cursor:"pointer", color:palette.primary.dark}
                        }
                    }
                       
                    >
                        {pageType === "login" ? "Don't Have an Account ?":"Already Have an Account"}
                    </Typography>
                </Box>



            </form>
        )}
    </Formik>
  )
}

export default Form