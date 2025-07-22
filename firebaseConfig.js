// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6kE6xM2C0WMFz6j_7OcncBP9j_8ZtC84",
    authDomain: "ai-app-ad067.firebaseapp.com",
    projectId: "ai-app-ad067",
    storageBucket: "ai-app-ad067.appspot.com",
    messagingSenderId: "413928668174",
    appId: "1:413928668174:web:f1de5bce163b9a7fc4d05f",
    measurementId: "G-ES2NE8G15M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = 'it';

// Auth providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com'); // Only works if Apple sign-in is enabled in Firebase Console

// Export as needed
export {
    app,
    analytics,
    auth,
    googleProvider,
    githubProvider,
    facebookProvider,
    appleProvider,
    signInWithPopup
};
