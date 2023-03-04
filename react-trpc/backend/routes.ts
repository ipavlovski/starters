import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { z } from 'zod'
import superjson from 'superjson'

import * as h from 'backend/handlers'

// created for each request, return empty context
export const createContext = ({ req, res, }: trpcExpress.CreateExpressContextOptions) => ({})
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create({
  transformer: superjson,
})


export const appRouter = t.router({
  getBlogposts: t.procedure
    .input(
      z.string()
    )
    .query(async (req) => {
      console.log(`getEntries query: ${req.input}`)
      return await h.getAllBlogposts()
    }),

  getTags: t.procedure
    .input(
      z.string()
    )
    .query(async (req) => {
      console.log(`getTags query: ${req.input}`)
      return await h.getAllTags()
    }),


  createTag: t.procedure
    .input(
      z.string().min(3)
    )
    .mutation(async (req) => {
      console.log(`createTag mutation: ${req.input}`)
      return await h.createNewTag(req.input)
    }),


})