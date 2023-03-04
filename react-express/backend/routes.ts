import { Router } from 'express'
import { z } from 'zod'

import * as h from 'backend/handlers'

const routes = Router()

/**
 * GET /users
 * If no params, return all users
 * If contains 'tags', return users that include tags
 */

routes.get('/users', async (req, res) => {
  try {
    const users = await h.getUsers()

    return res.json(users)
  } catch (err) {
    console.error(err)
    return res.status(400).json({ error: err instanceof Error ? err.message : 'unknown error' })
  }
})


/**
 * POST /user
 */

const NewUserSchema = z.object({
  name: z.string().min(3),
  tags: z.string().array()
})

routes.put('/posts', async (req, res) => {
  try {
    const user = NewUserSchema.parse(req.body)
    await h.createNewUser(user)

    return res.sendStatus(200)
  } catch (err) {
    console.error(err)
    return res.status(400).json({ error: err instanceof Error ? err.message : 'unknown error' })
  }
})


export default routes