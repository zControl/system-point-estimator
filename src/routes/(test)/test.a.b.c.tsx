import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(test)/test/a/b/c')({
  component: () => <div>Hello /test/a/b/c!</div>,
})
