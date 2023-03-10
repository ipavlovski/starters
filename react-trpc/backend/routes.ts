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
  getTags: t.procedure.input(
    z.string()
  ).query(async ({ input: tagFilter }) => {
    return await h.getAllTags(tagFilter)
  }),

  createTag: t.procedure.input(
    z.string().min(3)
  ).mutation(async ({ input: tagName }) => {
    return await h.createNewTag(tagName)
  }),

  getBlogposts: t.procedure.input(
    z.string().array()
  ).query(async ({ input: tags }) => {
    return await h.getBlogposts(tags)
  }),


})
