// ==================== VARIABLES DU COURS ====================
let courseIndex = 0;
let quizState = {
    currentQuestion: 0,
    score: 0,
    answers: []
};

// ==================== DONNÉES DES SLIDES ====================
// Chaque section représente une diapositive du cours avec un titre, une icône et un contenu HTML.
        const courseSections = [
            {
                icon: "👋",
                title: "Bienvenue dans votre formation",
                content: `
                    <div style="text-align: center; padding: 40px 20px;">
                        <div style="font-size: 8em; margin-bottom: 30px; animation: bounce 2s infinite;">
                            🎯
                        </div>
                        
                        <style>
                            @keyframes bounce {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(-20px); }
                            }
                        </style>
                        
                        <h2 style="font-size: 2.5em; color: #667eea; margin-bottom: 30px;">
                            Bienvenue dans votre formation informatique !
                        </h2>
                        
                        <div class="card" style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border: none; max-width: 800px; margin: 30px auto; text-align: left;">
                       <!-- <div class="card" style="max-width: 800px; margin: 30px auto; text-align: left;">-->

                            <h3 style="text-align: center; margin-bottom: 25px; color: #2e7d32;">
                                ✨ Cette formation est faite pour vous si :
                            </h3>
                            <ul class="list-style" style="font-size: 1.15em; line-height: 2;">
                                <li>Vous débutez avec l'ordinateur</li>
                                <li>Vous trouvez l'informatique intimidante</li>
                                <li>Vous voulez comprendre simplement comment ça marche</li>
                                <li>Vous préférez des explications concrètes aux termes techniques</li>
                            </ul>
                        </div>

                        <div style="margin-top: 50px; padding: 30px; background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-radius: 15px; max-width: 800px; margin: 50px auto 0;">
                            <h3 style="font-size: 1.8em; color: #7b1fa2; margin-bottom: 20px;">
                                🚀 Prêt(e) à commencer ?
                            </h3>
                            <p style="font-size: 1.2em; color: #555; line-height: 1.8;">
                                Cliquez sur <strong>"Suivant"</strong> pour débuter cette aventure !<br>
                                Prenez votre temps, tout est conçu pour être facile et rassurant.
                            </p>
                        </div>
                    </div>
                `
            },
            {
                icon: "🎁",
                title: "Ce que vous allez découvrir",
                content: `
                    <div style="text-align: center; padding: 40px 20px;">
                        <div style="font-size: 6em; margin-bottom: 30px;">🎁</div>
                        
                        <h2 style="font-size: 2.2em; color: #667eea; margin-bottom: 40px;">
                            Votre programme d'apprentissage
                        </h2>

                        <div class="card" style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border: none; max-width: 800px; margin: 30px auto;">
                            <h3 style="margin-bottom: 30px; color: #1565c0; font-size: 1.5em;">
                                🎁 Ce que vous allez découvrir :
                            </h3>
                            <div class="grid" style="gap: 20px;">
                                <div style="background: white; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                    <div style="font-size: 3.5em; margin-bottom: 15px;">📚</div>
                                    <p style="font-weight: bold; font-size: 1.2em; margin-bottom: 10px;">Des images comparatives simples</p>
                                    <p style="font-size: 1em; color: #666;">L'ordinateur comme une bibliothèque</p>
                                </div>
                                <div style="background: white; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                    <div style="font-size: 3.5em; margin-bottom: 15px;">🎨</div>
                                    <p style="font-weight: bold; font-size: 1.2em; margin-bottom: 10px;">Des explications visuelles</p>
                                    <p style="font-size: 1em; color: #666;">Faciles à mémoriser</p>
                                </div>
                                <div style="background: white; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                    <div style="font-size: 3.5em; margin-bottom: 15px;">🎯</div>
                                    <p style="font-weight: bold; font-size: 1.2em; margin-bottom: 10px;">Des exercices pratiques</p>
                                    <p style="font-size: 1em; color: #666;">Pour mettre en pratique</p>
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-info" style="max-width: 800px; margin: 40px auto; text-align: left; font-size: 1.1em;">
                            <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                <span style="font-size: 1.5em;">💡</span>
                                Notre approche
                            </h4>
                            <p style="line-height: 1.8;">
                                Nous utilisons des <strong>comparaisons de la vie quotidienne</strong> pour expliquer l'informatique. 
                                Pas de jargon, pas de stress, juste de la logique et du bon sens !
                            </p>
                        </div>
                    </div>
                `
            },
            {
                icon: "⏱️",
                title: "Durée et organisation",
                content: `
                    <div style="text-align: center; padding: 40px 20px;">
                        <div style="font-size: 6em; margin-bottom: 30px;">⏱️</div>
                        
                        <h2 style="font-size: 2.2em; color: #667eea; margin-bottom: 40px;">
                            Organisation de votre formation
                        </h2>

                        <div style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); padding: 40px; border-radius: 15px; max-width: 800px; margin: 40px auto; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
                            <h3 style="color: #e65100; margin-bottom: 30px; font-size: 1.8em;">
                                ⏱️ Durée de la formation
                            </h3>
                            <p style="font-size: 1.3em; line-height: 1.9; color: #333; margin-bottom: 20px;">
                                Environ <strong style="color: #667eea;">30 à 45 minutes</strong> à votre rythme
                            </p>
                            <p style="font-size: 1.2em; color: #666;">
                                Suivie d'un quiz pour valider vos connaissances
                            </p>
                        </div>

                        <div class="grid" style="max-width: 900px; margin: 40px auto; gap: 20px;">
                            <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                <div style="font-size: 3em; margin-bottom: 15px;">📖</div>
                                <h4 style="color: #667eea; margin-bottom: 10px; font-size: 1.3em;">Partie théorique</h4>
                                <p style="color: #666; line-height: 1.6;">Concepts expliqués simplement avec des exemples concrets</p>
                            </div>
                            <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                <div style="font-size: 3em; margin-bottom: 15px;">✅</div>
                                <h4 style="color: #667eea; margin-bottom: 10px; font-size: 1.3em;">Quiz final</h4>
                                <p style="color: #666; line-height: 1.6;">25 questions pour valider votre apprentissage</p>
                            </div>
                            <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                <div style="font-size: 3em; margin-bottom: 15px;">🎓</div>
                                <h4 style="color: #667eea; margin-bottom: 10px; font-size: 1.3em;">Diplôme</h4>
                                <p style="color: #666; line-height: 1.6;">Obtenez votre certificat de réussite !</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                icon: "😰",
                title: "Pourquoi ce mot fait-il peur ?",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-color: #ec407a; padding: 35px;">
                        <div style="text-align: center; margin-bottom: 40px;">
                            <div style="font-size: 6em; margin-bottom: 20px;">😰</div>
                            <h2 style="font-size: 2.2em; color: #c2185b; margin-bottom: 20px;">
                                "Ordinateur" : Un mot qui impressionne
                            </h2>
                            <p style="font-size: 1.3em; line-height: 1.8; color: #555;">
                                Mais pourquoi donc ?
                            </p>
                        </div>

                        <div style="background: white; padding: 30px; border-radius: 15px; margin: 30px 0;">
                            <h3 style="color: #667eea; margin-bottom: 25px; text-align: center; font-size: 1.5em;">
                                🤔 Les 3 raisons principales
                            </h3>
                            
                            <div style="display: grid; gap: 25px; margin-bottom: 30px;">
                                <div style="display: flex; align-items: start; gap: 20px; background: #fff3e0; padding: 25px; border-radius: 12px; border-left: 5px solid #ff9800;">
                                    <span style="font-size: 3em;">🔮</span>
                                    <div>
                                        <h4 style="margin-bottom: 12px; color: #e65100; font-size: 1.3em;">1. Il semble "mystérieux"</h4>
                                        <p style="color: #666; line-height: 1.7; font-size: 1.1em;">On ne voit pas comment ça marche à l'intérieur, comme une boîte noire magique</p>
                                    </div>
                                </div>

                                <div style="display: flex; align-items: start; gap: 20px; background: #e3f2fd; padding: 25px; border-radius: 12px; border-left: 5px solid #2196f3;">
                                    <span style="font-size: 3em;">🧠</span>
                                    <div>
                                        <h4 style="margin-bottom: 12px; color: #1565c0; font-size: 1.3em;">2. Il a l'air "intelligent"</h4>
                                        <p style="color: #666; line-height: 1.7; font-size: 1.1em;">On pense qu'il réfléchit... alors qu'en réalité, il est plutôt bête !</p>
                                    </div>
                                </div>

                                <div style="display: flex; align-items: start; gap: 20px; background: #f3e5f5; padding: 25px; border-radius: 12px; border-left: 5px solid #9c27b0;">
                                    <span style="font-size: 3em;">💬</span>
                                    <div>
                                        <h4 style="margin-bottom: 12px; color: #7b1fa2; font-size: 1.3em;">3. Le vocabulaire est compliqué</h4>
                                        <p style="color: #666; line-height: 1.7; font-size: 1.1em;">Logiciel, système, interface, bug... mais on va tout simplifier !</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-success" style="margin-top: 30px; font-size: 1.1em;">
                            <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                <span style="font-size: 1.5em;">✨</span>
                                La bonne nouvelle
                            </h4>
                            <p style="line-height: 1.8;">
                                Toutes ces craintes sont <strong>infondées</strong> ! Dans les prochaines pages, 
                                nous allons démystifier tout ça ensemble.
                            </p>
                        </div>
                    </div>
                `
            },
            {
                icon: "🤖",
                title: "La vérité : ce n'est pas un génie",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border: 3px solid #4caf50; padding: 35px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="font-size: 6em; margin-bottom: 20px;">🤖</div>
                            <h2 style="font-size: 2.2em; color: #2e7d32; margin-bottom: 20px;">
                                Ce n'est PAS un génie
                            </h2>
                        </div>

                        <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <div style="display: flex; align-items: center; gap: 25px; margin-bottom: 20px;">
                                <span style="font-size: 5em;">🎭</span>
                                <div style="flex: 1;">
                                    <h3 style="font-size: 1.6em; color: #1b5e20; margin-bottom: 15px;">
                                        Un assistant très obéissant
                                    </h3>
                                    <p style="font-size: 1.2em; color: #555; line-height: 1.8;">
                                        L'ordinateur fait <strong>EXACTEMENT</strong> ce que vous lui demandez.
                                        Ni plus, ni moins.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style="background: #fff3e0; padding: 30px; border-radius: 12px; margin: 25px 0; border: 2px solid #ff9800;">
                            <h3 style="color: #e65100; margin-bottom: 20px; font-size: 1.4em;">
                                💡 Exemples concrets :
                            </h3>
                            <ul class="list-style" style="font-size: 1.1em; line-height: 2;">
                                <li><strong>Vous cliquez</strong> sur "Enregistrer" → il enregistre</li>
                                <li><strong>Vous tapez</strong> une lettre → elle apparaît</li>
                                <li><strong>Vous donnez</strong> une mauvaise instruction → il la suit quand même</li>
                            </ul>
                        </div>

                        <div class="alert alert-warning" style="font-size: 1.1em;">
                            <h4 style="margin-bottom: 15px; font-size: 1.2em;">🎯 Retenez ceci :</h4>
                            <p style="line-height: 1.8;">
                                Si ça fonctionne → <strong>il vous a suivi</strong><br>
                                Si ça ne fonctionne pas → <strong>il vous a... suivi aussi !</strong>
                            </p>
                            <p style="margin-top: 15px; font-style: italic; color: #666;">
                                Pas de magie, seulement de la logique.
                            </p>
                        </div>
                    </div>
                `
            },
            {
                icon: "🎯",
                title: "Vous pouvez faire des erreurs !",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border: 3px solid #2196f3; padding: 35px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="font-size: 6em; margin-bottom: 20px;">🎯</div>
                            <h2 style="font-size: 2.2em; color: #1565c0; margin-bottom: 20px;">
                                L'ordinateur ne vous juge pas
                            </h2>
                        </div>

                        <div style="background: white; padding: 35px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 6px 20px rgba(0,0,0,0.1);">
                            <h3 style="color: #667eea; margin-bottom: 25px; text-align: center; font-size: 1.6em;">
                                ✅ Vous avez le droit de :
                            </h3>
                            
                            <div style="display: grid; gap: 20px;">
                                <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">
                                    <h4 style="font-size: 1.2em; margin-bottom: 10px; color: #2e7d32;">👆 Cliquer partout</h4>
                                    <p style="color: #666; line-height: 1.6;">Explorez sans crainte, vous ne casserez rien !</p>
                                </div>
                                
                                <div style="background: #fff3e0; padding: 20px; border-radius: 10px; border-left: 5px solid #ff9800;">
                                    <h4 style="font-size: 1.2em; margin-bottom: 10px; color: #e65100;">🔄 Vous tromper</h4>
                                    <p style="color: #666; line-height: 1.6;">Les erreurs sont normales et font partie de l'apprentissage</p>
                                </div>
                                
                                <div style="background: #f3e5f5; padding: 20px; border-radius: 10px; border-left: 5px solid #9c27b0;">
                                    <h4 style="font-size: 1.2em; margin-bottom: 10px; color: #7b1fa2;">⏱️ Prendre votre temps</h4>
                                    <p style="color: #666; line-height: 1.6;">L'ordinateur attendra patiemment vos instructions</p>
                                </div>
                                
                                <div style="background: #fce4ec; padding: 20px; border-radius: 10px; border-left: 5px solid #ec407a;">
                                    <h4 style="font-size: 1.2em; margin-bottom: 10px; color: #c2185b;">🔍 Essayer plusieurs fois</h4>
                                    <p style="color: #666; line-height: 1.6;">Aucune limite au nombre de tentatives !</p>
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-success" style="font-size: 1.15em;">
                            <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                <span style="font-size: 1.5em;">🎉</span>
                                Rassurez-vous !
                            </h4>
                            <p style="line-height: 1.8;">
                                Contrairement à un examen, <strong>il n'y a pas de mauvaise note</strong>. 
                                L'ordinateur ne se moque pas, ne s'énerve pas, et ne vous sanctionne pas.
                            </p>
                        </div>
                    </div>
                `
            },
            {
                icon: "🔄",
                title: "Le pouvoir magique : CTRL + Z",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border: 3px solid #ff9800; padding: 35px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="font-size: 6em; margin-bottom: 20px;">🔄</div>
                            <h2 style="font-size: 2.2em; color: #e65100; margin-bottom: 20px;">
                                Presque tout peut être annulé !
                            </h2>
                        </div>

                        <div style="background: white; padding: 35px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 6px 20px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <div style="background: #667eea; color: white; padding: 20px 40px; border-radius: 12px; display: inline-block; font-size: 2em; font-weight: bold; font-family: monospace;">
                                    CTRL + Z 
                                </div>
                                <p style="margin-top: 20px; font-size: 1.3em; color: #666;">
                                    La combinaison magique pour annuler 
                                </p>
                            </div>

                            <h3 style="color: #667eea; margin-bottom: 25px; text-align: center; font-size: 1.5em;">
                                ✨ Comment ça marche ?
                            </h3>
                            <p>
                            (le "+" veut dire : appuiyez en même temps sur les touches "CTRL" et "Z")
                            </p>
                            
                            <div style="background: #f5f5f5; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
                                <ol style="font-size: 1.1em; line-height: 2; color: #333; padding-left: 25px;">
                                    <li>Maintenez la touche <strong>CTRL</strong> (ou <strong>CMD</strong> sur Mac)</li>
                                    <li>Appuyez sur la touche <strong>Z</strong></li>
                                    <li>Votre dernière action est annulée !</li>
                                </ol>
                            </div>

                            <h4 style="color: #ff9800; margin: 25px 0 15px; font-size: 1.3em;">
                                📋 Exemples d'utilisation :
                            </h4>
                            <ul class="list-style" style="font-size: 1.05em; line-height: 1.9;">
                                <li>Vous avez supprimé un texte par erreur → <strong>CTRL + Z</strong></li>
                                <li>Vous avez déplacé un fichier au mauvais endroit → <strong>CTRL + Z</strong></li>
                                <li>Vous avez appliqué une mauvaise mise en forme → <strong>CTRL + Z</strong></li>
                                <li>Vous avez dessiné quelque chose que vous n'aimez pas → <strong>CTRL + Z</strong></li>
                            </ul>
                        </div>

                        <div style="background: #e8f5e9; padding: 25px; border-radius: 12px; border: 2px solid #4caf50;">
                            <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: #2e7d32; font-size: 1.3em;">
                                <span style="font-size: 1.5em;">💡</span>
                                Astuce bonus
                            </h4>
                            <p style="font-size: 1.1em; line-height: 1.8; color: #555;">
                                Vous pouvez appuyer plusieurs fois sur <strong>CTRL + Z</strong> pour annuler 
                                plusieurs actions d'affilée. C'est comme une <strong>machine à remonter le temps</strong> !
                            </p>
                        </div>

                        <div class="alert alert-warning" style="margin-top: 25px; font-size: 1.05em;">
                            <p style="line-height: 1.8;">
                                <strong>⚠️ Attention :</strong> Certaines actions ne peuvent pas être annulées 
                                (comme supprimer définitivement un fichier de la corbeille). 
                                Mais dans 95% des cas, <strong>CTRL + Z</strong> vous sauvera !
                            </p>
                        </div>
                    </div>
                `
            },
            {icon:"😊",title:"Alors, rassuré(e) ?",content:`<div class="card" style="background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);border:3px solid #2196f3;padding:35px"><div style="text-align:center;margin-bottom:30px"><div style="font-size:6em;margin-bottom:20px">😰 ➜ 😊</div><h2 style="font-size:2.2em;color:#1565c0;margin-bottom:20px">Récapitulons !</h2></div><div style="background:white;padding:35px;border-radius:12px;margin-bottom:30px;box-shadow:0 6px 20px rgba(0,0,0,0.1)"><h3 style="color:#667eea;margin-bottom:30px;text-align:center;font-size:1.6em">📋 Ce que vous avez appris :</h3><div style="display:grid;gap:20px"><div style="background:#e8f5e9;padding:20px;border-radius:10px;border-left:5px solid #4caf50"><p style="font-size:1.1em;line-height:1.7">✅ L'ordinateur n'est <strong>pas un génie</strong>, c'est un assistant obéissant</p></div><div style="background:#fff3e0;padding:20px;border-radius:10px;border-left:5px solid #ff9800"><p style="font-size:1.1em;line-height:1.7">✅ Il ne vous <strong>juge pas</strong> et vous pouvez faire des erreurs</p></div><div style="background:#f3e5f5;padding:20px;border-radius:10px;border-left:5px solid #9c27b0"><p style="font-size:1.1em;line-height:1.7">✅ Presque tout peut être <strong>annulé</strong> avec CTRL+Z</p></div><div style="background:#e3f2fd;padding:20px;border-radius:10px;border-left:5px solid #2196f3"><p style="font-size:1.1em;line-height:1.7">✅ C'est comme une <strong>télécommande</strong> : vous êtes aux commandes</p></div></div></div><div style="background:linear-gradient(135deg,#f3e5f5 0%,#e1bee7 100%);padding:35px;border-radius:15px;text-align:center"><h3 style="font-size:2em;color:#7b1fa2;margin-bottom:20px">🎉 Prêt(e) pour la suite ?</h3><p style="font-size:1.3em;line-height:1.8;color:#333;margin-bottom:25px">Maintenant que vous êtes rassuré(e), découvrons ensemble comment fonctionne concrètement un ordinateur avec des comparaisons simples !</p><div style="background:white;padding:25px;border-radius:12px;display:inline-block;margin-top:20px"><p style="font-size:1.2em;color:#667eea;font-weight:bold;margin:0">👉 Continuons l'aventure !</p></div></div></div>`},
            {
                icon: "📖",
                title: "L'ordinateur : Une bibliothèque bien organisée",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-color: #2196f3;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">🌟</span>
                            Comprendre l'ordinateur sans stress
                        </h3>
                        <p style="font-size: 1.1em; line-height: 1.6; margin-bottom: 15px;">
                            Un ordinateur, c'est un peu comme une <strong>bibliothèque moderne</strong> ou comme un <strong>grand centre commercial</strong> : 
                            au début, on est impressionné... puis, dès qu'on en comprend l'organisation, tout devient logique.
                        </p>
                        <p style="color: #555; line-height: 1.6;">
                            Dans ce cours, nous allons découvrir l'ordinateur étape par étape, avec des images simples et concrètes, sans jargon compliqué.
                        </p>
                    </div>

                    <div class="card">
                        <h3 style="margin-bottom: 20px;">📚 Imaginez une grande bibliothèque</h3>
                        <div class="grid">
                            <div class="grid-item" style="border-color: #9c27b0;">
                                <div class="emoji">🚪</div>
                                <h4>Les Programmes</h4>
                                <p style="margin: 10px 0; color: #9c27b0; font-weight: bold;">=</p>
                                <p style="font-weight: bold;">Les salles spécialisées</p>
                                <p style="margin-top: 10px; background: #f3e5f5; padding: 10px; border-radius: 5px;">
                                    Salle des vidéos, salle d'écriture, salle de musique...
                                </p>
                            </div>
                            <div class="grid-item" style="border-color: #4caf50;">
                                <div class="emoji">📚</div>
                                <h4>Les Dossiers</h4>
                                <p style="margin: 10px 0; color: #4caf50; font-weight: bold;">=</p>
                                <p style="font-weight: bold;">Les étagères/rayonnages</p>
                                <p style="margin-top: 10px; background: #e8f5e9; padding: 10px; border-radius: 5px;">
                                    Où vous rangez vos documents par thème
                                </p>
                            </div>
                            <div class="grid-item" style="border-color: #ff9800;">
                                <div class="emoji">📖</div>
                                <h4>Les Fichiers</h4>
                                <p style="margin: 10px 0; color: #ff9800; font-weight: bold;">=</p>
                                <p style="font-weight: bold;">Les livres</p>
                                <p style="margin-top: 10px; background: #fff3e0; padding: 10px; border-radius: 5px;">
                                    Photos, textes, vidéos, musiques...
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="alert alert-warning">
                        <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="font-size: 1.5em;">💡</span>
                            Pourquoi cette comparaison ?
                        </h4>
                        <p style="line-height: 1.6;">
                            Parce que, comme une bibliothèque, <strong>c'est vous qui organisez tout</strong> : 
                            par thème, par date, par projet... Vous êtes le bibliothécaire.
                        </p>
                    </div>
                `
            },
            {
                icon: "🧠",
                title: "L'unité centrale : Le cerveau obéissant",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-color: #9c27b0;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">🧠</span>
                            Le cerveau de l'ordinateur
                        </h3>
                        <p style="font-size: 1.1em; margin-bottom: 15px;">
                            C'est le <strong>cerveau</strong> de l'ordinateur... mais attention :
                        </h3>
                        
                        <div class="alert" style="background: #ffebee; border-color: #f44336; color: #c62828; margin: 20px 0;">
                            <p style="font-weight: bold; font-size: 1.1em;">
                                ➡️ Il NE réfléchit PAS : il exécute exactement ce que vous lui demandez.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <div style="text-align: center; font-size: 4em; margin-bottom: 20px;">🖥️</div>
                            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #2196f3;">
                                <p style="font-weight: bold; margin-bottom: 10px;">Comme un assistant très obéissant :</p>
                                <ul class="list-style" style="margin-left: 20px;">
                                    <li>Si ça fonctionne, il vous a suivi</li>
                                    <li>Si ça ne fonctionne pas, il vous a... suivi aussi</li>
                                </ul>
                            </div>
                            <div class="alert alert-warning">
                                <p style="font-weight: bold; text-align: center;">Pas de magie, seulement de la logique.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                icon: "🖥️",
                title: "L'écran : Votre fenêtre sur le monde numérique",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%); border-color: #3f51b5;">
                        <h3 style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">🖥️</span>
                            L'écran : Votre fenêtre sur le monde numérique
                        </h3>
                        <div style="background: white; padding: 30px; border-radius: 12px; text-align: center;">
                            <div style="font-size: 5em; margin-bottom: 20px;">🪟</div>
                            <p style="font-size: 1.2em; line-height: 1.8; margin-bottom: 30px;">
                                L'écran est comme la <strong>vitrine</strong> ou la <strong>fenêtre</strong> de votre bibliothèque :<br>
                                il vous montre au travers de celle-ci son contenu.
                            </p>
                            <div class="alert alert-info" style="max-width: 700px; margin: 0 auto;">
                                <p style="font-size: 1.1em;">
                                    Sans écran → vous êtes dans le noir complet !<br>
                                    C’est lui qui affiche les images, les textes, les vidéos…
                                </p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                icon: "🖱️",
                title: "La souris : Votre main virtuelle",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-color: #4caf50;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">🖱️</span>
                            La souris : Votre main dans la bibliothèque numérique
                        </h3>

                        <div style="display: grid; gap: 20px;">
                            <div style="background: white; padding: 20px; border-radius: 10px; border-left: 4px solid #2196f3;">
                                <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <span style="font-size: 1.5em;">👆</span>
                                    Clic simple
                                </h4>
                                <p style="color: #666;">Sélectionner (toucher un livre)</p>
                            </div>

                            <div style="background: white; padding: 20px; border-radius: 10px; border-left: 4px solid #9c27b0;">
                                <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <span style="font-size: 1.5em;">👆👆</span>
                                    Double clic
                                </h4>
                                <p style="color: #666;">Ouvrir (ouvrir un livre/un fichier)</p>
                            </div>

                            <div style="background: white; padding: 20px; border-radius: 10px; border-left: 4px solid #ff9800;">
                                <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <span style="font-size: 1.5em;">🖱️</span>
                                    Clic droit
                                </h4>
                                <p style="color: #666;">Options complémentaire</p>
                            </div>
                        </div>

                        <div class="alert alert-warning" style="margin-top: 20px;">
                            <h4 style="margin-bottom: 10px;">💡 Astuce :</h4>
                            <p>La plupart des actions peuvent être <strong>annulées</strong>, donc pas de panique !</p>
                        </div>
                    </div>
                `
            },
            {
                icon: "⌨️",
                title: "Le clavier : Votre outil d'écriture",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #fff3e0, #ffe0b2); border-color: #ff9800; padding: 25px; border-radius: 12px;">
                        <h3 style="display: flex; align-items: center; gap: 12px; margin-bottom: 25px; font-size: 1.6em;">
                            <span style="font-size: 2.2em;">⌨️</span>
                            Le clavier : Comme un cahier ou une machine à écrire
                        </h3>

                        <div style="background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
                            <div class="grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px;">
                                <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; text-align: center; font-weight: 600; font-size: 1.3em;">
                                    A • Z • E
                                </div>
                                <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; text-align: center; font-weight: 600; font-size: 1.3em;">
                                    1 • 2 • 3
                                </div>
                                <div style="background: #f3e5f5; padding: 20px; border-radius: 10px; text-align: center; font-weight: 600; font-size: 1.3em;">
                                    @ • # • %
                                </div>
                                <div style="background: #fce4ec; padding: 20px; border-radius: 10px; text-align: center; font-weight: 600; font-size: 1.1em;">
                                    Entrée<br>Suppr<br>etc ...
                                </div>
                            </div>

                            <ul class="list-style" style="margin-bottom: 20px; padding-left: 20px; line-height: 1.6;">
                                <li>Lettres</li>
                                <li>Chiffres</li>
                                <li>Symboles</li>
                                <li>Touches de commande (exemple: Entrée, Suppr, etc.)</li>
                            </ul>

                            <div class="alert alert-warning" style="margin-top: 25px; padding: 15px; border-radius: 10px; font-size: 1.1em;">
                                <p style="font-weight: bold; margin: 0;">
                                    C'est votre manière de <em>dialoguer</em> avec l'ordinateur.
                                </p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                icon: "📂",
                title: "L'explorateur de fichiers : Votre plan de bibliothèque",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #fffde7 0%, #fff9c4 100%); border-color: #fbc02d;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">📂</span>
                            L'explorateur de fichiers = Le plan de votre bibliothèque
                        </h3>

                        <p style="font-size: 1.1em; margin-bottom: 30px; line-height: 1.6;">
                            Il vous permet de <strong>voir, organiser et retrouver</strong> vos documents.
                        </p>

                        <div class="grid" style="margin-bottom: 30px;">
                            <div style="background: #e3f2fd; padding: 25px; border-radius: 10px; border-left: 4px solid #2196f3;">
                                <h4 style="margin-bottom: 10px; font-size: 1.2em;">À gauche</h4>
                                <p style="font-size: 1em; color: #666;">Les grandes sections (Documents, Images, Téléchargements...)</p>
                            </div>
                            <div style="background: #e8f5e9; padding: 25px; border-radius: 10px; border-left: 4px solid #4caf50;">
                                <h4 style="margin-bottom: 10px; font-size: 1.2em;">Au centre</h4>
                                <p style="font-size: 1em; color: #666;">Le contenu du dossier que vous visitez</p>
                            </div>
                            <div style="background: #f3e5f5; padding: 25px; border-radius: 10px; border-left: 4px solid #9c27b0;">
                                <h4 style="margin-bottom: 10px; font-size: 1.2em;">En haut</h4>
                                <p style="font-size: 1em; color: #666;">L'adresse : "où vous êtes"</p>
                            </div>
                        </div>

                        <div class="alert alert-info" style="font-size: 1.1em;">
                            <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                <span style="font-size: 1.5em;">💡</span>
                                Astuce
                            </h4>
                            <p style="line-height: 1.6;">
                                Comme dans une bibliothèque, vous pouvez naviguer de section en section pour trouver ce que vous cherchez !
                            </p>
                        </div>
                    </div>
                `
            },
            {
                icon: "📂",
                title: "Gérer vos Documents : L'Explorateur de fichiers",
                content:`
 
                    <div style="text-align: left; padding: 20px;">
                        
                        <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 20px;">
                            L'Explorateur de fichiers (ou "Finder" sur Mac) est comme le classeur numérique de votre ordinateur. Il est indispensable pour :
                        </p>

                        <ul style="margin-left: 20px; list-style-type: '👉 ';">
                            <li>**Organiser** vos photos, documents et musiques.</li>
                            <li>**Créer, déplacer** et **renommer** des dossiers.</li>
                            <li>**Retrouver** rapidement tous vos fichiers.</li>
                        </ul>

                        <div style="text-align: center; margin: 30px 0;">
                            <img src="assets/capture_explorateur_fichiers.jpg" alt="Capture d'écran de l'Explorateur de fichiers" class="course-image-illustration" />
                            <p style="font-style: italic; font-size: 0.95rem; color: #777;">
                                Voici l'interface typique d'un explorateur de fichiers.
                            </p>
                        </div>

                        <div class="tip-box" style="margin-top: 30px;">
                            💡 Conseil Pratique : Pour une bonne organisation et moins de stress, prenez l'habitude de créer un dossier principal par thème (ex : Travail, Photos, Administratif).
                        </div>
                    </div>
                `
            },
            {
                icon: "📁",
                title: "Les dossiers : Vos étagères/rayonnages ",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-color: #4caf50;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">📁</span>
                            Les dossiers = Vos étagères
                        </h3>

                        <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 25px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <div style="font-size: 5em; margin-bottom: 20px;">📁</div>
                                <p style="font-size: 1.2em; line-height: 1.6;">
                                    Un dossier est comme une <strong>étagère</strong> ou une <strong>boîte</strong> où vous rangez vos documents.
                                </p>
                            </div>

                            <h4 style="margin-bottom: 20px; font-size: 1.3em;">Vous pouvez y mettre :</h4>
                            <ul class="list-style" style="font-size: 1.1em; line-height: 2;">
                                <li>Documents</li>
                                <li>Photos</li>
                                <li>Vidéos</li>
                                <li>Ou d'autres sous-dossiers</li>
                            </ul>
                        </div>

                        <div class="alert alert-info" style="font-size: 1.05em;">
                            <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                <span style="font-size: 1.5em;">📝</span>
                                Exemple concret
                            </h4>
                            <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px;">
                                <p style="margin-bottom: 10px; font-weight: bold;">Dossier « Vacances » →</p>
                                <ul style="margin-left: 30px; line-height: 1.8;">
                                    <li>→ Sous-dossier « Été 2024 »</li>
                                    <li>→ Sous-dossier « Hiver 2025 »</li>
                                </ul>
                            </div>
                        </div>

                        <div class="alert alert-warning" style="margin-top: 25px;">
                            <h4 style="margin-bottom: 10px;">💡 Astuce :</h4>
                            <p>Comme des boîtes dans des boîtes, vous pouvez créer autant de niveaux que nécessaire ! Tout comme le jeu des poupées russes</p>
                        </div>
                    </div>
                `
            },
            {
                icon: "📄",
                title: "Les fichiers : Vos livres numériques",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-color: #2196f3;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">📄</span>
                            Les fichiers = Vos livres
                        </h3>

                        <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 25px;">
                            <p style="font-size: 1.15em; margin-bottom: 30px; line-height: 1.6; text-align: center;">
                                Un fichier, c'est comme un <strong>livre, une photo ou un DVD</strong> dans votre bibliothèque.
                            </p>

                            <div style="display: grid; gap: 20px;">
                                <div style="display: flex; align-items: center; gap: 15px; background: #e3f2fd; padding: 20px; border-radius: 10px;">
                                    <span style="font-size: 2.5em;">📷</span>
                                    <div>
                                        <h4>Une photo</h4>
                                        <p style="color: #666;">Un livre illustré</p>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; gap: 15px; background: #e8f5e9; padding: 20px; border-radius: 10px;">
                                    <span style="font-size: 2.5em;">📄</span>
                                    <div>
                                        <h4>Un texte</h4>
                                        <p style="color: #666;">Une lettre ou un document</p>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; gap: 15px; background: #f3e5f5; padding: 20px; border-radius: 10px;">
                                    <span style="font-size: 2.5em;">🎬</span>
                                    <div>
                                        <h4>Une vidéo</h4>
                                        <p style="color: #666;">Un DVD ou un film</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="background: #fff3e0; padding: 25px; border-radius: 10px; border: 2px solid #ff9800;">
                            <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px; font-size: 1.2em;">
                                <span style="font-size: 1.5em;">🏷️</span>
                                Chaque fichier a :
                            </h4>
                            <ul class="list-style" style="font-size: 1.1em; line-height: 2;">
                                <li>Un <strong>nom</strong> (comme un titre de livre)</li>
                                <li>Une <strong>extension</strong> (.jpg, .pdf, .docx) qui indique le type de document</li>
                            </ul>

                            <div class="alert alert-info" style="margin-top: 20px; background: white;">
                                <p style="font-weight: bold; margin-bottom: 10px;">🔍 Exemples d'extensions :</p>
                                <ul style="margin-left: 20px; line-height: 1.8;">
                                    <li>.jpg ou .png → une image</li>
                                    <li>.pdf → un document</li>
                                    <li>.mp4 → une vidéo</li>
                                    <li>.mp3 → une musique</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                icon: "🌐",
                title: "Internet : Un immense centre commercial",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e8eaf6, #c5cae9); border-color: #5c6bc0; padding: 25px; border-radius: 12px;">
                        <h3 style="display: flex; align-items: center; gap: 12px; margin-bottom: 25px; font-size: 1.6em;">
                            <span style="font-size: 2.2em;">🌐</span>
                            Internet : Un gigantesque centre commercial numérique
                        </h3>

                        <div class="grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 35px;">
                            <div style="background: #e3f2fd; padding: 20px; border-radius: 12px; text-align: center;">
                                <h4 style="margin-bottom: 10px; font-size: 1.1em;">🌐 Le navigateur</h4>
                                <p style="font-size: 0.95em; color: #555;">L'enseigne qui vous permet d'entrer<br>(Chrome, Firefox, Edge...)</p>
                            </div>

                            <div style="background: #e8f5e9; padding: 20px; border-radius: 12px; text-align: center;">
                                <h4 style="margin-bottom: 10px; font-size: 1.1em;">🏪 Les sites web</h4>
                                <p style="font-size: 0.95em; color: #555;">Les magasins</p>
                            </div>

                            <div style="background: #f3e5f5; padding: 20px; border-radius: 12px; text-align: center;">
                                <h4 style="margin-bottom: 10px; font-size: 1.1em;">🚪 Les liens</h4>
                                <p style="font-size: 0.95em; color: #555;">Des portes magiques</p>
                            </div>

                            <div style="background: #fff3e0; padding: 20px; border-radius: 12px; text-align: center;">
                                <h4 style="margin-bottom: 10px; font-size: 1.1em;">🔍 La barre de recherche</h4>
                                <p style="font-size: 0.95em; color: #555;">Le plan du centre</p>
                            </div>

                            <div style="background: #fce4ec; padding: 20px; border-radius: 12px; text-align: center;">
                                <h4 style="margin-bottom: 10px; font-size: 1.1em;">📑 Les onglets</h4>
                                <p style="font-size: 0.95em; color: #555;">Les portes des magasins ouverts</p>
                            </div>

                            <div style="background: #fffde7; padding: 20px; border-radius: 12px; text-align: center;">
                                <h4 style="margin-bottom: 10px; font-size: 1.1em;">⬇️ Télécharger</h4>
                                <p style="font-size: 0.95em; color: #555;">Ramener un objet chez vous</p>
                            </div>
                        </div>

                        <div style="background: #ffebee; padding: 25px; border-radius: 12px; border: 2px solid #f44336;">
                            <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; font-size: 1.2em; color: #c62828;">
                                <span style="font-size: 1.5em;">🔒</span>
                                Rester en sécurité
                            </h4>

                            <ul class="list-style" style="padding-left: 20px; line-height: 1.6;">
                                <li>Ne partagez jamais vos données personnelles</li>
                                <li>Méfiez-vous des liens suspects</li>
                                <li>Vérifiez la présence du <strong>cadenas</strong> dans la barre d'adresse</li>
                            </ul>
                        </div>
                    </div>
                `
            },
            {
                icon: "✉️",
                title: "Les e-mails : Votre boîte aux lettres numérique",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-color: #ec407a;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">✉️</span>
                            Les e-mails : Une vraie boîte aux lettres, mais instantanée
                        </h3>

                        <div style="background: white; padding: 40px; border-radius: 10px; text-align: center;">
                            <div style="font-size: 5em; margin-bottom: 30px;">✉️</div>
                            <p style="font-size: 1.2em; margin-bottom: 30px;">
                                Votre adresse e-mail = une vraie <strong>boîte aux lettres</strong>, mais instantanée !
                            </p>

                            <div class="grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
                                <div style="background: #fce4ec; padding: 20px; border-radius: 10px;">
                                    <div style="font-size: 2.5em; margin-bottom: 10px;">📧</div>
                                    <p style="font-weight: bold;">Textes</p>
                                </div>
                                <div style="background: #fce4ec; padding: 20px; border-radius: 10px;">
                                    <div style="font-size: 2.5em; margin-bottom: 10px;">📷</div>
                                    <p style="font-weight: bold;">Photos</p>
                                </div>
                                <div style="background: #fce4ec; padding: 20px; border-radius: 10px;">
                                    <div style="font-size: 2.5em; margin-bottom: 10px;">📄</div>
                                    <p style="font-weight: bold;">Documents</p>
                                </div>
                                <div style="background: #fce4ec; padding: 20px; border-radius: 10px;">
                                    <div style="font-size: 2.5em; margin-bottom: 10px;">🧾</div>
                                    <p style="font-weight: bold;">Factures</p>
                                </div>
                            </div>

                            <p style="margin-top: 30px; color: #666;">
                                Vous pouvez envoyer et recevoir tout cela instantanément !
                            </p>
                        </div>
                    </div>
                `
            },
            {
                icon: "💼",
                title: "Le Bureau : Votre table de travail numérique",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); border-color: #26a69a;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">💼</span>
                            Le Bureau : Votre table de travail
                        </h3>

                        <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
                            <p style="font-size: 1.1em; margin-bottom: 15px; line-height: 1.6;">
                                Imaginez que vous soyez dans votre bibliothèque, devant <strong>votre table de travail</strong>.
                            </p>
                            <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
                                Le bureau de votre ordinateur, c'est exactement cela.
                            </p>

                            <div style="display: grid; gap: 20px;">
                                <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 4px solid #2196f3;">
                                    <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                        <span style="font-size: 1.3em;">🎯</span>
                                        Icônes
                                    </h4>
                                    <p style="color: #666; margin-bottom: 10px;">Comme des livres ou outils posés sur votre table</p>
                                    <p style="font-size: 0.85em; color: #888;">
                                        Exemple : « Ce PC » ou « Explorateur de fichiers » = une porte vers toutes vos étagères
                                    </p>
                                </div>

                                <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 4px solid #4caf50;">
                                    <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                        <span style="font-size: 1.3em;">📊</span>
                                        Barre des tâches (en bas de l'écran)
                                    </h4>
                                    <p style="color: #666;">Comme une étagère où sont rangés vos outils préférés et ceux que vous ouvrez</p>
                                </div>

                                <div style="background: #f3e5f5; padding: 20px; border-radius: 10px; border-left: 4px solid #9c27b0;">
                                    <h4 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                        <span style="font-size: 1.3em;">🖼️</span>
                                        Fond d'écran
                                    </h4>
                                    <p style="color: #666;">La décoration derrière la table</p>
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-warning">
                            <h4 style="margin-bottom: 10px;">💡 Astuce :</h4>
                            <p>Vous pouvez déplacer, ranger ou supprimer les icônes comme des objets sur une vraie table.</p>
                        </div>
                    </div>
                `
            },
            {
                icon: "📑",
                title: "Les Onglets : Plusieurs magasins ouverts",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); border-color: #00bcd4;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">📑</span>
                            Les Onglets : Plusieurs magasins ouverts en même temps
                        </h3>

                        <div style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
                            <p style="font-size: 1.1em; margin-bottom: 20px; line-height: 1.6;">
                                Dans un navigateur, les onglets sont comme :
                            </p>

                            <div style="background: #e3f2fd; padding: 25px; border-radius: 10px; border: 2px solid #2196f3; margin-bottom: 30px;">
                                <p style="font-size: 1.2em; text-align: center; font-weight: bold;">
                                    ➡️ <strong>Les portes de plusieurs magasins ouverts dans le centre commercial</strong>, chacun à une page différente.
                                </p>
                            </div>

                            <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                                <h4 style="margin-bottom: 15px;">À quoi servent-ils ?</h4>
                                <p style="color: #666; line-height: 1.6;">
                                    À passer rapidement d'un site du magasin à un autre, sans tout fermer.
                                </p>
                            </div>

                            <h4 style="margin-bottom: 20px; font-size: 1.2em;">Raccourcis utiles pour aller d'un magasin à l'autre:</h4>
                            <div style="display: grid; gap: 15px;">
                                <div style="display: flex; align-items: center; gap: 15px; background: #e3f2fd; padding: 15px; border-radius: 8px;">
                                    <span style="background: #2196f3; color: white; padding: 8px 15px; border-radius: 5px; font-family: monospace; font-weight: bold;">
                                        Ctrl + T
                                    </span>
                                    <span>Ouvrir un nouvel onglet</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 15px; background: #e8f5e9; padding: 15px; border-radius: 8px;">
                                    <span style="background: #4caf50; color: white; padding: 8px 15px; border-radius: 5px; font-family: monospace; font-weight: bold;">
                                        Ctrl + Tab
                                    </span>
                                    <span>Passer à l'onglet suivant</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 15px; background: #f3e5f5; padding: 15px; border-radius: 8px;">
                                    <span style="background: #9c27b0; color: white; padding: 8px 15px; border-radius: 5px; font-family: monospace; font-weight: bold;">
                                          × 
                                    </span>
                                    <span>Fermer un onglet</span>
                                </div>
                                <div class="alert alert-warning">
                            
                            <h5 style="margin-bottom: 20px; font-size: 1.2em;">Rappel :</h5>
                                <p>Le signe " + " entre les touches CTRL et T veut dire "en même temps", "simultanément"; Sinon ça ne fonctionne pas.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                icon: "🚪",
                title: "Les Programmes : Vos salles spécialisées",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%); border-color: #7e57c2;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 2em;">🚪</span>
                            Les Programmes : Les salles spécialisées de votre bibliothèque
                        </h3>

                        <p style="font-size: 1.1em; margin-bottom: 30px; line-height: 1.6;">
                            Revenons à la bibliothèque : elle possède plusieurs salles.
                        </p>

                        <div class="grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
                            <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 4px solid #2196f3;">
                                <h4 style="margin-bottom: 10px;">📝 Word</h4>
                                <p style="color: #666;">La salle d'écriture</p>
                            </div>
                            <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 4px solid #4caf50;">
                                <h4 style="margin-bottom: 10px;">📊 Excel</h4>
                                <p style="color: #666;">La salle des comptes et registres</p>
                            </div>
                            <div style="background: #f3e5f5; padding: 20px; border-radius: 10px; border-left: 4px solid #9c27b0;">
                                <h4 style="margin-bottom: 10px;">🎬 VLC</h4>
                                <p style="color: #666;">La salle de cinéma</p>
                            </div>
                            <div style="background: #fff3e0; padding: 20px; border-radius: 10px; border-left: 4px solid #ff9800;">
                                <h4 style="margin-bottom: 10px;">🌐 Navigateur</h4>
                                <p style="color: #666;">La salle des plans et annuaires</p>
                            </div>
                            <div style="background: #fce4ec; padding: 20px; border-radius: 10px; border-left: 4px solid #ec407a;">
                                <h4 style="margin-bottom: 10px;">🎮 Jeu vidéo</h4>
                                <p style="color: #666;">La salle de jeux</p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 10px; margin: 20px 0;">
                            <h4 style="margin-bottom: 20px; font-size: 1.2em;">Comment reconnaître un programme ?</h4>
                            <div style="display: grid; gap: 20px;">
                                <div style="display: flex; align-items: start; gap: 15px;">
                                    <span style="font-size: 2em;">🎯</span>
                                    <div>
                                        <p style="font-weight: bold;">Grâce à son icône</p>
                                        <p style="font-size: 0.9em; color: #666;">(comme une enseigne)</p>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: start; gap: 15px;">
                                    <span style="font-size: 2em;">🪟</span>
                                    <div>
                                        <p style="font-weight: bold;">Une fenêtre quand il s'ouvre</p>
                                        <p style="font-size: 0.9em; color: #666;">(comme entrer dans la salle)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-warning">
                            <h4 style="margin-bottom: 15px;">💡 Astuces :</h4>
                            <ul class="list-style">
                                <li><strong>Pour ouvrir</strong> → double clic</li>
                                <li><strong>Pour fermer</strong> → la croix en haut à droite</li>
                                <li><strong>Si le programme "plante"</strong> → fermez et rouvrez (comme rallumer la lumière)</li>
                            </ul>
                        </div>
                    </div>
                `
            },

           {
                icon: "📊",
                title: "Tableau récapitulatif : Les images comparatives",
                content: `
                    <div class="card" style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-color: #667eea; padding: 40px;">
                        <div style="text-align: center; margin-bottom: 40px;">
                            <div style="font-size: 4em; margin-bottom: 20px;">📊</div>
                            <h2 style="font-size: 2.5em; color: #667eea; margin-bottom: 15px;">
                                Tableau Récapitulatif des images comparatives
                            </h2>
                            <p style="font-size: 1.2em; color: #666;">
                                Retrouvez toutes les comparaisons pour mieux comprendre votre ordinateur
                            </p>
                        </div>

                        <div style="overflow-x: auto; margin-bottom: 30px;">
                            <table style="width: 100%; border-collapse: separate; border-spacing: 0; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">
                                <thead>
                                    <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                                        <th style="padding: 25px 20px; text-align: left; color: white; font-size: 1.2em; font-weight: 700; border-right: 2px solid rgba(255,255,255,0.2);">
                                            🖥️ Notion Informatique
                                        </th>
                                        <th style="padding: 25px 20px; text-align: left; color: white; font-size: 1.2em; font-weight: 700; border-right: 2px solid rgba(255,255,255,0.2);">
                                            📚 Image de la Bibliothèque
                                        </th>
                                        <th style="padding: 25px 20px; text-align: left; color: white; font-size: 1.2em; font-weight: 700; border-right: 2px solid rgba(255,255,255,0.2);">
                                            🏬 Image du Centre Commercial
                                        </th>
                                        <th style="padding: 25px 20px; text-align: left; color: white; font-size: 1.2em; font-weight: 700;">
                                            💡 Actions Pratiques
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="background: linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%); transition: all 0.3s;">
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef;">
                                            <div style="font-size: 2em; margin-bottom: 8px;">💼</div>
                                            <strong style="font-size: 1.15em; color: #667eea;">Bureau</strong>
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            Table de travail avec documents et outils
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            Comptoir d'accueil principal
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            <span style="background: #fef3c7; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;">Icônes</span>
                                            <span style="background: #fef3c7; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;">Fond d'écran</span>
                                            <span style="background: #fef3c7; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;">Barre des tâches</span>
                                        </td>
                                    </tr>
                                    <tr style="background: linear-gradient(135deg, #f3e5f5 0%, #faf5ff 100%); transition: all 0.3s;">
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef;">
                                            <div style="font-size: 2em; margin-bottom: 8px;">🚪</div>
                                            <strong style="font-size: 1.15em; color: #9c27b0;">Programme</strong>
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            Salle spécialisée (écriture, calcul, multimédia)
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            Magasin spécialisé avec son rayon
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            <span style="background: #e1bee7; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;">Double-clic pour ouvrir</span>
                                            <span style="background: #e1bee7; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;">✖ pour fermer</span>
                                        </td>
                                    </tr>
                                    <tr style="background: linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%); transition: all 0.3s;">
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef;">
                                            <div style="font-size: 2em; margin-bottom: 8px;">📑</div>
                                            <strong style="font-size: 1.15em; color: #4caf50;">Onglet</strong>
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            Plusieurs livres ouverts simultanément
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            Plusieurs magasins visités en même temps
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            <span style="background: #c8e6c9; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;">Ctrl+T pour nouvel onglet</span>
                                            <span style="background: #c8e6c9; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;">Ctrl+Tab pour naviguer entre onglets</span>
                                            <span style="background: #c8e6c9; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;"> ✖ pour fermer</span>
                                        </td>
                                    </tr>
                                    <tr style="background: linear-gradient(135deg, #fff3e0 0%, #fffbf0 100%); transition: all 0.3s;">
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef;">
                                            <div style="font-size: 2em; margin-bottom: 8px;">📁</div>
                                            <strong style="font-size: 1.15em; color: #ff9800;">Dossier</strong>
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            Étagère ou boîte de rangement
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            Rayon ou section du magasin
                                        </td>
                                        <td style="padding: 25px 20px; border-bottom: 2px solid #e9ecef; color: #555; line-height: 1.6;">
                                            <span style="background: #ffe0b2; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;">Clic droit pour options complémentaires</span>
                                            <span style="background: #ffe0b2; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;">Double-clic pour ouvrir</span>
                                        </td>
                                    </tr>
                                    <tr style="background: linear-gradient(135deg, #fce4ec 0%, #fff0f5 100%); transition: all 0.3s;">
                                        <td style="padding: 25px 20px;">
                                            <div style="font-size: 2em; margin-bottom: 8px;">📄</div>
                                            <strong style="font-size: 1.15em; color: #ec407a;">Fichier</strong>
                                        </td>
                                        <td style="padding: 25px 20px; color: #555; line-height: 1.6;">
                                            Livre, photo, DVD individuel
                                        </td>
                                        <td style="padding: 25px 20px; color: #555; line-height: 1.6;">
                                            Article ou produit spécifique
                                        </td>
                                        <td style="padding: 25px 20px; color: #555; line-height: 1.6;">
                                            <span style="background: #f8bbd0; padding: 4px 10px; border-radius: 6px; margin: 2px; display: inline-block;">Double-clic pour ouvrir</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="alert alert-info" style="background: white; border-left: 6px solid #667eea; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                            <h4 style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px; color: #667eea; font-size: 1.3em;">
                                <span style="font-size: 1.8em;">💡</span>
                                Pourquoi ces comparaisons ?
                            </h4>
                            <p style="line-height: 1.8; color: #555; font-size: 1.1em;">
                                Ces comparaisons avec la <strong>bibliothèque</strong> et le <strong>centre commercial</strong> 
                                permettent de comprendre l'informatique avec des situations de la vie quotidienne. 
                                Plus besoin d'avoir peur : tout devient logique et familier ! 
                            </p>
                        </div>
                    </div>
                `
            },
            {
                icon: "📌",
                title: "Points clés à retenir",
                content: `
                    <div class="card" style="background: #e8f5e9; padding: 25px; border-radius: 10px; border: 2px solid #4caf50; margin-bottom: 30px;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 1.5em;">📌</span>
                            Points clés à retenir
                        </h3>
                        <div class="grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <h4 style="margin-bottom: 10px;">💼 Le bureau</h4>
                                <p style="font-size: 0.9em; color: #666;">Votre espace de travail, personnalisable</p>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <h4 style="margin-bottom: 10px;">📑 Les onglets</h4>
                                <p style="font-size: 0.9em; color: #666;">Plusieurs magasins ouverts en parallèle</p>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <h4 style="margin-bottom: 10px;">🚪 Les programmes</h4>
                                <p style="font-size: 0.9em; color: #666;">Des salles spécialisées</p>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <h4 style="margin-bottom: 10px;">🖥️ L'ordinateur</h4>
                                <p style="font-size: 0.9em; color: #666;">Une grande bibliothèque organisée</p>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <h4 style="margin-bottom: 10px;">🌐 Internet</h4>
                                <p style="font-size: 0.9em; color: #666;">Un immense centre commercial</p>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <h4 style="margin-bottom: 10px;">🎯 Vous</h4>
                                <p style="font-size: 0.9em; color: #666;">Le chef d'orchestre qui organise tout</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                icon: "🎯",
                title: "Exercices pratiques suggérés",
                content: `
                    <div class="card" style="background: #e3f2fd; padding: 25px; border-radius: 10px; border: 2px solid #2196f3; margin-bottom: 30px;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                            <span style="font-size: 1.5em;">🎯</span>
                            Exercices pratiques suggérés
                        </h3>
                        <div style="display: grid; gap: 20px;">
                            <div style="background: white; padding: 20px; border-radius: 10px;">
                                <h4 style="margin-bottom: 10px;">🖥️ Sur le bureau</h4>
                                <ul class="list-style" style="font-size: 0.9em; color: #666;">
                                    <li>Créer un dossier « Vacances »</li>
                                    <li>Déplacez-le comme un livre sur une table</li>
                                </ul>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 10px;">
                                <h4 style="margin-bottom: 10px;">🌐 Avec les onglets</h4>
                                <ul class="list-style" style="font-size: 0.9em; color: #666;">
                                    <li>Ouvrez 3 onglets : Google, YouTube, un site d'actualités</li>
                                    <li>Passez de l'un à l'autre avec Ctrl+Tab</li>
                                </ul>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 10px;">
                                <h4 style="margin-bottom: 10px;">🧰 Avec les programmes</h4>
                                <ul class="list-style" style="font-size: 0.9em; color: #666;">
                                    <li>Ouvrez la Calculatrice</li>
                                    <li>Ouvrez Word</li>
                                    <li>Passez de l'un à l'autre via la barre des tâches</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                icon: "✅",
                title: "Fin du cours : Félicitations !",
                content: `
                    <div class="card">
                        <div class="alert alert-success" style="text-align: center; padding: 30px;">
                            <p style="font-size: 1.5em; font-weight: bold; margin-bottom: 10px;">
                                ✅ Félicitations, vous avez terminé le cours !
                            </p>
                            <p style="font-size: 1.1em; margin-bottom: 10px;">
                                Testez maintenant vos connaissances avec le quiz
                            </p>
                            <p style="font-size: 0.9em; color: #666;">
                                Cliquez sur "Commencer le Quiz" pour évaluer votre compréhension
                            </p>
                        </div>
                    </div>
                `
            }
        ];

        // QUESTIONS DU QUIZ
        const quizQuestions = [
            {
                question: "Un ordinateur peut être comparé à :",
                options: ["Une voiture", "Une bibliothèque", "Un réfrigérateur", "Un téléphone"],
                correct: 1,
                explanation: "Un ordinateur est comme une bibliothèque : organisé, avec des sections, des étagères et des livres."
            },
            {
                question: "Dans cette comparaison, les programmes sont :",
                options: ["Les livres", "Les salles spécialisées", "Les étagères", "Les bibliothécaires"],
                correct: 1,
                explanation: "Les programmes sont comme des salles spécialisées : la salle d'écriture (Word), la salle de calcul (Excel), etc."
            },
            {
                question: "Dans cette même comparaison, les dossiers sont :",
                options: ["Les étagères", "Les journaux", "Les chaises", "Les portes"],
                correct: 0,
                explanation: "Les dossiers sont comme des étagères où vous rangez vos documents par thème."
            },
            {
                question: "Les fichiers représentent :",
                options: ["Des vitres", "Des clés", "Des livres", "Des fenêtres"],
                correct: 2,
                explanation: "Les fichiers sont comme des livres dans votre bibliothèque : chacun contient des informations."
            },
            {
                question: "L'unité centrale sert principalement à :",
                options: ["Afficher les images", "Stocker les crayons", "Exécuter des instructions", "Faire du bruit"],
                correct: 2,
                explanation: "L'unité centrale est le cerveau de l'ordinateur. Elle exécute les instructions que vous lui donnez."
            },
            {
                question: "L'écran sert à :",
                options: ["Montrer ce que fait l'ordinateur", "Écrire du texte seul", "Faire du son", "Éteindre l'ordinateur"],
                correct: 0,
                explanation: "L'écran est comme une vitrine : il vous montre ce qui se passe dans l'ordinateur."
            },
            {
                question: "La souris permet :",
                options: ["De cuisiner", "De sélectionner, ouvrir et accéder aux options", "De créer de la musique", "De refroidir l'ordinateur"],
                correct: 1,
                explanation: "La souris est votre main virtuelle : clic simple pour sélectionner, double clic pour ouvrir, clic droit pour les options."
            },
            {
                question: "Le clavier sert à :",
                options: ["Copier les fichiers", "Écrire et donner des commandes", "Agrandir l'écran", "Ranger les dossiers"],
                correct: 1,
                explanation: "Le clavier est votre outil d'écriture et de dialogue avec l'ordinateur."
            },
            {
                question: "L'Explorateur de fichiers sert à :",
                options: ["Éteindre le PC", "Voir et organiser les documents", "Aller sur Internet", "Faire des calculs"],
                correct: 1,
                explanation: "L'Explorateur de fichiers est le plan de votre bibliothèque numérique."
            },
            {
                question: "Un dossier sert à :",
                options: ["Regarder des films", "Ranger des fichiers ou d'autres dossiers", "Installer l'imprimante", "Faire du son"],
                correct: 1,
                explanation: "Un dossier est comme une boîte ou un rayonnage où vous rangez vos fichiers."
            },
            {
                question: "Un fichier est :",
                options: ["Une salle", "Un livre numérique", "Un fil électrique", "Une enceinte"],
                correct: 1,
                explanation: "Un fichier est comme un livre numérique : il peut contenir du texte, des images, des vidéos, etc."
            },
            {
                question: "Une extension de fichier (.jpg, .pdf...) indique :",
                options: ["Le prix du fichier", "Le type de document", "Le poids en kilos", "La couleur"],
                correct: 1,
                explanation: "L'extension indique le type de fichier : .jpg pour une image, .pdf pour un document, etc."
            },
            {
                question: "Le navigateur Internet sert à :",
                options: ["Ranger les dossiers", "Entrer sur Internet", "Déplacer les icônes", "Éteindre l'ordinateur"],
                correct: 1,
                explanation: "Le navigateur (Chrome, Firefox, Edge) est votre porte d'entrée vers Internet."
            },
            {
                question: "Un site web peut être comparé à :",
                options: ["Une boîte aux lettres", "Un magasin", "Un ticket", "Un ballon"],
                correct: 1,
                explanation: "Un site web est comme un magasin dans le centre commercial d'Internet."
            },
            {
                question: "Un lien est :",
                options: ["Une porte qui mène ailleurs", "Un stylo", "Une prise", "Une musique"],
                correct: 0,
                explanation: "Un lien est comme une porte magique qui vous transporte vers une autre page."
            },
            {
                question: "Un onglet permet :",
                options: ["D'ouvrir une fenêtre réelle", "D'avoir plusieurs pages ouvertes", "De zoomer", "De vider la corbeille"],
                correct: 1,
                explanation: "Les onglets sont comme plusieurs livres ouverts : vous pouvez passer de l'un à l'autre."
            },
            {
                question: "Pour ouvrir un nouvel onglet, le raccourci est :",
                options: ["Ctrl + T", "Ctrl + S", "Ctrl + A", "Ctrl + W"],
                correct: 0,
                explanation: "Ctrl + T ouvre un nouvel onglet dans votre navigateur."
            },
            {
                question: "Le bureau de l'ordinateur représente :",
                options: ["Un lit", "Une table de travail", "Une armoire", "Une fenêtre"],
                correct: 1,
                explanation: "Le bureau est votre table de travail numérique."
            },
            {
                question: "Une icône peut être déplacée comme :",
                options: ["Un objet sur une table", "Une voiture", "Une porte", "Un animal"],
                correct: 0,
                explanation: "Les icônes sur le bureau sont comme des objets sur une table : vous pouvez les déplacer."
            },
            {
                question: "Un programme est :",
                options: ["Une salle spécialisée", "Une image", "Un bouton", "Une prise USB"],
                correct: 0,
                explanation: "Un programme est comme une salle spécialisée : Word pour écrire, Excel pour les calculs, etc."
            },
            {
                question: "Pour ouvrir un programme, on fait :",
                options: ["Un clic simple", "Un clic droit", "Un double clic", "Un clic molette"],
                correct: 2,
                explanation: "Double-cliquer sur l'icône d'un programme l'ouvre."
            },
            {
                question: "Pour fermer un programme, il faut cliquer sur :",
                options: ["Le bouton Réduire", "Le bouton Maximiser", "La croix en haut à droite", "Le bouton Démarrer"],
                correct: 2,
                explanation: "La croix en haut à droite ferme le programme."
            },
            {
                question: "Quel symbole indique qu'un site est sécurisé ?",
                options: ["Une étoile", "Un cadenas", "Un drapeau", "Un cercle"],
                correct: 1,
                explanation: "Le cadenas dans la barre d'adresse indique que la connexion est sécurisée (HTTPS)."
            },
            {
                question: "Pour rester en sécurité sur Internet, il faut :",
                options: ["Cliquer sur tous les liens", "Donner son mot de passe", "Ne jamais vérifier les adresses", "Se méfier des liens suspects"],
                correct: 3,
                explanation: "Il faut toujours être vigilant : ne pas partager ses données, se méfier des liens suspects."
            },
            { question: "Si un programme ne répond plus, il faut :", options: ["Frapper l'écran", "Éteindre immédiatement l'ordinateur", "Fermer le programme et le rouvrir", "Appeler la police"], correct: 2, explanation: "Si un programme plante, fermez-le et rouvrez-le, comme rallumer la lumière dans une salle.", section: 13 }
        ];

// ==================== FONCTIONS DU COURS AVEC TRANSITIONS ====================

function renderCourse() {
    const section = courseSections[courseIndex];
    const contentDiv = document.getElementById('course-content');

    // ... (Logique d'animation) ...
    contentDiv.style.opacity = '0';
    contentDiv.style.transform = 'translateY(20px)';

    setTimeout(() => {
        // Rendre le contenu de la section
        contentDiv.innerHTML = section.content; 
        
        // Mise à jour de l'affichage
        contentDiv.style.opacity = '1';
        contentDiv.style.transform = 'translateY(0)';

        // AJOUT : S'assurer que le titre de la formation est visible après le changement de slide.
        const courseCard = document.querySelector('#page-course .card');
        if (courseCard) {
            courseCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
   
    // Mise à jour barre de progression
    const progressPercentage = ((courseIndex + 1) / courseSections.length) * 100;
        // On cible l'ID 'course-progress' qui est maintenant le progress-fill
    const progressBarFill = document.getElementById('course-progress');
        if (progressBarFill) {
            progressBarFill.style.width = progressPercentage + '%';
        }

    // Mise à jour des dots avec tooltips
    updateCourseDots();
    
    // Mise à jour boutons
    
    document.getElementById('prev-btn').disabled = courseIndex === 0;
    const nextBtn = document.getElementById('next-btn');
    //nextBtn.textContent = courseIndex === courseSections.length - 1 ? 'Commencer le Quiz 🎯' : 'Suivant →';
    if (courseIndex === courseSections.length - 1) {
            nextBtn.textContent = 'Commencer le Quiz 🎯';
        } else {
            nextBtn.textContent = 'Suivant →';
        }

    // TTS si activé
    if (typeof speakText === 'function') {
        speakText(section.title);
    }
    
    // Sauvegarde localStorage
    localStorage.setItem('courseIndex', courseIndex);
 }, 500); 
}

function updateCourseDots() {
    const dotsContainer = document.getElementById('course-dots');
    if (!dotsContainer) return; // Sécurité si l'élément n'est pas trouvé
    
    // Vider les dots existants
    dotsContainer.innerHTML = ''; 

    courseSections.forEach((section, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        
        // Ajout du tooltip pour l'accessibilité
        dot.setAttribute('data-tooltip', `${index + 1}. ${section.title}`);
        
        // Clic sur le dot pour naviguer
        dot.onclick = () => { 
            courseIndex = index;
            renderCourse(); 
        };

        // Rendre le dot actif si c'est la slide actuelle
        if (index === courseIndex) {
            dot.classList.add('active');
        }
        
        dotsContainer.appendChild(dot);
    });
}

function nextCourse() {
    // Vérifie si nous ne sommes PAS sur la dernière slide
    if (courseIndex < courseSections.length - 1) {
        courseIndex++; // Incrémente l'index
        renderCourse(); // Charge la slide suivante
    } else {
        // Optionnel : Lance le quiz si c'est la dernière slide
        startQuiz(); 
    }
}

function prevCourse() {
    // Vérifie si nous ne sommes PAS sur la première slide
    if (courseIndex > 0) {
        courseIndex--; // Décrémente l'index
        renderCourse(); // Charge la slide précédente
    }
}

// ==================== SUPPORT CLAVIER (FLÈCHES) ====================
document.addEventListener('keydown', (e) => {
    const coursePage = document.getElementById('page-course');
    if (!coursePage || !coursePage.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        courseNext();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        coursePrev();
    }
});

// ==================== SUPPORT SWIPE MOBILE ====================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    const coursePage = document.getElementById('page-course');
    if (!coursePage || !coursePage.classList.contains('active')) return;
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    const coursePage = document.getElementById('page-course');
    if (!coursePage || !coursePage.classList.contains('active')) return;
    
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            courseNext(); // Swipe gauche = suivant
        } else {
            coursePrev(); // Swipe droite = précédent
        }
    }
});



// ==================== FONCTIONS DU COURS ====================
/**
* Affiche la slide actuelle avec animation et met à jour
* les indicateurs : progression, boutons, navigation, TTS, localStorage.
*/
// ==================== FONCTIONS DU QUIZ ====================
function startQuiz() {
    quizState = { currentQuestion: 0, score: 0, answers: [] };
    showPage('quiz');
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[quizState.currentQuestion];
    document.getElementById('quiz-question-number').textContent = 
        `Question ${quizState.currentQuestion + 1} / ${quizQuestions.length}`;
    document.getElementById('quiz-score').textContent = `Score: ${quizState.score}`;
    
    const progress = ((quizState.currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('quiz-progress').style.width = progress + '%';
    document.getElementById('quiz-question').textContent = question.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });

    document.getElementById('quiz-explanation').classList.remove('show');
}

/**
* Vérifie la réponse choisie, colore les options, met à jour le score
* puis passe automatiquement à la question suivante.
*/
function selectAnswer(selectedIndex) {
    const question = quizQuestions[quizState.currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const explanation = document.getElementById('quiz-explanation');
    
    options.forEach(opt => {
        opt.classList.add('disabled');
        opt.onclick = null;
    });

    options.forEach((opt, i) => {
        if (i === question.correct) opt.classList.add('correct');
        else if (i === selectedIndex) opt.classList.add('wrong');
    });

    if (selectedIndex === question.correct) {
        quizState.score++;
        document.getElementById('quiz-score').textContent = `Score: ${quizState.score}`;
    }

    // Affichage de l'explication
    explanation.innerHTML = `
        <strong style="color: ${selectedIndex === question.correct ? 'var(--success)' : 'var(--danger)'};">
            ${selectedIndex === question.correct ? '✅ Correct !' : '❌ Incorrect'}
        </strong>
        <p style="margin-top: 15px;">${question.explanation}</p>
    `;
    explanation.classList.add('show');

    
    //  Passage automatique à la question suivante après un délai
    setTimeout(() => {
        if (quizState.currentQuestion < quizQuestions.length - 1) {
            quizState.currentQuestion++;
            loadQuestion();
        } else {
            showResults();
        }
    }, 4000);
}

/** Affiche le score final et le message associé. */
function showResults() {
    const percentage = Math.round((quizState.score / quizQuestions.length) * 100);
    document.getElementById('results-score').textContent = `${quizState.score} / ${quizQuestions.length}`;
    document.getElementById('results-progress').style.width = percentage + '%';


    const resultsIcon = document.getElementById('results-icon');
    const resultsTitle = document.getElementById('results-title');
    const resultsMessage = document.getElementById('results-message');


if (percentage >= 80) {
    resultsIcon.textContent = '🎉';
    resultsTitle.textContent = 'Excellent travail !';
    resultsMessage.textContent = "Vous avez une très bonne compréhension des notions présentées.";
    } else if (percentage >= 50) {
        resultsIcon.textContent = '👍';
        resultsTitle.textContent = 'Bon résultat !';
        resultsMessage.textContent = "Encore un petit effort pour maîtriser totalement ces notions.";
} else {
    resultsIcon.textContent = '📘';
    resultsTitle.textContent = 'Continuez à vous exercer';
    resultsMessage.textContent = "N'hésitez pas à refaire la formation pour progresser à votre rythme.";
    }
    }