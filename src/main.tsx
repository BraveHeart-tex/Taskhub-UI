import { StrictMode } from 'react';
import { AppProviders } from './app/providers.tsx';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Toaster } from './components/ui/sonner.tsx';

const rootElement = document.getElementById('root');
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppProviders>
        <Toaster closeButton richColors />
      </AppProviders>
    </StrictMode>
  );
}
