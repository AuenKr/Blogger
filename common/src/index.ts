import { z } from "zod";

export const signupInput = z.object({
    email: z.string(),
    password: z.string().min(6, 'Minimum 6 length password required'),
    name: z.string().optional()
}).strict()

export const signinInput = z.object({
    email: z.string(),
    password: z.string()
}).strict()

export const createBlogInput = z.object({
    title: z.string(),
    published: z.boolean().optional(),
    content: z.string(),
}).strict()

export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string().optional(),
    published: z.boolean().optional(),
    content: z.string().optional(),
}).strict()

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>

export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>