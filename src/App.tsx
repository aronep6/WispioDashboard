import { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from './app_components/Loading';
import { AppRoutes } from './app_common/interfaces/AppRoutes';

export default function App() {
  return <Fragment>
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Home} element={<div>Home</div>} />
        <Route path={AppRoutes.NotFound} element={<div>Not Found</div>} />
        <Route path={AppRoutes.Loading} element={<Loading message='This is a infinite loading ...' />} />
      </Routes>
    </BrowserRouter>
  </Fragment>
};