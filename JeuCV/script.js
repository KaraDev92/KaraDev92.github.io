"use strict";
$(document).ready(function () {

            /** Changement temporaire de la couleur de la bordure de l'avatar
             * @function couleurBordure
             * @param {HTMLElement} avatar - id de la balise de l'avatar
             * @param {number} message - type de message à afficher
            */
    function couleurBordure(message) {
        const avatar = document.getElementById('avatar');
        if (message === 1) {
            avatar.classList.add('avatarBingo');
        } else {
            avatar.classList.add('avatarBoum');
        }
        setTimeout(() => {
            avatar.classList.remove('avatarBoum');
            avatar.classList.remove('avatarBingo');
        }, 1500);
    };
        
        /** Gestion des conséquences des collisions
            * Quand la partie est gagnée
             * @function gagner
             * @param {boolean} droitDeJouer - empêche ou pas le jeu de se poursuivre
             * @param {number} setIntervalID - identifiant du setInterval du déplacement des hamsters
             * @param {number} level   - niveau de la partie 
             * @param {number} nivMax  - nombres de propriétés de l'objet niveaux
             * @param {object} niveaux - détails de chaque niveau
            */    
    function gagner() {
        $('#gagne').addClass('message--visible');
        level++;
        droitDeJouer = false;
        setTimeout(() => {
            levelUp.play()
            $('#gagne').addClass('message--visible');
        }, 1000);
        clearInterval(setIntervalID);
        const nivMax = parseInt(Object.keys(niveaux).at(-1));
        if (level > nivMax) {
            setTimeout(open, 2000,'ressources/CV anonymisé.pdf', 'CV', 'resizable=yes, menu=yes, directories=yes, location=yes, status=yes, toolbar=yes, popup=false');
        } else {
        setTimeout(jouer, 2000, level);
        }
    };

            /** Quand la partie est perdue
             * @function perdre
             * @param {boolean} droitDeJouer - empêche ou pas le jeu de se poursuivre
             * @param {number} setIntervalID - identifiant du setInterval du déplacement des hamsters
            */
    function perdre() {
        setTimeout(() => {
            gameOver.play();
            $('#perdu').addClass('message--visible');
        }, 1000);      
        clearInterval(setIntervalID);
        droitDeJouer = false;
    };

            /** En cas de récupération "trésor"
             * @function bingo
             * @param {number} score   - score du ramassage de morceaux de CV
             * @param {Array<Array<number>>} carte - tableau de la partie en cours
             * @param {Array} carteAuTresor - coordonnées du "trésor" dans le tableau de la partie      
            */
    function bingo() {
        couleurBordure(1);
        score++;
        afficherScore('var(--txt-voyant)');
        trouve.play();
        carte[carteAuTresor[0]][carteAuTresor[1]] = 4;
        if (score === 15) {
            gagner();
        } else {
            placerTresor();
        }
    };

            /** En cas de mauvaise rencontre
             * @function boum
             * @param {number} vies    - nombre de vies restantes      
            */
    function boum() {
        couleurBordure(0);
        vies--;
        blesse.play();
        afficherVies('red');
        if (vies === 0) {
            perdre();
        }
    };

        /**Gestion déplacement avatar
            *Déplacement et mise à jour du GPS de l'avatar et de la carte des éléments de la grille
             * @function deplacerAvatar
             * @param {number} avatarX - coordonnée horizontale Grids de l'avatar
             * @param {number} avatarY - coordonnée verticale Grids de l'avatar
             * @param {Array} gpsGridsAvatar - coordonnées Grids de l'avatar
             * @param {Array<Array<number>>} carte - tableau de la partie en cours
            */
    function deplacerAvatar (avatarY, avatarX) {
        carte[gpsGridsAvatar[0]-1][gpsGridsAvatar[1]-1] = 0;
        gpsGridsAvatar = [avatarY, avatarX];
        $('.onBouge').css('grid-column', avatarX);
        $('.onBouge').css('grid-row', avatarY);
    };
            /**Vérification collisions 
             * @function checkObstacles
             * @param {number} col - coordonnée horizontale Grids désirée de l'avatar
             * @param {number} lign - coordonnée verticale Grids désirée de l'avatar
             * @param {Array<Array<number>>} rencontre - coordonnées désirées de l'avatar dans le tableau de la partie
             * @param {Array} gpsGridsAvatar - coordonnées Grids de l'avatar
             * @param {Array<Array<number>>} carte - tableau de la partie en cours
            */
    function checkObstacles(col, lign) {
        let rencontre = carte[lign-1][col-1];
        switch (rencontre) {
            case 0:
                deplacerAvatar(lign, col);
                carte[gpsGridsAvatar[0]-1][gpsGridsAvatar[1]-1] = 4;
                break
            case 2:
                bingo(col, lign);
                deplacerAvatar(lign, col);
                break
            case 3:
                boum(col, lign);
                break
        }
    };

            /**Vérification que les futures coordonnées de l'avatar ne sortent pas de la grille
             * @function checkFrontiere
             * @param {string} axe - axe de déplacement voulu
             * @param {number} sens - nombre de case de déplacement voulu
             * @param {Array} gpsGridsAvatar - coordonnées Grids de l'avatar
             * @param {number} nouveauX - coordonnée horizontale Grids désirée de l'avatar
             * @param {number} nouveauY - coordonnée verticale Grids désirée de l'avatar
             * @param {number} actuelY - coordonnée actuelle verticale Grids de l'avatar
             * @param {number} actuelX - coordonnée actuelle horizontale Grids de l'avatar
            */
    function checkFrontiere (axe, sens) {
        let nouveauX, nouveauY, actuelX, actuelY;
        if (axe === 'lesX'){
            nouveauX = gpsGridsAvatar[1] + sens;
            actuelY = gpsGridsAvatar[0];
            if (nouveauX < 21 && nouveauX > 0) {
                checkObstacles(nouveauX, actuelY);
            }
        } else {
            nouveauY = gpsGridsAvatar[0] + sens;
            actuelX = gpsGridsAvatar[1];
            if (nouveauY < 13 && nouveauY > 0) {
                checkObstacles(actuelX, nouveauY);
            }
        }
    };
       
            /**Écoute des touches flèches du clavier
             * @listens keydown
             * @fires checkFrontiere
             * @param {boolean} droitDeJouer - empêche ou pas le jeu de se poursuivre
            */
    $(window).on('keydown',function(event) {
        if(droitDeJouer) {
            switch (event.which) {
                case 39: //droite
                    checkFrontiere('lesX', 1);
                    break			
                case 37: //gauche
                    checkFrontiere('lesX', -1);
                    break
                case 38: //haut
                    //prévention du scrolling quand on utilise cette flèche
                    event.preventDefault();
                    checkFrontiere('lesY', -1);
                    break
                case 40: //bas
                    //prévention du scrolling quand on utilise cette flèche
                    event.preventDefault();
                    checkFrontiere('lesY', 1);
                    break
            }
        }  
    }); 
   
    /** Fonction principale lançant le jeu 
     * @param {boolean} droitDeJouer - empêche ou pas le jeu de se poursuivre
     * @param {number} niv - niveau de difficulté du jeu
     * @param {Array} gpsGridsAvatar - coordonnées Grids de l'avatar
     * @param {Array<Array<number>>} carte - tableau de la partie en cours
     * @param {number} level   - niveau de la partie 
     * */      
    function jouer(niv) {
        level = niv;
        carte = structuredClone(niveaux[niv].grille);
        gpsGridsAvatar = niveaux[niv]["positionGridsInitAvatar"];
        droitDeJouer = true;
        reinitialiser();
        planter();
    };

    /**Écoute du bouton "jouer" du menu
    * @listens click
    * @fires jouer 
    */   
    $('nav li:first-child').on('click', function() {
        jouer(1);
    });

    jouer(1);

});
