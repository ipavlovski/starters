/**
 * A mockup of DB
 */
export type Tag = { name: string }
export type User = { id: number, name: string, tags: Tag[] }
const users: User[] = [
  { id: 1, name: 'test-1', tags: [] },
  { id: 2, name: 'test-2', tags: [{ name: 'one', }, { name: 'two' }] },
  { id: 3, name: 'test-3', tags: [{ name: 'two', }, { name: 'three' }] },
]


/**
 * Handlers
 */

export async function createNewUser({ name }: {name: string, tags: string[]}) {
  // check if user with the name exists
  const match = users.find((v) => v.name == name)
  if (match) throw new Error(`A user with name:${name} already exists.`)

  // create new user
  const user: User = { id: Math.floor(Math.random() * 1e3), name, tags: [] }
  users.push(user)

  // return newly-created user id
  return { id: user.id }
}

export async function getUsers() {
  return users
}
