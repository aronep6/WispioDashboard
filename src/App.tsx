import { Suspense, Fragment, lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserAppRoutes } from './app_common/interfaces/AppRoutes';
import Loading from './app_components/Loading';
import ProtectedRoute from './app_components/ProtectedRoute';
import useUserSession from './app_hooks/contexts_hooks/useUserSession';

const AuthOutletWrapper = lazy(() => import('./app_components/Auth/OutletWrapper'));
const SignIn = lazy(() => import('./app_components/Auth/SignIn'));
const SignUp = lazy(() => import('./app_components/Auth/SignUp'));

const TempDashboard = () => {
  const user = useUserSession();

  return <div>
    <h1>Dashboard</h1>
    <p>Current user : {user?.email}</p>
  </div>
};

export default function App() {
  return <Fragment>
    <BrowserRouter>
      <Routes>
        <Route path={BrowserAppRoutes.NotFound} element={<div>Not Found</div>} />
        <Route path={BrowserAppRoutes.Loading} element={<Loading message='This is a infinite loading ...' />} />
        <Route path={BrowserAppRoutes.Dashboard} element={<ProtectedRoute>
          <TempDashboard />
        </ProtectedRoute>} />

        <Route path={BrowserAppRoutes.Auth} element={<Suspense fallback={<Loading /> }><AuthOutletWrapper /></Suspense>}>
          <Route path={BrowserAppRoutes.SignIn} element={<SignIn />}/>
          <Route path={BrowserAppRoutes.SignUp} element={<SignUp />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  </Fragment>
};