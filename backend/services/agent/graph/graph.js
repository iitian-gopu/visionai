import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { visionAgent } from "../agents/vision.agent.js";
import { pdfRag } from "../agents/pdfRag.agent.js";
import { imageAnalyzer } from "../agents/imageAnalyzer.agent.js";

const workflow=new StateGraph(agentState)

workflow.addNode("router",router)
workflow.addNode("chat",chatAgent)
workflow.addNode("search",searchAgent)
workflow.addNode("coding",codingAgent)
workflow.addNode("pdf",pdfAgent)
workflow.addNode("ppt",pptAgent)
workflow.addNode("vision",visionAgent)
workflow.addNode("pdfRag",pdfRag)
workflow.addNode("imageAnalyzer",imageAnalyzer)
