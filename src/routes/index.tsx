import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Button } from '@mantine/core'

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
  const data = Route.useLoaderData()

  return <Button variant="filled">Button {data.name}</Button>
}
