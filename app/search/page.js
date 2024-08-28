'use client'
import NavigationAppBar from "../component/NavigationAppBar/page";
import { Container, Box, Typography, Divider, Button, TextField, List, Card, CardActionArea, CardContent, ListItem } from "@mui/material";
import { useState } from "react";

export default function Home() {

    const [query, setQuery] = useState([])
    const [searchResult, setSearchResult] = useState([])

    const querying = () => {
        console.log(query)
        fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: query }),
        })
            .then(async (res) => {
                const body = await res.json()
                setSearchResult(body)
            })

        // console.log(searchResult)
        // console.log(searchResult[0].Review)
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
                    Search:
                </Typography>
                <TextField
                    value={query}
                    onChange={(e) => { setQuery(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            querying()
                            setQuery("")
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
                    
            <Box 
            sx={{ 
                mt: 4,
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center',
                visibility: searchResult.length === 0 ? 'hidden' : 'visible',
             }}>
      <List sx={{ width: '70%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        {searchResult.map((result, index) => (
            <ListItem alignItems="flex-start" key={index}>
              <Card sx={{ width: '100%', bgcolor: '#1b1b1b', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {result.Professor}
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom>
                    {result.Stars + "/5"}
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom>
                    {result.Subject}
                  </Typography>
                  <Typography variant="body2">
                    {result.Review}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
        ))}
      </List>
    </Box>

        </Container>
    )
}