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
      alert(`Bienvenue ${user.displayName}`);
      console.log(user);
    })
    .catch((error) => {
      console.error("Erreur d'authentification :", error);
      alert(error.message);
    });
}

// Événements sur les boutons
document.getElementById("google-login").addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(googleProvider);
});

document.getElementById("facebook-login").addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(facebookProvider);
});

document.getElementById("github-login").addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(githubProvider);
});

document.getElementById("apple-login").addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(appleProvider);
});

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});