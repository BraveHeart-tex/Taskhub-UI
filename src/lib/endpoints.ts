import type { BoardRouteParams } from '@/features/boards/board.types';

export const endpoints = {
  auth: {
    me: `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
    login: `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
    logout: `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
    signup: `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
  },
  workspaces: {
    list: `${import.meta.env.VITE_API_BASE_URL}/api/workspaces`,
    create: `${import.meta.env.VITE_API_BASE_URL}/api/workspaces`,
    get: (workspaceId: string) =>
      `${import.meta.env.VITE_API_BASE_URL}/api/workspaces/${workspaceId}`,
    summary: (workspaceId: string) =>
      `${import.meta.env.VITE_API_BASE_URL}/api/workspaces/${workspaceId}/summary`,
    members: {
      list: (workspaceId: string) =>
        `${import.meta.env.VITE_API_BASE_URL}/api/workspaces/${workspaceId}/members`,
    },
    boards: {
      create: (workspaceId: string) =>
        `${import.meta.env.VITE_API_BASE_URL}/api/workspaces/${workspaceId}/boards`,
      content: ({ workspaceId, boardId }: BoardRouteParams) =>
        `${import.meta.env.VITE_API_BASE_URL}/api/workspaces/${workspaceId}/boards/${boardId}/content`,
      list: (workspaceId: string) =>
        `${import.meta.env.VITE_API_BASE_URL}/api/workspaces/${workspaceId}/boards`,
      get: ({ workspaceId, boardId }: BoardRouteParams) =>
        `${import.meta.env.VITE_API_BASE_URL}/api/workspaces/${workspaceId}/boards/${boardId}`,
    },
  },
};
