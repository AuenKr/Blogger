
import { httpStatusCode } from "../types/httpStatusCode";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateBlogInput } from "../zod/index";
import { Router } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config()
const ai = Router();

ai.get('/', async (req, res) => {
    return res.json({
        msg: "route is healthy : /api/ai"
    })
})

ai.use(async (req, res, next) => {
    try {
        const authorization = req.header('authorization') || "";
        const token = authorization.split(' ')[1] || "";
        const result = jwt.verify(token, process.env.JWT_SECRET || "Admin Secret") as string;
        res.setHeader('authorId', result);
        next()
    } catch (err) {
        return res.status(httpStatusCode.InvalidUser).json({
            msg: "Invalid token",
        })
    }
})

ai.post('/generate', async (req, res) => {
    try {
        const parseInput = generateBlogInput.safeParse(req.body);
        if (!parseInput.success) {
            return res.status(httpStatusCode.InvalidFormat).json({
                msg: "Invalid inputs",
            })
        }
        let { currMessage, history } = parseInput.data;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "Your gemini api key")
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
            systemInstruction: "You will be given a topic to write expert blog writer within 1500 tokens and must use html element and inline css to style component.\n\nBlog must follow the below constrains:\n1. use html element for styling (inside body)\n2. human toned language\n3. Easy explains\n\nOutput format: \n\"{\ntitle: `A good title`,\ncontent: `<div> Here will be the generated content</div>`\n}\"",
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 1500,
            responseMimeType: "application/json",
        };
        const chatSession = model.startChat({
            generationConfig,
            // history: history,
        });
        console.log("Generation start for ", res.getHeader("authorId"))
        const result = await chatSession.sendMessage(currMessage);
        console.log("Generation finished for", res.getHeader("authorId"))
        return res.send(JSON.stringify(result.response.text()));
    } catch (error) {
        console.log(error)
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: "Internal server error",
            error,
        })
    }
})

export default ai;