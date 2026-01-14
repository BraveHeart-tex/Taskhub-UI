import { StrictMode } from 'react';
import { AppProviders } from './app/providers.tsx';
import { routeTree } from './routeTree.gen';
import './index.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { queryClient } from './app/query-client';

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppProviders>
        <RouterProvider router={router} context={{ queryClient }} />
      </AppProviders>
    </StrictMode>
  );
}
