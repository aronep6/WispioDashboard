import Core from "../Core";
import { 
    AddSnackbarElement, 
    SnackbarElement,
    SnackbarLifeTime,
    SnackbarType
} from "../../../app_contexts/SnackbarService/interfaces";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
} from "firebase/auth";
import { IdentityProvidersIdentifiers } from "./IdentityProviders/interfaces";
import checkIdentityProviderAvailability from "./IdentityProviders/check-identity-provider-availability";
import applicationIdentityProviders from "./IdentityProviders/application-identity-providers";

class Authentication extends Core {
    private SIWEAP: typeof signInWithEmailAndPassword;
    private CUWEAP: typeof createUserWithEmailAndPassword;
    private updateProfile: typeof updateProfile;
    constructor() {
        super();
        this.SIWEAP = signInWithEmailAndPassword;
        this.CUWEAP = createUserWithEmailAndPassword;
        this.updateProfile = updateProfile;
    }

    // Sign in with email and password
    loginWithEmail = async (
        email: string,
        password: string
    ) => {
        try {
            const user = await this.SIWEAP(this.auth, email, password);
            this.analytics("login");
            return user;
        } catch (err) {
            throw err;
        }
    };

    // Login with identity provider
    loginWithIdentityProvider = async (
        providerId: IdentityProvidersIdentifiers
    ) => {
        try {
            // Check if the identity provider is currently available on the application
            checkIdentityProviderAvailability(
                providerId,
                applicationIdentityProviders,
            );
            
            switch (providerId) {
                case IdentityProvidersIdentifiers.GOOGLE:
                    const { GoogleAuthProvider } = await import('firebase/auth');
                    const googleProvider = new GoogleAuthProvider();

                    await signInWithPopup(this.auth, googleProvider);
                    break;
                case IdentityProvidersIdentifiers.GITHUB:
                    const { GithubAuthProvider } = await import('firebase/auth');
                    const githubProvider = new GithubAuthProvider();

                    await signInWithPopup(this.auth, githubProvider);
                    break;
                case IdentityProvidersIdentifiers.TWITTER:
                    const { TwitterAuthProvider } = await import('firebase/auth');
                    const twitterProvider = new TwitterAuthProvider();

                    await signInWithPopup(this.auth, twitterProvider);
                    break;
            }
        } catch (error: any) {
            throw new Error(error);
        }
    };

    // Sign up with the display name, email and password
    signUpWithEmail = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) => {
        const displayName = `${firstName} ${lastName}`;
        try {
            const user = await this.CUWEAP(this.auth, `${email}`, `${password}`);
            if (this.auth.currentUser) {
                this.analytics("signup");
                await this.updateProfile(this.auth.currentUser, { displayName });
            } else {
                throw new Error("No user found");
            }
            return user;
        } catch (err) {
            throw err;
        }
    };

    // Reset password with email
    resetPassword = async (
        email: string
    ) => {
        try {
            const { sendPasswordResetEmail } = await import("firebase/auth");
            await sendPasswordResetEmail(this.auth, email);
            return true;
        } catch (err) {
            throw err;
        }
    }

    // Sign out
    signOut = async (
        reload: boolean = true, 
        redirect: string = "none"
    ) => {
        await this.auth.signOut();

        // Wipe local storage
        localStorage.clear();
        localStorage.setItem("cookieConsent", "true");

        // Reload page if needed
        if (reload) {
            window.location.reload();
        }
        
        // Redirect if needed
        if (redirect !== "none") {
            window.location.href = redirect;
        }
    }

    // For the check after user logged in on services
    checkBillingStatus = async (): Promise<boolean> => {
        const { UserAccessibleClaims } = await import("../Core/interfaces");
        const claim = await this.getUserClaim(UserAccessibleClaims.BillingIsActive);
        
        if (claim === "true") return true;
        return false;
    }

    checkIfUserHasCurrentPlan = async (): Promise<boolean> => {
        const { UserAccessibleClaims } = await import("../Core/interfaces");
        const claim = await this.getUserClaim(UserAccessibleClaims.Plan);
        
        if (claim === "none") return false;
        return true;
    }

    async checkIfUserEmailIsVerified(): Promise<boolean> {
        try {
            const user = this.getCurrentUser();
            return user.emailVerified;
        } catch (error: any) {
            return false;
        }
    }

    triggerSignedInUserSnackbarElement(
        addToSnackbarMethod: AddSnackbarElement,
    ): void {
        const { email, displayName } = this.getCurrentUser();

        const connected_user_snackbar_element: SnackbarElement = {
            type: SnackbarType.Success,
            title: displayName ? `Bienvenue ${ displayName }` : "Bienvenue !",
            message: `Connecté à ${ this.application_name }, en tant que : ${ email }`,
            duration: SnackbarLifeTime.Medium,
        };

        return addToSnackbarMethod(connected_user_snackbar_element);
    }
}

export default Authentication; 
export type AuthenticationInterface = typeof Authentication.prototype;