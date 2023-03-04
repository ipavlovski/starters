import { Container, Text,
  createStyles, MantineProvider, MantineThemeOverride, MultiSelect } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'
import { create } from 'zustand'

import type { AppRouter } from 'frontend/../trpc'

export const SERVER_URL = `https://localhost:${import.meta.env.VITE_SERVER_PORT}`
export const ORIGIN_URL = `https://localhost:${import.meta.env.VITE_PORT}`

////////////// STYLES

const globalTheme: MantineThemeOverride = {
  fontFamily: 'Hack',
  colorScheme: 'dark',
  colors: {
    'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9',
      '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
    'cactus': ['#2BBC8A', '#405d53']
  },
  globalStyles: (theme) => ({
    // '*, *::before, *::after': {
    //   padding: 0,
    //   margin: 0
    // },
  })
}

////////////// STORES

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


////////////// TRPC / RQ

export const trpc = createTRPCReact<AppRouter>()

const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${SERVER_URL}/trpc`,
    }),
  ],
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

////////////// ROUTER


const useStyles = createStyles(() => ({
  tagList: {}
}))

function Root() {

  const { data = [] } = trpc.getTags.useQuery('')
  const { data: blogposts } = trpc.getBlogposts.useQuery('')

  return (
    <Container pt={30} size={'xs'}>
      <MultiSelect
        data={data.map(({ name }) => ({ value: name, label: name }))}
        searchable
        label="List of tags:"
        placeholder="Choose a tag..."
      />
      {blogposts?.map( (v)=> (<Text m={4}>{v.title}</Text>))}
    </Container>
  )
}


////////////// APP

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={globalTheme}>
          <NotificationsProvider position="top-right" autoClose={1600}>
            <Root />
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>

  )
}
