import { Typography, useTheme } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import WidgetComponent from "../../components/WidgetComponet"

const AdWidget = () => {
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium


    return (
        <WidgetComponent>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight={"500"}>
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Add</Typography>
            </FlexBetween>
            <img width={"100%"} height={"auto"} src="http://localhost:3001/assets/info4.jpeg" alt="Advertisement" style={{borderRadius:"0.75rem", margin:"0.75rem 0"}} />
            <FlexBetween>
                <Typography color={main}>Mika</Typography>
                <Typography color={medium}>Mica.com</Typography>
            </FlexBetween>
            <Typography color={medium} margin={"0.5rem 0"}>
                Your PathWay to stunning beauty
            </Typography>
        </WidgetComponent>
    )



}

export default AdWidget