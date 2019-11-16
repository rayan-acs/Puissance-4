// definition de la grille en js

var grille = new Array(7);

for (var i = 0; i < 6; i++) {
    grille[i] = new Array(7);
}
// rempli le tableau de "vide"
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
        grille[i][j] = "vide";
    }
}
var joueurActif;

var clickedCellCoordX;
var game = document.querySelector('.grille-jeux');

game.addEventListener('click', function (event) {
    console.log(grille)
    // clickedCellElmt = document.querySelector(event.target.id)
    clickedCellElmt = document.getElementById(event.target.id);
    clickedCellName = event.target.id;
    console.log(clickedCellName);
    clickedCellCoordY = parseInt(clickedCellName[2]); // 2nd param id
    console.log(clickedCellCoordY);


    pion();
    color();
    changementJoueur(); 
    afficherJoueurActif();


    victoireLigne();
    victoireColonne()
})


//  fonction appliquer valeur joueur

function color() {
    var cc = '#c' + clickedCellCoordX + clickedCellCoordY;
    console.log(cc)
    if (joueurActif == 1) {
        document.querySelector(cc).classList.add("jaune");

        grille[clickedCellCoordX][clickedCellCoordY] = "jaune";
        console.log('grille[' + clickedCellCoordX + '][' + clickedCellCoordY + ']');
    } else if (joueurActif == 2) {
        document.querySelector(cc).classList.add("rouge");

        grille[clickedCellCoordX][clickedCellCoordY] = "rouge";
        console.log('grille[' + clickedCellCoordX + '][' + clickedCellCoordY + ']');
    }
}
//fonction pion 

function pion() {

    if (grille[5][clickedCellCoordY] == "vide") {
        clickedCellCoordX = 5;

    } else if (grille[4][clickedCellCoordY] == "vide") {
        clickedCellCoordX = 4;
    } else if (grille[3][clickedCellCoordY] == "vide") {
        clickedCellCoordX = 3;
    } else if (grille[2][clickedCellCoordY] == "vide") {
        clickedCellCoordX = 2;
    } else if (grille[1][clickedCellCoordY] == "vide") {
        clickedCellCoordX = 1;
    } else if (grille[0][clickedCellCoordY] == "vide") {
        clickedCellCoordX = 0;
    }

    console.log("clickedCellCoordX " + clickedCellCoordX)
    console.log("clickedCellCoordY " + clickedCellCoordY)
}

function afficherJoueurActif() {

    // if (win == false) {
    if (joueurActif == 1) {
        document.querySelector(".joueur1").style.color = "yellow";
        document.querySelector(".joueur2").style.color = "black";

    } else if (joueurActif == 2) {
        document.querySelector(".joueur1").style.color = "black";
        document.querySelector(".joueur2").style.color = "red";
    } else {
        alert('le pc va exploser');
    }
    //  }
}

// fonction pour changement de joueur 

var joueur = true;
var joueurActif = 0;


function changementJoueur() {
    if (joueur == true) {
        joueurActif = 1;
        joueur = false;
    } else {
        joueurActif = 2;
        joueur = true;
    }
}


function victoireLigne() {
    
    var ligne = clickedCellCoordX;
    var colonne = clickedCellCoordY;
    if (joueurActif == 1) {
        couleur ='rouge'}
        else if  (joueurActif ==2 ) {
            couleur ='jaune'}


    console.log("ligne : "+ ligne);
    console.log("colonne : " +colonne) 
 // console.log( "grille["+ ligne +"][colonne] && grille[ligne][" + colonne+1 +"] || grille[ligne][colonne-1]")


//alert(grille[ligne][colonne])

//si quatres pions alignés de la même couleur horizontalement
if(
    ((grille[ligne][0] == couleur  ) && (grille[ligne][1] == couleur) && (grille[ligne][2] ==couleur) && (grille[ligne][3]== couleur)) ||
    ((grille[ligne][1] == couleur ) && (grille[ligne][2]== couleur) && (grille[ligne][3]== couleur) && (grille[ligne][4] ==couleur)) ||
    ((grille[ligne][2]== couleur ) && (grille[ligne][3]== couleur) && (grille[ligne][4]== couleur) && (grille[ligne][5] == couleur)) ||
    ((grille[ligne][3] == couleur) && (grille[ligne][4] == couleur) && (grille[ligne][5]== couleur) && (grille[ligne][6]  == couleur) )
    
   ) {
    console.log("4 pions alignés");
    alert("le joueur"+ couleur + "gagne")
}

}

function victoireColonne(){
    var ligne = clickedCellCoordX;
    var colonne = clickedCellCoordY;
    if (joueurActif == 1) {
        couleur ='rouge'}
        else if  (joueurActif ==2 ) {
            couleur ='jaune'}

            if(
                ((grille[0][colonne] == couleur  ) && (grille[1][colonne] == couleur) && (grille[2][colonne] ==couleur) && (grille[3][colonne]== couleur)) ||
                ((grille[1][colonne] == couleur ) && (grille[2][colonne]== couleur) && (grille[3][colonne]== couleur) && (grille[4][colonne] ==couleur)) ||
                ((grille[2][colonne]== couleur ) && (grille[3][colonne]== couleur) && (grille[4][colonne]== couleur) && (grille[5][colonne] == couleur)) ||
                ((grille[3][colonne] == couleur) && (grille[4][colonne] == couleur) && (grille[5][colonne]== couleur) && (grille[6][colonne]  == couleur) )
                
               ) {
                console.log("4 pions alignés");
                alert("le joueur "+ couleur + "gagne vertical")
            }



}
// function gagner()
//     {
// console.log('winnnner')

// }

