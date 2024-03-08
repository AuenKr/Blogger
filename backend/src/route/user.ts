import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { signinInput, signupInput } from "@auenkr/medium-common"
import { httpStatusCode } from "../types/httpStatusCode"
import { sign, verify } from "hono/jwt"

const user = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

// POST /api/v1/user/signup
// POST /api/v1/user/signin

user.get('/test', (c) => {
    return c.json({
        msg: 'On test route'
    })
})

user.post('/signup', async (c) => {
    try {
        const body = await c.req.json()
        const { success } = signupInput.safeParse(body)
        if (!success) {
            return c.json({
                msg: 'Invalid input format'
            }, httpStatusCode.InvalidFormat)
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const result = await prisma.user.create({
            data: body
        })

        const token = 'Bearer ' + await sign(result.id, c.env.JWT_SECRET)

        return c.json({
            msg: 'On signup route',
            authorization: token,
        })
    } catch (err) {
        return c.json({
            msg: 'Internal server error',
            err
        }, httpStatusCode.InternalServerErr)
    }
})

user.post('/signin', async (c) => {
    try {
        const body = await c.req.json()
        const { success } = signinInput.safeParse(body)
        if (!success) {
            return c.json({
                msg: 'Invalid credentials'
            }, httpStatusCode.InvalidFormat)
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        const result = await prisma.user.findUnique({
            where: body,
        })
        if (!result) {
            return c.json({
                msg: 'Invalid credentials'
            }, httpStatusCode.InvalidUser)
        }
        const token = 'Bearer ' + await sign(result.id, c.env.JWT_SECRET);
        return c.json({
            msg: 'Valid User',
            authorization: token,
        })
    } catch (err) {
        return c.json({
            msg: 'Internal Server Error',
            err
        }, httpStatusCode.InternalServerErr)
    }
})

user.get('/me', async (c) => {
    try {
        const authorization = c.req.header('authorization');
        if (!authorization) {
            throw new Error('authorization not specified')
        }
        const token = authorization.split(' ')[1];
        const userId = await verify(token, c.env.JWT_SECRET)

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

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
        return c.json({
            msg: 'Valid User',
            userId: result
        })
    } catch (err) {
        return c.json({
            msg: "Invalid token",
            err
        }, httpStatusCode.InvalidUser)
    }
})

export default user