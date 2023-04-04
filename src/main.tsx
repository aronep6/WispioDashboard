import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthenticationSessionProvider } from './app_contexts/AuthenticationSession'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthenticationSessionProvider>
    <App />
  </AuthenticationSessionProvider>
)
