var board = document.getElementById("board");
var come = document.getElementById("come");
var play = document.getElementById("play");
var point = document.getElementById("point");
var roll = document.getElementById("roll");
var dicebox = document.getElementById("dicebox");
var dice1 = document.getElementById("dice1");
var dice2 = document.getElementById("dice2");
var comeoutRemind = document.getElementById("come-out");
let d1 = 0;
let d2 = 0;
var gameStatus = 0;
var comeOut = 0;
var balance = 0;
var bet = 0;
var betType = "none;"
var total = 0;
var balanceDisplay = document.getElementById("balance-display");
var totalBet = document.getElementById("total-bet");
balanceDisplay.innerHTML = "$ " + balance;
var moneyBet = document.getElementById("moneyBet");
var betType = "Pass";
let type = document.getElementById("bettypebox");
type.selectedIndex = 2;
var betType = type.value;
type.addEventListener('change', function() {
  let betType =  this.value;
});

/* PLAY CRAPS: playCraps() runs a craps game.
 * @param: none
 * @return: none;
 */ 
function playCraps(){
  play.style.display="none";
  if (gameStatus == 0) balance = 100;
  gameStatus = 1;
  dice1.style.backgroundColor="yellow";
  dice2.style.backgroundColor="yellow";
  dicebox.style.backgroundColor="lightgreen";
  balanceDisplay.innerHTML = "$ " + balance;
  come.style.display="inline";
  roll.innerHTML = "Bet, then roll your comeout."
  if (balance > 0) play.innerHTML = "Play again?"
  else fullGame.innerHTML = "Go home!  You're broke.";
}

/* NEW GAME: newGame() Refreshes board for new game 
 * @param: none;
 * @return: none;
 */
function newGame(){
  total = 0;
  bet = 0;
  totalBet.value = total+bet;
  moneyBet.value = bet;
  play.style.display="inline";
  come.style.display="none";
  point.style.display = "none";
  dice1.innerHTML = "*";
  dice2.innerHTML = "*";
}


/* ROLL DIE: rollDie() rolls 1 die, returns value
 * @param: none
 * @return 1D6
 */
function rollDice(die){
  let dieRoll = Math.floor(Math.random()*6) + 1;
  die.innerHTML = dieRoll;
  return dieRoll;
}

/* SHOOT: shoot() rolls 2 dice, returns sum
 * @param: none
 * @return sum of 2D6
 */
function shoot(){
  d1 = rollDice(dice1);
  d2 = rollDice(dice2);
  return d1 + d2;
}

/* REFRESH BOARD: Update Balance and bet 
 * @param: none;
 * @return:none;
 */
function refreshBoard(){
  balanceDisplay.innerHTML = "$ " + balance;
  moneyBet.value = 0;
  totalBet.innerHTML = "0";
  bet = 0;
}


/* CALLER: caller() provides game feedback from parameters
 * @param roll, outcome (1=win, 2=lose, 3=roll again)
 * @return: none
 */
function caller(roller, outcome){
  let message = "You rolled a " + roller;
  if (outcome == 1) {
    message += ". You won!";
    balance += total*2;
    roll.innerHTML = message;
    refreshBoard();
    newGame(); 
  }
  else if (outcome == 2) {
    if (balance > 0) {
      message += ". You lost!";
      roll.innerHTML = message;
      refreshBoard();
      newGame();
    }
    else {
      let bye =  document.createElement("h1");
      bye.id="bye";
      bye.innerHTML = "<h1>You lost $" + total + ". Go home! You\'re broke.</h1>";
      fullgame.innerHTML = "";
      fullgame.appendChild(bye);
    }
  }
  else {
    message += ". Roll again.";
    console.log(message);
    roll.innerHTML = message;
  }
}

function rollComeout(){
  takeBet();
  console.log(d1 + " & " + d2 + ": Bet: " + bet + "| Total: "+ total + "| Balance: "+ balance);
  if (total == 0){
    roll.innerHTML = "You must place a bet first.";
  }
  else {
    comeOut = shoot();
    if (comeOut == 7 ||comeOut == 11) {
      caller(comeOut, 1);
    }
    else if (comeOut < 4 ||comeOut == 12) {
      caller(comeOut, 2);
    }
    else {
      caller(comeOut, 3);
      comeoutRemind.style.display = "inline";
      comeoutRemind.innerHTML = "You're rolling for a "+comeOut;
      come.style.display = "hide";
      point.style.display = "inline";
      come.style.display = "none";
    }
    bet=0;
    moneyBet.value = 0;
  }
  type.selectedIndex = 0;
  var betType = type.value;
}


/* TAKE BET: pull bet value from moneyBet
 * Update bet with integer converted value
 * @param: none
 * @return none
 */
function takeBet() {
  if (total == 0) gameStatus = 1;
  let toBet = moneyBet.value;
  let bet = parseInt(toBet);
  if (isNaN(bet)) {
    roll.innerHTML = "Bad Input.  Try Again.";
    bet = 0;
  }
  else {
    if (bet > balance){
      alert("You can't cover that bet.");
      bet = 0;
    }
    else {
      total += bet;
      totalBet.innerHTML = total;
      balance -= bet;
      balanceDisplay.innerHTML = "$ "+balance;
      roll.innerHTML = "Click to roll.";
    }
    moneyBet.value = 0;
  }
}


function rollPointroll(){
  if (moneyBet.value != "0") {
    takeBet();
  }
  pointRoll = shoot();
  console.log("Roll: "+ d1 + "," + d2 + " Bet: " + bet + "| Total: "+ total + "| Balance: "+ balance);
  if (pointRoll == 7) caller(pointRoll, 2);
  else if (pointRoll == comeOut) caller(pointRoll, 1);
  else{
    caller(pointRoll, 3);
  }
}
