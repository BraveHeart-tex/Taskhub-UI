import { createFileRoute } from '@tanstack/react-router';
import { BoardsPage } from '@/features/dashboard/components/boards-page';

export const Route = createFileRoute('/_app/boards/')({
  component: BoardsRoute,
});

function BoardsRoute() {
  return <BoardsPage />;
}
