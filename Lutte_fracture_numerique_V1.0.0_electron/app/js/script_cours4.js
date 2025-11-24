/**
 * script_cours4.js
 * Module de formation "Autonomie Numérique".
 * Gère le déroulement du cours, le système de quiz interactif et la génération de diplôme.
 */

// ==================== VARIABLES D'ÉTAT ====================

/** @type {number} Index de la section actuelle du cours */
let course4Index = 0;

/**
 * État du quiz en cours.
 * @property {number} currentQuestion - Index de la question actuelle
 * @property {number} score - Nombre de réponses correctes
 * @property {Array} answers - Historique des réponses (optionnel)
 */
let quiz4State = {
    currentQuestion: 0,
    score: 0,
    answers: []
};

// ==================== CONFIGURATION DU CONTENU ====================

/**
 * Sections du cours (contenu HTML statique).
 * Contient le titre, l'icône et le balisage HTML à injecter pour chaque diapositive.
 * @type {Array<{icon: string, title: string, content: string}>}
 */
const cours4Sections = [
    {
        icon: "🎯",
        title: "Bienvenue dans votre formation à l'autonomie !",
        content: `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 8em; margin-bottom: 30px; animation: bounce 2s infinite;">🌟</div>
                <h2 style="font-size: 2.5em; color: #667eea; margin-bottom: 30px;">
                    Devenez complètement autonome avec le numérique !
                </h2>
                <div class="card" style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border: none; max-width: 800px; margin: 30px auto; text-align: left;">
                    <h3 style="text-align: center; margin-bottom: 25px; color: #2e7d32;">
                        ✨ Dans ce cours, vous allez apprendre à :
                    </h3>
                    <ul class="list-style" style="font-size: 1.15em; line-height: 2;">
                        <li>Chercher et vérifier des informations en ligne</li>
                        <li>Communiquer en toute sécurité (emails, messages)</li>
                        <li>Créer vos premiers documents numériques</li>
                        <li>Protéger vos données personnelles</li>
                        <li>Résoudre des petits problèmes techniques</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        icon: "🔍",
        title: "Chercher des informations en ligne",
        content: `
            <div class="card" style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-color: #2196f3; padding: 35px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 6em; margin-bottom: 20px;">🔍</div>
                    <h2 style="font-size: 2.2em; color: #1565c0;">Trouver ce que vous cherchez sur Internet</h2>
                </div>
                <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 25px;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">🏪 Internet = Un immense magasin</h3>
                    <p style="font-size: 1.1em; line-height: 1.8;">
                        Imaginez que vous cherchez une <strong>recette de gâteau</strong> dans un magasin géant.
                    </p>
                </div>
            </div>
        `
    },
    {
        icon: "✅",
        title: "Reconnaître un site fiable",
        content: `
            <div class="card" style="background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-color: #9c27b0; padding: 35px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 6em; margin-bottom: 20px;">🛡️</div>
                    <h2 style="font-size: 2.2em; color: #7b1fa2;">Comment savoir si un site est sérieux ?</h2>
                </div>
                <div class="alert alert-info">
                    <h4>💡 Le cadenas 🔒 dans la barre d'adresse = site sécurisé</h4>
                </div>
            </div>
        `
    },
    {
        icon: "✉️",
        title: "Envoyer un email",
        content: `
            <div class="card" style="background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-color: #ec407a; padding: 35px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 6em; margin-bottom: 20px;">✉️</div>
                    <h2 style="font-size: 2.2em; color: #c2185b;">Maîtriser les emails</h2>
                </div>
                <div class="alert alert-success">
                    <h4>Structure d'un email :</h4>
                    <p>À : adresse du destinataire</p>
                    <p>Objet : le sujet de votre message</p>
                    <p>Corps : votre message avec formules de politesse</p>
                </div>
            </div>
        `
    },
    {
        icon: "🔗",
        title: "Partager en toute sécurité",
        content: `
            <div class="card" style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-color: #ff9800; padding: 35px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 6em; margin-bottom: 20px;">🔐</div>
                    <h2 style="font-size: 2.2em; color: #e65100;">Partager sans danger</h2>
                </div>
                <div class="alert alert-danger">
                    <h4>❌ NE PARTAGEZ JAMAIS :</h4>
                    <ul>
                        <li>Vos mots de passe</li>
                        <li>Vos numéros de carte bancaire</li>
                        <li>Votre numéro de sécurité sociale</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        icon: "📝",
        title: "Créer un document",
        content: `
            <div class="card" style="background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%); border-color: #5c6bc0; padding: 35px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 6em; margin-bottom: 20px;">📝</div>
                    <h2 style="font-size: 2.2em; color: #3949ab;">Écrire votre premier texte</h2>
                </div>
                <div class="alert alert-info">
                    <h4>💡 CTRL + S pour enregistrer</h4>
                </div>
            </div>
        `
    },
    {
        icon: "🔐",
        title: "Créer un mot de passe fort",
        content: `
            <div class="card" style="background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); border-color: #f44336; padding: 35px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 6em; margin-bottom: 20px;">🔐</div>
                    <h2 style="font-size: 2.2em; color: #c62828;">Les mots de passe</h2>
                </div>
                <div class="alert alert-warning">
                    <h4>✅ Bon mot de passe :</h4>
                    <p>Au moins 12 caractères avec majuscules, minuscules, chiffres et symboles</p>
                </div>
            </div>
        `
    },
    {
        icon: "🕵️",
        title: "Détecter les arnaques",
        content: `
            <div class="card" style="background: linear-gradient(135deg, #fffde7 0%, #fff9c4 100%); border-color: #fbc02d; padding: 35px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 6em; margin-bottom: 20px;">🚨</div>
                    <h2 style="font-size: 2.2em; color: #f57f17;">Reconnaître les pièges</h2>
                </div>
                <div class="alert alert-danger">
                    <h4>🚩 Signaux d'alerte :</h4>
                    <ul>
                        <li>Urgence artificielle</li>
                        <li>Demande d'informations personnelles</li>
                        <li>Fautes d'orthographe</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        icon: "🛠️",
        title: "Résoudre les petits problèmes",
        content: `
            <div class="card" style="background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); border-color: #26a69a; padding: 35px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 6em; margin-bottom: 20px;">🛠️</div>
                    <h2 style="font-size: 2.2em; color: #00695c;">Les pannes courantes</h2>
                </div>
                <div class="alert alert-info">
                    <h4>💡 La règle des 3 R :</h4>
                    <ol>
                        <li>Redémarrer</li>
                        <li>Réessayer</li>
                        <li>Rechercher de l'aide</li>
                    </ol>
                </div>
            </div>
        `
    },
    {
        icon: "✅",
        title: "Prêt pour le quiz final ?",
        content: `
            <div class="card" style="text-align: center; padding: 50px;">
                <div class="alert alert-success" style="padding: 40px;">
                    <p style="font-size: 1.5em; font-weight: bold; margin-bottom: 15px;">
                        ✅ Vous avez terminé le Cours 4 : Autonomie Numérique !
                    </p>
                    <p style="font-size: 1.2em; margin-bottom: 20px;">
                        Testez vos nouvelles compétences avec le quiz
                    </p>
                </div>
            </div>
        `
    }
];

/**
 * Base de données des questions du quiz.
 * @type {Array<{question: string, options: string[], correct: number, explanation: string}>}
 */
const quiz4Questions = [
    {
        question: "Pour chercher une information sur Internet, vous devez utiliser :",
        options: ["Un moteur de recherche comme Google", "Microsoft Word", "La Calculatrice", "Le Bloc-notes"],
        correct: 0,
        explanation: "Un moteur de recherche comme Google vous permet de chercher des informations sur Internet."
    },
    {
        question: "Un site est sécurisé si vous voyez :",
        options: ["Un cadenas 🔒 dans la barre d'adresse", "Beaucoup de publicités", "Des pop-ups", "Le mot 'gratuit'"],
        correct: 0,
        explanation: "Le cadenas fermé dans la barre d'adresse indique que le site utilise une connexion sécurisée (HTTPS)."
    },
    {
        question: "Un bon mot de passe doit contenir :",
        options: ["Votre prénom", "Au moins 12 caractères avec majuscules, chiffres et symboles", "123456", "Votre date de naissance"],
        correct: 1,
        explanation: "Un bon mot de passe est long (12+ caractères), mélange majuscules, minuscules, chiffres et symboles."
    },
    {
        question: "Pour enregistrer votre travail, vous appuyez sur :",
        options: ["CTRL + Z", "CTRL + S", "CTRL + P", "CTRL + X"],
        correct: 1,
        explanation: "CTRL + S signifie 'Save' (Sauvegarder). C'est le raccourci universel pour enregistrer."
    },
    {
        question: "Si un programme ne répond plus, vous devez :",
        options: ["Jeter l'ordinateur", "Cliquer sur la croix ✖", "Attendre 3 heures", "Débrancher tout"],
        correct: 1,
        explanation: "Essayez d'abord de fermer avec la croix. Si ça ne marche pas, utilisez CTRL + ALT + SUPPR."
    },
    {
        question: "Vous pouvez partager publiquement :",
        options: ["Votre numéro de carte bancaire", "Des photos de vacances", "Votre mot de passe", "Votre code PIN"],
        correct: 1,
        explanation: "Les photos de vacances sont sans danger. Ne partagez JAMAIS vos mots de passe ou informations bancaires !"
    },
    {
        question: "Un signal d'arnaque typique est :",
        options: ["Un message calme", "L'urgence : 'Cliquez vite !'", "Un email de votre banque", "Une facture normale"],
        correct: 1,
        explanation: "L'urgence artificielle est une tactique d'arnaque classique."
    },
    {
        question: "Pour annuler votre dernière action :",
        options: ["CTRL + Z", "CTRL + C", "CTRL + V", "CTRL + A"],
        correct: 0,
        explanation: "CTRL + Z annule votre dernière action."
    },
    {
        question: "Si l'ordinateur est lent, vous pouvez :",
        options: ["Le jeter", "Fermer les programmes inutiles et redémarrer", "Le congeler", "Crier dessus"],
        correct: 1,
        explanation: "Fermez les programmes inutiles, puis redémarrez l'ordinateur."
    },
    {
        question: "Le symbole https:// signifie :",
        options: ["Site dangereux", "Site sécurisé", "Site gratuit", "Site lent"],
        correct: 1,
        explanation: "HTTPS signifie que la connexion est sécurisée."
    }
];

// ==================== GESTION DE LA NAVIGATION ====================

/** Initialise le cours et affiche la première section */
function openCourse4() {
    course4Index = 0;
    renderCourse4();
    showPage('course4');
}

/**
 * Affiche la section actuelle du cours avec des effets de transition.
 * Met à jour la barre de progression, les indicateurs et les boutons de navigation.
 * Gère également la synthèse vocale si activée.
 */
function renderCourse4() {
    const section = cours4Sections[course4Index];
    const contentDiv = document.getElementById('course4-content');
    
    if (!contentDiv) return;
    
    // Animation de transition
    contentDiv.style.opacity = '0';
    contentDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        contentDiv.innerHTML = section.content;
        contentDiv.style.opacity = '1';
        contentDiv.style.transform = 'translateY(0)';
        
        // Mise à jour de la barre de progression
        const progressPercentage = ((course4Index + 1) / cours4Sections.length) * 100;
        const progressBarFill = document.getElementById('course4-progress');
        if (progressBarFill) {
            progressBarFill.style.width = progressPercentage + '%';
        }
        
        updateCourse4Dots();
        
        // Gestion des boutons Précédent/Suivant
        const prevBtn = document.getElementById('prev-btn-4');
        const nextBtn = document.getElementById('next-btn-4');
        
        if (prevBtn) prevBtn.disabled = course4Index === 0;
        
        if (nextBtn) {
            if (course4Index === cours4Sections.length - 1) {
                nextBtn.textContent = 'Commencer le Quiz 🎯';
            } else {
                nextBtn.textContent = 'Suivant →';
            }
        }
        
        // Lecture vocale automatique
        if (typeof speakText === 'function') {
            speakText(section.title);
        }
        
        localStorage.setItem('course4Index', course4Index);
        
        // Scroll automatique vers le haut
        const courseCard = document.querySelector('#page-course4 .card');
        if (courseCard) {
            courseCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
}

/** Met à jour l'état visuel des indicateurs de pagination (dots) */
function updateCourse4Dots() {
    const dotsContainer = document.getElementById('course4-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    cours4Sections.forEach((section, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('data-tooltip', `${index + 1}. ${section.title}`);
        dot.onclick = () => {
            course4Index = index;
            renderCourse4();
        };
        if (index === course4Index) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    });
}

/** Passe à la section suivante ou démarre le quiz à la fin */
function nextCourse4() {
    if (course4Index < cours4Sections.length - 1) {
        course4Index++;
        renderCourse4();
    } else {
        startQuiz4();
    }
}

/** Revient à la section précédente */
function prevCourse4() {
    if (course4Index > 0) {
        course4Index--;
        renderCourse4();
    }
}

// ==================== LOGIQUE DU QUIZ ====================

/** Initialise et lance le quiz */
function startQuiz4() {
    quiz4State = { currentQuestion: 0, score: 0, answers: [] };
    showPage('quiz4');
    loadQuestion4();
}

/**
 * Charge la question actuelle et met à jour l'interface utilisateur.
 * Réinitialise l'état visuel des options et de l'explication.
 */
function loadQuestion4() {
    const question = quiz4Questions[quiz4State.currentQuestion];
    
    const questionNumberEl = document.getElementById('quiz4-question-number');
    const scoreEl = document.getElementById('quiz4-score');
    const progressEl = document.getElementById('quiz4-progress');
    const questionEl = document.getElementById('quiz4-question');
    const optionsContainer = document.getElementById('quiz4-options');
    const explanationEl = document.getElementById('quiz4-explanation');
    
    if (questionNumberEl) {
        questionNumberEl.textContent = `Question ${quiz4State.currentQuestion + 1} / ${quiz4Questions.length}`;
    }
    
    if (scoreEl) {
        scoreEl.textContent = `Score: ${quiz4State.score}`;
    }
    
    const progress = ((quiz4State.currentQuestion + 1) / quiz4Questions.length) * 100;
    if (progressEl) {
        progressEl.style.width = progress + '%';
    }
    
    if (questionEl) {
        questionEl.textContent = question.question;
    }
    
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.textContent = option;
            optionDiv.onclick = () => selectAnswer4(index);
            optionsContainer.appendChild(optionDiv);
        });
    }
    
    if (explanationEl) {
        explanationEl.classList.remove('show');
    }
}

/**
 * Gère la sélection d'une réponse par l'utilisateur.
 * Vérifie la réponse, met à jour le score, affiche l'explication et passe à la question suivante.
 * @param {number} selectedIndex - Index de l'option choisie.
 */
function selectAnswer4(selectedIndex) {
    const question = quiz4Questions[quiz4State.currentQuestion];
    const options = document.querySelectorAll('#quiz4-options .quiz-option');
    const explanation = document.getElementById('quiz4-explanation');
    
    // Désactivation des interactions après sélection
    options.forEach(opt => {
        opt.classList.add('disabled');
        opt.onclick = null;
    });
    
    // Feedback visuel (vert/rouge)
    options.forEach((opt, i) => {
        if (i === question.correct) opt.classList.add('correct');
        else if (i === selectedIndex) opt.classList.add('wrong');
    });
    
    if (selectedIndex === question.correct) {
        quiz4State.score++;
        const scoreEl = document.getElementById('quiz4-score');
        if (scoreEl) scoreEl.textContent = `Score: ${quiz4State.score}`;
    }
    
    if (explanation) {
        explanation.innerHTML = `
            <strong style="color: ${selectedIndex === question.correct ? 'var(--success)' : 'var(--danger)'};">
                ${selectedIndex === question.correct ? '✅ Correct !' : '❌ Incorrect'}
            </strong>
            <p style="margin-top: 15px;">${question.explanation}</p>
        `;
        explanation.classList.add('show');
    }
    
    // Délai avant la question suivante ou les résultats
    setTimeout(() => {
        if (quiz4State.currentQuestion < quiz4Questions.length - 1) {
            quiz4State.currentQuestion++;
            loadQuestion4();
        } else {
            showResults4();
        }
    }, 4000);
}

/** Calcule le résultat final et affiche la page de fin de quiz */
function showResults4() {
    const percentage = Math.round((quiz4State.score / quiz4Questions.length) * 100);
    
    const resultsScoreEl = document.getElementById('results4-score');
    const resultsProgressEl = document.getElementById('results4-progress');
    const resultsIconEl = document.getElementById('results4-icon');
    const resultsTitleEl = document.getElementById('results4-title');
    const resultsMessageEl = document.getElementById('results4-message');
    
    if (resultsScoreEl) {
        resultsScoreEl.textContent = `${quiz4State.score} / ${quiz4Questions.length}`;
    }
    
    if (resultsProgressEl) {
        resultsProgressEl.style.width = percentage + '%';
    }
    
    // Définition du message selon la performance
    if (percentage >= 80) {
        if (resultsIconEl) resultsIconEl.textContent = '🎉';
        if (resultsTitleEl) resultsTitleEl.textContent = 'Excellent !';
        if (resultsMessageEl) resultsMessageEl.textContent = 'Vous maîtrisez parfaitement l\'autonomie numérique !';
    } else if (percentage >= 60) {
        if (resultsIconEl) resultsIconEl.textContent = '👍';
        if (resultsTitleEl) resultsTitleEl.textContent = 'Bien joué !';
        if (resultsMessageEl) resultsMessageEl.textContent = 'Vous êtes sur la bonne voie vers l\'autonomie !';
    } else {
        if (resultsIconEl) resultsIconEl.textContent = '💪';
        if (resultsTitleEl) resultsTitleEl.textContent = 'Continuez !';
        if (resultsMessageEl) resultsMessageEl.textContent = 'Relisez le cours et réessayez !';
    }
    
    showPage('results4');
}

/** Relance le quiz depuis le début */
function restartQuiz4() { 
    startQuiz4(); 
}

/** Retourne au début du cours */
function backToCourse4() {
    course4Index = 0;
    renderCourse4();
    showPage('course4');
}

// ==================== GÉNÉRATION DU DIPLÔME ====================

/**
 * Génère et affiche le diplôme personnalisé avec le nom de l'utilisateur.
 * Vérifie que le champ nom n'est pas vide.
 */
function generateDiploma4() {
    const userNameInput = document.getElementById('user-name4');
    const userName = userNameInput ? userNameInput.value.trim() : '';
    
    if (!userName) {
        alert('Veuillez entrer votre nom');
        return;
    }
    
    const diplomaNameEl = document.getElementById('diploma4-name');
    if (diplomaNameEl) {
        diplomaNameEl.textContent = userName;
    }
    
    const percentage = Math.round((quiz4State.score / quiz4Questions.length) * 100);
    const diplomaScoreEl = document.getElementById('diploma4-score');
    if (diplomaScoreEl) {
        diplomaScoreEl.textContent = `${quiz4State.score}/${quiz4Questions.length} (${percentage}%)`;
    }
    
    const diplomaDateEl = document.getElementById('diploma4-date');
    if (diplomaDateEl) {
        diplomaDateEl.textContent = new Date().toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    showPage('diplome4');
    
    if (typeof speakText === 'function') {
        speakText(`Félicitations ${userName} pour votre diplôme d'autonomie numérique !`);
    }
}

// ==================== GESTION DES ÉVÉNEMENTS (ACCESSIBILITÉ) ====================

// Navigation au clavier (Flèches gauche/droite)
document.addEventListener('keydown', (e) => {
    const course4Page = document.getElementById('page-course4');
    if (!course4Page || !course4Page.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextCourse4();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCourse4();
    }
});

// Variables pour la détection du balayage tactile (Swipe)
let touchStart4X = 0;
let touchEnd4X = 0;

document.addEventListener('touchstart', (e) => {
    const course4Page = document.getElementById('page-course4');
    if (!course4Page || !course4Page.classList.contains('active')) return;
    touchStart4X = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    const course4Page = document.getElementById('page-course4');
    if (!course4Page || !course4Page.classList.contains('active')) return;
    
    touchEnd4X = e.changedTouches[0].screenX;
    const diff = touchStart4X - touchEnd4X;
    
    // Seuil de détection du swipe (50px)
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextCourse4();
        } else {
            prevCourse4();
        }
    }
});

// ==================== INITIALISATION ET EXPORT ====================

window.addEventListener('DOMContentLoaded', () => {
    const savedCourse4Index = localStorage.getItem('course4Index');
    if (savedCourse4Index) {
        course4Index = parseInt(savedCourse4Index);
    }
});

window.addEventListener('beforeunload', () => {
    localStorage.setItem('course4Index', course4Index);
});

// Export des fonctions pour l'accès global (via HTML onclick)
window.openCourse4 = openCourse4;
window.renderCourse4 = renderCourse4;
window.nextCourse4 = nextCourse4;
window.prevCourse4 = prevCourse4;
window.startQuiz4 = startQuiz4;

window.showResults4 = showResults4;
window.restartQuiz4 = restartQuiz4;
window.backToCourse4 = backToCourse4;
window.generateDiploma4 = generateDiploma4;