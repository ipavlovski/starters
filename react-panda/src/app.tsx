import { css } from 'styled-system/css'

export default function App() {
  const styles = css({
    background: 'slate.500',
    color: 'slate.100',
    _hover: {
      backgroundColor: 'slate.900'
    }
  })

  return <h1 className={styles}>Hello world</h1>
}
