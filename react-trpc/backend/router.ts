import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { blogpost, category, image, tag } from '../db/handlers'

const t = initTRPC.create()
const router = t.router

export const appRouter = router({
  //  =================================
  //              BLOGPOSTS
  //  =================================

  getBlogposts: t.procedure.query(async () => {
    return await blogpost.get()
  }),

  createBlogpost: t.procedure.input(
    z.object({ title: z.string(), content: z.string() }),
  ).mutation(async ({ input: { title, content } }) => {
    return await blogpost.create(title, content)
  }),

  updateBlogpost: t.procedure.input(
    z.object({ id: z.number(), fields: z.object({
      title: z.string(),
      content: z.string(),
      category: z.number(),
      tags: z.number().array(),
      images: z.number(),
    }) }),
  ).mutation(async ({ input: { id, fields } }) => {
    return await blogpost.update(id, fields)
  }),

  deleteBlogpost: t.procedure.input(
    z.object({ id: z.number() }),
  ).mutation(async ({ input: { id } }) => {
    return await blogpost.delete(id)
  }),

  //  ==================================
  //              CATEGORIES
  //  ==================================

  getCategories: t.procedure.query(async () => {
    return await category.get()
  }),

  createCategory: t.procedure.input(
    z.object({ name: z.string() }),
  ).mutation(async ({ input: { name } }) => {
    return await category.create(name)
  }),

  updateCategory: t.procedure.input(
    z.object({ id: z.number(), fields: z.object({
      name: z.string(),
      color: z.string(),
    }) }),
  ).mutation(async ({ input: { id, fields } }) => {
    return await category.update(id, fields)
  }),

  deleteCategory: t.procedure.input(
    z.object({ id: z.number() }),
  ).mutation(async ({ input: { id } }) => {
    return await category.delete(id)
  }),

  //  ============================
  //              TAGS
  //  ============================

  getTags: t.procedure.query(async () => {
    return await tag.get()
  }),

  createTag: t.procedure.input(
    z.object({ name: z.string() }),
  ).mutation(async ({ input: { name } }) => {
    return await tag.create(name)
  }),

  updateTag: t.procedure.input(
    z.object({ id: z.number(), fields: z.object({
      name: z.string(),
      color: z.string(),
    }) }),
  ).mutation(async ({ input: { id, fields } }) => {
    return await tag.update(id, fields)
  }),

  deleteTag: t.procedure.input(
    z.object({ id: z.number() }),
  ).mutation(async ({ input: { id } }) => {
    return await tag.delete(id)
  }),

  //  ==============================
  //              IMAGES
  //  ==============================

  createImage: t.procedure.input(
    z.object({ url: z.string(), blogpostId: z.number() }),
  ).mutation(async ({ input: { url, blogpostId } }) => {
    return await image.create(url, blogpostId)
  }),

  deleteImage: t.procedure.input(
    z.object({ id: z.number() }),
  ).mutation(async ({ input: { id } }) => {
    return await image.delete(id)
  }),
})

export type AppRouter = typeof appRouter
