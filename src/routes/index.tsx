import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Card, Image, SimpleGrid } from '@mantine/core'
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
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
      {MOCK_VIDEOS.map((url) => {
        const id = getYoutubeId(url)
        if (!id) return null

        return (
          <Card key={id} shadow="sm" padding="0" radius="md" withBorder>
            <Card.Section>
              <Image
                src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                height={160}
                alt="Youtube Thumbnail"
              />
            </Card.Section>
          </Card>
        )
      })}
    </SimpleGrid>
  )
}
