import { createTRPCReact } from '@trpc/react-query'
import { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '../../backend/router'
type RouterOutput = inferRouterOutputs<AppRouter>

export const trpc = createTRPCReact<AppRouter>()

export const useBlogposts = () => trpc.getBlogposts.useQuery()

export const useCreateBlogpost = () => {
  const utils = trpc.useUtils()
  const createTag = trpc.createBlogpost.useMutation({
    onSuccess: () => {
      utils.getBlogposts.invalidate()
    },
  })

  return async (title: string) => {
    return createTag.mutateAsync({ title, content: '' })
  }
}

export type Tags = RouterOutput['getTags']
