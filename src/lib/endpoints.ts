export const endpoints = {
  auth: {
    me: `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
    login: `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
    logout: `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
    signup: `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
  },
  workspaces: {
    list: `${import.meta.env.VITE_API_BASE_URL}/api/workspaces`,
  },
};
