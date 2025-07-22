// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// Note: Ces clés sont publiques et doivent être configurées avec des règles de sécurité appropriées
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

// Configuration de la langue (français au lieu d'italien)
auth.languageCode = 'fr';

// Auth providers avec configurations améliorées
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user:email');

const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');

// Apple provider - Fonctionne uniquement si Apple Sign-in est activé dans Firebase Console
const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

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
