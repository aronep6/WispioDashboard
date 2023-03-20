import { Suspense, Fragment, lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoProjectOpened from './app_components/application/Editor/components/NoProjectOpened';
import ProjectEditor from './app_components/application/Editor/ProjectEditor';
import Loading from './app_components/Loading/Loading';
import ProtectedRoute from './app_components/ProtectedRoute';

// Auth components
const AuthOutletWrapper = lazy(() => import('./app_components/Auth/OutletWrapper'));
const ForgotPassword = lazy(() => import('./app_components/Auth/ForgotPassword'));
const SignIn = lazy(() => import('./app_components/Auth/SignIn'));
const SignUp = lazy(() => import('./app_components/Auth/SignUp'));
const SignOut = lazy(() => import('./app_components/Auth/SignOut'));

// Application components
const ApplicationWrapper = lazy(() => import('./app_components/application/common/ApplicationWrapper'));
const Dashboard = lazy(() => import('./app_components/application/Dashboard'));
const Files = lazy(() => import('./app_components/application/Files'));
const Tasks = lazy(() => import('./app_components/application/Tasks'));
const Editor = lazy(() => import('./app_components/application/Editor'));
const Notifications = lazy(() => import('./app_components/application/Notifications'));
const AccountSettings = lazy(() => import('./app_components/application/AccountSettings'));

// Account settings components
import NoAccountSettingsOpened from './app_components/application/AccountSettings/components/NoAccountSettingsOpened';
import Overview from './app_components/application/AccountSettings/components/Overview';
import NotificationsSettings from './app_components/application/AccountSettings/components/Notifications';
import SecuritySettings from './app_components/application/AccountSettings/components/Security';
import BillingSettings from './app_components/application/AccountSettings/components/Billing';
import ServicesSettings from './app_components/application/AccountSettings/components/Services';


export default function App() {
  return <Fragment>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<ProtectedRoute><ApplicationWrapper /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='tasks' element={<Tasks />} />
          <Route path='files' element={<Files />} />
          <Route path='editor' element={<Editor />}>
            <Route index element={<NoProjectOpened />} />
            <Route path=':projectId' element={<ProjectEditor />} />
          </Route>
          <Route path='notifications' element={<Notifications />} />
          <Route path='account-settings' element={<AccountSettings />}>
            <Route index element={<NoAccountSettingsOpened />} />
            <Route path='overview' element={<Overview />} />
            <Route path='notifications' element={<NotificationsSettings />} />
            <Route path='security' element={<SecuritySettings />} />
            <Route path='billing' element={<BillingSettings />} />
            <Route path='services' element={<ServicesSettings />} />
          </Route>
        </Route>

        <Route path="/auth" element={<Suspense fallback={<Loading /> }><AuthOutletWrapper /></Suspense>}>
          <Route path="signin" element={<SignIn />}/>
          <Route path="signup" element={<SignUp />}/>
          <Route path="forgot-password" element={<ForgotPassword />}/>
          <Route path="signout" element={<SignOut />}/>
        </Route>

        <Route path="/loading" element={
          <ProtectedRoute isAvailableInProduction={false}>
            <Loading message='This is a infinite loading ...' />
          </ProtectedRoute>}
        />

        <Route path="*" element={<div className='text-center p-8 inter text-2xl'>404 - Page not found</div>} />

      </Routes>
    </BrowserRouter>
  </Fragment>
};