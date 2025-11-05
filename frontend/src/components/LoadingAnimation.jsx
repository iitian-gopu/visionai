import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
function LoadingAnimation() {

    const Thinking_Lables = ["Thinking", "Analyzing", "Reasoning", "Generating"]
    const [labelIndex, setLabelIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setLabelIndex((prev) => (prev + 1) % Thinking_Lables.length)
        }, 1800)
        return () => clearInterval(interval)
    }, [])

    const label = Thinking_Lables[labelIndex]

    return (
        <div className='flex items-center gap-3 max-w-[72%] py-1'>
            <div className='relative w-9 h-9 flex items-center justify-center shrink-0'>
                {
                    [0, 0.45, 0.9].map((delay, i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 rounded-full border border-cyan-400/30"
                            initial={{ scale: 0.3, opacity: 0.55 }}
                            animate={{ scale: 1.7, opacity: 0 }}
                            transition={{
                                duration: 1.8,
