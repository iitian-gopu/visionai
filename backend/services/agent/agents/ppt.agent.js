import { getModel } from "../config/llmModels.js"
import { generatePpt } from "../utils/generatePpt.js"
import { getFromS3 } from "../utils/getFromS3.js"
import { uploadToS3 } from "../utils/uploadToS3.js"
import { deductCredits } from "../utils/deductCredits.js"
import { checkAgentLimit } from "../config/agentLimit.js"
export const pptAgent=async (state) => {
    try {
        await checkAgentLimit(state.userId,"ppt")
        const llm=await getModel("ppt")
        const prompt=`You are a professional presentation designer.

Return ONLY valid JSON.

Format:

{
"title":"",
"subtitle":"",
"slides":[
{
"title":"",
"points":[
"",
"",
"",
""
