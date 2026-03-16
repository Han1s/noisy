import YouTube, { type YouTubeProps } from 'react-youtube'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { AspectRatio, Card, Grid } from '@mantine/core'
import { MOCK_VIDEOS } from '../MOCK_DATA'

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const serverLoader = createServerFn({ method: 'GET' }).handler(() => {
  return { name: 'test' }
})

export const Route = createFileRoute('/')({
  component: App,
  loader: () => {
    return serverLoader()
  },
})

function App() {
  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
  }

  return (
    <Grid>
      {MOCK_VIDEOS.map((videoId) => {
        return (
          <Grid.Col span={3}>
            <Card key={videoId} shadow="sm" padding="0" radius="md" withBorder>
              <Card.Section>
                <YouTube id={videoId} videoId={videoId} opts={opts} />
              </Card.Section>
            </Card>
          </Grid.Col>
        )
      })}
    </Grid>
  )
}
