'use client'
import Head from "next/head";
import NavigationAppBar from "./component/NavigationAppBar/page";
import Image from 'next/image';
import { Container, Box, Typography, Divider, Button, } from "@mui/material";
import { Butterfly_Kids } from "next/font/google";
export default function Home() {

  return (
    <Container maxWidth="100vw" sx={{ bgcolor: "white", height: "100vh", color: 'black', overflow: 'auto', }}>
      <Head>
        <title>Prof Guide</title>
        <meta name="description" content="" />
      </Head>
      <NavigationAppBar></NavigationAppBar>
      <Box
        sx={{
          textAlign: 'center',
          my: 4,
        }}
      >
        <Typography variant="h2" fontFamily='cursive' sx={{ mt: 10, mb: 10, }}>Welcome to Prof Guide</Typography>
        <Typography variant="h5" fontFamily='cursive'>
          The easiest and accurate professor rating website
        </Typography>
        <Typography variant="h5" fontFamily='cursive'>Generate any flashcards as you go on any topic of your choosing</Typography>
        <Button href="/chat" variant='contained' sx={{mt:10,}}>
          Get Started
        </Button>
      </Box>
      <Divider></Divider>

    </Container>
  )
}