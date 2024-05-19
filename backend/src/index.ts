import { Hono } from 'hono'
import { AiRoute, BlogRoute, UserRoute } from './route'
import { cors } from 'hono/cors'

const app = new Hono()
app.use(cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/user/', UserRoute)

app.route('/api/v1/blog/', BlogRoute)

app.route('/api/v1/ai/', AiRoute)

export default app
