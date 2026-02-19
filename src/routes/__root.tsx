import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  createTheme,
} from '@mantine/core'
import '@mantine/core/styles.css'

import Header from '../components/Header'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getContext } from '@/integrations/tanstack-query/root-provider.tsx'

interface MyRouterContext {
  queryClient: QueryClient
}

const theme = createTheme({
  /** Put your mantine theme override here */
})

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <HeadContent />
        <title>Noisy</title>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <QueryClientProvider client={getContext().queryClient}>
          <MantineProvider theme={theme}>
            <Header />
            {children}
          </MantineProvider>
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
