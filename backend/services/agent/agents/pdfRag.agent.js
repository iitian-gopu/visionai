import fs, { stat } from "fs"
import {PDFParse} from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { vectorStore } from "../config/vectorDb.js"
import { getModel } from "../config/llmModels.js"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import { deductCredits } from "../utils/deductCredits.js"
import { checkAgentLimit } from "../config/agentLimit.js"
export const pdfRag=async (state)=>{
   try {
    await checkAgentLimit(state.userId,"pdf")
      const buffer=fs.readFileSync(state.file.path)
      const pdf=new PDFParse({
        data:buffer
      })

      const result=await pdf.getText()
      const text=result.text

      const spilliter=new RecursiveCharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:200
      })

      const docs=await spilliter.createDocuments([text])
      const collectionName=`pdf-${Date.now()}`;
      const store=await vectorStore(docs,collectionName)
