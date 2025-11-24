// ==================== ELECTRON-INTEGRATION.JS ====================
// Adaptation de l'application web pour l'environnement Electron
// Remplace localStorage par le stockage Electron

// ==================== DÉTECTION DE L'ENVIRONNEMENT ====================
const isElectron = typeof window.electronAPI !== 'undefined';

console.log(`Mode: ${isElectron ? 'Electron' : 'Web'}`);

// ==================== ADAPTATEUR DE STOCKAGE ====================
// Remplace automatiquement localStorage par le stockage Electron

const StorageAdapter = {
  async setItem(key, value) {
    if (isElectron) {
      const result = await window.electronAPI.storage.set(key, value);
      if (!result.success) {
        console.error('Erreur sauvegarde:', result.error);
      }
    } else {
      localStorage.setItem(key, value);
    }
  },

  async getItem(key) {
    if (isElectron) {
      return await window.electronAPI.storage.get(key);
    } else {
      return localStorage.getItem(key);
    }
  },

  async removeItem(key) {
    if (isElectron) {
      await window.electronAPI.storage.delete(key);
    } else {
      localStorage.removeItem(key);
    }
  },

  async clear() {
    if (isElectron) {
      await window.electronAPI.storage.clear();
    } else {
      localStorage.clear();
    }
  }
};

// ==================== MIGRATION AUTOMATIQUE DU LOCALSTORAGE ====================
// Copie les données existantes de localStorage vers Electron au premier lancement

async function migrateFromLocalStorage() {
  if (!isElectron) return;

  const migrationKey = '__electron_migration_done';
  const migrationDone = await window.electronAPI.storage.get(migrationKey);

  if (migrationDone) return;

  console.log('Migration des données localStorage vers Electron...');

  // Liste des clés importantes à migrer
  const keysToMigrate = [
    'courseIndex',
    'course4Index',
    'fontSize',
    'highContrast',
    'voiceEnabled',
    'lutte_numerique_game'
  ];

  for (const key of keysToMigrate) {
    const value = localStorage.getItem(key);
    if (value !== null) {
      await window.electronAPI.storage.set(key, value);
      console.log(`✓ Migré: ${key}`);
    }
  }

  // Marquer la migration comme effectuée
  await window.electronAPI.storage.set(migrationKey, 'true');
  console.log('Migration terminée !');
}

// ==================== SURCHARGE DES FONCTIONS DE SAUVEGARDE ====================
// Modifie les fonctions existantes pour utiliser le nouvel adaptateur

// Surcharge de la fonction de sauvegarde de l'index du cours
window.originalSaveCourseIndex = function() {
  StorageAdapter.setItem('courseIndex', courseIndex);
};

// Surcharge de la fonction de chargement de l'index du cours
window.originalLoadCourseIndex = async function() {
  const saved = await StorageAdapter.getItem('courseIndex');
  if (saved) {
    courseIndex = parseInt(saved);
  }
};

// Surcharge de saveGameState
if (typeof saveGameState !== 'undefined') {
  const originalSaveGameState = saveGameState;
  window.saveGameState = function() {
    StorageAdapter.setItem('lutte_numerique_game', JSON.stringify(gameState));
  };
}

// Surcharge de loadGameState
if (typeof loadGameState !== 'undefined') {
  const originalLoadGameState = loadGameState;
  window.loadGameState = async function() {
    try {
      const saved = await StorageAdapter.getItem('lutte_numerique_game');
      if (saved) {
        gameState = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Erreur chargement jeu:', e);
    }
  };
}

// ==================== GESTION DES ÉVÉNEMENTS DU MENU ====================
if (isElectron) {
  // Navigation depuis le menu
  window.electronAPI.onNavigate((page) => {
    if (typeof showPage === 'function') {
      showPage(page);
    }
  });

  // Changement de taille de police depuis le menu
  window.electronAPI.onChangeFontSize((action) => {
    const currentSize = document.body.classList.contains('xl-text') ? 'xl' :
                       document.body.classList.contains('large-text') ? 'large' : 'normal';
    
    let newSize = currentSize;
    
    if (action === 'increase') {
      if (currentSize === 'normal') newSize = 'large';
      else if (currentSize === 'large') newSize = 'xl';
    } else if (action === 'decrease') {
      if (currentSize === 'xl') newSize = 'large';
      else if (currentSize === 'large') newSize = 'normal';
    } else if (action === 'normal') {
      newSize = 'normal';
    }
    
    if (typeof changeFontSize === 'function') {
      changeFontSize(newSize);
    }
  });

  // Toggle du mode contraste depuis le menu
  window.electronAPI.onToggleContrast((enabled) => {
    if (enabled) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    StorageAdapter.setItem('highContrast', enabled);
  });

  // Ouverture d'un cours depuis le menu
  window.electronAPI.onOpenCourse((courseId) => {
    switch(courseId) {
      case 1:
        if (typeof openCourse === 'function') openCourse();
        break;
      case 2:
        if (typeof openGame === 'function') openGame();
        break;
      case 3:
        if (typeof openDemarches === 'function') openDemarches();
        break;
      case 4:
        if (typeof openCourse4 === 'function') openCourse4();
        break;
    }
  });

  // Affichage de l'aide depuis le menu
  window.electronAPI.onShowHelp(() => {
    if (typeof showHelp === 'function') {
      showHelp();
    }
  });

  // Réinitialisation de la progression
  window.electronAPI.onResetProgress(() => {
    // Réinitialiser toutes les variables
    courseIndex = 0;
    course4Index = 0;
    gameState = { completedTasks: [], totalPoints: 0, currentLevel: 1 };
    quizState = { currentQuestion: 0, score: 0, answers: [] };
    
    // Recharger la page d'accueil
    if (typeof goToLanding === 'function') {
      goToLanding();
    }
    
    // Rafraîchir les affichages
    if (typeof renderCourse === 'function') renderCourse();
    if (typeof renderCourse4 === 'function') renderCourse4();
    if (typeof renderGameLevels === 'function') renderGameLevels();
  });

  // ==================== IMPRESSION AMÉLIORÉE ====================
  // Remplace window.print() pour utiliser l'API Electron
  const originalPrint = window.print;
  window.print = function() {
    if (isElectron) {
      window.electronAPI.print();
    } else {
      originalPrint.call(window);
    }
  };
}

// ==================== RESTAURATION DES PRÉFÉRENCES AU DÉMARRAGE ====================
async function restoreElectronPreferences() {
  if (!isElectron) return;

  const fontSize = await StorageAdapter.getItem('fontSize');
  const highContrast = await StorageAdapter.getItem('highContrast');
  const voiceEnabled = await StorageAdapter.getItem('voiceEnabled');

  if (fontSize && typeof changeFontSize === 'function') {
    changeFontSize(fontSize);
  }

  if (highContrast === 'true') {
    document.body.classList.add('high-contrast');
  }

  if (voiceEnabled === 'true' && typeof toggleVoice === 'function') {
    window.voiceEnabled = true;
  }
}

// ==================== SAUVEGARDE AVANT FERMETURE ====================
if (isElectron) {
  window.addEventListener('beforeunload', async (e) => {
    // Sauvegarder toutes les données importantes
    if (typeof courseIndex !== 'undefined') {
      await StorageAdapter.setItem('courseIndex', courseIndex);
    }
    if (typeof course4Index !== 'undefined') {
      await StorageAdapter.setItem('course4Index', course4Index);
    }
    if (typeof gameState !== 'undefined') {
      await StorageAdapter.setItem('lutte_numerique_game', JSON.stringify(gameState));
    }
  });
}

// ==================== INITIALISATION ====================
document.addEventListener('DOMContentLoaded', async () => {
  if (isElectron) {
    console.log('Initialisation Electron...');
    await migrateFromLocalStorage();
    await restoreElectronPreferences();
    console.log('✓ Application Electron prête !');
  }
});

// ==================== EXPORT GLOBAL ====================
window.StorageAdapter = StorageAdapter;