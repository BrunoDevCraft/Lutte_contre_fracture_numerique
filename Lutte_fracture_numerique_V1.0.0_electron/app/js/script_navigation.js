/**
 * script_navigation.js
 * Gestion de la navigation SPA (Single Page Application), de l'accessibilité
 * et des interactions globales de l'interface utilisateur.
 */

// ==================== VARIABLES GLOBALES ====================

/** @type {boolean} État d'activation de la synthèse vocale */
let voiceEnabled = false;

// ==================== NAVIGATION ====================

/**
 * Affiche une section spécifique de l'application et gère l'état de l'interface.
 * Gère la visibilité des boutons de retour et le comportement de défilement.
 * @param {string} pageId - L'identifiant de la page cible (ex: 'landing', 'summary').
 */
function showPage(pageId) {
    // Réinitialisation des classes actives
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');

        // Gestion contextuelle du bouton "Retour au sommaire"
        const backBtn = document.getElementById('back-to-summary-btn');
        if (backBtn) {
            const shouldShow = pageId !== 'landing' && pageId !== 'summary';
            if (shouldShow) {
                backBtn.classList.remove('hidden-btn');
                backBtn.style.display = '';
            } else {
                backBtn.classList.add('hidden-btn');
            }
        }
        
        // Comportement de défilement intelligent selon la section
        if (pageId === 'landing') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (pageId === 'summary') {
            window.scrollTo({ top: 1000, behavior: 'smooth' });
        } else {
            const card = targetPage.querySelector('.card');
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 990, behavior: 'smooth' });
            }
        }
    }
}

/** Redirige vers la page d'accueil */
function goToLanding() { 
    showPage('landing'); 
}

/** Redirige vers le sommaire */
function goToSummary() { 
    showPage('summary'); 
}

// ==================== GESTION DES MODULES ====================

/** Initialise et ouvre le module de cours principal */
function openCourse() { 
    courseIndex = 0;
    renderCourse();
    showPage('course'); 
}

/** Initialise et ouvre le module de jeu (gamification) */
function openGame() {
    loadGameState();
    renderGameLevels();
    openGameLevel(gameState.currentLevel); 
    showPage('game');
}

/** Initialise et ouvre le module des démarches administratives */
function openDemarches() {
    if (typeof renderDemarchesCategories === 'function') {
        renderDemarchesCategories();
    }
    showPage('demarches');
}

/** Initialise et ouvre le module de cours secondaire (niveau 4) */
function openCourse4() {
    course4Index = 0;
    renderCourse4();
    showPage('course4');
}

// ==================== ACCESSIBILITÉ ====================

/**
 * Modifie la taille de la police globale de l'application.
 * Persiste le choix utilisateur dans le localStorage.
 * @param {string} size - Taille souhaitée ('normal', 'large', 'xl').
 */
function changeFontSize(size) {
    document.body.classList.remove('large-text', 'xl-text');
    if (size === 'large') document.body.classList.add('large-text');
    if (size === 'xl') document.body.classList.add('xl-text');
    localStorage.setItem('fontSize', size);
}

/**
 * Bascule le mode haut contraste pour les malvoyants.
 * Active un feedback vocal si disponible.
 */
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    
    if (typeof speakText === 'function') {
        const mode = document.body.classList.contains('high-contrast') ? 'sombre' : 'clair';
        speakText(`Mode contraste ${mode} activé.`);
    }
}

/**
 * Active ou désactive la synthèse vocale.
 * Lance la lecture de la page courante lors de l'activation.
 */
function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    localStorage.setItem('voiceEnabled', voiceEnabled);
    
    window.speechSynthesis.cancel();
    
    if (voiceEnabled) {
        speakText('Voix activée. Lecture de la page actuelle.');
        setTimeout(readActivePage, 1500); 
    } else {
        speakText('Voix désactivée');
    }
}

/**
 * Lit un texte via l'API Web Speech Synthesis.
 * Filtre les émojis et caractères spéciaux avant lecture.
 * @param {string} text - Le texte à lire.
 */
function speakText(text) {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    // Annulation immédiate pour les textes courts (réactivité)
    if (text.length < 50) {
        window.speechSynthesis.cancel();
    }
    
    // Nettoyage des caractères non vocalisables (émojis, symboles)
    const textWithoutEmojis = text.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, '');
    
    if (textWithoutEmojis.trim() === '') return;
    
    const utterance = new SpeechSynthesisUtterance(textWithoutEmojis);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

/**
 * Extrait et lit le contenu textuel de la page active.
 * Nettoie le DOM (boutons, navigation) pour ne lire que le contenu pertinent.
 */
function readActivePage() {
    if (!voiceEnabled) return;
    
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;
    
    let textToSpeak = '';
    
    const contentArea = activePage.querySelector('.card, .landing-page');
    
    if (contentArea) {
        // Clonage pour manipulation sans affecter le DOM visible
        const clone = contentArea.cloneNode(true);
        
        // Suppression des éléments non pertinents à la lecture
        clone.querySelectorAll('button, .toolbar, .progress-bar, .progress-dots, .nav-row, .dots-row, .emoji-large, .emoji, .course-image-illustration, input').forEach(el => el.remove());

        textToSpeak = clone.innerText;
        textToSpeak = textToSpeak.replace(/(\r\n|\n|\r)/gm, ' ');
        textToSpeak = textToSpeak.replace(/\s+/g, ' ');
    } else {
        textToSpeak = activePage.innerText;
    }
    
    if (textToSpeak.trim().length > 0) {
        window.speechSynthesis.cancel();
        speakText(textToSpeak);
    }
}

/** Affiche les numéros d'urgence et d'assistance */
function showHelp() {
    alert('Besoin d\'aide ?\n\n• France Services : 3939\n• Assistance numérique : 0 809 401 401\n• CNIL : 01 53 73 22 22');
}

/** Restaure les préférences utilisateur depuis le localStorage au chargement */
function restorePreferences() {
    const fontSize = localStorage.getItem('fontSize');
    const highContrast = localStorage.getItem('highContrast') === 'true';
    voiceEnabled = localStorage.getItem('voiceEnabled') === 'true';
    if (fontSize) changeFontSize(fontSize);
    if (highContrast) document.body.classList.add('high-contrast');
}

// ==================== INITIALISATION ====================

window.addEventListener('DOMContentLoaded', () => {
    restorePreferences();
    
    // Restauration conditionnelle des états des modules
    if (typeof renderCourse === 'function') {
        renderCourse();
    }
    
    if (typeof renderCourse4 === 'function') {
        const savedCourse4Index = localStorage.getItem('course4Index');
        if (savedCourse4Index && typeof course4Index !== 'undefined') {
            course4Index = parseInt(savedCourse4Index);
        }
    }
    
    const savedCourseIndex = localStorage.getItem('courseIndex');
    if (savedCourseIndex && typeof courseIndex !== 'undefined') {
        courseIndex = parseInt(savedCourseIndex);
    }
    
    if (typeof loadGameState === 'function') {
        loadGameState();
    }
});

// Sauvegarde des états de progression avant la fermeture
window.addEventListener('beforeunload', () => {
    if (typeof courseIndex !== 'undefined') {
        localStorage.setItem('courseIndex', courseIndex);
    }
    if (typeof course4Index !== 'undefined') {
        localStorage.setItem('course4Index', course4Index);
    }
});