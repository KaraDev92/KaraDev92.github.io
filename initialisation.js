"use strict";

    /** Animation de l'intro déclenchée au clic sur 'suite'
     * @listens click
     * @fires addClass
     * @fires fadeOut
     * */ 
    jQuery.fx.speeds['veryLong'] = 5000;
    $('.intro span').on('click', function() {
        $('#vortex').addClass('vortex--active');
        vortex.play();
        $('#voile').delay(2100).fadeOut('veryLong');
        $('#intro').delay(1600).fadeOut('veryLong');
        $('#vortex').delay(1800).fadeOut('veryLong');
    } );


    /** variables globales*/ 
    let vies, score, level, carteAuTresor, setIntervalID, gpsGridsAvatar, droitDeJouer, carte;      

    /**Jeu*/ 

        /**Gestion des affichages*/
            /** Affichage du score
             * @function afficherScore
             * @param {string} couleur - nom de la couleur à appliquer sur le texte
             * @param {number} score   - score du ramassage de morceaux de CV 
            */
    function afficherScore(couleur) {
        $('#score span').html(score);
        $('#score').css('font-weight', '700');
        $('#score').css('color', couleur);
        setTimeout(() => {
            $('#score').css('font-weight', '500');
            $('#score').css('color', 'var(--txt)');
        }, 2000);        
    };
            /** Affichage du score des vies
             * @function afficherVies
             * @param {string} couleur - nom de la couleur à appliquer sur le texte
             * @param {number} vies    - nombre de vies restantes 
            */
    function afficherVies(couleur) {
        $('#vie span').html(vies);
        $('#vie').css('font-weight', '700');
        $('#vie').css('color', couleur);
        setTimeout(() => {
            $('#vie').css('font-weight', '500');
            $('#vie').css('color', 'var(--txt)');
        }, 2000);        
    };

        /**(Ré)initialisation des hamsters et des trésors (morceaux de CV)
            *Placement du trésor/ morceau de CV
             * @function placerTresor 
             * @param {number} tresorX - coordonnée générée aléatoirement appliquée à grid-column
             * @param {number} tresorY - coordonnée générée aléatoirement appliquée à grid-row
             * @param {Array<Array<number>>} carte - tableau de la partie en cours
             * @param {Array} endroit  - valeur aux coordonnées données sur le tableau de l partie en cours
             * @param {Array} carteAuTresor - coordonnées du "trésor" dans le tableau de la partie
            */
    function placerTresor() {
        let tresorY = Math.ceil(Math.random() * 12);
        let tresorX = Math.ceil(Math.random() * 20);
        let endroit = carte[tresorY - 1][tresorX - 1];
        if (endroit === 0) {
            $('#morceauCV').css('grid-row', tresorY);
            $('#morceauCV').css('grid-column', tresorX);
            carte[tresorY - 1][tresorX - 1] = 2;
            carteAuTresor = [tresorY - 1, tresorX - 1];
        } else {
            placerTresor();
        }
    };
            /**Initialisation des hamsters et de leurs emplacements  
             * @function initialiserHamster
             * @param {number} combienDeHamsters - nombre de hamsters défini dans les propriétés du niveau
             * @param {Array<Array<number>>} cachetteHamsters - tableau des coordonnées de la partie, des hamsters
             * @param {Array<Array<number>>} planqueHamsterY - coordonnée verticale d'un hamster j
             * @param {Array<Array<number>>} planqueHamsterX - coordonnée horizontale d'un hamster j
             * @param {Array<Array<number>>} carte - tableau de la partie en cours
             * @param {number} level   - niveau de la partie
            */
    function initialiserHamster() {
        let combienDeHamsters = niveaux[level]["hamsters"];
        let cachetteHamsters = new Array();
        cachetteHamsters [0] = new Array();

                /**Génération de coordonnés aléatoires pour les hamsters
                 * @function hamsteriser
                 * @param {number} hamsterX - coordonnée horizontale Grids d'un hamster
                 * @param {number} hamsterY - coordonnée verticale Grids d'un hamster
                 * @param {number} num - numéro du hamster
                 * @param {number} setIntervalID - identifiant du setInterval du déplacement des hamsters
                 */
        function hamsteriser (num) {
            let hamsterY = Math.ceil(Math.random() * 12);
            let hamsterX = Math.ceil(Math.random() * 20);
            if (carte[hamsterY - 1][hamsterX - 1] === 0) {
                $(`.hamster${num}`).css('grid-row', hamsterY);
                $(`.hamster${num}`).css('grid-column', hamsterX);
                carte[hamsterY - 1][hamsterX - 1] = 3;
                cachetteHamsters[num] = [hamsterY-1, hamsterX-1];
            } else {
                hamsteriser(num);
            }
        }
                /**Génération des hamsters div et class */
        for (let i=1; i<=combienDeHamsters;i++) {
            const div = document.createElement("div");
            div.setAttribute("title", "Hamster à éviter à tout prix !");
            div.classList.add("hamster" + i);
            document.querySelector("#jeu").append(div);
            $(`.hamster${i}`).css('background', 'url("./images/hamster_volant.png") no-repeat center');
            $(`.hamster${i}`).css('background-size','contain');
            hamsteriser(i);
        }
                /** Gestion des déplacements des hamsters*/
        setIntervalID = setInterval(() => {
            for (let j=1; j<=combienDeHamsters; j++) {
                let planqueHamsterY = cachetteHamsters[j][0];
                let planqueHamsterX = cachetteHamsters[j][1];
                carte[planqueHamsterY][planqueHamsterX] = 0;
                hamsteriser(j);
            }
        }, niveaux[level]["temps"]);
        
    };

        /** Initialisation de tout le jeu
         * @function reinitialiser
         * @param {Array} gpsGridsAvatar - coordonnées Grids de l'avatar
         * @param {Array<Array<number>>} carte - tableau de la partie en cours
         * @param {number} vies    - nombre de vies restantes
         * @param {number} score   - score du ramassage de morceaux de CV
         * @param {number} level   - niveau de la partie 
        */
    function reinitialiser() {
            /**Suppression du message et des décors*/
        $('#gagne').removeClass('message--visible');
        $('#perdu').removeClass('message--visible');
        $("div[class*='deco']").remove();
        clearInterval(setIntervalID);
        $("div[class*='hamster']").remove();
        
            /**Initialisation de la position de l'avatar */ 
        $('#avatar').addClass('onBouge');
        $('.onBouge').css('grid-column', gpsGridsAvatar[1]);
        $('.onBouge').css('grid-row', gpsGridsAvatar[0]);
        carte[gpsGridsAvatar[0]-1][gpsGridsAvatar[1]-1] = 4;

            /** Appel à l'initialisation des hamsters et du tresor*/
        placerTresor();
        initialiserHamster();

            /** Initialisation score et vies et appel à leur affichage*/
        score = 0;
        afficherScore('green');
        vies = 3;
        afficherVies('green');
        $('#niveau span').html(level);
    };

    /** Initialisation décor du labyrinthe
        *création de div et assignation d'une classe d'arbustes pour illustrer les cloisons du labyrinthe
         * @function decorer
         * @param {number} ligne : index de la ligne du tableau où doit se trouver un arbre
         * @param {number} colonne : index de la colonne du tableau où doit se trouver un arbre
         * @param {number} choixArbre : nombre entre 1 et 14 généré aléatoirement pour choisir un arbre
        */
    function decorer(ligne, colonne) {
        const div = document.createElement("div");
        let choixArbre;
        choixArbre = Math.ceil(Math.random() * 14);      
        div.classList.add("deco" + choixArbre);
        div.style.gridRow = ligne + 1;
        div.style.gridColumn =  colonne + 1;
        document.querySelector("#jeu").append(div);  
    };

        /** Récupération des coordonnées des cloisons du labyrinthe
         * @function planter
         * @param {object} cloisons : tableau contenant la disposition des murs
         * @param {number} niv : niveau de difficulté du jeu
         * @param {number} indexLigne : index de la ligne du tableau
         * @param {number} indexCol : index de la colonne du tableau
        */
    function planter() { 
        carte.forEach(function(ligne, indexLigne) {
            ligne.forEach(function(colonne, indexCol) {
                if (colonne === 1) {
                    decorer(indexLigne, indexCol);
                }
            });
        });
    };
