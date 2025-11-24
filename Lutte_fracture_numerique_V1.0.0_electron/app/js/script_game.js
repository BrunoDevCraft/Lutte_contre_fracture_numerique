/**
 * script_game.js
 * Gestion du système de gamification : niveaux, tâches, progression et persistance des données.
 * Version harmonisée pour s'intégrer au framework de l'application.
 */

// ==================== CONSTANTES ET ÉTAT ====================

const GAME_STORAGE_KEY = 'lutte_numerique_game';

/**
 * État global du jeu
 * @property {string[]} completedTasks - Liste des IDs des tâches validées
 * @property {number} totalPoints - Score cumulé de l'utilisateur
 * @property {number} currentLevel - Identifiant du niveau en cours
 */
let gameState = {
    completedTasks: [],
    totalPoints: 0,
    currentLevel: 1
};

// ==================== CONFIGURATION DES NIVEAUX ====================

/**
 * Configuration statique des niveaux de jeu (1 à 8).
 * Contient les métadonnées, exercices et instructions détaillées.
 */
const gameLevels = [
    {
        id: 1,
        title: "Niveau 1 : Découverte",
        icon: "🟢",
        badge: "Découvreur",
        exercises: [
            {
                id: "1-1",
                title: "Reconnaître les éléments du bureau",
                description: "Apprenez à identifier les différents éléments de votre écran",
                instructions: [
                    "Regardez votre écran d'ordinateur (le bureau)",
                    "Cherchez une icône avec un nom comme 'Word', 'Chrome', 'Calculatrice' → c'est un PROGRAMME",
                    "Cherchez une icône qui ressemble à un dossier jaune 📁 → c'est un DOSSIER",
                    "Cherchez une icône de document → c'est un FICHIER",
                    "Cochez chaque case ci-dessous quand vous avez identifié l'élément"
                ],
                tasks: [
                    { id: "1-1-1", text: "J'ai trouvé un programme sur le bureau", points: 10 },
                    { id: "1-1-2", text: "J'ai trouvé un dossier", points: 10 },
                    { id: "1-1-3", text: "J'ai trouvé un fichier", points: 10 }
                ],
                tip: "💡 Conseil : Prenez votre temps, rien n'est dangereux."
            },
            {
                id: "1-2",
                title: "Ouvrir un programme",
                description: "Pratiquez le double-clic",
                instructions: [
                    "Choisissez une icône de programme (ex: Calculatrice, Bloc-notes)",
                    "Placez le curseur de la souris sur l'icône",
                    "Cliquez DEUX FOIS rapidement avec le bouton GAUCHE",
                    "Le programme devrait s'ouvrir",
                    "Pour fermer, cliquez sur la croix ✖ en haut à droite"
                ],
                tasks: [
                    { id: "1-2-1", text: "J'ai ouvert un programme avec un double-clic", points: 15 },
                    { id: "1-2-2", text: "J'ai fermé le programme", points: 10 }
                ],
                tip: "💡 Le double-clic doit être rapide !"
            }
        ]
    },
    {
        id: 2,
        title: "Niveau 2 : Manipulations",
        icon: "🔵",
        badge: "Explo-bricoleur",
        exercises: [
            {
                id: "2-1",
                title: "Maîtriser la souris",
                description: "Pratiquez les différents types de clics",
                instructions: [
                    "CLIC SIMPLE : Cliquez UNE fois sur 3 icônes différentes",
                    "DOUBLE-CLIC : Trouvez un dossier et cliquez DEUX fois dessus",
                    "CLIC DROIT : Cliquez avec le bouton DROIT sur une icône",
                    "Un menu avec des options va apparaître",
                    "Cliquez ailleurs pour fermer ce menu"
                ],
                tasks: [
                    { id: "2-1-1", text: "J'ai fait un clic simple sur 3 icônes", points: 10 },
                    { id: "2-1-2", text: "J'ai ouvert un dossier avec double-clic", points: 15 },
                    { id: "2-1-3", text: "J'ai fait un clic droit et lu les options", points: 15 }
                ],
                tip: "💡 Le clic droit affiche un menu d'options."
            },
            {
                id: "2-2",
                title: "Créer des dossiers",
                description: "Organisez vos documents",
                instructions: [
                    "Sur le bureau, faites un CLIC DROIT sur un espace vide",
                    "Trouvez 'Nouveau' et cliquez dessus",
                    "Cliquez sur 'Dossier'",
                    "Tapez 'Mes Documents' puis appuyez sur ENTRÉE",
                    "DOUBLE-CLIQUEZ pour l'ouvrir",
                    "Créez 2 sous-dossiers (ex: 'Photos' et 'Factures')"
                ],
                tasks: [
                    { id: "2-2-1", text: "J'ai créé un dossier 'Mes Documents'", points: 20 },
                    { id: "2-2-2", text: "J'ai créé deux sous-dossiers", points: 20 }
                ],
                tip: "💡 Clic droit → Nouveau → Dossier"
            }
        ]
    },
    {
        id: 3,
        title: "Niveau 3 : Internet",
        icon: "🟣",
        badge: "Navigateur du Web",
        exercises: [
            {
                id: "3-1",
                title: "Naviguer sur Internet",
                description: "Découvrez le web en sécurité",
                instructions: [
                    "Cherchez 'Chrome', 'Firefox' ou 'Edge' sur votre bureau",
                    "DOUBLE-CLIQUEZ pour ouvrir le navigateur",
                    "Cliquez dans la barre d'adresse en haut",
                    "Tapez 'météo' et appuyez sur ENTRÉE",
                    "Pour ouvrir un nouvel onglet : CTRL + T",
                    "Ouvrez 3 onglets différents"
                ],
                tasks: [
                    { id: "3-1-1", text: "J'ai ouvert un navigateur", points: 10 },
                    { id: "3-1-2", text: "J'ai fait une recherche météo", points: 15 },
                    { id: "3-1-3", text: "J'ai ouvert 3 onglets", points: 20 }
                ],
                tip: "🔒 Vérifiez le cadenas dans la barre d'adresse."
            },
            {
                id: "3-2",
                title: "Les favoris",
                description: "Retrouvez facilement vos sites",
                instructions: [
                    "Allez sur un site internet qui vous plaît",
                    "Pour AJOUTER EN FAVORI : CTRL + D",
                    "OU cliquez sur l'ÉTOILE ⭐ en haut à droite",
                    "Cliquez sur 'Enregistrer'",
                    "Pour voir vos FAVORIS : CTRL + SHIFT + B"
                ],
                tasks: [
                    { id: "3-2-1", text: "J'ai ajouté un site en favori", points: 20 }
                ],
                tip: "💡 Ctrl + D ou cliquer sur l'étoile"
            }
        ]
    },
    {
        id: 4,
        title: "Niveau 4 : Autonomie",
        icon: "🟡",
        badge: "Explorateur Numérique",
        exercises: [
            {
                id: "4-1",
                title: "Gestion avancée des onglets",
                description: "Devenez expert de la navigation",
                instructions: [
                    "Ouvrez votre navigateur",
                    "Ouvrez 5 onglets : appuyez 5 fois sur CTRL + T",
                    "Dans chaque onglet, allez sur un site différent",
                    "Cliquez sur le 3ème onglet",
                    "Pour le FERMER : cliquez sur le X ou CTRL + W",
                    "ROUVRIR un onglet fermé : CTRL + SHIFT + T"
                ],
                tasks: [
                    { id: "4-1-1", text: "J'ai ouvert 5 onglets", points: 15 },
                    { id: "4-1-2", text: "J'ai fermé l'onglet du milieu", points: 15 },
                    { id: "4-1-3", text: "J'ai rouvert l'onglet fermé", points: 30 }
                ],
                tip: "💡 Ctrl + W pour fermer un onglet"
            },
            {
                id: "4-2",
                title: "Rechercher un fichier",
                description: "Retrouvez vos documents perdus",
                instructions: [
                    "Appuyez sur WINDOWS + S",
                    "OU cliquez sur la LOUPE 🔍 en bas à gauche",
                    "Une barre de recherche apparaît",
                    "Tapez le nom d'un fichier récent",
                    "Windows va chercher et afficher les résultats",
                    "Cliquez sur le fichier pour l'ouvrir"
                ],
                tasks: [
                    { id: "4-2-1", text: "J'ai utilisé la barre de recherche", points: 25 },
                    { id: "4-2-2", text: "J'ai retrouvé un fichier récent", points: 25 }
                ],
                tip: "💡 Windows + S ou cliquer sur la loupe"
            }
        ]
    },
    {
        id: 5,
        title: "Niveau 5 : Recherche et Vérification",
        icon: "🔍",
        badge: "Enquêteur du Web",
        exercises: [
            {
                id: "5-1",
                title: "Maîtriser la recherche Google",
                description: "Apprenez à chercher efficacement",
                instructions: [
                    "Ouvrez Google dans votre navigateur",
                    "Cherchez : 'météo Paris' et notez le résultat",
                    "Cherchez : 'recette quiche lorraine facile'",
                    "Comparez les premiers résultats : lesquels semblent les plus fiables ?",
                    "Astuce : Les sites connus (.gouv.fr, grandes marques) sont plus sûrs"
                ],
                tasks: [
                    { id: "5-1-1", text: "J'ai fait 3 recherches différentes sur Google", points: 15 },
                    { id: "5-1-2", text: "J'ai identifié un site fiable (avec cadenas 🔒)", points: 20 }
                ],
                tip: "💡 Les 3 premiers résultats ne sont pas toujours les meilleurs !"
            },
            {
                id: "5-2",
                title: "Vérifier un site web",
                description: "Apprenez les réflexes de sécurité",
                instructions: [
                    "Allez sur un site officiel comme impots.gouv.fr",
                    "Vérifiez le CADENAS 🔒 en haut à gauche de l'adresse",
                    "Vérifiez que l'adresse commence par 'https://' (avec le s)",
                    "Descendez en bas de la page : cherchez 'Mentions légales' ou 'Contact'",
                    "Ces 3 éléments = site sûr !"
                ],
                tasks: [
                    { id: "5-2-1", text: "J'ai vérifié le cadenas sur 3 sites différents", points: 20 },
                    { id: "5-2-2", text: "J'ai trouvé les mentions légales d'un site", points: 15 }
                ],
                tip: "💡 Si un site n'a pas de cadenas, soyez très prudent !"
            }
        ]
    },
    {
        id: 6,
        title: "Niveau 6 : Communication sécurisée",
        icon: "✉️",
        badge: "Communicateur Expert",
        exercises: [
            {
                id: "6-1",
                title: "Écrire un email professionnel",
                description: "Structurez vos messages",
                instructions: [
                    "Ouvrez votre messagerie (Gmail, Outlook...)",
                    "Cliquez sur 'Nouveau message'",
                    "Dans 'Objet' : écrivez un titre clair (ex: 'Demande de rendez-vous')",
                    "Dans le message : 'Bonjour' + votre demande + 'Cordialement'",
                    "Relisez AVANT d'envoyer",
                    "Pour cet exercice : envoyez-vous l'email à vous-même"
                ],
                tasks: [
                    { id: "6-1-1", text: "J'ai écrit un email avec objet, formule de politesse", points: 25 },
                    { id: "6-1-2", text: "Je me suis envoyé l'email de test", points: 15 }
                ],
                tip: "💡 Un bon email est court, poli et précis"
            },
            {
                id: "6-2",
                title: "Créer un mot de passe fort",
                description: "Protégez vos comptes",
                instructions: [
                    "Pensez à une phrase que vous aimez (ex: 'J'adore le café le matin')",
                    "Transformez-la : J'ador€LeCafé@Matin!",
                    "Vérifiez qu'il contient : Majuscules + minuscules + chiffres + symboles",
                    "Il doit faire AU MOINS 12 caractères",
                    "Notez-le dans un carnet (PAS sur l'ordinateur)",
                    "Ne le partagez avec PERSONNE"
                ],
                tasks: [
                    { id: "6-2-1", text: "J'ai créé un mot de passe de 12+ caractères", points: 20 },
                    { id: "6-2-2", text: "J'ai noté mon mot de passe dans un endroit sûr", points: 15 }
                ],
                tip: "💡 Un mot de passe fort = une porte blindée pour vos données"
            }
        ]
    },
    {
        id: 7,
        title: "Niveau 7 : Création et Organisation",
        icon: "📝",
        badge: "Créateur Organisé",
        exercises: [
            {
                id: "7-1",
                title: "Créer et enregistrer un document",
                description: "Votre premier texte",
                instructions: [
                    "Ouvrez Word ou le Bloc-notes",
                    "Écrivez une liste de courses ou un petit texte",
                    "Appuyez sur CTRL + S pour enregistrer",
                    "Donnez un nom au fichier (ex: 'Ma_liste_courses')",
                    "Choisissez 'Mes Documents' comme emplacement",
                    "Fermez le programme et rouvrez le fichier pour vérifier"
                ],
                tasks: [
                    { id: "7-1-1", text: "J'ai créé et écrit mon premier document", points: 15 },
                    { id: "7-1-2", text: "J'ai enregistré avec CTRL + S", points: 20 },
                    { id: "7-1-3", text: "J'ai rouvert le fichier pour vérifier", points: 15 }
                ],
                tip: "💡 Prenez l'habitude : CTRL + S toutes les 5 minutes !"
            },
            {
                id: "7-2",
                title: "Organiser avec des dossiers",
                description: "Rangez vos fichiers",
                instructions: [
                    "Sur le Bureau, clic droit → Nouveau → Dossier",
                    "Nommez-le 'Mes_Documents_Personnels'",
                    "Double-cliquez pour l'ouvrir",
                    "À l'intérieur, créez 3 sous-dossiers : 'Factures', 'Photos', 'Administratif'",
                    "Déplacez des fichiers dans ces dossiers (glisser-déposer)"
                ],
                tasks: [
                    { id: "7-2-1", text: "J'ai créé un dossier principal sur le Bureau", points: 15 },
                    { id: "7-2-2", text: "J'ai créé 3 sous-dossiers à l'intérieur", points: 25 }
                ],
                tip: "💡 Un bon rangement = retrouver facilement vos fichiers !"
            }
        ]
    },
    {
        id: 8,
        title: "Niveau 8 : Dépannage autonome",
        icon: "🛠️",
        badge: "Technicien Débrouillard",
        exercises: [
            {
                id: "8-1",
                title: "Résoudre les petits bugs",
                description: "Devenez autonome",
                instructions: [
                    "Simulez un problème : ouvrez 10 programmes en même temps",
                    "Constatez : l'ordinateur ralentit",
                    "Fermez tous les programmes sauf 2-3",
                    "Si un programme ne répond pas : CTRL + ALT + SUPPR",
                    "Cliquez 'Gestionnaire des tâches' → Fin de tâche",
                    "Redémarrez l'ordinateur pour un 'reset' complet"
                ],
                tasks: [
                    { id: "8-1-1", text: "J'ai fermé des programmes pour accélérer l'ordinateur", points: 20 },
                    { id: "8-1-2", text: "J'ai utilisé CTRL + ALT + SUPPR", points: 25 }
                ],
                tip: "💡 90% des bugs se résolvent avec un redémarrage !"
            },
            {
                id: "8-2",
                title: "Personnaliser votre espace",
                description: "Adaptez l'ordinateur à vos besoins",
                instructions: [
                    "Agrandissez le texte : Clic droit Bureau → Paramètres d'affichage → Taille 125%",
                    "Changez le fond d'écran : Clic droit Bureau → Personnaliser → Choisissez une image",
                    "Réglez le volume : Cliquez sur 🔊 en bas à droite",
                    "Ralentissez la souris si besoin : Paramètres → Souris → Vitesse",
                    "Testez le mode sombre : Paramètres → Personnalisation → Sombre"
                ],
                tasks: [
                    { id: "8-2-1", text: "J'ai agrandi le texte à l'écran", points: 15 },
                    { id: "8-2-2", text: "J'ai changé mon fond d'écran", points: 15 },
                    { id: "8-2-3", text: "J'ai personnalisé un autre réglage", points: 20 }
                ],
                tip: "💡 L'ordinateur doit s'adapter à VOUS, pas l'inverse !"
            }
        ]
    }
];

// ==================== GESTION DE L'ÉTAT (PERSISTANCE) ====================

/** Charge la sauvegarde depuis le localStorage avec gestion d'erreur */
function loadGameState() {
    try {
        const saved = localStorage.getItem(GAME_STORAGE_KEY);
        if (saved) {
            gameState = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Erreur chargement jeu:', e);
    }
}

/** Sauvegarde l'état actuel (points, tâches) dans le localStorage */
function saveGameState() {
    try {
        localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
        console.error('Erreur sauvegarde jeu:', e);
    }
}

/** Réinitialise complètement la progression utilisateur après confirmation */
function resetGame() {
    if (confirm('Voulez-vous réinitialiser votre progression ?')) {
        gameState = { completedTasks: [], totalPoints: 0, currentLevel: 1 };
        localStorage.removeItem(GAME_STORAGE_KEY);
        renderGameLevels();
        const gameContent = document.getElementById('game-content');
        if (gameContent) gameContent.innerHTML = '';
    }
}

// ==================== LOGIQUE D'AFFICHAGE ====================

/**
 * Point d'entrée pour l'initialisation de l'interface de jeu.
 * Charge les données et affiche le niveau courant.
 */
function openGame() {
    loadGameState();
    renderGameLevels();
    openGameLevel(gameState.currentLevel);
    showPage('game');
}

/**
 * Génère le menu de sélection des niveaux.
 * Calcule la progression (tâches complétées vs total) pour afficher les badges.
 */
function renderGameLevels() {
    const levelsContainer = document.getElementById('game-levels');
    if (!levelsContainer) return;
    
    levelsContainer.innerHTML = '';
    
    gameLevels.forEach(level => {
        // Calcul des métriques de progression
        const totalTasks = level.exercises.reduce((sum, ex) => sum + ex.tasks.length, 0);
        const completedTasks = level.exercises.reduce((sum, ex) => {
            return sum + ex.tasks.filter(t => gameState.completedTasks.includes(t.id)).length;
        }, 0);
        
        const card = document.createElement('div');
        card.className = 'level-card';
        if (level.id === gameState.currentLevel) card.classList.add('active');
        if (completedTasks === totalTasks && totalTasks > 0) card.classList.add('completed');
        
        card.innerHTML = `
            <div style="font-size: 3em; margin-bottom: 10px;">${level.icon}</div>
            <h4>${level.title}</h4>
            <div class="badge">${completedTasks} / ${totalTasks}</div>
            <button class="btn btn-primary small" style="width: 100%; margin-top: 15px;">
                ${level.id === gameState.currentLevel ? 'Continuer' : 'Ouvrir'}
            </button>
        `;
        
        card.querySelector('button').onclick = () => openGameLevel(level.id);
        levelsContainer.appendChild(card);
    });
    
    // Mise à jour de l'affichage du score total
    const pointsEl = document.getElementById('game-points');
    if (pointsEl) pointsEl.textContent = gameState.totalPoints;
}

/**
 * Affiche le contenu détaillé d'un niveau spécifique.
 * Génère dynamiquement les exercices et la liste des tâches.
 * @param {number} levelId - L'ID du niveau à afficher.
 */
function openGameLevel(levelId) {
    gameState.currentLevel = levelId;
    saveGameState();
    
    const level = gameLevels.find(l => l.id === levelId);
    if (!level) return;
    
    const gameContent = document.getElementById('game-content');
    if (!gameContent) return;
    
    // Construction de l'en-tête du niveau
    gameContent.innerHTML = `
        <div class="card" style="margin-top: 30px;">
            <h3 style="color: var(--primary); font-size: 2rem; margin-bottom: 20px;">
                ${level.icon} ${level.title}
            </h3>
            <div id="exercises-container"></div>
        </div>
    `;
    
    const exercisesContainer = document.getElementById('exercises-container');
    if (!exercisesContainer) return;
    
    // Génération des blocs d'exercices
    level.exercises.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.style.marginBottom = '40px';
        
        exerciseDiv.innerHTML = `
            <div style="background: linear-gradient(90deg, #f7f1ff, #fff5f9); padding: 30px; border-radius: 16px;">
                <h4 style="color: #4C1D95; font-size: 1.5rem; margin-bottom: 10px;">${exercise.title}</h4>
                <p style="color: #666; margin-bottom: 20px;">${exercise.description}</p>
                
                <div class="instructions">
                    <h4>📋 Instructions détaillées</h4>
                    <ol class="game-instructions-list">
                        ${exercise.instructions.map(inst => `<li>${inst}</li>`).join('')}
                    </ol>
                </div>
                
                <h4 style="margin: 25px 0 15px; color: #3C1361;">✅ Tâches à accomplir</h4>
                <div id="tasks-${exercise.id}"></div>
                
                <div class="tip">${exercise.tip}</div>
            </div>
        `;
        
        exercisesContainer.appendChild(exerciseDiv);
        
        // Génération des tâches interactives
        const tasksContainer = document.getElementById(`tasks-${exercise.id}`);
        if (!tasksContainer) return;
        
        exercise.tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            if (gameState.completedTasks.includes(task.id)) {
                taskDiv.classList.add('completed');
            }
            
            taskDiv.innerHTML = `
                <div class="task-dot">${gameState.completedTasks.includes(task.id) ? '✓' : ''}</div>
                <div class="text">${task.text}</div>
                <div class="points">+${task.points} pts</div>
            `;
            
            taskDiv.onclick = () => toggleTask(task.id, task.points, taskDiv);
            tasksContainer.appendChild(taskDiv);
        });
    });
    
    renderGameLevels();
    
    // Auto-scroll vers le début du contenu pour une meilleure UX
    const gameCard = document.querySelector('#game-content .card');
    if (gameCard) {
        gameCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Gère le clic sur une tâche : validation, ajout de points et feedback.
 * Empêche la double validation d'une même tâche.
 * @param {string} taskId - L'identifiant unique de la tâche.
 * @param {number} points - Points attribués pour la tâche.
 * @param {HTMLElement} taskDiv - L'élément DOM représentant la tâche.
 */
function toggleTask(taskId, points, taskDiv) {
    if (!gameState.completedTasks.includes(taskId)) {
        gameState.completedTasks.push(taskId);
        gameState.totalPoints += points;
        taskDiv.classList.add('completed');
        
        const dotEl = taskDiv.querySelector('.task-dot');
        if (dotEl) dotEl.textContent = '✓';
        
        saveGameState();
        renderGameLevels();
        
        // Feedback vocal pour l'accessibilité
        if (typeof speakText === 'function') {
            speakText(`Bravo ! Vous avez gagné ${points} points !`);
        }
    }
}

// ==================== INITIALISATION ====================

window.addEventListener('DOMContentLoaded', () => {
    loadGameState();
});