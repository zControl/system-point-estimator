import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(test)/test/a_')({
  component: () => <div>This is the /test/a route. It should have stuff.</div>,
})
