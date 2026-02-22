const BASE = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  auth: {
    login: `${BASE}/api/auth/login`,
    logout: `${BASE}/api/auth/logout`,
    signup: `${BASE}/api/auth/signup`,
  },
  me: {
    get: `${BASE}/api/me`,
    dashboard: `${BASE}/api/me/dashboard`,
    favoriteBoards: {
      list: `${BASE}/api/me/favorites`,
      add: ({ boardId }: { boardId: string }) =>
        `${BASE}/api/me/favorites/${boardId}`,
      remove: ({ boardId }: { boardId: string }) =>
        `${BASE}/api/me/favorites/${boardId}`,
    },
  },
  workspaces: {
    list: `${BASE}/api/workspaces`,
    create: `${BASE}/api/workspaces`,
    get: ({ workspaceId }: { workspaceId: string }) =>
      `${BASE}/api/workspaces/${workspaceId}`,
    update: ({ workspaceId }: { workspaceId: string }) =>
      `${BASE}/api/workspaces/${workspaceId}`,
    delete: ({ workspaceId }: { workspaceId: string }) =>
      `${BASE}/api/workspaces/${workspaceId}`,
    summary: ({ workspaceId }: { workspaceId: string }) =>
      `${BASE}/api/workspaces/${workspaceId}/summary`,
    members: {
      list: ({ workspaceId }: { workspaceId: string }) =>
        `${BASE}/api/workspaces/${workspaceId}/members`,
      add: ({ workspaceId }: { workspaceId: string }) =>
        `${BASE}/api/workspaces/${workspaceId}/members`,
      update: ({
        workspaceId,
        userId,
      }: {
        workspaceId: string;
        userId: string;
      }) => `${BASE}/api/workspaces/${workspaceId}/members/${userId}`,
      remove: ({
        workspaceId,
        userId,
      }: {
        workspaceId: string;
        userId: string;
      }) => `${BASE}/api/workspaces/${workspaceId}/members/${userId}`,
    },
    boards: {
      list: ({ workspaceId }: { workspaceId: string }) =>
        `${BASE}/api/workspaces/${workspaceId}/boards`,

      create: ({ workspaceId }: { workspaceId: string }) =>
        `${BASE}/api/workspaces/${workspaceId}/boards`,
    },
  },
  boards: {
    get: ({ boardId }: { boardId: string }) => `${BASE}/api/boards/${boardId}`,
    update: ({ boardId }: { boardId: string }) =>
      `${BASE}/api/boards/${boardId}`,
    delete: ({ boardId }: { boardId: string }) =>
      `${BASE}/api/boards/${boardId}`,
    content: ({ boardId }: { boardId: string }) =>
      `${BASE}/api/boards/${boardId}/content`,
    members: {
      list: ({ boardId }: { boardId: string }) =>
        `${BASE}/api/boards/${boardId}/members`,
      add: ({ boardId }: { boardId: string }) =>
        `${BASE}/api/boards/${boardId}/members`,
      remove: ({ boardId, userId }: { boardId: string; userId: string }) =>
        `${BASE}/api/boards/${boardId}/members/${userId}`,
    },
    lists: {
      create: ({ boardId }: { boardId: string }) =>
        `${BASE}/api/boards/${boardId}/lists`,
    },
  },
  lists: {
    update: ({ listId }: { listId: string }) => `${BASE}/api/lists/${listId}`,
    delete: ({ listId }: { listId: string }) => `${BASE}/api/lists/${listId}`,
    move: ({ listId }: { listId: string }) =>
      `${BASE}/api/lists/${listId}/move`,
    cards: {
      create: ({ listId }: { listId: string }) =>
        `${BASE}/api/lists/${listId}/cards`,
    },
  },
  cards: {
    update: ({ cardId }: { cardId: string }) => `${BASE}/api/cards/${cardId}`,
    delete: ({ cardId }: { cardId: string }) => `${BASE}/api/cards/${cardId}`,
    move: ({ cardId }: { cardId: string }) =>
      `${BASE}/api/cards/${cardId}/move`,
  },
};
