import PDFDocument from "pdfkit"
export const generatePdf=async (data)=>{
return new Promise((resolve,reject)=>{
    const doc=new PDFDocument({
        size:"A4",
        margin:50,
        info:{
            Author:"CortexAI",
            Title:data.title,
            Creator:"CortexAI"
        }
    })

const chunks=[]

doc.on("data",(chunk)=>chunks.push(chunk))
doc.on("end",()=>resolve(Buffer.concat(chunks)))
doc.on("error",()=>reject)

//title
doc
  .fontSize(28)
  .text(data.title,{
    align:"center"
  })
  .fillColor("#111827")

  if(data.subtitle){
