import './shared/styles/global.css'
import Application from './application'
import { createRoot } from 'react-dom/client'
import { AuthenticationSessionProvider } from './app_contexts/AuthenticationSession'
import { SnackbarServiceProvider } from './app_contexts/SnackbarService'

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <SnackbarServiceProvider>
    <AuthenticationSessionProvider>
      <Application />
    </AuthenticationSessionProvider>
  </SnackbarServiceProvider>
);
