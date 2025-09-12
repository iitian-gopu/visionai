import pptxgen from "pptxgenjs"

const COLORS = {
    primary: "2563EB",
    secondary: "0F172A",
    text: "334155",
    light: "F8FAFC",
    border: "E2E8F0",
    white: "FFFFFF",
    muted: "64748B",
};


export const generatePpt = async (data) => {
    const ppt = new pptxgen()
    ppt.layout = "LAYOUT_WIDE"
    ppt.author = "CortexAI"
    ppt.title = data.title
    ppt.subject = data.title
    ppt.company = "CortexAI"
    ppt.theme = {
        headFontFace: "Aptos",
        bodyFontFace: "Aptos"
    }




    addCover(ppt, data)

    data?.slides?.forEach((s, i) => {
        addContentSlide(
            ppt,
            s.title,
            s.points,
            i + 1,
            data.slides.length
        )
    });

    addThankYou(ppt)

    return ppt
}


const addCover = (ppt, data) => {
