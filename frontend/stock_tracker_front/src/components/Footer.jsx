import { Box, Typography } from "@mui/material";

export default function Footer(){
    return(
        <Box sx={{
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    color: "black",
                    textAlign: "center",
                    padding: "10px 0",
                }}>
            <Typography>CopyRight 2023 Samuel Barbosa. All Rights Reserved</Typography>
        </Box>
    )
}