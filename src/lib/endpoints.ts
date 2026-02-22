import type { BoardRouteParams } from '@/features/boards/board.types';
import type { CardRouteParams } from '@/features/lists/cards/card.types';
import type { ListRouteParams } from '@/features/lists/list.types';

const BASE = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  me: {
    get: `${BASE}/api/me`,
    favoriteBoards: {
      list: `${BASE}/api/me/favorites`,
      add: (boardId: string) => `${BASE}/api/me/favorites/${boardId}`,
      remove: (boardId: string) => `${BASE}/api/me/favorites/${boardId}`,
    },
    dashboard: `${BASE}/api/me/dashboard`,
  },
  auth: {
    login: `${BASE}/api/auth/login`,
    logout: `${BASE}/api/auth/logout`,
    signup: `${BASE}/api/auth/signup`,
  },
  workspaces: {
    favorites: {
      create: (workspaceId: string) =>
        `${BASE}/api/workspaces/${workspaceId}/favorites`,
      delete: (workspaceId: string) =>
        `${BASE}/api/workspaces/${workspaceId}/favorites`,
    },
    list: `${BASE}/api/workspaces`,
    create: `${BASE}/api/workspaces`,
    get: (workspaceId: string) => `${BASE}/api/workspaces/${workspaceId}`,
    summary: (workspaceId: string) =>
      `${BASE}/api/workspaces/${workspaceId}/summary`,
    members: {
      list: (workspaceId: string) =>
        `${BASE}/api/workspaces/${workspaceId}/members`,
    },
    boards: {
      create: (workspaceId: string) =>
        `${BASE}/api/workspaces/${workspaceId}/boards`,
      update: ({ workspaceId, boardId }: BoardRouteParams) =>
        `${BASE}/api/workspaces/${workspaceId}/boards/${boardId}`,
      list: (workspaceId: string) =>
        `${BASE}/api/workspaces/${workspaceId}/boards`,
      get: ({ workspaceId, boardId }: BoardRouteParams) =>
        `${BASE}/api/workspaces/${workspaceId}/boards/${boardId}`,
      content: ({ workspaceId, boardId }: BoardRouteParams) =>
        `${BASE}/api/workspaces/${workspaceId}/boards/${boardId}/content`,
    },
    lists: {
      create: ({ workspaceId, boardId }: BoardRouteParams) =>
        `${BASE}/api/workspaces/${workspaceId}/boards/${boardId}/lists`,
      update: ({ workspaceId, boardId, listId }: ListRouteParams) =>
        `${BASE}/api/workspaces/${workspaceId}/boards/${boardId}/lists/${listId}`,
      cards: {
        create: ({ workspaceId, boardId, listId }: CardRouteParams) =>
          `${BASE}/api/workspaces/${workspaceId}/boards/${boardId}/lists/${listId}/cards`,
      },
    },
  },
};
