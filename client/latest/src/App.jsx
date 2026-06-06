import React, { useEffect,useState,useMemo } from 'react'
import { io } from 'socket.io-client'

import { Container, TextField, Typography, Button } from "@mui/material";
 


const App = () => {
   const socket = useMemo(()=> io('http://localhost:3000'),[]);

  const [message, setMessage] = useState("");

  const handleSubmit= (e)=>{
    e.preventDefault();
    socket.emit('msg',message);
  

  }
  useEffect(() => {
    // receive message from server
    socket.on('wlcm', (msg) => {
      console.log(msg);
    });

    socket.on('msg', (message) => {
    console.log("Message from other socket:", message);
  });

    socket.on('allsokets', (msg)=>{
      console.log(msg)
    })
       // Cleanup function to unmount socket
     return () =>{
      socket.disconnect();
     }

  }, []);

  return <Container maxWidth="sm">
    <Typography variant='h3' component='div' gutterBottom >
  Welcome to Socket.io
    </Typography>

<form onSubmit={handleSubmit}>
  <TextField   value={message}  onChange={(e)=>setMessage(e.target.value)}   id='outlined-basic' label='Outlined' variant='outlined'/>

  <Button  type='submit 'variant='contained' color='primary'>
    Send
  </Button>
</form>

  </Container>
};

export default App;
