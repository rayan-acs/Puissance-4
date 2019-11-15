// class Puissance4 {
//     /*
//       Intialise un plateau de jeu de dimensions `rows` × `cols` (par défaut 6×7),
//       et fait l'affichage dans l'élément `element_id` du DOM.
//      */
//     constructor(element_id, rows=6, cols=7) {
//       // Nombre de lignes et de colonnes
//       this.rows = rows;
//       this.cols = cols;
//         // cet tableau à deux dimensions contient l'état du jeu:
//       //   0: case vide
//       //   1: pion du joueur 1
//       //   2: pion du joueur 2
//       this.board = Array(this.rows);
//       for (let i = 0; i < this.rows; i++) {
//         this.board[i] = Array(this.cols).fill(0);
//       }
//       // un entier: 1 ou 2 (le numéro du prochain joueur)
//       this.turn = 1;
//       // Nombre de coups joués
//       this.moves = 0;
//       /* un entier indiquant le gagnant:
//           null: la partie continue
//              0: la partie est nulle
//              1: joueur 1 a gagné
//              2: joueur 2 a gagné
//       */
//       this.winner = null;
  
//       // L'élément du DOM où se fait l'affichage
//       this.element = document.querySelector(element_id);
//       // On ajoute le gestionnaire d'événements pour gérer le click
//       //
//       // Pour des raisons techniques, il est nécessaire de passer comme gestionnaire
//       // une fonction anonyme faisant appel à `this.handle_click`. Passer directement
//       // `this.handle_click` comme gestionnaire, sans wrapping, rendrait le mot clef
//       // `this` inutilisable dans le gestionnaire. Voir le "binding de this".
//       this.element.addEventListener('click', (event) => this.handle_click(event));
//       // On fait l'affichage
//       this.render();
//     }
    
//     /* Affiche le plateau de jeu dans le DOM */
//     render() {
//       let table = document.createElement('table');
//       //ATTENTION, la page html est écrite de haut en bas. Les indices 
//       //pour le jeu vont de bas en haut (compteur i de la boucle)
//       for (let i = this.rows - 1; i >= 0; i--) {
//         let tr = table.appendChild(document.createElement('tr'));
//         for (let j = 0; j < this.cols; j++) {
//           let td = tr.appendChild(document.createElement('td'));
//           let colour = this.board[i][j];
//           if (colour)
//             td.className = 'player' + colour;
//           td.dataset.column = j;
//         }
//       }
//       this.element.innerHTML = '';
//       this.element.appendChild(table);
//     }
    
//       set(row, column, player) {
//       // On colore la case
//         this.board[row][column] = player;
//       // On compte le coup
//       this.moves++;
//       }
  
//     /* Cette fonction ajoute un pion dans une colonne */
//       play(column) {
//       // Trouver la première case libre dans la colonne
//       let row;
//       for (let i = 0; i < this.rows; i++) {
//         if (this.board[i][column] == 0) {
//           row = i;
//           break;
//         }
//       }
//       if (row === undefined) {
//         return null;
//       } else {
//         // Effectuer le coup
//         this.set(row, column, this.turn);
//         // Renvoyer la ligne où on a joué
//         return row;
//       }
//       }
    
//     handle_click(event) {
//       // Vérifier si la partie est encore en cours
//       if (this.winner !== null) {
//             if (window.confirm("Game over!\n\nDo you want to restart?")) {
//                 this.reset();
//           this.render();
//               }
//               return;
//       }
  
//         let column = event.target.dataset.column;
//         if (column !== undefined) {
//         //attention, les variables dans les datasets sont TOUJOURS 
//         //des chaînes de caractères. Si on veut être sûr de ne pas faire de bêtise,
//         //il vaut mieux la convertir en entier avec parseInt
//         column = parseInt(column);
//            let row = this.play(parseInt(column));
        
//         if (row === null) {
//           window.alert("Column is full!");
//         } else {
//           // Vérifier s'il y a un gagnant, ou si la partie est finie
//           if (this.win(row, column, this.turn)) {
//             this.winner = this.turn;
//           } else if (this.moves >= this.rows * this.columns) {
//             this.winner = 0;
//           }
//           // Passer le tour : 3 - 2 = 1, 3 - 1 = 2
//           this.turn = 3 - this.turn;
  
//           // Mettre à jour l'affichage
//           this.render()
          
//           //Au cours de l'affichage, pensez eventuellement, à afficher un 
//           //message si la partie est finie...
//           switch (this.winner) {
//             case 0: 
//               window.alert("Null game!!"); 
//               break;
//             case 1:
//               window.alert("Player 1 wins"); 
//               break;
//             case 2:
//               window.alert("Player 2 wins"); 
//               break;
//           }
//         }
//       }
//     }
  
//     /* 
//      Cette fonction vérifie si le coup dans la case `row`, `column` par
//      le joueur `player` est un coup gagnant.
     
//      Renvoie :
//        true  : si la partie est gagnée par le joueur `player`
//        false : si la partie continue
//    */
//       win(row, column, player) {
//           // Horizontal
//       let count = 0;
//       for (let j = 0; j < this.cols; j++) {
//         count = (this.board[row][j] == player) ? count+1 : 0;
//         if (count >= 4) return true;
//       }
//           // Vertical
//       count = 0;
//       for (let i = 0; i < this.rows; i++) {
//         count = (this.board[i][column] == player) ? count+1 : 0;
//           if (count >= 4) return true;
//       }
//           // Diagonal
//       count = 0;
//       let shift = row - column;
//       for (let i = Math.max(shift, 0); i < Math.min(this.rows, this.cols + shift); i++) {
//         count = (this.board[i][i - shift] == player) ? count+1 : 0;
//           if (count >= 4) return true;
//       }
//           // Anti-diagonal
//       count = 0;
//       shift = row + column;
//       for (let i = Math.max(shift - this.cols + 1, 0); i < Math.min(this.rows, shift + 1); i++) {
//         console.log(i,shift-i,shift)
//         count = (this.board[i][shift - i] == player) ? count+1 : 0;
//         if (count >= 4) return true;
//       }
      
//       return false;
//       }
  
//     // Cette fonction vide le plateau et remet à zéro l'état
//     reset() {
//       for (let i = 0; i < this.rows; i++) {
//         for (let j = 0; j < this.cols; j++) {
//           this.board[i][j] = 0;
//         }
//       }
//           this.move = 0;
//       this.winner = null;
//       }
//   }
  
//   // On initialise le plateau et on visualise dans le DOM
//   // (dans la balise d'identifiant `game`).
//   let p4 = new Puissance4('#game');

var grille = new Array();
		var partiefinie = false;
		var nbCoups = 0;
		
		for (i=0; i < 7; i++)
		{
			grille[i] = new Array();
		}
		
		for (i=0; i < 7; i++)
		{
			for (j=0; j < 6; j++)
			{
				grille[i][j] = 0;
			}
		}
		
		function rejouer()
		{
			for (i=1; i <= 7; i++)
			{
				for (j=1; j <= 6; j++)
				{
					grille[i-1][j-1] = 0;
					document.getElementById(i + "" + j + "").innerHTML = "";
				}
			}
			partiefinie = false;
			nbCoups = 0;
			document.getElementById("rejouer").innerHTML = "";
			document.getElementById("message").innerHTML = "";
		}
		
		function select(col)
		{
			if (!partiefinie)
			{
				for (i=1; i <= 6; i++)
				{
					document.getElementById(col + "" + i + "").style.opacity = '0.8';
				}
			}
		}
		
		function unselect(col)
		{
			if (!partiefinie)
			{
				for (i=1; i <= 6; i++)
				{
					document.getElementById(col + "" + i + "").style.opacity = '1';
				}
			}
		}
		
		function unselectall()
		{
			if (!partiefinie)
			{
				for (j = 1; j <= 7; j++)
				{
					for (i=1; i <= 6; i++)
					{
						document.getElementById(j + "" + i + "").style.opacity = '1';
					}
				}
				
			}
		}
		
		function gagner(joueurourobot, col, ligne)
		{
			var sommeG, sommeD;
			
			if (joueurourobot == "joueur")
			{
				id = 1;
			}
			else
			{
				id = 2;
			}
			
			//Ligne
			sommeG = 0;
			sommeD = 0;
			
			for (i=col-1; i>=0 && grille[i][ligne] == id; i--)
			{
				sommeG++;
			}
			for (i=col+1; i<7 && grille[i][ligne] == id; i++)
			{
				sommeD++;
			}
			
			if (sommeG+sommeD+1 >= 4)
			{
				unselectall();
				partiefinie = true;
				if (id == 1)
				{
					document.getElementById("message").innerHTML = "Vous avez gagné !";
				}
				else
				{
					document.getElementById("message").innerHTML = "Vous avez perdu !";
				}
			}
			
			//Colonne
			if (!partiefinie)
			{
				sommeB = 0;
				
				for (i=ligne; i < 6 && grille[col][i] == id; i++)
				{
					sommeB++;
				}
				
				if (sommeB == 4)
				{
					unselectall();
					partiefinie = true;
					if (id == 1)
					{
						document.getElementById("message").innerHTML = "Vous avez gagné !";
					}
					else
					{
						document.getElementById("message").innerHTML = "Vous avez perdu !";
					}
					
				}
				
				//Diagonale haut gauche, droite bas
				if (!partiefinie)
				{
					sommeG = 0;
					sommeD = 0;
					
					i = col-1;
					j = ligne-1;
					
					while (i >= 0 && j >= 0 && grille[i][j] == id)
					{
						sommeG++;
						i--;
						j--;
					}
					
					i = col+1;
					j = ligne+1;
					
					while (i < 7 && j < 6 && grille[i][j] == id)
					{
						sommeD++;
						i++;
						j++;
					}
					
					if (sommeD + sommeG + 1 >= 4)
					{
						unselectall();
						partiefinie = true;
						if (id == 1)
						{
							document.getElementById("message").innerHTML = "Vous avez gagné !";
						}
						else
						{
							document.getElementById("message").innerHTML = "Vous avez perdu !";
						}
					}
					
					if (!partiefinie)
					{
						sommeG = 0;
						sommeD = 0;
						
						i = col-1;
						j = ligne+1;
						
						while (i >= 0 && j < 6 && grille[i][j] == id)
						{
							sommeG++;
							i--;
							j++;
						}
						
						i = col+1;
						j = ligne-1;
						
						while (i < 7 && j >= 0 && grille[i][j] == id)
						{
							sommeD++;
							i++;
							j--;
						}
						
						if (sommeD + sommeG + 1 >= 4)
						{
							unselectall();
							partiefinie = true;
							if (id == 1)
							{
								document.getElementById("message").innerHTML = "Vous avez gagné !";
							}
							else
							{
								document.getElementById("message").innerHTML = "Vous avez perdu !";
							}
						}
					}
				}
			}
		}
		
		function possibiliteDeGagnerOuBloquer()
		{
			res = false;
			
			for (c=0; c < 7 && !res; c++)//On cherche si on peut gagner
			{
				for (l=0; l < 6 && !res; l++)
				{
					if ((l == 5 && grille[c][l] == 0) || (l < 5 && grille[c][l] == 0 && grille[c][l+1] != 0))
					{
						//Ligne
						sommeG = 0;
						sommeD = 0;
						
						for (i=c-1; i>=0 && grille[i][l] == 2; i--)
						{
							sommeG++;
						}
						for (i=c+1; i<7 && grille[i][l] == 2; i++)
						{
							sommeD++;
						}
						
						if (sommeG+sommeD >= 3)
						{
							ligne = l;
							colonne = c;
							res = true;
						}
						
						//Colonne
						if (!res)
						{
							sommeB = 0;
							
							for (i=l+1; i < 6 && grille[c][i] == 2; i++)
							{
								sommeB++;
							}
							
							if (sommeB == 3)
							{
								ligne = l;
								colonne = c;
								res = true;
							}
							
							//Diagonale
							if (!res)
							{
								sommeG = 0;
								sommeD = 0;
								
								i = c-1;
								j = l-1;
								
								while (i >= 0 && j >= 0 && grille[i][j] == 2)
								{
									sommeG++;
									i--;
									j--;
								}
								
								i = c+1;
								j = l+1;
								
								while (i < 7 && j < 6 && grille[i][j] == 2)
								{
									sommeD++;
									i++;
									j++;
								}
								
								if (sommeD + sommeG >= 3)
								{
									ligne = l;
									colonne = c;
									res = true;
								}
								
								if (!res)
								{
									sommeG = 0;
									sommeD = 0;
									
									i = c-1;
									j = l+1;
									
									while (i >= 0 && j < 6 && grille[i][j] == 2)
									{
										sommeG++;
										i--;
										j++;
									}
									
									i = c+1;
									j = l-1;
									
									while (i < 7 && j >= 0 && grille[i][j] == 2)
									{
										sommeD++;
										i++;
										j--;
									}
									
									if (sommeD + sommeG >= 3)
									{
										ligne = l;
										colonne = c;
										res = true;
									}
								}
							}
						}
					}
				}
			}
			
			for (c=0; c < 7 && !res; c++)//On cherche si on peut bloquer
			{
				for (l=0; l < 6 && !res; l++)
				{
					if ((l == 5 && grille[c][l] == 0) || (l < 5 && grille[c][l] == 0 && grille[c][l+1] != 0))
					{
						//Ligne
						sommeG = 0;
						sommeD = 0;
						
						for (i=c-1; i>=0 && grille[i][l] == 1; i--)
						{
							sommeG++;
						}
						for (i=c+1; i<7 && grille[i][l] == 1; i++)
						{
							sommeD++;
						}
						
						if (sommeG+sommeD >= 3)
						{
							ligne = l;
							colonne = c;
							res = true;
						}
						
						//Colonne
						if (!res)
						{
							sommeB = 0;
							
							for (i=l+1; i < 6 && grille[c][i] == 1; i++)
							{
								sommeB++;
							}
							
							if (sommeB == 3)
							{
								ligne = l;
								colonne = c;
								res = true;
							}
							
							//Diagonale
							if (!res)
							{
								sommeG = 0;
								sommeD = 0;
								
								i = c-1;
								j = l-1;
								
								while (i >= 0 && j >= 0 && grille[i][j] == 1)
								{
									sommeG++;
									i--;
									j--;
								}
								
								i = c+1;
								j = l+1;
								
								while (i < 7 && j < 6 && grille[i][j] == 1)
								{
									sommeD++;
									i++;
									j++;
								}
								
								if (sommeD + sommeG >= 3)
								{
									ligne = l;
									colonne = c;
									res = true;
								}
								
								if (!res)
								{
									sommeG = 0;
									sommeD = 0;
									
									i = c-1;
									j = l+1;
									
									while (i >= 0 && j < 6 && grille[i][j] == 1)
									{
										sommeG++;
										i--;
										j++;
									}
									
									i = c+1;
									j = l-1;
									
									while (i < 7 && j >= 0 && grille[i][j] == 1)
									{
										sommeD++;
										i++;
										j--;
									}
									
									if (sommeD + sommeG >= 3)
									{
										ligne = l;
										colonne = c;
										res = true;
									}
								}
							}
						}
					}
				}
			}
			
			return res;
		}
		
		function strategie5()
		{
			res = false;
			
			for (c = 0; c < 3 && !res; c++)
			{
				for (l = 0; l < 5 && !res; l++)
				{
					if (grille[c][l] == 0 && grille[c+1][l] == 1 && grille[c+2][l] == 1 && grille[c+3][l] == 0 && grille[c+4][l] == 0 && grille[c+3][l] != 0)
					{
						res = true;
						ligne = l;
						colonne = c+3;
					}
				}
				
				if (!res && grille[c][5] == 0 && grille[c+1][5] == 1 && grille[c+2][5] == 1 && grille[c+3][5] == 0 && grille[c+4][5] == 0)
				{
					res = true;
					ligne = 5;
					colonne = c+3;
				}
			}
			
			
			
			for (c = 6; c > 3 && !res; c--)
			{
				for (l = 0; l < 5 && !res; l++)
				{
					if (grille[c][l] == 0 && grille[c-1][l] == 1 && grille[c-2][l] == 1 && grille[c-3][l] == 0 && grille[c-4][l] == 0 && grille[c-3][l] != 0)
					{
						res = true;
						ligne = l;
						colonne = c-3;
					}
				}
				
				if (!res && grille[c][5] == 0 && grille[c-1][5] == 1 && grille[c-2][5] == 1 && grille[c-3][5] == 0 && grille[c-4][5] == 0)
				{
					res = true;
					ligne = 5;
					colonne = c-3;
				}
			}
			
			for (c = 0; c < 3 && !res; c++)
			{
				for (l = 0; l < 5 && !res; l++)
				{
					if (grille[c][l] == 0 && grille[c+1][l] == 2 && grille[c+2][l] == 2 && grille[c+3][l] == 0 && grille[c+4][l] == 0 && grille[c+3][l] != 0)
					{
						res = true;
						ligne = l;
						colonne = c+3;
					}
				}
				
				if (!res && grille[c][5] == 0 && grille[c+1][5] == 2 && grille[c+2][5] == 2 && grille[c+3][5] == 0 && grille[c+4][5] == 0)
				{
					res = true;
					ligne = 5;
					colonne = c+3;
				}
			}
			
			for (c = 6; c > 3 && !res; c--)
			{
				for (l = 0; l < 5 && !res; l++)
				{
					if (grille[c][l] == 0 && grille[c-1][l] == 2 && grille[c-2][l] == 2 && grille[c-3][l] == 0 && grille[c-4][l] == 0 && grille[c-3][l] != 0)
					{
						res = true;
						ligne = l;
						colonne = c-3;
					}
				}
				
				if (!res && grille[c][5] == 0 && grille[c-1][5] == 2 && grille[c-2][5] == 2 && grille[c-3][5] == 0 && grille[c-4][5] == 0)
				{
					res = true;
					ligne = 5;
					colonne = c-3;
				}
			}
			
			return res;
		}
		
		function presqueGagneAdversaire(l, c)
		{
			res = false;
			
			//Ligne
			sommeG = 0;
			sommeD = 0;
			
			for (i=c-1; i>=0 && grille[i][l] == 1; i--)
			{
				sommeG++;
			}
			for (i=c+1; i<7 && grille[i][l] == 1; i++)
			{
				sommeD++;
			}
			
			if (sommeG+sommeD >= 3)
			{
				res = true;
			}
			
			//Colonne
			if (!res)
			{
				sommeB = 0;
				
				for (i=l+1; i < 6 && grille[c][i] == 1; i++)
				{
					sommeB++;
				}
				
				if (sommeB == 3)
				{
					res = true;
				}
				
				//Diagonale
				if (!res)
				{
					sommeG = 0;
					sommeD = 0;
					
					i = c-1;
					j = l-1;
					
					while (i >= 0 && j >= 0 && grille[i][j] == 1)
					{
						sommeG++;
						i--;
						j--;
					}
					
					i = c+1;
					j = l+1;
					
					while (i < 7 && j < 6 && grille[i][j] == 2)
					{
						sommeD++;
						i++;
						j++;
					}
					
					if (sommeD + sommeG >= 3)
					{
						res = true;
					}
					
					if (!res)
					{
						sommeG = 0;
						sommeD = 0;
						
						i = c-1;
						j = l+1;
						
						while (i >= 0 && j < 6 && grille[i][j] == 2)
						{
							sommeG++;
							i--;
							j++;
						}
						
						i = c+1;
						j = l-1;
						
						while (i < 7 && j >= 0 && grille[i][j] == 2)
						{
							sommeD++;
							i++;
							j--;
						}
						
						if (sommeD + sommeG >= 3)
						{
							res = true;
						}
					}
				}
			}
			
			return res;
		}
		
		function nbColonnesVides()
		{
			var nb = 0;
			
			for (i = 0; i < 7; i++)
			{
				if (grille[i][0] == 0)
				{
					nb++;
				}
			}
			
			return nb;
		}
		
		function jeu(col)
		{
			if (grille[col-1][0] == 0 && !partiefinie)//On joue seulement si la colonne n'est pas pleine
			{
				//Tour du joueur---------------------------------------------
				
				ligne = 0;
				while (grille[col-1][ligne] == 0)
				{
					ligne++;
				}//Recherche de la première case vide où on devra mettre le jeton
				
				document.getElementById(col + "" + ligne + "").innerHTML = '<img src="rouge.png" alt="rouge"/>';
				grille[col-1][ligne-1] = 1;
				
				gagner("joueur", col-1, ligne-1);
				
				
				//Tour de l'IA-----------------------------------------------
				
				if (!partiefinie)
				{
					colonne = -1;
					ligne = -1;
					
					if (possibiliteDeGagnerOuBloquer())
					{
						colonne = colonne + 1;
						ligne = ligne + 1;
						
						document.getElementById(colonne + "" + ligne +"").innerHTML = '<img src="jaune.png" alt="jaune"/>';
						grille[colonne-1][ligne-1] = 2;
						
						gagner("adversaire", colonne-1, ligne-1);
					}
					else
					{
					
						colonne = -1;
						ligne = -1;
						
						if (strategie5())
						{
							colonne = colonne + 1;
							ligne = ligne + 1;
							
							document.getElementById(colonne + "" + ligne +"").innerHTML = '<img src="jaune.png" alt="jaune"/>';
							grille[colonne-1][ligne-1] = 2;
							
							gagner("adversaire", colonne-1, ligne-1);
						}
						else
						{
							
							if (nbColonnesVides() > 1)
							{
								do
								{
									do
									{
										colonne = Math.floor(Math.random()*7);
									}while(grille[colonne][0] != 0);
									
									ligne = 0;
									while (grille[colonne][ligne] == 0)
									{
										ligne++;
									}//Recherche de la première case vide où on devra mettre le jeton
								}while (presqueGagneAdversaire(ligne-2, colonne));
							}
							else
							{
								do
								{
									colonne = Math.floor(Math.random()*7);
								}while(grille[colonne][0] != 0);
								
								ligne = 0;
								while (grille[colonne][ligne] == 0)
								{
									ligne++;
								}//Recherche de la première case vide où on devra mettre le jeton
							}
							
							document.getElementById(colonne + 1 + "" + ligne + "").innerHTML = '<img src="jaune.png" alt="jaune"/>';
							grille[colonne][ligne-1] = 2;
							
							gagner("adversaire", colonne, ligne-1);
						}
						
					}
					
					nbCoups += 2;
					if (nbCoups >= 42)
					{
						unselectall();
						partiefinie = true;
						document.getElementById("message").innerHTML = "Egalité !";
					}
				}
				
				if (partiefinie)
				{
					document.getElementById("rejouer").innerHTML = '<input type="button" value="Rejouer?" onclick="rejouer()" />';
				}
			}
		}