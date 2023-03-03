import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserSessionProvider } from './app_contexts/UserSession'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserSessionProvider>
      <App />
    </UserSessionProvider>
  </React.StrictMode>,
)
