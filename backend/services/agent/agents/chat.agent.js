import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmModels.js"
import { getMemory } from "../config/memory.js"
import { deductCredits } from "../utils/deductCredits.js"
import { checkAgentLimit } from "../config/agentLimit.js"

export const chatAgent = async (state) => {

   

    try {

        await checkAgentLimit(state.userId,"chat")

         const llm = await getModel("chat")

    const history = await getMemory(state.conversationId)

   const searchContext=state.searchResults?`
   Web Search Results:

${JSON.stringify(state.searchResults)}

Answer the user using only the above search results.
`:""


    const systemPrompt = `
    You are CortexAI, an intelligent AI assistant.

 
    ${searchContext}
