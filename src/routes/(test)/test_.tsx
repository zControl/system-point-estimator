import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(test)/test_')({
  component: () => <div>Hello /test!</div>,
})
