import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import CookieConsent from '../../../Cookies/CookieConsent';

export default function AuthOutletWrapper() {
    return <Fragment>
        <Outlet />
        <CookieConsent />
    </Fragment>
};