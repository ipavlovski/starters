import { animated, useSpring } from '@react-spring/web'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { WiDayCloudy, WiDaySnow, WiEarthquake } from 'react-icons/wi'
import { css } from 'styled-system/css'
import { z } from 'zod'
import { create } from 'zustand'

interface CountState {
  count: number
  actions: {
    increase: (by: number) => void
    decrease: (by: number) => void
  }
}

const useCountStore = create<CountState>()(
  (set) => ({
    count: 0,
    actions: {
      increase: (by) => set((state) => ({ count: state.count + by })),
      decrease: (by) => set((state) => ({ count: state.count - by })),
    },
  }),
)

const swatchSchema = z.object({
  name: z.string(),
  hex: z.string(),
  width: z.number(),
  height: z.number(),
}).array()

type Swatch = z.infer<typeof swatchSchema>[0]

const fetchSwatches = async () => {
  const url = 'http://localhost:4001/colors?_limit=20'
  const results = await fetch(url).then((v) => v.json())
  return swatchSchema.parse(results)
}

function Counter() {
  const styles = css({
    width: '2rem',
    height: '2rem',
    backgroundColor: 'slate.100',
    borderRadius: '2rem',
    color: 'slate.900',
    textAlign: 'center',
    lineHeight: '1.8rem',
  })

  const count = useCountStore((state) => state.count)

  return <div className={styles}>{count}</div>
}

function Header() {
  const styles = {
    flex: css({
      height: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    icon: css({
      fontSize: '3rem',
    }),
  }

  return (
    <div className={styles.flex}>
      <WiDayCloudy className={styles.icon} />
      <WiEarthquake className={styles.icon} />
      <WiDaySnow className={styles.icon} />
      <Counter />
    </div>
  )
}

function Swatch({ swatch }: { swatch: Swatch }) {
  const [isSelected, setSelected] = useState(false)
  const { decrease, increase } = useCountStore((state) => state.actions)

  const [props, api] = useSpring(
    () => ({
      from: { width: 172, height: 172 },
    }),
    [],
  )

  const styles = css({ margin: '4px' })

  return (
    <animated.div
      className={styles}
      onClick={() => {
        setSelected(!isSelected)
        isSelected ? decrease(1) : increase(1)
        !isSelected
          ? api.start({ to: { width: 140, height: 140 } })
          : api.start({ to: { width: 172, height: 172 } })
      }}
      style={{
        backgroundColor: swatch.hex,
        border: isSelected ? 'solid 2px yellow' : undefined,
        ...props,
      }}>
    </animated.div>
  )
}

function Grid() {
  const styles = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 180px)',
    gridAutoRows: '180px',
    justifyContent: 'center',
  })

  const { data: swatches } = useQuery({ queryKey: ['10'], queryFn: fetchSwatches })

  return (
    <div className={styles}>
      {swatches?.map((v) => <Swatch swatch={v} key={v.hex} />)}
    </div>
  )
}

export default function App() {
  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Grid />
    </QueryClientProvider>
  )
}
