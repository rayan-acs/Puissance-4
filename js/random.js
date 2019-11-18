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
console.log(grille)
var joueurActif;

var clickedCellCoordX;
//var lign;
var game = document.querySelector('.grille-jeux');

game.addEventListener('click', function (event) {
    console.log(grille)
    // clickedCellElmt = document.querySelector(event.target.id)
    clickedCellElmt = document.getElementById(event.target.id);
    clickedCellName = event.target.id;
    console.log(clickedCellName);
    clickedCellCoordY = parseInt(clickedCellName[2]); // 2nd param id
    lignX = parseInt(clickedCellName[1]);
    //  console.log("ligne ====" + lign);


    pion();
    color();
    changementJoueur();
    afficherJoueurActif();
    IA();
  //  victoireDiag1();
    victoireDiag2();
    victoireLigne();
    victoireColonne()
    //victoireDiag2('+', ' +', '-', '-');
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
       IA()
        joueur = true;
    }
}


function victoireLigne() {

    var ligne = clickedCellCoordX;
    var colonne = clickedCellCoordY;
    if (joueurActif == 1) {
        couleur = 'rouge'
    } else if (joueurActif == 2) {
        couleur = 'jaune'
    }


    console.log("ligne : " + ligne);
    console.log("colonne : " + colonne)
    // console.log( "grille["+ ligne +"][colonne] && grille[ligne][" + colonne+1 +"] || grille[ligne][colonne-1]")


    //alert(grille[ligne][colonne])

    //si quatres pions alignés de la même couleur horizontalement
    // if(
    //     ((grille[ligne][0] == couleur  ) && (grille[ligne][1] == couleur) && (grille[ligne][2] ==couleur) && (grille[ligne][3]== couleur)) ||
    //     ((grille[ligne][1] == couleur ) && (grille[ligne][2]== couleur) && (grille[ligne][3]== couleur) && (grille[ligne][4] ==couleur)) ||
    //     ((grille[ligne][2]== couleur ) && (grille[ligne][3]== couleur) && (grille[ligne][4]== couleur) && (grille[ligne][5] == couleur)) ||
    //     ((grille[ligne][3] == couleur) && (grille[ligne][4] == couleur) && (grille[ligne][5]== couleur) && (grille[ligne][6]  == couleur) )

    //    ) {
    //     console.log("4 pions alignés");
    //     alert("le joueur"+ couleur + "gagne")
    // }



    var n = 0;

    while (n < 3) {

        if ((grille[ligne][n] == couleur) && (grille[ligne][n + 1] == couleur) && (grille[ligne][n + 2] == couleur) && (grille[ligne][n + 3] == couleur)) {
            console.log("4 pions alignés calcul avec boucle");
             alert("le joueur" + couleur);

            break;
        }
        n++;
    }




}

function victoireColonne() {
    var ligne = lignX;
    var colonne = clickedCellCoordY;
    if (joueurActif == 1) {
        couleur = 'rouge'
    } else if (joueurActif == 2) {
        couleur = 'jaune'
    }



    var n = 0;
    while (n < 3) {
        if ((grille[n][colonne] == couleur) && (grille[n + 1][colonne] == couleur) && (grille[n + 2][colonne] == couleur) && (grille[n + 3][colonne] == couleur)) {


            console.log("4 pions alignés calcul avec boucle");
              alert("le joueur" + couleur);

            break;
        }
        n++;


    }




}
// function gagner()
//     {
// console.log('winnnner')

// }

function victoireDiag1() {

    clickedCellElmt = document.getElementById(event.target.id);
    clickedCellName = event.target.id;
    console.log(clickedCellName);
    colonne = parseInt(clickedCellName[2]); // 2nd param id
    lign = parseInt(clickedCellName[1]);

    if (joueurActif == 1) {
        couleur = 'rouge';
    } else if (joueurActif == 2) {
        couleur = 'jaune';
    }
    console.log(lign)

    var nbr = 0;

    var i = 0;
    var y = 0;
    // sens down droite vers gauche
    while (
        (grille[lign - i][colonne + y] == couleur) &&
        ((lign - i) <= 0 || (colonne + y) <= 6)
    ) {
        console.log('up ' + nbr);
        //  console.log('i= '+ i + 'et y= ' + y)

        nbr++; //cellule  superiieur
        console.log("nombre " + nbr)
        i++;
        y++;
    }



    var m = 0;
    var n = 0;
    var nbr2 = 0;


    while (
        (grille[lign + m][colonne - n] == couleur) &&
        ((lign + m) < 6 || (colonne - n) > 0)
    ) {


        nbr2++; //cellule  superiieur
        console.log('up-d ' + nbr2);
        n++;
        m++;


    }

    if (nbr == 4 || nbr2 == 4 || (nbr + nbr2) == 4) {
        alert("winner")
    }

}




function  victoireDiag2() {

    clickedCellElmt = document.getElementById(event.target.id);
    clickedCellName = event.target.id;
    console.log(clickedCellName);
    colonne = parseInt(clickedCellName[2]); // 2nd param id
    lign = parseInt(clickedCellName[1]);

    if (joueurActif == 1) {
        couleur = 'rouge';
    } else if (joueurActif == 2) {
        couleur = 'jaune';
    }
    console.log(lign)

    var nbr = 0;

    var i = 0;
    var y = 0;
    // sens down droite vers gauche
    while (
        (grille[lign + i][colonne + y] == couleur) &&
        ((lign - i) <= 5 || (colonne + y) <= 6)
    ) {
        console.log('up-diag2 ' + nbr);
        //  console.log('i= '+ i + 'et y= ' + y)

        nbr++; //cellule  superiieur
        console.log("nombre " + nbr)
        i++;
        y++;
    }



    var m = 0;
    var n = 0;
    var nbr2 = 0;


    while (
        (grille[lign - m][colonne - n] == couleur) &&
        ((lign + m)>=0 || (colonne - n) > 0)
    ) {


        nbr2++; //cellule  superiieur
        console.log('up-2-dia2 ' + nbr2);
        n++;
        m++;


    }

    if (nbr == 4 || nbr2 == 4 || (nbr + nbr2) == 4) {
        alert("winner")
    }



}



// function victoireDiag2(up1, up2, down1, down2) {
//     var lign = lignX;
//     var colonne = clickedCellCoordY;
//     if (joueurActif == 1) {
//         couleur = 'rouge';
//     } else if (joueurActif == 2) {
//         couleur = 'jaune';
//     }


//     var nbr = 0;

//     var i = 0;
//     var y = 0;

//     while (
//         (grille[lign + up1 + i][colonne + up2 + y] == couleur) &&
//         ((lign + up1 + i) <= 5 || (colonne + up2 + y) >= 0)
//     ) {
//         console.log('up ' + nbr);
//         nbr++; //cellule  superiieur
//         i++;
//         y++;
//     }



//     var i = 0;
//     var y = 0;
//     var nbr2 = 0;


//     while ((grille[lign + down1 + i][colonne + down2 + y] == couleur) && ((lign + down1 + i) >= 0 || (colonne + down2 + y) >= 6)) {


//         nbr2++; //cellule  superiieur
//         console.log('up-down ' + nbr2);
//         i++;
//         y++;

//     }
//     if (nbr === 3 || nbr2 === 4 || (nbr + nbr2) === 4) {
//         alert("winner")
//     }

// }
function IA() {
// click : automatic();
var position = Math.floor(Math.random() * (6 - 0)) + 1;
console.log(position);

// placer un jeton alternativement dans une colonne

 if ((grille[0][position])=="vide"){
     console.log('place le jeton');

  if (grille[0][position] == "vide") {
      grille[0][position] == 'rouge'
    //   joueurActif = 2
    //   color();
    
// changementJoueur();

} else if (grille[1][position] == "vide") {
  
} else if (grille[2][position] == "vide") {
   
} else if (grille[3][position] == "vide") {
    
} else if (grille[4][position] == "vide") {
   
} else if (grille[5][position] == "vide") {
   

 
}

}

}