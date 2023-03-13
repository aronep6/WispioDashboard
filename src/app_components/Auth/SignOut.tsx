import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../app_hooks/contexts_hooks/useAuth';

function SignOut() {
    let navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const run = async () => {
            // Check URL for error code
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) {
                if (code === 'service_communication_error') { 
                    auth.signOut();
                } // If code is present, show error message
            } else {
                navigate("/") // If code is not present, redirect to sign in page
            }
        };

        run();
    }, []);

    useEffect(() => {
        // Force reload after 4 seconds if user is still on this page
        const timer = setTimeout(() => {
            window.location.href = '/auth/signin?code=service_communication_error&fallback=default';
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return <div className="text-2xl inter inset-0 mx-auto max-w-6xl fixed flex-col justify-center flex p-5 font-medium">
              Déconnexion en cours ...
              <span className="text-sm text-gray-500">Nous sommes en train de vous déconnecter des services Wispio.
              Vous allez être redirigé vers la page d'accueil.</span>
          </div>
}

export default SignOut;