import { PrismaClient, Prisma, } from '@prisma/client'
import { randomUUID as uuidv4 } from 'node:crypto'
import { setTimeout, } from 'timers/promises'
const prisma = new PrismaClient()


export async function getAllTags(tagFilter: string) {
  await setTimeout(Math.random()*1000)
  return await prisma.tag.findMany({
    where: tagFilter == '' ? undefined : { name: { contains: tagFilter } }
  })
}

export async function createNewTag(name: string) {
  await setTimeout(Math.random()*1000)
  return await prisma.tag.create({ data: { name } })
}

export async function getBlogposts(tags: string[]) {
  await setTimeout(Math.random()*1000)
  return await prisma.blogpost.findMany({ where: { tags: { some: { name: { in: tags } } } } })
}
