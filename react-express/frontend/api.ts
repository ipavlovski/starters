import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { User, Tag } from 'backend/handlers'
import { SERVER_URL } from 'components/app'
import { create } from 'zustand'


/**
 * STORE
 */

interface FilterStore {
  tags: string[]
  actions: {
    addTag: (tag: string) => void
    removeTag: (tag: string) => void
    setTags: (tags: string[]) => void
  }
}

export const useFilterStore = create<FilterStore>((set) => ({
  tags: [],
  actions: {
    setTags: (tags) => set(() => ({ tags })),
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t != tag) })),
  },
}))


/**
 * GET /users
 * GET /users?tags=tag1,tag2,tagN
 */


const fetchAllUsers = async (): Promise<User[]> => {
  return await fetch(`${SERVER_URL}/users`).then((res) => res.json())
}

// console.log(`?x=${encodeURIComponent('[asdf,sdfasdf,3434:34]')}`)
const fetchTaggedUsers = async (tags: string[]): Promise<User[]> => {
  if (tags.length == 0) return await fetchAllUsers()

  const encodedTags = encodeURIComponent(tags.toString())
  return await fetch(`${SERVER_URL}/users?tags=${encodedTags}`).then((res) => res.json())
}

export const useFetchFilteredPosts = () => {
  const tags = useFilterStore((state) => state.tags)
  return useQuery({
    queryKey: ['users', tags],
    queryFn: () => fetchTaggedUsers(tags),
  })
}


/**
 * POST /user
 * create new posuser
 */

const fetchCreateNewUser = async ({ name, tags }: {name: string, tags: string[]})=> {
  return fetch(`${SERVER_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, tags }),
  }).then((res) => res.json())
}

export const useCreateNewUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ([{ name, tags }]: Parameters<typeof fetchCreateNewUser>) =>
      fetchCreateNewUser({ name, tags }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })
}


/**
 * Tags
 */

const fetchTags = async (): Promise<Tag[]> => {
  return await fetch(`${SERVER_URL}/tags`).then((res) => res.json())
}

export const useFetchTags = () => {
  const tags = useFilterStore((state) => state.tags)
  return useQuery({
    queryKey: [tags],
    queryFn: () => fetchTags(),
  })
}
