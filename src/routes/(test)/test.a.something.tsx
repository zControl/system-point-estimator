import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(test)/test/a/something')({
  component: () => <div>Hello /test/a/something!</div>,
})
