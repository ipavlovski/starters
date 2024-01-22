import { relations } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

//  =================================
//              BLOGPOSTS
//  =================================
// blogpost: primary data structure

export const blogposts = sqliteTable('blogposts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$default(() => new Date())
    .notNull(),
  categoryId: integer('category_id'),
})

export const blogpostRelations = relations(blogposts, ({ many, one }) => ({
  blogpostsToTags: many(blogpostsToTags),
  images: many(images),
  category: one(categories, {
    fields: [blogposts.categoryId],
    references: [categories.id],
  }),
}))

//  ==================================
//              CATEGORIES
//  ==================================
// one to many (one catgory can have many blogposts, blogpost can have one category)

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  color: text('color'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$default(() => new Date()),
})

export const categoryRelations = relations(categories, ({ many, one }) => ({
  blogposts: many(blogposts),
}))

//  ============================
//              TAGS
//  ============================
// many-to-many, can have many blogposts with many tags

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  color: text('color'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$default(() => new Date()),
})

export const tagRelations = relations(tags, ({ many }) => ({
  blogpostsToTags: many(blogpostsToTags),
}))

export const blogpostsToTags = sqliteTable('blogposts_to_tags', {
  blogpostId: integer('blogpost_id').notNull().references(() => blogposts.id),
  tagId: integer('tag_id').notNull().references(() => tags.id),
}, (t) => ({
  pk: primaryKey({ columns: [t.blogpostId, t.tagId] }),
}))

export const blogpostsToTagsRelations = relations(blogpostsToTags, ({ one }) => ({
  blogpost: one(blogposts, {
    fields: [blogpostsToTags.blogpostId],
    references: [blogposts.id],
  }),
  tag: one(tags, {
    fields: [blogpostsToTags.tagId],
    references: [tags.id],
  }),
}))

//  ==============================
//              IMAGES
//  ==============================
// many to one (one blogpost can have many images, an image can have only one blogpost)

export const images = sqliteTable('images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  url: text('url').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$default(() => new Date()),
  blogpostId: integer('blogpost_id'),
})

export const imagesRelations = relations(images, ({ one }) => ({
  blogpost: one(blogposts, {
    fields: [images.blogpostId],
    references: [blogposts.id],
  }),
}))
