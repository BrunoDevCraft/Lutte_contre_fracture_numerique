// ==================== MAIN.JS - PROCESSUS PRINCIPAL ELECTRON ====================

const { app, BrowserWindow, Menu, ipcMain, screen, dialog } = require('electron');
const path = require('path');
const Store = require('electron-store');

// Initialisation du stockage persistant (remplace localStorage)
const store = new Store();

let mainWindow;
let isFullScreen = false;

// ==================== CRÉATION DE LA FENÊTRE PRINCIPALE ====================
function createWindow() {
  // Récupération des dimensions de l'écran
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: Math.floor(width * 0.9),
    height: Math.floor(height * 0.9),
    minWidth: 1024,
    minHeight: 768,
    center: true,
    title: 'Lutte Fracture Numérique - Formation Accessible',
    icon: path.join(__dirname, 'build/icon.png'),
    backgroundColor: '#667eea',
    show: false, // Affiche la fenêtre uniquement quand prête
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false, // Sécurité renforcée
      spellcheck: false
    }
  });

  // Chargement de l'application
  mainWindow.loadFile(path.join(__dirname, 'app/index.html'));

  // Affichage de la fenêtre quand prête (évite le clignotement)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Ouverture des DevTools en développement (commenter en production)
    // mainWindow.webContents.openDevTools();
  });

  // Création du menu personnalisé
  createMenu();

  // Gestion de la fermeture
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Empêcher la navigation externe
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) {
      event.preventDefault();
    }
  });
}

// ==================== MENU DE L'APPLICATION ====================
function createMenu() {
  const template = [
    {
      label: 'Fichier',
      submenu: [
        {
          label: 'Retour à l\'accueil',
          accelerator: 'CmdOrCtrl+H',
          click: () => {
            mainWindow.webContents.send('navigate', 'landing');
          }
        },
        { type: 'separator' },
        {
          label: 'Imprimer',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            mainWindow.webContents.print();
          }
        },
        { type: 'separator' },
        {
          label: 'Quitter',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        {
          label: 'Plein écran',
          accelerator: 'F11',
          click: () => {
            isFullScreen = !isFullScreen;
            mainWindow.setFullScreen(isFullScreen);
          }
        },
        { type: 'separator' },
        {
          label: 'Augmenter la taille du texte',
          accelerator: 'CmdOrCtrl+Plus',
          click: () => {
            mainWindow.webContents.send('change-font-size', 'increase');
          }
        },
        {
          label: 'Diminuer la taille du texte',
          accelerator: 'CmdOrCtrl+-',
          click: () => {
            mainWindow.webContents.send('change-font-size', 'decrease');
          }
        },
        {
          label: 'Taille normale',
          accelerator: 'CmdOrCtrl+0',
          click: () => {
            mainWindow.webContents.send('change-font-size', 'normal');
          }
        },
        { type: 'separator' },
        {
          label: 'Mode contraste élevé',
          accelerator: 'CmdOrCtrl+Shift+C',
          type: 'checkbox',
          checked: false,
          click: (menuItem) => {
            mainWindow.webContents.send('toggle-contrast', menuItem.checked);
          }
        },
        { type: 'separator' },
        {
          label: 'Actualiser',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.reload();
          }
        }
      ]
    },
    {
      label: 'Cours',
      submenu: [
        {
          label: 'Cours 1 - Dédramatiser',
          click: () => {
            mainWindow.webContents.send('open-course', 1);
          }
        },
        {
          label: 'Cours 2 - Maîtriser',
          click: () => {
            mainWindow.webContents.send('open-course', 2);
          }
        },
        {
          label: 'Cours 3 - Démarches',
          click: () => {
            mainWindow.webContents.send('open-course', 3);
          }
        },
        {
          label: 'Cours 4 - Autonomie',
          click: () => {
            mainWindow.webContents.send('open-course', 4);
          }
        }
      ]
    },
    {
      label: 'Aide',
      submenu: [
        {
          label: 'Guide d\'utilisation',
          click: () => {
            mainWindow.webContents.send('show-help');
          }
        },
        {
          label: 'Raccourcis clavier',
          click: () => {
            showShortcutsDialog();
          }
        },
        { type: 'separator' },
        {
          label: 'Réinitialiser la progression',
          click: () => {
            const response = dialog.showMessageBoxSync(mainWindow, {
              type: 'question',
              buttons: ['Annuler', 'Réinitialiser'],
              defaultId: 0,
              title: 'Réinitialisation',
              message: 'Voulez-vous vraiment réinitialiser toute votre progression ?',
              detail: 'Cette action est irréversible.'
            });
            
            if (response === 1) {
              store.clear();
              mainWindow.webContents.send('reset-progress');
              dialog.showMessageBoxSync(mainWindow, {
                type: 'info',
                title: 'Réinitialisation',
                message: 'Votre progression a été réinitialisée.'
              });
            }
          }
        },
        { type: 'separator' },
        {
          label: 'À propos',
          click: () => {
            dialog.showMessageBoxSync(mainWindow, {
              type: 'info',
              title: 'À propos',
              message: 'Lutte contre la Fracture Numérique',
              detail: `Version 1.0.0\n\nFormation accessible pour tous\n\nDéveloppé par BrunoDevCraft\nLicence MIT`
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// ==================== DIALOGUE DES RACCOURCIS ====================
function showShortcutsDialog() {
  const shortcuts = `
Raccourcis clavier :

Navigation :
• Ctrl/Cmd + H : Retour à l'accueil
• Flèches ← / → : Navigation dans les cours

Affichage :
• F11 : Plein écran
• Ctrl/Cmd + Plus : Augmenter le texte
• Ctrl/Cmd + Moins : Diminuer le texte
• Ctrl/Cmd + 0 : Taille normale
• Ctrl/Cmd + Shift + C : Mode contraste

Autres :
• Ctrl/Cmd + P : Imprimer
• Ctrl/Cmd + Q : Quitter
• Ctrl/Cmd + R : Actualiser
  `.trim();

  dialog.showMessageBoxSync(mainWindow, {
    type: 'info',
    title: 'Raccourcis clavier',
    message: shortcuts
  });
}

// ==================== GESTION DU STOCKAGE (IPC) ====================

// Sauvegarde des données (remplace localStorage)
ipcMain.handle('store-set', (event, key, value) => {
  try {
    store.set(key, value);
    return { success: true };
  } catch (error) {
    console.error('Erreur sauvegarde:', error);
    return { success: false, error: error.message };
  }
});

// Récupération des données
ipcMain.handle('store-get', (event, key) => {
  try {
    return store.get(key);
  } catch (error) {
    console.error('Erreur lecture:', error);
    return null;
  }
});

// Suppression d'une clé
ipcMain.handle('store-delete', (event, key) => {
  try {
    store.delete(key);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Effacement complet
ipcMain.handle('store-clear', () => {
  try {
    store.clear();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ==================== GESTION DE L'IMPRESSION ====================
ipcMain.handle('print-diploma', () => {
  mainWindow.webContents.print({
    silent: false,
    printBackground: true,
    color: true,
    landscape: true
  });
});

// ==================== CYCLE DE VIE DE L'APPLICATION ====================

// Création de la fenêtre au démarrage
app.whenReady().then(createWindow);

// Recréer une fenêtre si toutes sont fermées (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Quitter complètement sur toutes les plateformes sauf macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Nettoyage avant fermeture
app.on('before-quit', () => {
  console.log('Application fermée correctement');
});