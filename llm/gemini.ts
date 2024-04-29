import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const gemini = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });

export default gemini;