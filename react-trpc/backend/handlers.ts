import { PrismaClient, Prisma, } from '@prisma/client'
import { randomUUID as uuidv4 } from 'node:crypto'
import { writeFile, mkdir } from 'node:fs/promises'
import { setTimeout, } from 'timers/promises'
const prisma = new PrismaClient()


/**
 * BLOGPOSTS
 */

export async function getAllBlogposts() {
  return await prisma.blogpost.findMany()
}


/**
 * TAGS
 */

export async function getAllTags() {
  return await prisma.tag.findMany()
}

export async function createNewTag(name: string) {
  return await prisma.tag.create({ data: { name } })
}

export async function updateTagName({ newName, oldName }: { oldName: string; newName: string }) {
  return await prisma.tag.update({ where: { name: oldName }, data: { name: newName } })
}

export async function deleteTag(name: string) {
  return await prisma.tag.delete({ where: { name } })
}
