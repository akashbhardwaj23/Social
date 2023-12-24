import { Box } from "@mui/material";


const UserImage = ({image, size = "60px"}) => {
    return (
        <Box 
         width={size}
         height={size}
         display={"grid"}
         alignItems={"center"}
         

        >
            <img src={`http://localhost:3001/assets/${image}`} style={{objectFit: "cover", border:"2px dashed #1E40AF", filter:"contrast(110%)"}} width={size} height={size} alt="userImg"   />

        </Box>
    )
}
export default UserImage