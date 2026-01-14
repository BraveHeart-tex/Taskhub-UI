import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/boards')({
  component: Dashboard,
});

function Dashboard() {
  return <div>Dashboard Content</div>;
}
