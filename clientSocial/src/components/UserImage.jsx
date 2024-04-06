import { Box } from "@mui/material";
import { BACKEND_URL } from "../config";


const UserImage = ({image, size = "60px"}) => {
    return (
        <Box 
         width={size}
         height={size}
         display={"grid"}
         alignItems={"center"}
         

        >
            <img src={`${BACKEND_URL}/assets/${image}`} style={{objectFit: "cover", border:"2px dashed #1E40AF", filter:"contrast(110%)"}} width={size} height={size} alt="userImg"   />

        </Box>
    )
}
export default UserImage