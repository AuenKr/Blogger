import { Hono } from "hono";
import { verify } from "hono/jwt";
import { httpStatusCode } from "../types/httpStatusCode";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput, } from "@auenkr/medium-common";

const blog = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        authorId: string
    }
}>();

// Middleware 
// Authorization
blog.use(async (c, next) => {
    try {
        const authorization = c.req.header('authorization') || "";
        const token = authorization.split(' ')[1];
        const result = await verify(token, c.env.JWT_SECRET)
        c.set('authorId', result);
        await next()
    } catch (err) {
        return c.json({
            msg: "Invalid token",
        }, httpStatusCode.InvalidUser)
    }
})

// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/bulk
// GET /api/v1/blog/:id

blog.post('/', async (c) => {
    try {
        const body = await c.req.json();
        const { success } = createBlogInput.safeParse(body);
        if (!success) {
            return c.json({
                msg: 'Invalid input Format',
            }, httpStatusCode.InvalidFormat)
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        body['authorId'] = c.get('authorId');
        const result = await prisma.post.create({
            data: body
        })

        return c.json({
            msg: 'Blog created successful',
            data: result
        })
    } catch (err) {
        return c.json({
            msg: "Internal server error",
            err
        }, httpStatusCode.InternalServerErr)
    }
})

blog.put('/', async (c) => {
    try {
        const body = await c.req.json();
        const { success } = updateBlogInput.safeParse(body);
        if (!success) {
            return c.json({
                msg: 'Invalid input Format',
            }, httpStatusCode.InvalidFormat)
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        const result = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
                published: body.published
            }
        })

        return c.json({
            msg: 'Blog updated successful',
            data: result
        })
    } catch (err) {
        return c.json({
            msg: "Internal server error",
            err
        }, httpStatusCode.InternalServerErr)
    }
})

blog.get('/me', async (c) => {
    try {
        const authorId = c.get("authorId")

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const result = await prisma.post.findMany({
            where: {
                authorId: authorId
            },
        })

        return c.json({
            msg: 'List all blogs by ' + authorId,
            blogs: result || "No blogs"
        })
    } catch (err) {
        return c.json({
            msg: "Internal server error fdsaf",
            err
        }, httpStatusCode.InternalServerErr)
    }
})

blog.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const result = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        email: true
                    }
                },
            }
        })

        return c.json({
            msg: 'List all blogs',
            blogs: result || "No blogs"
        })
    } catch (err) {
        return c.json({
            msg: "Internal server error",
            err
        }, httpStatusCode.InternalServerErr)
    }
})

blog.get('/:id', async (c) => {
    try {
        const id = c.req.param('id')

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        })

        const result = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                title: true,
                content: true,
                id: true,
                published: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })
        if (!result) {
            return c.json({
                msg: 'Invalid blog id',
            }, httpStatusCode.NotFound)
        }
        return c.json({
            msg: `Found blog of ${id}`,
            data: result || 'Invalid id'
        })
    } catch (err) {
        return c.json({
            msg: "Internal server error",
            err
        }, httpStatusCode.InternalServerErr)
    }
})

export default blog;