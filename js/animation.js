// NOTE: Le passage au rouge signifie le début de l'opération 
// l'animation

//function animationgagnant(){
// Permet d'accéder aux éléments d'une manière propre.
var circle = document.getElementById('circle'), 
    button = document.getElementById('button');

 // Obtient l'élément pour afficher le pourcentage courant
// var result = document.getElementById('result'),
//      // Position actuelle du cercle autour de sa trajectoire
//      // en pourcentage par rapport à l'original
//     totalCurrentPercent = 0,
//     // Pourcentage du cercle autour de sa trajectoire en
//     // pourcentage par rapport à la dernière origine
//     currentPercent = 0;

// Mise à jour du pourcentage de variation par rapport à la dernière origine
// var showPercent = window.setInterval(function() {
//   if(currentPercent < 100)
//   {
//     currentPercent += 1;
//   }
//   else {
//     currentPercent = 0;
//   }
//   result.innerHTML = currentPercent;
// }, 39);  // Fonctionne à un taux basé sur la vitesse de l'animation.
//          // durée (millisecondes / 100)



//Vérifie si la règle spécifiée se trouve dans la zone. 
// n'importe laquelle des feuilles de style trouvées dans le document ;
// retourne l'objet d'animation si c'est le cas
function findKeyframesRule(rule) {
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; ++i) {
        for (var j = 0; j < ss[i].cssRules.length; ++j) {
            if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) { return ss[i].cssRules[j]; }
        }
    }
    return null;
}

// Remplace l'animation basée sur le pourcentage.
// Lorsque activé et codé à l'aide d'un autre code dur 
// Caractéristiques techniques
function change(anim) {
  // Obtient l'objet d'animation de l'image spécifiée.
  // animation
  var keyframes = findKeyframesRule(anim),
      length = keyframes.cssRules.length;
  
  // Permet de créer un tableau des valeurs en pourcentage actuelles.
  // dans l'animation
  var keyframeString = [];  
  for(var i = 0; i < length; i ++)
  {
    keyframeString.push(keyframes[i].keyText);
  }
  
    
   // Supprime toutes les valeurs en % du tableau de sorte que
  // la fonction getClosest permet d'effectuer des calculs
  var keys = keyframeString.map(function(str) {
    return str.replace('%', '');
  });
  
  // Actualise la position actuelle du cercle en
  // être utilisé dans les calculs
//   totalCurrentPercent += currentPercent;
//   if(totalCurrentPercent > 100)
//   {
//     totalCurrentPercent -= 100;
//   }
  // Variables auto-explicatives si vous lisez le fichier
  // Description de getClosest
  var closest = getClosest(keys);
  
  var position = keys.indexOf(closest), 
      firstPercent = keys[position];
  
  // Supprime les règles actuelles de la règle spécifiée. 
  // animation
  for(var i = 0, j = keyframeString.length; i < j; i ++)
  {
    keyframes.deleteRule(keyframeString[i]);
  }
  
  // Tourne le pourcentage lorsqu'il est activé dans le champ
  // degré correspondant d'un cercle
  var multiplier = firstPercent * 3.6;
  
   // Essentiellement, cela crée les règles permettant de définir un nouveau 
   // l'origine du chemin en fonction de l'approximation
   // pourcentage de l'animation lorsqu'elle est activée et
   // augmente le diamètre de la nouvelle trajectoire circulaire
  keyframes.insertRule("0% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 0) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 0) + "deg); background-color:red; }");
  keyframes.insertRule("13% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 45) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 45) + "deg); }");
  keyframes.insertRule("25% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 90) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 90) + "deg); }");
  keyframes.insertRule("38% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 135) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 135) + "deg); }");
  keyframes.insertRule("50% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 180) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 180) + "deg); }");
  keyframes.insertRule("63% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 225) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 225) + "deg); }");
  keyframes.insertRule("75% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 270) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 270) + "deg); }");
  keyframes.insertRule("88% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 315) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 315) + "deg); }");
  keyframes.insertRule("100% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 360) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 360) + "deg); }");
  
  // Affiche à nouveau le cercle
  circle.style.display = "inherit";
  // Définit l'animation selon les nouvelles règles spécifiées. 
  circle.style.webkitAnimationName = anim; 
  
  // Réinitialise le compteur approximatif de pourcentage d'animation
  window.clearInterval(showPercent);
  currentPercent = 0;
//   showPercent = self.setInterval(function() {
//     if(currentPercent < 100)
//     {
//       currentPercent += 1;
//     }
//     else {
//       currentPercent = 0;
//     }
//     result.innerHTML = currentPercent;
//   }, 39); 
}

// Attribue la fonction de modification à la fonction de modification du bouton.
// Fonction onclick
button.onclick = function() {
  // Supprime l'animation pour en créer une nouvelle
  circle.style.webkitAnimationName = "none";
  // Cache temporairement le cercle
  circle.style.display = "none";
  // Initialise la fonction de modification
  setTimeout(function () { 
      change("rotate"); 
  }, 0);
}

// Obtient la valeur en % la plus proche de l'animation basée sur
// le % approximatif trouvé ci-dessous
// function getClosest(keyframe) {
//   var curr = keyframe[0];
//   var diff = Math.abs (totalCurrentPercent - curr);
//   for (var val = 0, j = keyframe.length; val < j; val++) {
//     var newdiff = Math.abs(totalCurrentPercent - keyframe[val]);
//     if (newdiff < diff) {
//       diff = newdiff;
//       curr = keyframe[val];
//      }
//   }
//   return curr;
// }


function findKeyframesRule(rule) {
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; ++i) {
      for (var j = 0; j < ss[i].cssRules.length; ++j) {
        if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && 
        ss[i].cssRules[j].name == rule) { 
          return ss[i].cssRules[j]; }
      }
    }
    return null;
  }


  // Makes an array of the current percent values
// in the animation
var keyframeString = [];  
for(var i = 0; i < length; i ++)
{
  keyframeString.push(keyframes[i].keyText); 
}
  
// Removes all the % values from the array so
// the getClosest function can perform calculations
var keys = keyframeString.map(function(str) {
  return str.replace('%', '');
});


// totalCurrentPercent += currentPercent;
// // Since it's in percent it shouldn't ever be over 100
// if (totalCurrentPercent > 100) {
//   totalCurrentPercent -= 100;
// }



// function getClosest(keyframe) {
//     // curr stands for current keyframe
//     var curr = keyframe[0];
//     var diff = Math.abs (totalCurrentPercent - curr);
//     for (var val = 0, j = keyframe.length; val < j; val++) {
//       var newdiff = Math.abs(totalCurrentPercent - keyframe[val]);
//       // If the difference between the current percent and the iterated 
//       // keyframe is smaller, take the new difference and keyframe
//       if (newdiff < diff) {
//         diff = newdiff;
//         curr = keyframe[val];
//        }
//     }
//     return curr;
//   }
//}