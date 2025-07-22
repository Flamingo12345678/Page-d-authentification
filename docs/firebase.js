import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
  appleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from './firebaseConfig.js';

// État de l'authentification
let currentUser = null;

// Écouter les changements d'état d'authentification
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (user) {
    console.log('Utilisateur connecté:', user);
    // Ici vous pouvez rediriger vers une page de tableau de bord
    // window.location.href = 'dashboard.html';
  } else {
    console.log('Utilisateur déconnecté');
  }
});

// --- Affichage des messages d'erreur et de succès amélioré
function showMessage(message, isError = false) {
  // Créer un élément de notification
  const notification = document.createElement('div');
  notification.className = `notification ${isError ? 'error' : 'success'}`;
  notification.textContent = message;
  
  // Ajouter les styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    background-color: ${isError ? '#e74c3c' : '#27ae60'};
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Supprimer la notification après 5 secondes
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Ajouter les styles CSS pour l'animation
if (!document.querySelector('#notification-styles')) {
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

// Variable pour empêcher les requêtes multiples
let isAuthInProgress = false;

// --- Connexion avec fournisseurs (Google, Facebook, etc.)
function handleLogin(provider) {
  // Empêcher les requêtes multiples
  if (isAuthInProgress) {
    showMessage("Authentification en cours... Veuillez patienter.", true);
    return;
  }
  
  isAuthInProgress = true;
  
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      showMessage(`Bienvenue ${user.displayName || user.email}!`);
      console.log('Utilisateur connecté:', user);
      
      // Optionnel : rediriger vers une autre page
      // setTimeout(() => {
      //   window.location.href = 'dashboard.html';
      // }, 2000);
    })
    .catch((error) => {
      console.error("Erreur d'authentification :", error);
      let errorMessage = "Erreur d'authentification";
      
      // Messages d'erreur plus spécifiques
      switch (error.code) {
        case 'auth/cancelled-popup-request':
          errorMessage = "Requête popup annulée. Une autre connexion est en cours.";
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = "Connexion annulée par l'utilisateur";
          break;
        case 'auth/popup-blocked':
          errorMessage = "Popup bloquée par le navigateur. Autorisez les popups pour ce site.";
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = "Un compte existe déjà avec cette adresse email";
          break;
        case 'auth/invalid-credential-or-provider-id':
          // Erreur spécifique Facebook
          if (error.message && error.message.includes('Facebook')) {
            errorMessage = "🔧 Facebook Login temporairement indisponible. Facebook effectue une mise à jour de votre application. Utilisez Google ou l'email en attendant.";
          } else {
            errorMessage = "Identifiants ou fournisseur invalide";
          }
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "Cette méthode de connexion n'est pas activée dans Firebase";
          break;
        case 'auth/configuration-not-found':
          errorMessage = "Configuration du fournisseur non trouvée";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Erreur réseau. Vérifiez votre connexion internet.";
          break;
        default:
          // Gestion spéciale pour les erreurs Facebook
          if (error.message && (error.message.includes('Facebook') || error.message.includes('Fonctionnalité indisponible'))) {
            errorMessage = "🔧 Facebook Login indisponible. Facebook met à jour votre application. Utilisez une autre méthode de connexion.";
          } else {
            errorMessage = error.message;
          }
      }
      
      showMessage(errorMessage, true);
    })
    .finally(() => {
      // Toujours remettre le flag à false après la tentative
      isAuthInProgress = false;
    });
}

// --- Inscription avec email/mot de passe
function registerWithEmail(email, password, name) {
  // Validation basique
  if (password.length < 6) {
    showMessage("Le mot de passe doit contenir au moins 6 caractères", true);
    return;
  }
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showMessage(`Inscription réussie : ${user.email}`);
      
      // Optionnel : mettre à jour le profil avec le nom
      // import { updateProfile } from 'firebase/auth';
      // updateProfile(user, { displayName: name });
      
      console.log('Nouvel utilisateur créé:', user);
    })
    .catch((error) => {
      console.error("Erreur lors de l'inscription :", error);
      let errorMessage = "Erreur lors de l'inscription";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Cette adresse email est déjà utilisée";
          break;
        case 'auth/invalid-email':
          errorMessage = "Adresse email invalide";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "L'inscription par email n'est pas activée";
          break;
        case 'auth/weak-password':
          errorMessage = "Le mot de passe est trop faible";
          break;
        default:
          errorMessage = error.message;
      }
      
      showMessage(errorMessage, true);
    });
}

// --- Connexion avec email/mot de passe
function loginWithEmail(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showMessage(`Connecté : ${user.email}`);
      console.log('Utilisateur connecté:', user);
    })
    .catch((error) => {
      console.error("Erreur de connexion :", error);
      let errorMessage = "Erreur de connexion";
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = "Aucun utilisateur trouvé avec cette adresse email";
          break;
        case 'auth/wrong-password':
          errorMessage = "Mot de passe incorrect";
          break;
        case 'auth/invalid-email':
          errorMessage = "Adresse email invalide";
          break;
        case 'auth/user-disabled':
          errorMessage = "Ce compte a été désactivé";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Trop de tentatives. Réessayez plus tard";
          break;
        default:
          errorMessage = error.message;
      }
      
      showMessage(errorMessage, true);
    });
}

// --- Gestion des événements pour providers sociaux (sign-in)
document.getElementById("google-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(googleProvider);
});

document.getElementById("facebook-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  
  // Empêcher les clics multiples
  if (isAuthInProgress) {
    showMessage("Authentification en cours... Veuillez patienter.", true);
    return;
  }
  
  // Vérifier si Facebook est fonctionnel
  showMessage("🔄 Tentative de connexion Facebook...", false);
  
  // Essayer la connexion Facebook avec gestion d'erreur améliorée
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
  
  // Empêcher les clics multiples
  if (isAuthInProgress) {
    showMessage("Authentification en cours... Veuillez patienter.", true);
    return;
  }
  
  // Avertissement temporaire pour Facebook
  showMessage("⚠️ Facebook Login temporairement indisponible. Facebook effectue une mise à jour de l'application. Utilisez Google ou l'email.", true);
  
  // Optionnel : essayer quand même la connexion Facebook
  // handleLogin(facebookProvider);
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
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  
  // Validation des champs
  if (!name.trim()) {
    showMessage("Veuillez entrer votre nom", true);
    return;
  }
  if (!email.trim()) {
    showMessage("Veuillez entrer votre email", true);
    return;
  }
  if (!password.trim()) {
    showMessage("Veuillez entrer votre mot de passe", true);
    return;
  }
  
  registerWithEmail(email, password, name);
});

signinForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;
  
  // Validation des champs
  if (!email.trim()) {
    showMessage("Veuillez entrer votre email", true);
    return;
  }
  if (!password.trim()) {
    showMessage("Veuillez entrer votre mot de passe", true);
    return;
  }
  
  loginWithEmail(email, password);
});

// --- Fonction de déconnexion (optionnelle)
window.logout = function() {
  signOut(auth).then(() => {
    showMessage("Déconnexion réussie");
    console.log('Utilisateur déconnecté');
  }).catch((error) => {
    showMessage("Erreur lors de la déconnexion", true);
    console.error('Erreur de déconnexion:', error);
  });
};

// --- Rendre les fonctions disponibles globalement si nécessaire
window.handleLogin = handleLogin;
window.currentUser = () => currentUser;