import Database from 'better-sqlite3'
import { between, count, desc, eq, inArray, lte } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const db = drizzle(new Database('./db/sqlite.db'), { schema })
const { blogposts, blogpostsToTags, images, tags, categories } = schema

//  =================================
//              BLOGPOSTS
//  =================================

async function getBlogposts() {
  return await db.select()
    .from(blogposts)
}

async function createBlogpost(title: string, content: string) {
  return await db.select()
    .from(blogposts)
}

async function updateBlogpost(id: number, fields: unknown) {
  return await db.select()
    .from(blogposts)
}

async function deleteBlogpost(id: number) {
  return await db.select()
    .from(blogposts)
}

//  ==================================
//              CATEGORIES
//  ==================================

async function getCategories() {
  return await db.select()
    .from(categories)
}

async function createCategory(name: string) {
  return await db.select()
    .from(categories)
}

async function updateCategory(id: number, fields: unknown) {
  return await db.select()
    .from(categories)
}

async function deleteCategory(id: number) {
  return await db.select()
    .from(categories)
}

//  ============================
//              TAGS
//  ============================

async function getTags() {
  return await db.select()
    .from(categories)
}

async function createTag(name: string) {
  return await db.select()
    .from(categories)
}

async function updateTag(id: number, fields: unknown) {
  return await db.select()
    .from(categories)
}

async function deleteTag(id: number) {
  return await db.select()
    .from(categories)
}

//  ==============================
//              IMAGES
//  ==============================

async function createImage(url: string, blogpostId: number) {
  return await db.select()
    .from(categories)
}

async function deleteImage(id: number) {
  return await db.select()
    .from(categories)
}

//  ===============================
//              EXPORTS
//  ===============================

export const blogpost = {
  get: getBlogposts,
  create: createBlogpost,
  update: updateBlogpost,
  delete: deleteBlogpost,
}

export const category = {
  get: getCategories,
  create: createCategory,
  update: updateCategory,
  delete: deleteCategory,
}

export const tag = {
  get: getTags,
  create: createTag,
  update: updateTag,
  delete: deleteTag,
}

export const image = {
  create: createImage,
  delete: deleteImage,
}
