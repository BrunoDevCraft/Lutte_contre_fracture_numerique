/**
 * script_demarche.js
 * Gestion du module des démarches administratives.
 * Contient les données statiques (catégories, guides) et la logique d'affichage dynamique.
 */

// ==================== DONNÉES ET CONFIGURATION ====================

/**
 * Liste des catégories de démarches administratives.
 * Chaque objet définit l'apparence de la tuile et la liste des sous-démarches.
 * @type {Array<{id: string, emoji: string, title: string, difficulty: string, color: string, items: Array}>}
 */
const demarchesCategories = [
    {
        id: 'identite',
        emoji: '🆔',
        title: 'Identité numérique',
        difficulty: '★★★★★',
        color: '#6B46C1',
        items: [
            { id: 1, title: 'Créer FranceConnect', desc: 'Votre identité numérique unique', icon: '🔑' },
            { id: 2, title: 'Créer une adresse email', desc: 'Tutoriel Gmail pas à pas', icon: '📧' },
            { id: 3, title: 'Sécuriser vos mots de passe', desc: 'Les bonnes pratiques', icon: '🔐' }
        ]
    },
    {
        id: 'allocations',
        emoji: '💰',
        title: 'Allocations & aides',
        difficulty: '★★★★',
        color: '#10b981',
        items: [
            { id: 4, title: "Demander l'APA à domicile", desc: 'Allocation Personnalisée d\'Autonomie', icon: '🏡' },
            { id: 5, title: 'Renouveler le RSA', desc: 'Revenu de Solidarité Active', icon: '💳' },
            { id: 6, title: 'Demander les APL', desc: 'Aide Personnalisée au Logement', icon: '🏠' },
            { id: 7, title: "Demander l'ASPA", desc: 'Allocation de Solidarité aux Personnes Âgées', icon: '👴' }
        ]
    },
    {
        id: 'sante',
        emoji: '🥼',
        title: 'Santé',
        difficulty: '★★★★',
        color: '#ef4444',
        items: [
            { id: 8, title: 'Créer un compte Ameli', desc: 'Votre espace santé en ligne', icon: '💊' },
            { id: 9, title: 'Prendre RDV Doctolib', desc: 'Consultation médicale en ligne', icon: '🩺' },
            { id: 10, title: 'Télécharger attestation vaccinale', desc: 'Sur Ameli', icon: '💉' },
            { id: 11, title: 'Mon Espace Santé', desc: 'Carnet de santé numérique', icon: '📋' }
        ]
    },
    {
        id: 'retraite',
        emoji: '👴',
        title: 'Retraite & pensions',
        difficulty: '★★★',
        color: '#f59e0b',
        items: [
            { id: 12, title: 'Demander sa retraite', desc: 'Démarche Carsat', icon: '📑' },
            { id: 13, title: 'Simulateur retraite', desc: 'Calculer vos droits', icon: '🧮' },
            { id: 14, title: 'Relevé de carrière', desc: 'Consulter vos trimestres', icon: '📊' }
        ]
    },
    {
        id: 'impots',
        emoji: '💼',
        title: 'Impôts',
        difficulty: '★★★★',
        color: '#8b5cf6',
        items: [
            { id: 15, title: 'Créer compte impots.gouv.fr', desc: 'Espace particulier', icon: '🏛️' },
            { id: 16, title: 'Déclaration pré-remplie', desc: 'Remplir et valider', icon: '📄' },
            { id: 17, title: 'Avis d\'imposition', desc: 'Télécharger et utiliser', icon: '📑' }
        ]
    },
    {
        id: 'transports',
        emoji: '🚗',
        title: 'Transports',
        difficulty: '★★',
        color: '#3b82f6',
        items: [
            { id: 18, title: 'Carte Senior SNCF', desc: 'Réductions sur les trajets', icon: '🚄' },
            { id: 19, title: 'Carte Navigo Senior', desc: 'Transport en Île-de-France', icon: '🎫' },
            { id: 20, title: 'Permis de conduire en ligne', desc: 'Renouvellement ANTS', icon: '🪪' }
        ]
    },
    {
        id: 'vie-quotidienne',
        emoji: '🏠',
        title: 'Vie quotidienne',
        difficulty: '★★',
        color: '#ec4899',
        items: [
            { id: 21, title: 'Inscription listes électorales', desc: 'Voter aux prochaines élections', icon: '🗳️' },
            { id: 22, title: 'Acte de naissance', desc: 'Demande en ligne', icon: '📜' },
            { id: 23, title: 'Changement d\'adresse', desc: 'Service public en ligne', icon: '📮' }
        ]
    },
    {
        id: 'emploi',
        emoji: '💼',
        title: 'Emploi',
        difficulty: '★',
        color: '#14b8a6',
        items: [
            { id: 24, title: 'Créer un CV simple', desc: 'Modèle facile à remplir', icon: '📝' },
            { id: 25, title: 'Pôle Emploi en ligne', desc: 'Inscription et actualisation', icon: '💼' }
        ]
    }
];

/**
 * Base de connaissances des guides pas à pas.
 * Clé : ID de la démarche (correspondant aux items dans demarchesCategories).
 * Valeur : Titre et tableau des étapes.
 */
const demarchesGuides = {
    // Catégorie 1: Identité numérique
    1: {
        title: 'Créer votre compte FranceConnect',
        steps: [
            "Allez sur le site franceconnect.gouv.fr",
            "Cliquez sur 'Créer un compte'",
            "Choisissez un fournisseur d'identité (Ameli, Impots.gouv.fr, La Poste...)",
            "Connectez-vous avec vos identifiants existants",
            "Validez la création de votre FranceConnect",
            "Félicitations ! Vous pouvez maintenant vous connecter facilement à tous les services publics"
        ]
    },
    2: {
        title: 'Créer une adresse email Gmail',
        steps: [
            "Ouvrez votre navigateur (Chrome, Firefox, Edge)",
            "Tapez 'gmail.com' dans la barre d'adresse",
            "Cliquez sur 'Créer un compte'",
            "Remplissez le formulaire : prénom, nom, adresse email souhaitée",
            "Choisissez un mot de passe FORT (majuscules, chiffres, symboles)",
            "Notez votre mot de passe dans un endroit sûr",
            "Ajoutez un numéro de téléphone pour la sécurité",
            "Validez et votre email est créé !"
        ]
    },
    3: {
        title: 'Sécuriser vos mots de passe',
        steps: [
            "Un bon mot de passe doit contenir AU MOINS 12 caractères",
            "Utilisez un mélange : MAJUSCULES, minuscules, chiffres et symboles (!@#$%)",
            "NE PAS utiliser : votre nom, date de naissance, '123456', 'motdepasse'",
            "Créez une phrase mémorable : 'J'aime2Croissants@9h' est fort !",
            "Utilisez un mot de passe DIFFÉRENT pour chaque site important",
            "Notez vos mots de passe dans un carnet sécurisé (pas sur l'ordinateur)",
            "Changez vos mots de passe tous les 6 mois",
            "Activez la double authentification quand c'est proposé"
        ]
    },
    
    // Catégorie 2: Allocations & aides
    4: {
        title: "Demander l'APA à domicile",
        steps: [
            "Rendez-vous sur le site de votre département",
            "Cherchez 'APA' ou 'Allocation Personnalisée d'Autonomie'",
            "Téléchargez le formulaire de demande",
            "Remplissez vos informations personnelles",
            "Joignez un certificat médical de votre médecin",
            "Ajoutez un justificatif de domicile récent",
            "Envoyez le dossier complet",
            "Attendez la visite d'évaluation à domicile"
        ]
    },
    5: {
        title: 'Renouveler le RSA',
        steps: [
            "Connectez-vous sur caf.fr ou msa.fr",
            "Allez dans 'Mon Compte'",
            "Cliquez sur 'Mes démarches en ligne'",
            "Sélectionnez 'Renouvellement RSA'",
            "Déclarez vos ressources des 3 derniers mois",
            "Indiquez votre situation familiale actuelle",
            "Joignez les justificatifs demandés (bulletins de salaire, attestations...)",
            "Validez votre déclaration",
            "Conservez l'accusé de réception"
        ]
    },
    6: {
        title: 'Demander les APL',
        steps: [
            "Allez sur caf.fr",
            "Cliquez sur 'Faire une demande de prestation'",
            "Sélectionnez 'Aide au logement'",
            "Créez votre compte si vous n'en avez pas",
            "Remplissez vos informations personnelles",
            "Indiquez les détails de votre logement (loyer, charges)",
            "Ajoutez votre bail et une attestation de loyer",
            "Joignez vos justificatifs de ressources",
            "Validez et attendez la réponse sous 2 mois"
        ]
    },
    
    // Catégorie 3: Santé
    8: {
        title: 'Créer votre compte Ameli',
        steps: [
            "Allez sur ameli.fr",
            "Cliquez sur 'Créer un compte'",
            "Munissez-vous de votre carte Vitale",
            "Entrez votre numéro de sécurité sociale (13 chiffres + clé)",
            "Renseignez votre date de naissance",
            "Créez votre mot de passe",
            "Validez votre email",
            "Votre espace Ameli est créé !"
        ]
    },
    9: {
        title: 'Prendre rendez-vous sur Doctolib',
        steps: [
            "Allez sur doctolib.fr",
            "Entrez votre ville et la spécialité recherchée",
            "Choisissez un praticien",
            "Sélectionnez une date et un horaire disponible",
            "Créez votre compte Doctolib (nom, email, téléphone)",
            "Confirmez le rendez-vous",
            "Vous recevrez un SMS de rappel"
        ]
    },
    10: {
        title: 'Télécharger votre attestation vaccinale',
        steps: [
            "Connectez-vous sur ameli.fr",
            "Allez dans 'Mes démarches'",
            "Cliquez sur 'Attestation de vaccination Covid-19'",
            "Sélectionnez le vaccin concerné",
            "Téléchargez le PDF avec le QR code",
            "Vous pouvez aussi l'imprimer",
            "Conservez-le sur votre téléphone ou imprimé",
            "Ce document est valable pour tous vos déplacements"
        ]
    },
    11: {
        title: 'Créer Mon Espace Santé',
        steps: [
            "Allez sur monespacesante.fr",
            "Cliquez sur 'Activer mon espace'",
            "Entrez votre numéro de sécurité sociale",
            "Renseignez votre date de naissance",
            "Créez votre mot de passe sécurisé",
            "Validez votre email et/ou téléphone",
            "Votre carnet de santé numérique est créé !",
            "Vous pouvez y stocker ordonnances, résultats d'analyses, imageries médicales"
        ]
    },

    // Catégorie 4: Retraite & pensions
    7: { 
        title: "Demander l'ASPA",
        steps: [
            "Vous devez avoir au moins 65 ans (ou 62 ans si inapte au travail)",
            "Allez sur lassuranceretraite.fr",
            "Téléchargez le formulaire ASPA",
            "Remplissez vos informations personnelles",
            "Déclarez vos ressources des 3 derniers mois",
            "Joignez vos justificatifs de ressources",
            "Ajoutez un RIB",
            "Envoyez le dossier à votre caisse de retraite",
            "L'ASPA sera versée à partir du 1er jour du mois suivant votre demande"
        ]
    },
    12: {
        title: 'Demander votre retraite à la Carsat',
        steps: [
            "Allez sur lassuranceretraite.fr",
            "Connectez-vous avec FranceConnect ou créez votre compte",
            "Cliquez sur 'Demander ma retraite'",
            "Vérifiez votre relevé de carrière",
            "Choisissez votre date de départ souhaitée",
            "La demande doit être faite 4 à 6 mois AVANT votre départ",
            "Remplissez le formulaire en ligne",
            "Joignez les documents demandés (RIB, justificatif d'état civil...)",
            "Validez et suivez l'avancement sur votre espace personnel"
        ]
    },
    13: {
        title: 'Simuler votre retraite',
        steps: [
            "Allez sur info-retraite.fr",
            "Cliquez sur 'Simuler ma retraite'",
            "Connectez-vous avec FranceConnect",
            "Vos données de carrière sont pré-remplies",
            "Choisissez différentes dates de départ possibles",
            "Le simulateur calcule votre pension pour chaque scénario",
            "Comparez les montants selon l'âge de départ",
            "Vous pouvez télécharger une estimation détaillée",
            "Utilisez ces informations pour planifier votre départ"
        ]
    },
    14: {
        title: 'Consulter votre relevé de carrière',
        steps: [
            "Connectez-vous sur info-retraite.fr",
            "Utilisez FranceConnect pour vous identifier",
            "Cliquez sur 'Mon relevé de carrière'",
            "Consultez tous vos trimestres validés",
            "Vérifiez que toutes vos périodes d'emploi apparaissent",
            "Si des périodes manquent, contactez votre caisse de retraite",
            "Vous pouvez télécharger votre relevé en PDF",
            "Conservez ce document précieusement"
        ]
    },
    
    // Catégorie 5: Impôts
    15: {
        title: 'Créer votre compte Impots.gouv.fr',
        steps: [
            "Allez sur impots.gouv.fr",
            "Cliquez sur 'Votre espace particulier'",
            "Puis 'Créer mon espace'",
            "Munissez-vous de votre dernier avis d'imposition",
            "Entrez votre numéro fiscal (13 chiffres)",
            "Entrez votre numéro de télédéclarant ou revenu fiscal",
            "Créez votre mot de passe",
            "Validez par email ou SMS"
        ]
    },
    16: {
        title: 'Faire votre déclaration d\'impôts',
        steps: [
            "Connectez-vous sur impots.gouv.fr",
            "Cliquez sur 'Accéder à la déclaration en ligne'",
            "Vérifiez les informations pré-remplies",
            "Modifiez si nécessaire (changement de situation, revenus...)",
            "Ajoutez vos charges déductibles si applicable",
            "Vérifiez le montant calculé",
            "Signez électroniquement",
            "Conservez l'accusé de réception"
        ]
    },
    17: {
        title: 'Télécharger votre avis d\'imposition',
        steps: [
            "Connectez-vous sur impots.gouv.fr",
            "Allez dans 'Documents'",
            "Cliquez sur 'Avis d'impôt sur le revenu'",
            "Sélectionnez l'année souhaitée",
            "Cliquez sur 'Télécharger' (format PDF)",
            "Le document s'ouvre, faites 'Enregistrer sous'",
            "Choisissez un dossier facile à retrouver",
            "Vous pouvez aussi l'imprimer directement",
            "Ce document est nécessaire pour de nombreuses démarches"
        ]
    },

    // Catégorie 6: Transports
    18: {
        title: 'Commander la Carte Senior SNCF',
        steps: [
            "Allez sur sncf.com",
            "Cherchez 'Carte Senior' dans le menu",
            "Vérifiez que vous avez plus de 60 ans",
            "Cliquez sur 'Commander'",
            "Créez ou connectez-vous à votre compte SNCF",
            "Remplissez le formulaire",
            "Téléchargez une photo d'identité",
            "Payez en ligne (49€ pour un an)",
            "Recevez votre carte sous 10 jours"
        ]
    },
    19: {
        title: 'Commander la Carte Navigo Senior',
        steps: [
            "Cette carte est pour les Franciliens de 65 ans et plus",
            "Allez sur iledefrance-mobilites.fr",
            "Cliquez sur 'Carte Navigo Senior'",
            "Créez votre compte Île-de-France Mobilités",
            "Remplissez le formulaire de demande",
            "Téléchargez une photo d'identité récente",
            "Joignez un justificatif de domicile",
            "Payez le forfait annuel (tarif réduit ~50%)",
            "Recevez votre carte par courrier sous 3 semaines"
        ]
    },
    20: {
        title: 'Renouveler votre permis de conduire',
        steps: [
            "Allez sur ants.gouv.fr (Agence Nationale des Titres Sécurisés)",
            "Cliquez sur 'Permis de conduire'",
            "Sélectionnez 'Renouvellement'",
            "Créez votre compte ANTS ou connectez-vous",
            "Préparez : photo d'identité numérique, justificatif de domicile, permis actuel",
            "Remplissez le formulaire en ligne",
            "Téléchargez les documents demandés",
            "Validez votre demande",
            "Recevez votre nouveau permis sous 3 semaines à domicile"
        ]
    },
    
    // Catégorie 7: Vie quotidienne
    21: {
        title: 'S\'inscrire sur les listes électorales',
        steps: [
            "Allez sur service-public.fr",
            "Cherchez 'inscription listes électorales'",
            "Cliquez sur 'Effectuer une demande en ligne'",
            "Préparez : pièce d'identité + justificatif de domicile",
            "Remplissez le formulaire",
            "Téléchargez vos documents",
            "Validez votre demande",
            "Recevez la confirmation par email"
        ]
    },
    22: {
        title: 'Demander un acte de naissance',
        steps: [
            "Allez sur service-public.fr",
            "Cherchez 'demande acte de naissance'",
            "Cliquez sur 'Faire une demande en ligne'",
            "Sélectionnez votre lieu de naissance",
            "Remplissez vos informations : nom, prénoms, date de naissance",
            "Indiquez le type d'acte souhaité (copie intégrale, extrait avec/sans filiation)",
            "Précisez l'usage de l'acte",
            "Validez la demande",
            "Recevez l'acte gratuitement par courrier sous 2 semaines"
        ]
    },
    23: {
        title: 'Effectuer un changement d\'adresse',
        steps: [
            "Allez sur service-public.fr",
            "Cherchez 'changement d'adresse'",
            "Cliquez sur 'Service de changement d'adresse'",
            "Ce service prévient automatiquement : Impôts, CAF, Ameli, La Poste...",
            "Créez votre compte avec FranceConnect",
            "Entrez votre ancienne adresse",
            "Entrez votre nouvelle adresse",
            "Sélectionnez les organismes à prévenir",
            "Validez - Tous les organismes seront informés automatiquement"
        ]
    },
    
    // Catégorie 8: Emploi
    24: {
        title: 'Créer un CV simple',
        steps: [
            "Ouvrez Word ou Google Docs",
            "Cherchez 'modèle CV' dans les templates",
            "Choisissez un modèle sobre et lisible",
            "Remplissez vos informations personnelles",
            "Ajoutez votre expérience professionnelle",
            "Listez vos compétences principales",
            "Mentionnez votre formation",
            "Relisez attentivement",
            "Enregistrez au format PDF"
        ]
    },
    25: {
        title: 'S\'inscrire à Pôle Emploi en ligne',
        steps: [
            "Allez sur pole-emploi.fr",
            "Cliquez sur 'M'inscrire, me réinscrire'",
            "Sélectionnez votre situation",
            "Créez votre espace personnel",
            "Remplissez vos informations personnelles",
            "Indiquez votre dernier emploi",
            "Précisez votre recherche d'emploi",
            "Joignez votre CV",
            "Validez votre inscription",
            "Pensez à vous actualiser chaque mois pour recevoir vos allocations"
        ]
    }

};

// ==================== LOGIQUE D'AFFICHAGE ====================

/**
 * Génère la grille des catégories principales dans le conteneur #demarches-categories.
 * Crée les tuiles interactives basées sur le tableau demarchesCategories.
 */
function renderDemarchesCategories() {
    const container = document.getElementById('demarches-categories');
    container.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'grid two';
    
    demarchesCategories.forEach(cat => {
        const tile = document.createElement('div');
        tile.className = 'demarche-tile';
        tile.innerHTML = `
            <div class="emoji">${cat.emoji}</div>
            <h3 style="color: var(--primary); margin-bottom: 15px;">${cat.title}</h3>
            <p style="color: #666; margin-bottom: 15px;">${cat.items.length} démarches disponibles</p>
            <button class="btn btn-primary small" style="width: 100%;">Explorer</button>
        `;
        tile.querySelector('button').onclick = () => openDemarcheCategory(cat.id);
        grid.appendChild(tile);
    });
    
    container.appendChild(grid);
}

/**
 * Affiche le détail d'une catégorie spécifique.
 * Remplace la vue grille par la liste des démarches de la catégorie sélectionnée.
 * @param {string} catId - Identifiant unique de la catégorie.
 */
function openDemarcheCategory(catId) {
    const cat = demarchesCategories.find(c => c.id === catId);
    const content = document.getElementById('demarches-content');
    
    content.innerHTML = `
        <div class="card" id="category-content" style="margin-top: 30px;">
            <h3 style="color: var(--primary); font-size: 2rem; margin-bottom: 20px;">
                ${cat.emoji} ${cat.title}
            </h3>
            <div style="display: grid; gap: 15px;">
                ${cat.items.map(item => `
                    <div class="demarche-item" onclick="openDemarcheGuide(${item.id})">
                        <div style="font-size: 2em;">${item.icon}</div>
                        <div style="flex: 1;">
                            <strong>${item.title}</strong><br>
                            <span style="color: #666; font-size: 0.9em;">${item.desc}</span>
                        </div>
                        <div style="color: var(--primary); font-size: 1.5em;">→</div>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-secondary" onclick="closeDemarcheCategory()" style="margin-top: 20px;">
                ← Retour aux catégories
            </button>
        </div>
    `;
    
    // Défilement automatique vers le contenu
    setTimeout(() => {
        const categoryContent = document.getElementById('category-content');
        if (categoryContent) {
            categoryContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

/**
 * Ferme la vue détaillée et réinitialise le conteneur.
 */
function closeDemarcheCategory() {
    document.getElementById('demarches-content').innerHTML = '';
}

/**
 * Ouvre le guide pas à pas pour une démarche spécifique.
 * Récupère les données depuis l'objet demarchesGuides et injecte le HTML.
 * @param {number} guideId - Identifiant unique du guide.
 */
window.openDemarcheGuide = function(guideId) {
    const guide = demarchesGuides[guideId];
    if (!guide) {
        alert('Guide en cours de développement');
        return;
    }
    
    const content = document.getElementById('demarches-content');
    content.innerHTML = `
        <div class="card" id="guide-content" style="margin-top: 30px;">
            <h3 style="color: var(--primary); font-size: 2rem; margin-bottom: 20px;">
                📋 ${guide.title}
            </h3>
            <div class="instructions">
                <h4>📋 Étapes à suivre</h4>
                <ol class="guide-steps">
                    ${guide.steps.map((step, i) => `
                        <li style="margin: 15px 0;">
                            <strong>Étape ${i + 1} :</strong> ${step}
                        </li>
                    `).join('')}
                </ol>
            </div>
            <div class="alert alert-info" style="margin-top: 30px;">
                <h4>💡 Besoin d'aide ?</h4>
                <p>N'hésitez pas à demander de l'aide à un proche ou à contacter France Services au 3939.</p>
            </div>
            <button class="btn btn-secondary" onclick="closeDemarcheCategory()" style="margin-top: 20px;">
                ← Retour à la catégorie
            </button>
        </div>
    `;
    
    // Focus utilisateur sur le guide ouvert
    setTimeout(() => {
        const guideContent = document.getElementById('guide-content');
        if (guideContent) {
            guideContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
};