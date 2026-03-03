import { Link, useRouterState } from '@tanstack/react-router'
import { AppShell, Burger, Group, NavLink, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus, IconVolume } from '@tabler/icons-react'

const NAV_ROUTES = [
  {
    to: '/',
    label: 'Home',
    icon: IconVolume,
  },
  {
    to: '/add',
    label: 'Add',
    icon: IconPlus,
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()
  const { location } = useRouterState()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" className={'bg-gray-800 text-white shadow-md'}>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            color={'white'}
          />
          <Text size="xl" fw={700}>
            Noisy
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {NAV_ROUTES.map((route) => (
          <NavLink
            key={route.to}
            component={Link}
            to={route.to}
            label={route.label}
            leftSection={<route.icon size={16} stroke={1.5} />}
            active={location.pathname === route.to}
            onClick={() => {
              if (opened) toggle()
            }}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
