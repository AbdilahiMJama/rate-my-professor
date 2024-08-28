'use client'
import NavigationAppBar from "../component/NavigationAppBar/page";
import { Container, Box, Typography, Divider, Button, TextField, } from "@mui/material";
import { useState } from "react";

export default function Home() {

    const [websiteLink, setWebsiteLink] = useState([])

    const scraping = () =>{
        console.log(websiteLink)
        const response = fetch('/api/scrape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({url:websiteLink}),
          })
    }

    return (
        <Container maxWidth="100vw" sx={{ bgcolor: "whitesmoke", height: "100vh", color: 'black', overflow: 'auto', }}>
            <NavigationAppBar></NavigationAppBar>

            <Box
                sx={{
                    mt: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography textAlign={'start'} fontFamily={'cursive'} variant="h4">
                    Enter a website link:
                </Typography>
                <TextField
                    value={websiteLink}
                    onChange={(e) => { setWebsiteLink(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            // console.log(websiteLink);
                            scraping()
                            setWebsiteLink("")
                        }
                    }}
                    sx={{
                        px: 2,
                        width: '70%',
                        bgcolor: '#1b1b1b',
                        borderRadius: 5,
                        border: '2px solid white',
                        boxShadow: 5,
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'transparent' },
                            '&:hover fieldset': { border: '0px' },
                            '&.Mui-focused fieldset': { borderColor: 'transparent' },
                        },

                    }}
                >

                </TextField>
            </Box>

        </Container>
    )
}