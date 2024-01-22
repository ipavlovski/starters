import { serve } from '@hono/node-server'
import { trpcServer } from '@hono/trpc-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { appRouter } from './router'

//  =================================
//              HONO+TRPC
//  =================================

const port = 3010
const app = new Hono()
app.use('/trpc/*', cors())
app.use('/trpc/*', trpcServer({ router: appRouter }))

//  ==================================
//              API ROUTES
//  ==================================

app.get('/', (c) => {
  console.log(c.req.url)
  return c.text('Hello Hono!')
})

//  ===================================
//              INIT SERVER
//  ===================================

serve({ fetch: app.fetch, port })
console.log(`Server is running on port http://localhost:${port}`)
