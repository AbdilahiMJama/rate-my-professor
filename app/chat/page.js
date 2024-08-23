'use client'
import { Box, Stack, TextField, Button, Typography, Drawer, ListItem, Divider, useTheme, useMediaQuery } from "@mui/material";
import { useState, useEffect } from 'react'
import ChatDrawer from "../ChatDrawer/page";
import NavigationAppBar from "../component/NavigationAppBar/page";

export default function Home() {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmScreen = useMediaQuery(theme.breakpoints.only('sm'));
  const isMdScreen = useMediaQuery(theme.breakpoints.only('md'));

  const getTitleSize = () => {
    if (isXsScreen) return '0.8rem';
    if (isSmScreen) return '1rem';
    if (isMdScreen) return '1.5rem';
    return '3rem';
  };

  const getDescriptionSize = () => {
    if (isXsScreen) return '0.4rem';
    if (isSmScreen) return '0.5rem';
    if (isMdScreen) return '0.8rem';
    return '1rem';
  };
  // We'll add more code here in the following steps
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ])
  const [message, setMessage] = useState('')
  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])

    const response = fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      if (!res.body) throw new Error('Response body is null');
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let result = ''

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
        return reader.read().then(processText)
      })
    })
  }

  const handleSendMessage = (newMessage) => {
    // Update the state with the new message
    setMessage(newMessage);
    sendMessage(newMessage)
  };

  return (
    <Box
      maxWidth='100vw'
      height={'100vh'}
      padding={"20px"}
      display={"flex"}
      justifyContent={"center"}
      overflow={"auto"}
      bgcolor={'white'}
      flexDirection={'column'}
      alignItems={'center'}
    // sx={{
    //   backgroundImage: `url('/resources/img/bg1.jpg')`,
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    // }}
    >
      <NavigationAppBar></NavigationAppBar>

      <Box
        sx={{ mt: 10, width: { xs: '80vw', sm: '80vw', md: '60vw' } }}
        height={"90%"}
        bgcolor={"white"}
        borderRadius={"10px"}
        boxShadow={"10"}
        display={"flex"}
        flexDirection={"column"}
        overflow={"hidden"}
      >
        <Box
          width="100%"
          height="10%"
          minHeight="60px"
          bgcolor="#F3E9DC"
          padding="0 20px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={1}
        >
          <Typography
            variant="h3"
            color="black"
            fontFamily="Comic Sans MS, Comic Sans, cursive"
            whiteSpace="nowrap"
            sx={{ fontSize: getTitleSize() }}
          >
            Prof. GPT
          </Typography>
          <Typography variant="h3" color="black" fontFamily="Helvetica" sx={{ fontSize: getTitleSize() }}>
            |
          </Typography>
          <Typography
            variant="body1"
            color="black"
            fontFamily="Comic Sans MS, Comic Sans, cursive"
            whiteSpace={"break-spaces"}
            sx={{
              fontSize: getDescriptionSize(),
              flexGrow: 1,
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Your friendly and supportive coffee companion who is always ready to help with professor inquires.
          </Typography>
        </Box>
        <Box
          bgcolor={"white"}
          width={"100%"}
          height={"80%"}
          minHeight={"200px"}
          padding={"20px"}
        >
          <Stack
            direction='column'
            spacing={2}
            width={"100%"}
            overflow={"auto"}
            maxHeight='100%'
          >
            {
              messages.map((message, index) => (
                <Box key={index} alignItems={"center"}
                  display='flex' justifyContent={
                    message.role === 'assistant' ? 'flex-start' : 'flex-end'
                  }>
                  <Box display={"flex"} flexWrap={"wrap"} maxWidth={"60%"}
                    color="white"
                    borderRadius={4}
                    p={1}
                    sx={{
                      background: message.role === 'assistant'
                        ? 'linear-gradient(135deg, #c08552 0%, #8B5CF6 100%)'
                        : 'linear-gradient(135deg, #895726 0%, #3B82F6 100%)',
                      color: "#F3E9DC",
                      borderRadius: '12px',
                      padding: '16px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                      },
                    }}

                  >
                    <Typography variant="body1" sx={{
                      fontSize: getDescriptionSize(),
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      hyphens: 'auto',
                    }}>
                      {message.content}
                    </Typography>

                  </Box>
                </Box>
              ))
            }
          </Stack>
        </Box>
        <Box marginBottom={"1vh"} maxWidth={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <ChatDrawer onSendMessage={handleSendMessage}></ChatDrawer>
        </Box>
      </Box>
    </Box>
  );
}
