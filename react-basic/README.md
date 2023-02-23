# 1. HELLO WORLD SETTINGS

## Directory format

- .vscode/settings.json: color the bottom of vscode accordingly
- .env: contain some predefined ports and maybe some other secrets
- .gitignore: ignore node_modules, .env and scratch
- index.html: required for react
- package.json: dependencies and scripts
- tsconfig.json: typescript stuff, loads dotenv and tsconfig-paths
- README.md: this file, showing brief descriptions of a project
- scratch.ts: empty git-ignored file to be used in repl
- vite.config.js: vite config file, react-loading and server description
- app.tsx: the main file, containing all the practice code
- main.tsx: required for react

## Package installation

```bash
npm i react react-dom dotenv
npm i -D @vitejs/plugin-react sass vite tsconfig-paths @types/{node,react,react-dom}
```
## Running the stuff

```bash
# tab1 - vite dev server: https://localhost:9003/
npm run rev

# tab2 - repl
npm run repl
```

# 2. BINDING ERROR REPLICATION

GOAL: set the duration, if the duration is missing.

Logic:
- The player doesn't know much about the app
  it can be 'cued' to play a video, and can extract its duration.
- Some vids durations are already known.
  They do not require an expensive 'db-write' operation
- However, sometimes they are not known.
  In this case, only the 'video-player' can set the duration.
  It needs to use a special 'duration-setter' method that it sends videoId + duration
- The duration-setter checks internally if video-id matches current vid, and has missing duration
  Only then does it perform expensive 'setter' op. 


BUT why does the setter fail to see the 'proper' video object?

```
video in hook: {"videoId":"DEPwA3mv_R8"}
video in setter: {"videoId":null}
```

# 3. SOLUTION TO BINDING


The durationSetter function was 'closured' in by the addEventListener.
To get 'updated' values, have 2 choices:
- either rebind event-listeners every time
- OR  update the callback to utilize object methods, to get 'fresh' data every time

```ts
const useDurationSetter = () => {
  // this runs 
  const stateVideo = useYoutubeStore((state) => state.video)
  console.log(`video in hook: ${JSON.stringify(stateVideo)}`)

  // this durationSetter got 'closured' at the time of binding, with {videoId: null}
  const durationSetter = (url: string, duration: number) => {

    // this is a 'snapshot' value
    stateVideo
  
    //...
  }
}

function ModalView() {
  const { setPlayer } = useYoutubeStore((state) => state.actions)

  // this durationSetter is a 'snapshot' also
  const [durationSetter] = useDurationSetter()

  useEffect(() => {
    console.log('Initializing the player!')

    // initialize the player
    const player = new VideoPlayer('dH6i3GurZW8')
    setPlayer(player)

    // set the event handler
    player.addEventListener('VIDEO_CUED', async () => {
      const url = await player.getVideoUrl()
      const duration = await player.getVideoDuration()

      // this is a 'snapshot' of durationSetter
      durationSetter(url, duration)
    })
  }, [])
  // ...
}

```