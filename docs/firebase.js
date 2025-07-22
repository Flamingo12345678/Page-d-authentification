import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
  appleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getSignInMethod,
  isGitHubPages
} from './firebaseConfig.js';

// État de l'authentification
let currentUser = null;

// Cacher le chargement quand Firebase est prêt
function hideLoadingIndicator() {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = 'none';
  }
}

// Écouter les changements d'état d'authentification
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  hideLoadingIndicator();
  
  if (user) {
    console.log('Utilisateur connecté:', user);
    showMessage(`Bienvenue ${user.displayName || user.email}!`);
  } else {
    console.log('Utilisateur déconnecté');
  }
});

// Gérer les résultats de redirection (pour GitHub Pages)
getRedirectResult(auth)
  .then((result) => {
    if (result) {
      const user = result.user;
      showMessage(`Connexion réussie ! Bienvenue ${user.displayName || user.email}`);
    }
  })
  .catch((error) => {
    console.error('Erreur de redirection:', error);
    showMessage(`Erreur de connexion: ${error.message}`, true);
  });

// --- Affichage des messages d'erreur et de succès amélioré
function showMessage(message, isError = false) {
  // Supprimer les notifications existantes
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());
  
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
    max-width: 300px;
    word-wrap: break-word;
  `;
  
  document.body.appendChild(notification);
  
  // Supprimer la notification après 5 secondes
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
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

// --- Connexion avec fournisseurs (Google, Facebook, etc.)
function handleLogin(provider) {
  const signInMethod = getSignInMethod();
  
  if (signInMethod === 'redirect') {
    // Utiliser redirect sur mobile et GitHub Pages
    showMessage('Redirection vers le fournisseur...', false);
    signInWithRedirect(auth, provider)
      .catch((error) => {
        console.error("Erreur de redirection :", error);
        handleAuthError(error);
      });
  } else {
    // Utiliser popup sur desktop
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        showMessage(`Bienvenue ${user.displayName || user.email}!`);
        console.log('Utilisateur connecté:', user);
      })
      .catch((error) => {
        console.error("Erreur d'authentification :", error);
        handleAuthError(error);
      });
  }
}

// --- Gestion des erreurs d'authentification
function handleAuthError(error) {
  let errorMessage = "Erreur d'authentification";
  
  switch (error.code) {
    case 'auth/popup-closed-by-user':
      errorMessage = "Connexion annulée par l'utilisateur";
      break;
    case 'auth/popup-blocked':
      errorMessage = "Popup bloquée par le navigateur. Utilisez un autre navigateur ou autorisez les popups.";
      break;
    case 'auth/account-exists-with-different-credential':
      errorMessage = "Un compte existe déjà avec cette adresse email";
      break;
    case 'auth/operation-not-allowed':
      errorMessage = "Cette méthode de connexion n'est pas activée";
      break;
    case 'auth/unauthorized-domain':
      errorMessage = "Domaine non autorisé. Veuillez configurer GitHub Pages dans Firebase Console.";
      break;
    case 'auth/configuration-not-found':
      errorMessage = "Configuration du fournisseur non trouvée";
      break;
    default:
      errorMessage = error.message || "Erreur inconnue";
  }
  
  showMessage(errorMessage, true);
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
      console.log('Nouvel utilisateur créé:', user);
    })
    .catch((error) => {
      console.error("Erreur lors de l'inscription :", error);
      handleEmailPasswordError(error);
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
      handleEmailPasswordError(error);
    });
}

// --- Gestion des erreurs email/password
function handleEmailPasswordError(error) {
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
    case 'auth/email-already-in-use':
      errorMessage = "Cette adresse email est déjà utilisée";
      break;
    case 'auth/weak-password':
      errorMessage = "Le mot de passe est trop faible";
      break;
    default:
      errorMessage = error.message;
  }
  
  showMessage(errorMessage, true);
}

// --- Gestion des événements pour providers sociaux (sign-in)
document.getElementById("google-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(googleProvider);
});

document.getElementById("facebook-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  if (isGitHubPages()) {
    showMessage("Facebook Auth nécessite une configuration spéciale sur GitHub Pages", true);
  } else {
    handleLogin(facebookProvider);
  }
});

document.getElementById("github-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(githubProvider);
});

document.getElementById("apple-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  if (isGitHubPages()) {
    showMessage("Apple Auth nécessite une configuration spéciale sur GitHub Pages", true);
  } else {
    handleLogin(appleProvider);
  }
});

// --- Gestion des événements pour providers sociaux (sign-up)
document.getElementById("google-signup")?.addEventListener("click", (e) => {
  e.preventDefault();
  handleLogin(googleProvider);
});

document.getElementById("facebook-signup")?.addEventListener("click", (e) => {
  e.preventDefault();
  if (isGitHubPages()) {
    showMessage("Facebook Auth nécessite une configuration spéciale sur GitHub Pages", true);
  } else {
    handleLogin(facebookProvider);
  }
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

// --- Fonction de déconnexion
window.logout = function() {
  signOut(auth).then(() => {
    showMessage("Déconnexion réussie");
    console.log('Utilisateur déconnecté');
  }).catch((error) => {
    showMessage("Erreur lors de la déconnexion", true);
    console.error('Erreur de déconnexion:', error);
  });
};

// --- Message d'information pour GitHub Pages
if (isGitHubPages()) {
  setTimeout(() => {
    showMessage("🚀 GitHub Pages détecté. Certains providers peuvent nécessiter une configuration supplémentaire.", false);
  }, 2000);
}

// --- Rendre les fonctions disponibles globalement si nécessaire
window.handleLogin = handleLogin;
window.currentUser = () => currentUser;
