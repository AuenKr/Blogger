import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from '@repo/db/client';
import { AiRoute, BlogRoute, UserRoute } from './route/index';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json())
app.use(cors());

app.get('/', async (req, res) => {
  const result = await db.user.count();
  console.log(result)
  return res.send(`Hello Hono! ${result}`)
})

app.use('/api/v1/user/', UserRoute)

app.use('/api/v1/blog/', BlogRoute)

app.use('/api/v1/ai/', AiRoute)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


