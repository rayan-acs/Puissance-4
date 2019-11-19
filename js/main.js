// definition de la grille en js

var grille = new Array(6);

for (var i = 0; i < 6; i++) {
    grille[i] = new Array(7);
}
// rempli le tableau de "vide"
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
        // grille[i][j] = "vide";
        grille[i][j] = 0;
    }
}
console.log(grille)
var joueurActif;

var clickedCellCoordX;
var game = document.querySelector('.grille-jeux');
var resultat = document.querySelector('.resultat');
var btn = document.querySelector('.btn-go');

btn.addEventListener('click', function(){
    reset();
})


game.addEventListener('click', function (event) {
    console.log(grille)
    //console.table(grille)    


   
    clickedCellElmt = document.getElementById(event.target.id);
    clickedCellName = event.target.id;
    console.log(clickedCellName);
    clickedCellCoordY = parseInt(clickedCellName[2]); // 2nd param id
    lignX = parseInt(clickedCellName[1]);
    


    pion();
    color();
    changementJoueur();
    afficherJoueurActif();
   // ia();
    victoireDiag1();
    victoireDiag2();
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

    if (grille[5][clickedCellCoordY] == 0) {
        clickedCellCoordX = 5;

    } else if (grille[4][clickedCellCoordY] == 0) {
        clickedCellCoordX = 4;
    } else if (grille[3][clickedCellCoordY] == 0) {
        clickedCellCoordX = 3;
    } else if (grille[2][clickedCellCoordY] == 0) {
        clickedCellCoordX = 2;
    } else if (grille[1][clickedCellCoordY] == 0) {
        clickedCellCoordX = 1;
    } else if (grille[0][clickedCellCoordY] == 0) {
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
      //exit
       // ia();
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

    while (n < 4) {

        if ((grille[ligne][n] == couleur) && (grille[ligne][n + 1] == couleur) && (grille[ligne][n + 2] == couleur) && (grille[ligne][n + 3] == couleur)) {
            console.log("4 pions alignés calcul avec boucle");
            alert("le joueur" + couleur);
            gagner(couleur)
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
            gagner(couleur)
            break;
        }
        n++;
   }


}



function victoireDiag1() {

    var ligne = clickedCellCoordX;
    var colonne = clickedCellCoordY;
    if (joueurActif == 1) {
        couleur = 'rouge'
    } else if (joueurActif == 2) {
        couleur = 'jaune'
    }

    var nbr = 0;
    var i = 0;
    var y = 0;
    // sens down droite vers gauche
    while (grille[ligne--][colonne++] == couleur &&  ligne >=0 && colonne <=6 ) {
       
        nbr++; //cellule  superiieur
        
        console.log('up ' + nbr);
 
    }


    var ligne2 = clickedCellCoordX;
    var colonne2 = clickedCellCoordY;
    var nbr2 = 0;
    //  console.log("la ligne dans diag vaut" + ligne);

      
    while (grille[ligne2++][colonne2--] == couleur && ligne2 < 6 && colonne2 > -1) {

        console.log("la lingne dans diag vaut" + ligne2);
        nbr2++; //cellule  superiieur
        console.log('up-d ' + nbr2);
           
        }
    
    console.log("dans diag1 nbr= "+nbr +"et nbr2 = "+ nbr2)
    if (nbr == 3|| nbr2 == 3 ) {
        alert("winner function diagonal1")
        gagner(couleur)
    } else if (nbr + nbr2 ==5){alert("winner diago1 milieu")
        gagner(couleur)}


}




function victoireDiag2() {
    var ligne = clickedCellCoordX;
    var colonne = clickedCellCoordY;
    if (joueurActif == 1) {
        couleur = 'rouge';
    } else if (joueurActif == 2) {
        couleur = 'jaune';
    }

    var nbr3 = 0;

    var i = 0;
    var y = 0;
    // sens gauche droite up
    while (grille[ligne++][colonne++] == couleur && ligne < 6 && colonne < 7) {


        nbr3++; //cellule  superiieur
        console.log('up f2 ' + nbr3);

    }

        var ligne2 = clickedCellCoordX;
        var colonne2 = clickedCellCoordY;
        var nbr4 = 0;

        while (grille[ligne2--][colonne2--] == couleur && ligne2 > -1 && colonne2 > -1) {

            console.log("la ligne dans diag vaut" + ligne2);
            nbr4++; //cellule  superiieur
            console.log('up-d f2 ' + nbr4);

       }
        console.log("dans diag2 nbr3= "+nbr3 +"et nbr4 = "+ nbr4)
        if (nbr3 == 3 || nbr4 == 3 ) {
            alert("winner fn diag2");
            gagner(couleur);
        }
        else if (nbr3 + nbr4 ==5){alert("winner diago2 milieu")
        gagner(couleur)}

    }


function reset(){

    console.log('nouvellePartie');
    window.location.reload();
}

function newgame()
 {




}
function gagner(item) {
   //
   game.classList.toggle("d-none")
   resultat.classList.toggle("d-none");
   resultat.innerHTML ='<h2> le joueur ' + item + 'gagne la partie </h2>';
}



function ia(){

    x = Math.floor(Math.random() * (6 - 0)) + 1;
    alert(x)
    if (grille[0][x] == 0){
        //cc= '#c' + 4 + clickedCellCoordY;
        if (grille[5][x] == 0) {
            grille[5][x] = 'rouge'
            cc= '#c' + '5'+ x;

            document.querySelector(cc).classList.add("rouge");
        }
       else if (grille[4][x] == 0) {
            grille[4][x] = 'rouge'
            cc= '#c' + '4'+ x;

            document.querySelector(cc).classList.add("rouge");
        
        }
      else  if (grille[3][x] == 0) {
            grille[3][x] = 'rouge'
            cc= '#c' + '3'+ x;

            document.querySelector(cc).classList.add("rouge");
        }
      else  if (grille[2][x] == 0) {
        cc= '#c' + '2'+ x;

        document.querySelector(cc).classList.add("rouge");
            grille[2][x] = 'rouge'}
       else if (grille[1][x] == 0) {
        cc= '#c' + '1'+ x;

        document.querySelector(cc).classList.add("rouge");
            grille[1][x] = 'rouge'}
       else if (grille[0][x] == 0) {
        cc= '#c' + '0'+ x;

        document.querySelector(cc).classList.add("rouge");
            grille[0][x] = 'rouge'}
           
    }
    
  }
    



