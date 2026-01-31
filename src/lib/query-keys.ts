export const queryKeys = {
  me: {
    all: ['me'] as const,
    favoriteWorkspaces: () =>
      [...queryKeys.me.all, 'favoriteWorkspaces'] as const,
  },
  workspaces: {
    all: ['workspaces'] as const,
    list: () => [...queryKeys.workspaces.all, 'list'] as const,
    byId: (workspaceId: string) =>
      [...queryKeys.workspaces.all, 'byId', workspaceId] as const,
    summary: (workspaceId: string) =>
      [...queryKeys.workspaces.byId(workspaceId), 'summary'] as const,
    members: (workspaceId: string) =>
      [...queryKeys.workspaces.byId(workspaceId), 'members'] as const,
    boards: (workspaceId: string) =>
      [...queryKeys.workspaces.byId(workspaceId), 'boards'] as const,
  },
  boards: {
    all: ['boards'] as const,
    byId: (boardId: string) =>
      [...queryKeys.boards.all, 'byId', boardId] as const,
    content: (boardId: string) =>
      [...queryKeys.boards.all, 'content', boardId] as const,
    members: (boardId: string) =>
      [...queryKeys.boards.byId(boardId), 'members'] as const,
    lists: (boardId: string) =>
      [...queryKeys.boards.byId(boardId), 'lists'] as const,
  },
};
