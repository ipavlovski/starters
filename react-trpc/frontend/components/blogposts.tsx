import { useBlogposts } from '../apis/queries'
import { css } from '../styled-system/css'

export default function Blogposts() {
  const { data: blogposts = [] } = useBlogposts()

  const styles = css({
    margin: '2rem',
    '& > h1': {
      fontWeight: 'bold',
      marginY: '1.5rem',
      textTransform: 'uppercase',
      letterSpacing: 'widest'
    }
  })

  return (
    <div className={styles}>
      <h1>Blogposts</h1>
      {blogposts.length == 0 && <p>No blogposts.</p>}
      {blogposts.map((v) => v.title)}
    </div>
  )
}
