import React, { useEffect } from'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import './App.css';

function App() {
  const[userName,setUserName]=useState('')
  const[userMessage,setUserMessage]=useState('')
  const[messageList,setMessageList]=useState('')

 const handleSubmitFeedback=()=>{
  if(userName==='' || userMessage===''){
    alert('Please enter name and message')
    return
  }
  fetch('https://feedback-form-testing-default-rtdb.asia-southeast1.firebasedatabase.app/ /feedback.json',
{  method : 'POST',
  header :{
    'Content-Type':'application/json'
  },
  body : JSON.stringify({
    userName: userName,
    userMessage:userMessage
  })
}
  )
  .then(res => res.json())
  .then(data => {
    console.log(data)
    setUserName('')
    setUserMessage('')
    alert('Feedback submitted successfully')
  })
 }

 useEffect(()=>{
fetch('https://feedback-form-testing-default-rtdb.asia-southeast1.firebasedatabase.app/ /feedback.json')
.then(res=> res.json() )
.then(data=>{
  console.log(data)
  const loadedFeedback=[]
  for(const key in data){
    loadedFeedback.push({ 
      id : key,
      userName : data[key].userName,
      userMessage : data[key].userMessage
    })
  }
 
  setMessageList(loadedFeedback)
})
 },[])

  return (
    <div className='app-container'>
      {/* form */}
      <div className='form-container'>
        <div className='form-header'>
          <h1>Feedback Form</h1>
        </div>
  
     <TextField
          required
          id="outlined-required"
          label="Full Name"
          
          onChange={(e)=>{setUserName(e.target.value)}}
          value={userName}
        /> 

<TextField
          id="outlined-multiline-static"
          label="Feedback"
          multiline
          rows={4}

          onChange={(e)=>{setUserMessage(e.target.value)}}
          value={userMessage}
        />

<Button variant="contained" onClick={handleSubmitFeedback}>Contained</Button>

      </div>
      
      {/* form data */}
      <div className='feedback-container'>
      <h2>Feedback</h2>
      {
        messageList && messageList.map((message) =>{
          return(
            <div className='feedback-card'>
                <h3>{message.userName}</h3>
                <p>{message.userMessage} </p>
              </div>
          )
        })
      }
      </div>
    </div>
  );
}

export default App;
