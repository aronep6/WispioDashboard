import './index.css'
import App from './App'
import ReactDOM from 'react-dom/client'
import { AuthenticationSessionProvider } from './app_contexts/AuthenticationSession'
import { SnackbarServiceProvider } from './app_contexts/SnackbarService'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SnackbarServiceProvider>
    <AuthenticationSessionProvider>
      <App />
    </AuthenticationSessionProvider>
  </SnackbarServiceProvider>
)
