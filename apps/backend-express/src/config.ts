import dotenv from 'dotenv';
dotenv.config();

export const contentPerPage = parseInt(process.env.countPerPage || "5");