// ==================== PRELOAD.JS - PONT SÉCURISÉ ====================
// Ce script expose de manière sécurisée les APIs Electron au renderer

const { contextBridge, ipcRenderer } = require('electron');

// ==================== EXPOSITION SÉCURISÉE DES APIs ====================
contextBridge.exposeInMainWorld('electronAPI', {
  // ==================== STOCKAGE PERSISTANT ====================
  // Remplace localStorage avec un stockage plus robuste
  storage: {
    set: (key, value) => ipcRenderer.invoke('store-set', key, value),
    get: (key) => ipcRenderer.invoke('store-get', key),
    delete: (key) => ipcRenderer.invoke('store-delete', key),
    clear: () => ipcRenderer.invoke('store-clear')
  },

  // ==================== IMPRESSION ====================
  print: () => ipcRenderer.invoke('print-diploma'),

  // ==================== RÉCEPTION DES ÉVÉNEMENTS DU MENU ====================
  onNavigate: (callback) => {
    ipcRenderer.on('navigate', (event, page) => callback(page));
  },

  onChangeFontSize: (callback) => {
    ipcRenderer.on('change-font-size', (event, action) => callback(action));
  },

  onToggleContrast: (callback) => {
    ipcRenderer.on('toggle-contrast', (event, enabled) => callback(enabled));
  },

  onOpenCourse: (callback) => {
    ipcRenderer.on('open-course', (event, courseId) => callback(courseId));
  },

  onShowHelp: (callback) => {
    ipcRenderer.on('show-help', () => callback());
  },

  onResetProgress: (callback) => {
    ipcRenderer.on('reset-progress', () => callback());
  },

  // ==================== INFORMATIONS SYSTÈME ====================
  platform: process.platform,
  version: process.versions.electron
});