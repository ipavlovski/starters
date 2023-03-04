import { PrismaClient } from '@prisma/client'
import { sample, sampleSize, random } from 'lodash'

const prisma = new PrismaClient()

// some mock daata
const titles = [
  'Lorem ipsum dolor sit amet.',
  'Eaque esse laborum odio incidunt.',
  'Quas ea fugiat quia numquam?',
  'Numquam voluptate error aut quasi.',
  'Dolorum sapiente ex perferendis repudiandae.',
  'Atque provident asperiores rem odit?',
  'Saepe voluptate sunt nemo aspernatur.',
  'Doloribus laborum maiores consequuntur dignissimos.',
  'Quas suscipit blanditiis incidunt error?',
  'Officiis ut veniam odio eveniet.',
]
const categories = ['js', 'devops', 'testing', 'db']
const tags = ['bash', 'tsc', 'vite', 'eslint', 'git', 'npm', 'yarn', 'prisma', 'vscode']

// insert data into DB
categories.forEach(async (name) => prisma.category.create({ data: { name } }))
tags.forEach(async (name) => prisma.tag.create({ data: { name } }))
for (const title of titles) {
  await prisma.blogpost.create({
    data: {
      title,
      category: { connect:{ name: sample(categories) } },
      tags: { connect: sampleSize(tags, random(0, 3)).map((name) => ({ name })) }
    }
  })
}

// verify data is there
await prisma.tag.findMany()
await prisma.category.findMany()
await prisma.blogpost.findMany({ include: { tags: true } })
