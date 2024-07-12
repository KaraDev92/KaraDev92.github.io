/*Paramètres du jeu par niveaux et fichiers sons*/
/**
 * niveaux
 * @namespace
 * @property {objet} 1   -  représente le niveau 1 du jeu.
 * @property {Array<Array<number>>}  grille -  représente la grille du jeu du niveau. Les 0 sont les espaces vides et les 1 sont les arbres.
 * @property {number} hamsters - représente le nombre de hamster du niveau.
 * @property {number} temps - représente le nombre de millisecondes où les hamsters restent au même endroit
 * @property {Array} positonGridsInitAvatar représente les coordonnées Grids de l'avatar au début de la partie.
 * 
*/

const niveaux = Object.freeze({
    1: {
        grille : [
            [0,1,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0],
            [0,0,0,0,0,1,1,0,1,0,1,0,1,1,1,1,0,0,1,0],
            [1,1,1,1,0,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
            [0,1,0,1,0,0,1,0,1,0,0,1,1,1,1,0,1,0,0,1],
            [0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1],
            [0,1,0,0,1,1,0,0,1,1,1,1,0,0,1,0,1,1,1,0],
            [0,0,0,0,1,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0],
            [1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,1,0,1,0],
            [0,0,0,0,0,1,0,0,1,0,0,1,1,1,1,1,1,0,1,1],
            [0,1,1,1,0,1,1,0,1,0,1,1,0,0,1,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1,0]
        ],
        hamsters : 2,
        temps : 5000,
        positionGridsInitAvatar : [5,10]
    },
    2: {
        grille : [
            [0,1,1,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0],
            [0,0,0,0,0,1,1,1,1,0,1,0,0,0,0,1,0,0,0,1],
            [0,1,1,1,0,1,0,0,0,0,0,0,1,1,0,0,0,1,1,1],
            [1,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0],
            [1,0,0,1,1,0,0,1,0,0,0,1,1,0,0,1,0,1,0,1],
            [1,0,0,0,1,0,1,0,0,1,0,0,1,1,0,0,0,0,0,0],
            [0,1,1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,1,1,0],
            [0,0,1,1,1,0,0,0,1,0,0,1,1,0,1,0,0,1,0,0],
            [1,0,0,1,1,0,1,0,0,1,0,0,1,1,0,0,0,1,0,1],
            [0,1,0,0,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,1],
            [0,0,1,0,1,1,0,0,0,0,0,1,0,0,1,1,0,1,1,1],
            [1,0,0,0,1,1,1,1,0,1,0,0,1,0,1,1,0,0,0,0]
        ],
        hamsters : 3,
        temps : 4000,
        positionGridsInitAvatar : [5,10]
    },
    3: {
        grille : [
            [1,0,0,0,0,1,1,0,0,0,1,1,0,0,1,0,0,0,0,1],
            [1,0,1,1,1,0,0,0,0,1,0,0,0,0,1,1,0,1,0,0],
            [0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,1,1,0],
            [0,1,0,1,0,1,0,1,0,0,0,1,0,0,1,1,0,0,1,0],
            [0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,1,0],
            [0,1,0,0,1,1,1,1,1,0,0,0,1,1,1,0,0,1,0,0],
            [0,0,0,0,0,1,1,1,0,0,1,0,0,1,0,0,1,1,0,1],
            [1,0,1,1,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0],
            [1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,1,0,1,0,1],
            [1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
            [1,1,1,0,0,0,0,1,1,0,0,0,1,0,1,1,0,0,0,0],
            [0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,0,1,1,1]
        ],
        hamsters : 4,
        temps : 3000,
        positionGridsInitAvatar : [5,10]
    }
});

/**fichiers audio chacun dans un objet Audio */
const blesse = new Audio('./sons/blesse.mp3');
const trouve = new Audio('./sons/trouve.mp3');
const levelUp = new Audio('./sons/level-up.mp3');
const gameOver = new Audio('./sons/game-over.mp3');
const vortex = new Audio('./sons/vortex.mp3');