import { Suspense, Fragment, lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from './app_components/Loading/Loading';
import ProtectedRoute from './app_components/ProtectedRoute';

// Auth components
const AuthOutletWrapper = lazy(() => import('./app_components/Auth/OutletWrapper'));
const ForgotPassword = lazy(() => import('./app_components/Auth/ForgotPassword'));
const SignIn = lazy(() => import('./app_components/Auth/SignIn'));
const SignUp = lazy(() => import('./app_components/Auth/SignUp'));

// Application components
const ApplicationWrapper = lazy(() => import('./app_components/application/common/ApplicationWrapper'));
const Dashboard = lazy(() => import('./app_components/application/Dashboard'));
const Files = lazy(() => import('./app_components/application/Files'));
const Tasks = lazy(() => import('./app_components/application/Tasks'));
const ProjectsBuilder = lazy(() => import('./app_components/application/ProjectsBuilder'));


export default function App() {
  return <Fragment>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<ProtectedRoute><ApplicationWrapper /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='tasks' element={<Tasks />} />
          <Route path='files' element={<Files />} />
          <Route path='projects-builder' element={<ProjectsBuilder />} />  
        </Route>

        <Route path="/auth" element={<Suspense fallback={<Loading /> }><AuthOutletWrapper /></Suspense>}>
          <Route path="signin" element={<SignIn />}/>
          <Route path="signup" element={<SignUp />}/>
          <Route path="forgot-password" element={<ForgotPassword />}/>
        </Route>

        <Route path="/loading" element={
          <ProtectedRoute isAvailableInProduction={false}>
            <Loading message='This is a infinite loading ...' />
          </ProtectedRoute>}
        />

        <Route path="*" element={<div>Not Found</div>} />

      </Routes>
    </BrowserRouter>
  </Fragment>
};