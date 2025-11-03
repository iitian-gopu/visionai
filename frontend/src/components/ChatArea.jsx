import React, { useEffect } from 'react'
import Nav from './Nav'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import getMessages from '../features/getMessages'
import { setArtifacts, setMessages } from '../redux/messageSlice'

function ChatArea() {
  const {selectedConversation}=useSelector(state=>state.conversation)
  const dispatch=useDispatch()
  useEffect(()=>{
  const getMesg=async () => {
    
    if(selectedConversation){
      if(selectedConversation.title=="New Chat")return;
const data=await getMessages(selectedConversation?._id)
console.log(data)
      dispatch(setMessages(data))
