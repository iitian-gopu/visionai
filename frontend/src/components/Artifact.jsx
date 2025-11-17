import { Check, Code2, Copy, Eye, PanelRightClose, PanelRightOpen, X } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, easeInOut, motion } from "motion/react"
import Editor from '@monaco-editor/react';
function Artifact() {
  const [collapsed, setCollapsed] = useState(false)
  const { artifacts } = useSelector(state => state.message)
  const [tab, setTab] = useState("code")
  const [activeFile, setActiveFile] = useState(0)
  const [copied, setCopied] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  if (artifacts.length == 0) return;



  const file = artifacts[0]?.files[activeFile]
  const htmlFile = artifacts[0]?.files?.find(f => f.name == "index.html")
  const cssFile = artifacts[0]?.files?.find(f => f.name == "style.css")
  const jsFile = artifacts[0]?.files?.find(f => f.name == "script.js")

  const canPreview = Boolean(htmlFile)

  const previewDoc = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
     ${cssFile?.content || ""}
    </style>
</head>
<body>
 ${htmlFile?.content || ""} 
<script>
    ${jsFile?.content || ""}
</script>    
</body>
</html>`


  const handleCopy = async () => {
    await navigator.clipboard.writeText(file?.content || "")
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const detectLanguage = (fileName = "") => {
    const name = fileName.toLowerCase()

    if (name.endsWith(".html"))
      return "html";

    if (name.endsWith(".css"))
      return "css";

    if (name.endsWith(".js"))
      return "javascript";

    if (name.endsWith(".jsx"))
      return "javascript";

    if (name.endsWith(".ts"))
      return "typescript";

    if (name.endsWith(".tsx"))
      return "typescript";

    if (name.endsWith(".json"))
      return "json";

    if (name.endsWith(".py"))
      return "python";

    if (name.endsWith(".java"))
      return "java";

    if (name.endsWith(".cpp"))
      return "cpp";

    if (name.endsWith(".c"))
      return "c";

    return "plaintext";

  }

  const PanelContent = ({onClose}) => {
    return (
      <>
        {!collapsed ? <div className='flex flex-col h-full bg-[#0d0f14]'>

          <div className='h-14 px-4 border-b border-white/[0.06] flex items-center gap-3 shrink-0'>
            <button className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0' onClick={onClose ?? (() => setCollapsed(true))}>
              {onClose?<X size={15}/>:<PanelRightClose size={16} />}
