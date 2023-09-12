import { Center } from 'styled-system/jsx'
import { css } from 'styled-system/css'

export default function Home() {
  const styles = css({
    fontSize: '3xl',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    _hover: {
      background: 'emerald.800'
    }
  })

  // return
  return (
    <Center height="100vh" background="slate.500" color="slate.100">
      <div className={styles}>Hello panda 2 🐼!</div>
    </Center>
  )
}
