import Core from "../Core";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

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
            return user;
        } catch (err) {
            throw err;
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
}

export default Authentication;