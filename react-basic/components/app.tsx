import {
  Container,
  createStyles, MantineProvider,
  MantineThemeOverride
} from '@mantine/core'

const useStyles = createStyles(() => ({
  mainHeadline: {
    color: '#C9CACC',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 12
  },
  subHeadline: {
    color: '#2BBC8A',
    fontSize: 14
  },
}))


const globalTheme: MantineThemeOverride = {
  fontFamily: 'Hack',
  colorScheme: 'dark',
  colors: {
    'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9',
      '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
    'cactus': ['#2BBC8A', '#405d53']
  }
}

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={globalTheme}>
      <Container>
        <h1>React Starter</h1>
      </Container>
    </MantineProvider>
  )
}
