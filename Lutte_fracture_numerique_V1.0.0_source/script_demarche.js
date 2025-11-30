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
            { id: 1, title: 'Utiliser FranceConnect', desc: 'Votre identité numérique unique', icon: '🔑' }, // Modifié titre pour précision
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
            { id: 25, title: 'France Travail en ligne', desc: 'Inscription et actualisation', icon: '💼' } // Modifié titre pour rebranding
        ]
    }
];

/**
 * Base de connaissances des guides pas à pas.
 * Clé : ID de la démarche (correspondant aux items dans demarchesCategories).
 * Valeur : Titre et tableau des étapes.
 * Modifications : Étapes mises à jour pour précision 2025, ajout FranceConnect, sécurité, timelines.
 */
const demarchesGuides = {
    // Catégorie 1: Identité numérique
    1: {
        title: 'Utiliser FranceConnect pour les démarches', // Modifié titre
        steps: [
            "FranceConnect n'est pas un compte séparé : allez sur franceconnect.gouv.fr pour en savoir plus.", // Correction majeure
            "Choisissez un fournisseur d'identité (Ameli, Impots.gouv.fr, La Poste, MSA, France Identité).",
            "Si vous n'avez pas de compte chez un fournisseur, créez-en un d'abord (voir guides Ameli ou Impots).",
            "Connectez-vous au service public désiré via le bouton 'FranceConnect'.",
            "Entrez vos identifiants du fournisseur et validez.",
            "Pour plus de sécurité, activez FranceConnect+ avec une identité vérifiée (ex. : app France Identité avec CNI).",
            "Astuce : Si erreur d'identité, vérifiez votre état civil exact. Contactez le support."
        ]
    },
    2: {
        title: 'Créer une adresse email Gmail',
        steps: [
            "Ouvrez votre navigateur (Chrome, Firefox, Edge).",
            "Tapez 'gmail.com' dans la barre d'adresse.",
            "Cliquez sur 'Créer un compte'.",
            "Remplissez le formulaire : prénom, nom, adresse email souhaitée, date de naissance (vérifiez l'âge minimum).",
            "Choisissez un mot de passe fort (au moins 8 caractères : majuscules, minuscules, chiffres, symboles).",
            "Acceptez les conditions d'utilisation et la politique de confidentialité.",
            "Ajoutez un numéro de téléphone ou email de récupération pour la sécurité.",
            "Validez et votre email est créé ! Notez vos infos en sécurité."
        ] // Ajouts : Âge, termes
    },
    3: {
        title: 'Sécuriser vos mots de passe',
        steps: [
            "Un bon mot de passe doit contenir au moins 15 caractères (NIST 2025).", // Mise à jour NIST
            "Utilisez un mélange : majuscules, minuscules, chiffres et symboles (!@#$%).",
            "Évitez : nom, date de naissance, '123456', mots simples.",
            "Créez une phrase mémorable : 'Jadore3Chats@Paris2025' est fort !",
            "Utilisez un mot de passe différent pour chaque site (utilisez un gestionnaire comme Bitwarden).",
            "Ne changez pas périodiquement sauf en cas de compromission.", // Correction : Pas de changements forcés
            "Activez l'authentification à deux facteurs (2FA) partout.",
            "Stockez-les dans un gestionnaire sécurisé, pas sur papier ou ordinateur non protégé."
        ] // Mises à jour basées sur search
    },
    
    // Catégorie 2: Allocations & aides
    4: {
        title: "Demander l'APA à domicile",
        steps: [
            "Allez sur service-public.fr et cherchez 'APA' pour le formulaire unifié.", // Ajout portail national
            "Ou rendez-vous sur le site de votre département (conseil départemental).",
            "Téléchargez le formulaire de demande.",
            "Remplissez vos informations personnelles (état civil, ressources).",
            "Joignez un certificat médical de votre médecin traitant.",
            "Ajoutez un justificatif de domicile récent (facture <3 mois).",
            "Envoyez le dossier complet par courrier ou en ligne si disponible.",
            "Attendez la visite d'évaluation à domicile (sous 2 mois)."
        ] // Précisions documents
    },
    5: {
        title: 'Déclarer trimestriellement le RSA', // Modifié titre pour précision (pas "renouveler")
        steps: [
            "Connectez-vous sur caf.fr ou msa.fr avec FranceConnect si possible.",
            "Allez dans 'Mon Compte'.",
            "Cliquez sur 'Mes démarches en ligne'.",
            "Sélectionnez 'Déclaration trimestrielle RSA'.",
            "Déclarez vos ressources des 3 derniers mois.",
            "Indiquez votre situation familiale actuelle.",
            "Joignez les justificatifs demandés (bulletins de salaire, attestations...).",
            "Validez votre déclaration.",
            "Conservez l'accusé de réception. Répétez tous les 3 mois."
        ]
    },
    6: {
        title: 'Demander les APL',
        steps: [
            "Allez sur caf.fr et faites une simulation d'abord pour estimer vos droits.",
            "Cliquez sur 'Faire une demande de prestation'.",
            "Sélectionnez 'Aide au logement'.",
            "Créez votre compte si vous n'en avez pas (via FranceConnect).",
            "Remplissez vos informations personnelles.",
            "Indiquez les détails de votre logement (loyer, charges).",
            "Ajoutez votre bail et une attestation de loyer.",
            "Joignez vos justificatifs de ressources (avis d'imposition).",
            "Validez et attendez la réponse sous 2 mois."
        ] // Ajout simulation
    },
    7: { // ASPA manquante dans script original, ajout placeholder si needed
        title: "Demander l'ASPA",
        steps: [
            "Allez sur service-public.fr et cherchez 'ASPA'.",
            "Téléchargez le formulaire Cerfa n°13710.",
            "Remplissez vos infos (ressources, situation).",
            "Joignez justificatifs (avis imposition, domicile).",
            "Envoyez à votre caisse de retraite (CNAV, MSA...).",
            "Attendez décision sous 4 mois."
        ] // Ajouté car manquant
    },
    
    // Catégorie 3: Santé
    8: {
        title: 'Créer un compte Ameli',
        steps: [
            "Préparez : numéro SS définitif (1 ou 2), RIB connu par CPAM, carte Vitale, email personnel.", // Ajouts requis
            "Allez sur assure.ameli.fr ou app 'Compte ameli'.",
            "Cliquez sur 'Créer un compte'.",
            "Entrez : numéro SS, code postal, date de naissance, rang de naissance.",
            "Entrez détails RIB (IBAN, BIC).",
            "Créez mot de passe fort (min. 8 chars).",
            "Validez via lien email (sous 7 jours, vérifiez spams).",
            "Alternative : Utilisez FranceConnect."
        ]
    },
    9: {
        title: 'Prendre rendez-vous sur Doctolib',
        steps: [
            "Allez sur doctolib.fr ou app mobile.",
            "Entrez votre ville et la spécialité recherchée.",
            "Choisissez un praticien.",
            "Sélectionnez une date et un horaire disponible.",
            "Créez votre compte Doctolib (nom, email, téléphone).",
            "Confirmez le rendez-vous.",
            "Vous recevrez un SMS/email de rappel."
        ] // Ajout app
    },
    10: {
        title: 'Télécharger votre attestation vaccinale',
        steps: [
            "Connectez-vous sur ameli.fr avec votre compte.",
            "Allez dans 'Mes démarches'.",
            "Cliquez sur 'Attestation de vaccination' (pour COVID ou autres).", // Généralisé
            "Sélectionnez le vaccin concerné.",
            "Téléchargez le PDF avec le QR code.",
            "Vous pouvez aussi l'imprimer.",
            "Conservez-le sur votre téléphone ou imprimé.",
            "Ce document est valable pour voyages ou contrôles."
        ]
    },
    11: {
        title: 'Activer Mon Espace Santé', // Complété
        steps: [
            "Allez sur monespacesante.fr.",
            "Cliquez sur 'Activer mon espace'.",
            "Utilisez FranceConnect ou le code provisoire reçu par courrier.",
            "Entrez vos infos personnelles pour vérification.",
            "Créez un mot de passe fort.",
            "Validez votre email ou téléphone.",
            "Accédez à votre carnet de santé numérique.",
            "Astuce : Si pas de code, demandez-le via le site."
        ]
    },

    // Catégorie 4: Retraite
    12: {
        title: 'Demander sa retraite',
        steps: [
            "Allez sur info-retraite.fr et connectez-vous via FranceConnect.", // Ajout FranceConnect
            "Vérifiez votre relevé de carrière d'abord.",
            "Cliquez sur 'Demander ma retraite'.",
            "Remplissez le formulaire en ligne (situations, régimes).",
            "Joignez justificatifs (identité, carrière).",
            "Validez la demande.",
            "Attendez décision (sous 4-6 mois)."
        ]
    },
    13: {
        title: 'Utiliser le simulateur retraite',
        steps: [
            "Allez sur info-retraite.fr.",
            "Connectez-vous via FranceConnect pour données personnalisées.",
            "Accédez au simulateur 'Estimer ma retraite'.",
            "Entrez ou vérifiez vos infos carrière.",
            "Simulez différents scénarios (âge, trimestres).",
            "Téléchargez le rapport."
        ]
    },
    14: {
        title: 'Consulter votre relevé de carrière',
        steps: [
            "Allez sur info-retraite.fr.",
            "Connectez-vous via FranceConnect.",
            "Allez dans 'Mon relevé de carrière'.",
            "Vérifiez vos trimestres et points.",
            "Corrigez si erreurs via le site.",
            "Téléchargez le document."
        ]
    },

    // Catégorie 5: Impôts
    15: {
        title: 'Créer un compte impots.gouv.fr',
        steps: [
            "Préparez : numéro fiscal (13 chiffres), numéro d'accès, revenu fiscal référence.", // Ajouts
            "Allez sur impots.gouv.fr > 'Espace particulier'.",
            "Préférez FranceConnect : Choisissez fournisseur, entrez identifiants, validez email.",
            "Sans FranceConnect : Entrez numéro fiscal, accès, revenu, date naissance.",
            "Créez mot de passe fort.",
            "Si erreur, contactez centre finances publiques."
        ]
    },
    16: {
        title: 'Remplir la déclaration pré-remplie',
        steps: [
            "Connectez-vous sur impots.gouv.fr via FranceConnect.",
            "Allez dans 'Déclarer mes revenus'.",
            "Vérifiez les infos pré-remplies (salaires, etc.).",
            "Corrigez ou ajoutez (déductions, enfants).",
            "Validez et signez électroniquement.",
            "Téléchargez l'accusé de réception.",
            "Délai : Mai-Juin chaque année."
        ] // Ajout délai
    },
    17: {
        title: 'Télécharger votre avis d\'imposition',
        steps: [
            "Connectez-vous sur impots.gouv.fr via FranceConnect.",
            "Allez dans 'Mes documents'.",
            "Cherchez 'Avis d'imposition' pour l'année.",
            "Cliquez sur 'Télécharger PDF'.",
            "Enregistrez ou imprimez.",
            "Ce document est nécessaire pour aides et prêts."
        ] // Complété
    },

    // Catégorie 6: Transports
    18: {
        title: 'Commander la Carte Senior SNCF',
        steps: [
            "Allez sur sncf-connect.com.",
            "Cherchez 'Carte Avantage Senior' (60+).", // Nom précis
            "Cliquez sur 'Commander'.",
            "Créez ou connectez-vous à votre compte SNCF.",
            "Remplissez le formulaire.",
            "Téléchargez une photo d'identité.",
            "Payez en ligne (49€ pour un an).",
            "Recevez votre carte sous 10 jours."
        ]
    },
    19: {
        title: 'Commander la Carte Navigo Senior',
        steps: [
            "Éligible si 62+ en Île-de-France.", // Mise à jour âge
            "Allez sur iledefrance-mobilites.fr.",
            "Cliquez sur 'Navigo Senior'.",
            "Créez votre compte.",
            "Remplissez la demande.",
            "Téléchargez photo d'identité récente.",
            "Joignez justificatif domicile.",
            "Payez le forfait (tarif réduit ~37,60€/mois).",
            "Recevez par courrier sous 3 semaines."
        ]
    },
    20: {
        title: 'Renouveler votre permis de conduire',
        steps: [
            "Renouvellement seulement pour perte, vol ou catégories lourdes.", // Précision
            "Allez sur ants.gouv.fr.",
            "Cliquez sur 'Permis de conduire'.",
            "Sélectionnez 'Renouvellement'.",
            "Créez compte ANTS ou via FranceConnect.",
            "Préparez : photo numérique, justificatif domicile, ancien permis.",
            "Remplissez formulaire.",
            "Téléchargez documents.",
            "Validez, recevez sous 3 semaines."
        ]
    },
    
    // Catégorie 7: Vie quotidienne
    21: {
        title: 'S\'inscrire sur les listes électorales',
        steps: [
            "Allez sur service-public.fr.",
            "Cherchez 'inscription listes électorales'.",
            "Cliquez sur 'Demande en ligne'.",
            "Préparez : pièce d'identité + justificatif domicile.",
            "Remplissez formulaire.",
            "Téléchargez documents.",
            "Validez demande.",
            "Recevez confirmation par email. Automatique pour 18 ans."
        ]
    },
    22: {
        title: 'Demander un acte de naissance',
        steps: [
            "Allez sur service-public.fr.",
            "Cherchez 'demande acte de naissance'.",
            "Cliquez sur 'Faire une demande en ligne'.",
            "Sélectionnez lieu de naissance.",
            "Remplissez : nom, prénoms, date naissance.",
            "Choisissez type (copie intégrale, extrait avec/sans filiation).",
            "Précisez usage.",
            "Validez.",
            "Recevez gratuitement par courrier sous 2 semaines."
        ]
    },
    23: {
        title: 'Effectuer un changement d\'adresse',
        steps: [
            "Allez sur service-public.fr.",
            "Cherchez 'changement d'adresse'.",
            "Cliquez sur 'Service de changement d'adresse'.",
            "Prévient : Impôts, CAF, Ameli, France Travail, EDF, Poste...",
            "Connectez-vous via FranceConnect.",
            "Entrez ancienne et nouvelle adresse.",
            "Ajoutez email/téléphone si changement.",
            "Sélectionnez organismes.",
            "Validez - Informés automatiquement."
        ]
    },
    
    // Catégorie 8: Emploi
    24: {
        title: 'Créer un CV simple',
        steps: [
            "Utilisez un outil en ligne gratuit comme Canva ou Indeed.", // Ajout templates modernes
            "Choisissez un modèle simple et lisible.",
            "Remplissez infos personnelles (nom, contact).",
            "Ajoutez expérience professionnelle (dates, postes).",
            "Listez compétences et formation.",
            "Relisez pour erreurs.",
            "Enregistrez en PDF.",
            "Astuce : Adaptez au job visé."
        ]
    },
    25: {
        title: 'S\'inscrire à France Travail en ligne', // Modifié nom/URL
        steps: [
            "Allez sur france-travail.fr.", // Correction rebranding
            "Cliquez sur 'M'inscrire ou me réinscrire'.",
            "Sélectionnez votre situation.",
            "Créez votre espace personnel.",
            "Remplissez infos personnelles.",
            "Indiquez dernier emploi.",
            "Précisez recherche d'emploi.",
            "Joignez CV.",
            "Validez inscription.",
            "Actualisez mensuellement pour allocations."
        ]
    }
};

// ==================== LOGIQUE D'AFFICHAGE ====================

// Les fonctions renderDemarchesCategories, openDemarcheCategory, closeDemarcheCategory, openDemarcheGuide restent inchangées.
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
    
    setTimeout(() => {
        const categoryContent = document.getElementById('category-content');
        if (categoryContent) {
            categoryContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

function closeDemarcheCategory() {
    document.getElementById('demarches-content').innerHTML = '';
}

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
    
    setTimeout(() => {
        const guideContent = document.getElementById('guide-content');
        if (guideContent) {
            guideContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
};
