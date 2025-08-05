import { useState } from 'react'
import styles from './app.module.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button className={styles.bigButton} onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default App
