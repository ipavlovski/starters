import {
  Button, Container, Flex, MantineProvider,
  MantineThemeOverride, MultiSelect, TextInput
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { IconFilter, IconSubmarine } from '@tabler/icons-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFetchFilteredPosts, useFetchTags, useFilterStore } from 'frontend/api'

export const SERVER_URL = `https://localhost:${import.meta.env.VITE_SERVER_PORT}`
export const ORIGIN_URL = `https://localhost:${import.meta.env.VITE_PORT}`

const globalTheme: MantineThemeOverride = {
  fontFamily: 'Hack',
  colorScheme: 'dark',
  colors: {
    'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9',
      '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
    'cactus': ['#2BBC8A', '#405d53']
  },
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})


function Omnibar() {
  const selectedTags = useFilterStore((store) => store.tags)
  const { setTags } = useFilterStore((store) => store.actions)
  const { data: allTags } = useFetchTags()
  if (! allTags) return null

  return (
    <MultiSelect
      style={{ flexGrow: 1 }}
      data={allTags.map(({ name }) => ({ value: name, label: `#${name}` }))}
      searchable
      radius={'lg'}
      rightSection={<></>}
      icon={<IconFilter size={24} stroke={2} />}
      label="(query blogposts)"
      mb={24}
      styles={(theme) => ({
        input: { padding: 2 },
        label: { color: theme.colors.cactus[0], fontSize: 14 } })
      }
      value={selectedTags}
      onChange={setTags}

    />
  )
}

// Array.from('qwertyasdfgzxcvb')
function UserDashboard() {
  const filteredPosts = useFetchFilteredPosts()
  const { data: blogposts, status } = useFetchFilteredPosts()
  if (! blogposts) return <h3>No blogposts found.</h3>

  if (! filteredPosts.data) return <h3>Loading...</h3>

  return (
    <Container m='lg' >
      <Flex gap={16}>
        <TextInput placeholder='Enter user name'/>
        <MultiSelect data={[]} />
        <Button onClick={() => console.log('clicked!')}>
          <IconSubmarine />
        </Button>
      </Flex>

      <ul>
        {filteredPosts.data.map((v) => <li>{v.name} [{v.tags.map((v) => v.name).join(', ')}]</li>)}
      </ul>
    </Container>
  )
}


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={globalTheme}>
        <NotificationsProvider position="top-right" autoClose={1600}>
          <Container>
            <UserDashboard />
          </Container>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
