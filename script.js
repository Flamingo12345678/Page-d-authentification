import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
  appleProvider,
  signInWithPopup
} from './firebaseConfig.js';

// Fonction pour gérer la connexion avec un fournisseur
// Cette fonction prend un fournisseur d'authentification et gère la connexion
// en utilisant Firebase Authentication.
function handleLogin(provider) {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Bienvenue ${user.displayName || user.email}`);
      console.log(user);
    })
    .catch((error) => {
      console.error("Erreur d'authentification :", error);
      alert(`Erreur: ${error.message}`);
    });
}

// Événements pour les boutons de connexion (sign-in)
const googleSignin = document.getElementById("google-signin");
const facebookSignin = document.getElementById("facebook-signin");
const githubSignin = document.getElementById("github-signin");
const appleSignin = document.getElementById("apple-signin");

// Événements pour les boutons d'inscription (sign-up)
const googleSignup = document.getElementById("google-signup");
const facebookSignup = document.getElementById("facebook-signup");
const githubSignup = document.getElementById("github-signup");

// Gestion des événements pour sign-in
if (googleSignin) {
  googleSignin.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin(googleProvider);
  });
}

if (facebookSignin) {
  facebookSignin.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin(facebookProvider);
  });
}

if (githubSignin) {
  githubSignin.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin(githubProvider);
  });
}

if (appleSignin) {
  appleSignin.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin(appleProvider);
  });
}

// Gestion des événements pour sign-up
if (googleSignup) {
  googleSignup.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin(googleProvider);
  });
}

if (facebookSignup) {
  facebookSignup.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin(facebookProvider);
  });
}

if (githubSignup) {
  githubSignup.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin(githubProvider);
  });
}

// Gestion de l'animation des panneaux
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    container.classList.add("active");
  });
}

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
  });
}