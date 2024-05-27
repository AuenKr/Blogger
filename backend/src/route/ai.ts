import { Hono } from "hono";
import { verify } from "hono/jwt";
import { httpStatusCode } from "../types/httpStatusCode";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateBlogInput } from "../zod";
import { stream, streamText } from "hono/streaming";

const ai = new Hono<{
    Bindings: {
        GEMINI_API_KEY: string
        JWT_SECRET: string
    },
    Variables: {
        authorId: string
    }
}>();

ai.get('/', async (c) => {
    return c.json({
        msg: "route is healthy"
    })
})

ai.use(async (c, next) => {
    try {
        const authorization = c.req.header('authorization') || "";
        const token = authorization.split(' ')[1];
        const result = await verify(token, c.env.JWT_SECRET);
        c.set('authorId', result);
        await next()
    } catch (err) {
        return c.json({
            msg: "Invalid token",
        }, httpStatusCode.InvalidUser)
    }
})

ai.post('/generate', async (c) => {
    try {
        const parseInput = generateBlogInput.safeParse(await c.req.json());
        if (!parseInput.success) {
            return c.json({
                msg: "Invalid inputs",
            }, httpStatusCode.InvalidFormat)
        }
        let { currMessage, history } = parseInput.data;
        const genAI = new GoogleGenerativeAI(c.env.GEMINI_API_KEY)
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
        console.log("Generation start")
        const result = await chatSession.sendMessage(currMessage);
        console.log(result.response.text());
        console.log("Generation finished")
        return c.text(JSON.stringify(result.response.text()));
    } catch (error) {
        return c.json({
            msg: "Internal server error",
            error,
        }, httpStatusCode.InternalServerErr)
    }
})

export default ai;