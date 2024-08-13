import { httpStatusCode } from "../types/httpStatusCode";
import { createBlogInput, updateBlogInput, } from "../zod/index";
import { Router } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '@repo/db/client';
import { contentPerPage } from "../config";

dotenv.config();
const blog = Router();

// Middleware 
// Authorization
blog.use(async (req, res, next) => {
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

// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/me      -> pagging
// GET /api/v1/blog/bulk    -> pagging
// GET /api/v1/blog/totalPost
// GET /api/v1/blog/:id

blog.post('/', async (req, res) => {
    try {
        const body = req.body;
        const { success } = createBlogInput.safeParse(body);
        if (!success) {
            return res.status(httpStatusCode.InvalidFormat).json({
                msg: 'Invalid input Format',
            })
        }

        const prisma = db;
        const result = await prisma.post.create({
            data: {
                authorId: res.getHeader('authorId'),
                ...body,
            }
        })
        const { noPost } = await prisma.user.update({
            where: {
                id: res.getHeader('authorId') as string
            },
            data: {
                noPost: {
                    increment: 1
                }
            },
            select: {
                noPost: true
            }
        })
        return res.json({
            msg: 'Blog created successful',
            data: {
                ...result,
                noPost
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: "Internal server error",
            err
        })
    }
})

blog.put('/', async (req, res) => {
    try {
        const body = req.body;
        const { success } = updateBlogInput.safeParse(body);
        if (!success) {
            return res.status(httpStatusCode.InvalidFormat).json({
                msg: 'Invalid input Format',
            })
        }

        const prisma = db;

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

        return res.json({
            msg: 'Blog updated successful',
            data: result
        })
    } catch (err) {
        console.log(err)
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: "Internal server error",
            err
        })
    }
})

blog.get('/me', async (req, res) => {
    try {
        const authorId = res.getHeader("authorId");
        const { page } = req.query;
        let pageNo = parseInt(page as unknown as string || "0");
        if (!pageNo) pageNo = 0;

        const prisma = db;

        const result = await prisma.post.findMany({
            skip: pageNo * contentPerPage,
            take: 5,
            where: {
                authorId: authorId as string
            },
            select: {
                authorId: true,
                content: true,
                createdAt: true,
                id: true,
                published: true,
                title: true,
                updatedAt: true,
                author: {
                    select: {
                        name: true,
                        email: true,
                        noPost: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return res.json({
            msg: 'List all blogs by ' + authorId,
            blogs: result || "No blogs"
        })
    } catch (err) {
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: "Internal server error",
            err
        })
    }
})

blog.get('/bulk', async (req, res) => {
    try {
        const { page } = req.query;
        let pageNo = parseInt(page as unknown as string || "0");
        if (!pageNo) pageNo = 0;

        const prisma = db;

        const result = await prisma.post.findMany({
            skip: pageNo * contentPerPage,
            take: 5,
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
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return res.json({
            msg: 'List all blogs',
            blogs: result || "No blogs"
        })
    } catch (err) {
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: "Internal server error",
            err
        })
    }
})

blog.get('/totalPost', async (req, res) => {
    try {
        const prisma = db;
        const result = await prisma.post.count();
        return res.json({
            totalPost: result
        })
    } catch (err) {
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: "Internal server error",
            err
        })
    }
})

blog.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const prisma = db;

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
            return res.status(httpStatusCode.NotFound).json({
                msg: 'Invalid blog id',
            })
        }
        return res.json({
            msg: `Found blog of ${id}`,
            data: result || 'Invalid id'
        })
    } catch (err) {
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: "Internal server error",
            err
        })
    }
})

blog.get('/user/:id', async (req, res) => {
    try {
        const { id: authorId } = req.params;

        const prisma = db;

        const result = await prisma.post.findMany({
            where: {
                authorId: authorId
            },
        })

        return res.json({
            msg: 'List all blogs by ' + authorId,
            blogs: result || "No blogs"
        })
    } catch (err) {
        return res.status(httpStatusCode.InternalServerErr).json({
            msg: "Internal server error fdsaf",
            err
        })
    }
})

export default blog;