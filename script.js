import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
  appleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from './firebaseConfig.js';

// --- Connexion avec fournisseurs (Google, Facebook, etc.)
function handleLogin(provider) {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Bienvenue ${user.displayName || user.email}`);
      console.log(user);
    })
    .catch((error) => {
      console.error("Erreur d'authentification :", error);
      alert(`Erreur : ${error.message}`);
    });
}

// --- Inscription avec email/mot de passe
function registerWithEmail(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`Inscription réussie : ${user.email}`);
    })
    .catch((error) => {
      alert(`Erreur lors de l'inscription : ${error.message}`);
    });
}

// --- Connexion avec email/mot de passe
function loginWithEmail(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`Connecté : ${user.email}`);
    })
    .catch((error) => {
      alert(`Erreur de connexion : ${error.message}`);
    });
}

// --- Gestion des événements pour providers sociaux (sign-in)
document.getElementById("google-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(googleProvider);
});

document.getElementById("facebook-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(facebookProvider);
});

document.getElementById("github-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(githubProvider);
});

document.getElementById("apple-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(appleProvider);
});

// --- Gestion des événements pour providers sociaux (sign-up)
document.getElementById("google-signup")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(googleProvider);
});

document.getElementById("facebook-signup")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(facebookProvider);
});

document.getElementById("github-signup")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(githubProvider);
});

// --- Gestion des formulaires email/password
const signupForm = document.querySelector(".sign-up form");
const signinForm = document.querySelector(".sign-in form");

signupForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  registerWithEmail(email, password);
});

signinForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;
  loginWithEmail(email, password);
});

// --- Animation du panneau (slide sign-in / sign-up)
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn?.addEventListener('click', () => {
  container.classList.add("active");
});

loginBtn?.addEventListener('click', () => {
  container.classList.remove("active");
});