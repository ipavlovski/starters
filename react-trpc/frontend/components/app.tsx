import {
  Container, createStyles, MantineProvider, MantineThemeOverride, MultiSelect, Text
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
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
}

////////////// STORES

interface FilterStore {
  tags: string[]
  actions: {
    setTags: (tags: string[]) => void
  }
}

const useFilterStore = create<FilterStore>((set) => ({
  tags: [],
  actions: {
    setTags: (tags) => set(() => ({ tags })),
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

////////////// STYLES


const useStyles = createStyles((theme) => ({
  input: { backgroundColor: theme.colors.dark[7] }
}))

////////////// LOGIC

const useTags = () => {
  const trpcContext = trpc.useContext()
  const { data: allTags = [] } = trpc.getTags.useQuery('')
  const createTag = trpc.createTag.useMutation({
    onSuccess: () => trpcContext.getTags.invalidate()
  })

  return { allTags, createTag }
}

const useFilteredBlogposts = () => {
  const selectedTags = useFilterStore((state) => state.tags)
  const setSelectedTags = useFilterStore((state) => state.actions.setTags)
  const { data: filteredBlogposts = [] } = trpc.getBlogposts.useQuery(selectedTags)

  return { selectedTags, setSelectedTags, filteredBlogposts }
}

function Root() {
  const { classes: { input: inputSx } } = useStyles()
  const { allTags, createTag } = useTags()
  const { selectedTags, setSelectedTags, filteredBlogposts } = useFilteredBlogposts()

  return (
    <Container pt={30} size={'xs'}>
      <MultiSelect classNames={{ input: inputSx }}
        searchable creatable
        label="List of tags:" placeholder="Choose a tag..."
        data={allTags.map(({ name }) => ({ value: name, label: `#${name}` }))}
        value={selectedTags} onChange={setSelectedTags}
        getCreateLabel={(query) => `+ Create tag #${query}`}
        onCreate={(tagName) => { return createTag.mutate(tagName), tagName }}
      />
      {filteredBlogposts.map((blogpost) => <Text key={blogpost.id}>{blogpost.title}</Text> )}
    </Container>
  )
}


////////////// APP

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={globalTheme}>
          <Notifications />
          <Root />
        </MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>

  )
}
