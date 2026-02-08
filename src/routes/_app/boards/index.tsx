import { createFileRoute } from '@tanstack/react-router';
import { BoardsPage } from '@/features/dashboard/components/boards-page';
import { dashboardQuery } from '@/features/dashboard/dashboard.queries';

export const Route = createFileRoute('/_app/boards/')({
  component: BoardsRoute,
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(dashboardQuery);
  },
});

function BoardsRoute() {
  return <BoardsPage />;
}
