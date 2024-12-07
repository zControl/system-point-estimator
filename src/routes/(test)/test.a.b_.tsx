import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(test)/test/a/b_')({
  component: () => <div>Hello /test/a/b!</div>,
})
