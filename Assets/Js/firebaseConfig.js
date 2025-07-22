// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// Note: Ces clés sont publiques et doivent être configurées avec des règles de sécurité appropriées
const firebaseConfig = {
  apiKey: "AIzaSyCBeG_bj6uCL3odyKfE4UdLPeNecwo7owo",
  authDomain: "page-d-authentification.firebaseapp.com",
  projectId: "page-d-authentification",
  storageBucket: "page-d-authentification.firebasestorage.app",
  messagingSenderId: "265904225207",
  appId: "1:265904225207:web:ce322d2898caffb788c632",
  measurementId: "G-TX8Z0ZCWST"
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
