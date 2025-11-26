import React from 'react'
import { Coins, LogOut, Menu, MessageSquare, PanelLeftIcon, PanelRight, PenBoxIcon, PenSquare, Plus, User, X } from "lucide-react"
import { useState } from 'react'
import { useEffect } from 'react'
import { getConversations } from '../features/getConversations'
import { useDispatch, useSelector } from 'react-redux'
import { addConversation, setConversations, setSelectedConversation } from '../redux/conversationSlice'

import { createConversation } from '../features/createConversation'
import logOut from '../features/logOut'
import { setUserdata } from '../redux/userSlice'
import BillingDrawer from './BillingDrawer'
function SideBar() {
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch()
    const [imageError, setImageError] = useState(false)
    const { conversations, selectedConversation } = useSelector(state => state.conversation)
    const { userData } = useSelector(state => state.user)
    const [showBilling,setShowBilling]=useState(false)
    const [mobileOpen,setMobileOpen]=useState(false)
    useEffect(() => {
        const getConv = async () => {
            const data = await getConversations()
            dispatch(setConversations(data))
        }
        getConv()
    }, [userData?._id])

    const handleCreateConversation = async () => {
        const data = await createConversation()
        dispatch(addConversation(data))
    }



    if (collapsed) {
        return (
            <div className='hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-1 shrink-0'>
                <button className='flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1'
                    onClick={() => setCollapsed(false)}
                >
                    <PanelRight />
                </button>

                <button
                    className='flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer '
                    onClick={()=>dispatch(setSelectedConversation(null))}
                >
                    <Plus size={17} />
                </button>

                <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-5'>
                    {conversations.map((conv, i) => {
                        const isActive = selectedConversation?._id == conv?._id
                        return (
                            <div
                                onClick={() => dispatch(setSelectedConversation(conv))}
                                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150
                ${isActive ? "bg-indigo-500/10 border-indigo-500/[0.18]"
                                        : "bg-transparent border-transparent"}`}>
                                <div className={`flex items-center justify-center shrink-0 w-[20px] h-[20px] rounded-lg transition-colors duration-150
                ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.05] text-slate-500"}`}>
                                    <MessageSquare size={13} />
                                </div>
                               

                            </div>
                        )
                    })}

                </div>

<div className='"relative shrink-0'>
                                {
                                    (userData?.avatar && !imageError)
                                        ?
                                        <img
                                            className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25'
                                            src={userData?.avatar}
                                            alt={"image"}
                                            onError={() => setImageError(true)} />
                                        :
                                        <div className='w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center'>
                                            <User size={15} className="text-slate-400" />
                                        </div>

                                }

                            </div>
                

            </div>
        )
    }


    return (
        <>
         
       <button className='lg:hidden fixed top-3.5 left-4 z-50 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0d0f14] border border-white/[0.06] text-slate-400 hover:text-slate-200 transition-colors duration-150 cursor-pointer' onClick={()=>setMobileOpen(true)}>
