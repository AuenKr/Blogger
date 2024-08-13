import { signinInput, signupInput } from "../zod/index"
import { httpStatusCode } from "../types/httpStatusCode";
import jwt from 'jsonwebtoken';
import { Router } from "express"
import db from '@repo/db/client';
import dotenv from 'dotenv';

dotenv.config();
const user = Router();

// POST /api/v1/user/signup
// POST /api/v1/user/signin
// GET /api/v1/user/me
user.get('/', async (req, res) => {
    try {
        return res.json({
            msg: "On route: /api/v1/user/",
        })
    } catch (error) {
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: "Internal server err",
            error
        })
    }
})

user.post('/signup', async (req, res) => {
    try {
        const body = await req.body
        const { success } = signupInput.safeParse(body)
        if (!success) {
            return res.status(httpStatusCode.InvalidFormat).json({
                msg: 'Invalid input format'
            })
        }
        const prisma = db;
        const result = await prisma.user.create({
            data: body
        })

        const token = 'Bearer ' + jwt.sign(result.id, process.env.JWT_SECRET || "Admin Secret")

        return res.json({
            msg: 'On signup route',
            authorization: token,
        })
    } catch (err) {
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: 'Internal server error',
            err
        })
    }
})

user.post('/signin', async (req, res) => {
    try {
        const body = req.body;
        const { success } = signinInput.safeParse(body)
        if (!success) {
            return res.status(httpStatusCode.InvalidFormat).json({
                msg: 'Invalid credentials'
            })
        }
        const prisma = db
        const result = await prisma.user.findUnique({
            where: body,
        })
        if (!result) {
            return res.status(httpStatusCode.InvalidUser).json({
                msg: 'Invalid credentials'
            })
        }
        const token = 'Bearer ' + jwt.sign(result.id, process.env.JWT_SECRET || "Admin Secret");
        return res.json({
            msg: 'Valid User',
            authorization: token,
        })
    } catch (err) {
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: 'Internal Server Error',
            err
        })
    }
})

user.get('/me', async (req, res) => {
    try {
        const authorization = req.header('authorization');
        if (!authorization) {
            throw new Error('authorization not specified')
        }
        const token = authorization.split(' ')[1] || "";
        const userId = jwt.verify(token, process.env.JWT_SECRET || "Admin Secret") as string;
        const prisma = db;

        const result = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })
        return res.json({
            msg: 'Valid User',
            userId: result
        })
    } catch (err) {
        return res.status(httpStatusCode.InvalidUser).json({
            msg: "Invalid token",
            err
        })
    }
})

export default user