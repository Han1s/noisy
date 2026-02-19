import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const serverLoader = createServerFn({ method: 'GET' }).handler(() => {
  return { name: 'test2' }
})

export const Route = createFileRoute('/')({
  component: App,
  loader: () => {
    return serverLoader()
  },
})

function App() {
  const data = Route.useLoaderData()
  return <div>hello world - {data.name}</div>
}
