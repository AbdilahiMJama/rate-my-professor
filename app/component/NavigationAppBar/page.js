import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material";


export default function NavigationAppBar() {
  return (
    <AppBar
      sx={{
        maxHeight: '100px',
        position: 'relative',
        bgcolor: 'transparent',
        p: 1,
        boxShadow: 0,
      }}
    >
      <Toolbar
        sx={{
          bgcolor: '#1b1b1b',
          borderRadius: 5,
          border: '1px solid white',
          color: '#1b1b1b',
          boxShadow: 5,
        }}
      >
        <Typography fontFamily={'sans-serif'} style={{ flexGrow: 1 }}>
          <Button
            disableRipple
            href="/"
            sx={{
              color: 'white',
              borderRadius: 5,
              transform: 'scale(1.2)',
              '&:hover': {
                bgcolor: 'white',
                color: 'black',
                transform: 'scale(1.3)', // Scale up the button
              },
            }}
          >
            Home
          </Button>
        </Typography>

        <Button
          disableRipple
          href="/scrape"
          sx={{
            color: 'white',
            borderRadius: 5,
            mr: 3,
            '&:hover': {
              bgcolor: 'white',
              color: 'black',
              transform: 'scale(1.2)', // Scale up the button
            }

          }}
        >
          Scrape
        </Button>

        <Button
          disableRipple
          sx={{
            color: 'white',
            borderRadius: 5,
            mr: 3,
            '&:hover': {
              bgcolor: 'white',
              color: 'black',
              transform: 'scale(1.2)', // Scale up the button
            }

          }}
        >
          Search
        </Button>

        <Button disableRipple
        href="/chat"
          sx={{
            color: 'white',
            borderRadius: 5,
            '&:hover': {
              bgcolor: 'white',
              color: 'black',
              transform: 'scale(1.2)', // Scale up the button
            }

          }}
        >
          Chat
        </Button>
      </Toolbar>
    </AppBar>
  )
}