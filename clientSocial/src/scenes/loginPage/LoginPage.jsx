import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import Form from "./Form";
import { Box } from "@mui/system";

function LoginPage() {
  const theme = useTheme();

  const isNonMobileScreen = useMediaQuery("(min-width:1000px");
  return (
    <Box>
      <div
        className={`w-full bg-[${theme.palette.background.alt}] pt-4 px-[6%] text-center`}
      >

        
        <h1 className="font-bold text-[3rem] text-[#00d5fa]">Social</h1>
      </div>
      <div className={`${isNonMobileScreen ? "w-1/2":"w-11/12"} p-6 mx-auto rounded-3xl bg-[${theme.palette.background.alt}]`}>
        <h5 className={`font-medium mb-6`}>
            Welcome To Social, the social media for EveryOne
        </h5>
        <Form />
      </div>
    </Box>
  );

}

export default LoginPage;
