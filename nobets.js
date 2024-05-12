
var board = document.getElementById("board");
var come = document.getElementById("come");
var play = document.getElementById("play");
var point = document.getElementById("point");
point.style.display="none";
come.style.display="none";
var p = document.createElement("p");
p.setAttribute("id","roll");
p.innerHTML = "Click to play";
board.appendChild(p);
var comeOut = 0;
var firstRoll = true;

/* ROLL DIE: rollDie() rolls 1 die, returns value
 * @param: none
 * @return 1D6
 */
function rollDice(){
  let dieRoll = Math.floor(Math.random()*6) + 1;
  return dieRoll;
}

/* SHOOT: shoot() rolls 2 dice, returns sum
 * @param: none
 * @return sum of 2D6
 */
function shoot(){
  let d1 = rollDice();
  let d2 = rollDice();
  return d1 + d2
}

/* CALLER: caller() provides game feedback from parameters
 * @param roll, outcome (1=win, 2=lose, 3=roll again)
 * @return: none
 */
function caller(roller, outcome){
  let message = "You rolled a " + roller
  if (outcome == 1) message += ". You win!";
  else if (outcome == 2) message += ". You lose!";
  else message += ". Roll again";
  let roll = document.getElementById("roll");
  console.log(message);
  roll.innerHTML = message;
}

/* PLAY CRAPS: playCrap() runs a craps game.
 * @param: none
 * @return: none;
 */ 
function playCraps(){
  play.style.display="none";
  come.style.display="block";
  roll.innerHTML = "Roll your come out"
  play.innerHTML = "Play again?"
}

function rollComeout(){
  let end = true
  come.style.display = "none";
  comeOut = shoot();
  if (comeOut == 7 ||comeOut == 11) caller(comeOut, 1)
  else if (comeOut < 4 ||comeOut == 12) caller(comeOut, 2);
  else{
    caller(comeOut, 3);
    point.style.display = "block";
    end = false 
  }
  if (end == true){
  point.style.display="none";
  play.style.display="block";
  }
}

function rollPointroll(){
  let end = true
  pointRoll = shoot();
  if (pointRoll == 7) caller(pointRoll, 2);
  else if (pointRoll == comeOut) caller(pointRoll, 1);
  else{
    caller(pointRoll, 3);
    end = false
  }
  if (end == true){
    point.style.display = "none";
    play.style.display="block"
  }
}
