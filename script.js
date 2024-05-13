var board = document.getElementById("board");
var come = document.getElementById("come");
var play = document.getElementById("play");
var point = document.getElementById("point");
var roll = document.getElementById("roll");
var dicebox = document.getElementById("dicebox");
var dice1 = document.getElementById("dice1");
var dice2 = document.getElementById("dice2");
var comeOutBet = document.getElementById("come-out");
var bettypebox = document.getElementById("bettypebox");
var betting = document.getElementById("betting");
var sideBetting = document.getElementById("side-betting");
var sidebets = document.getElementById("sidebets");
var bettingAmount = document.getElementById("b-amount");
var bettingType = document.getElementById("b-type");
var sideAmount = document.getElementById("sb-amount");
var sideType = document.getElementById("sb-type");
let d1 = 0;
let d2 = 0;
var gameStatus = 0;
var comeOut = 0;
var balance = 0;
var bet = 0;
var sidebet = 0;
var comebet = 0;
var betType = "none;"
var total = 0;
var balanceDisplay = document.getElementById("balance-display");
var totalBet = document.getElementById("total-bet");
balanceDisplay.innerHTML = "$ " + balance;
var moneyBet = document.getElementById("moneyBet");
bettypebox.selectedIndex = 2;
var betType = bettypebox.value;
bettypebox.addEventListener('change', function() {
  let betType =  this.value;
});
populateSidebets();

function populateSidebets(){
  let types = ["None","Big 6","Big Red","Big 8","Boxcars","Field","Hard Way","Horn","Lay","Snake Eyes","Yo"];
  for (let index = 0; index < types.length; index ++){
    let newSide = document.createElement("option");
    newSide.value = types[index];
    newSide.innerHTML = types[index];
    sidebets.appendChild(newSide);
  }
}

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
}

/* NEW GAME: newGame() Refreshes board for new game 
 * @param: none;
 * @return: none;
 */
function newGame(){
  bettypebox.selectedIndex = 2;
  sidebets.selectedIndex = 0;
  total = 0;
  bet = 0;
  sidebet = 0;
  comebet = 0;
  comeOutBet.style.display="none";
  betting.style.display = "none";
  bettingType.innerHTML = "";
  bettingAmount.innerHTML = "";
  sideBetting.style.display = "none";
  sideType.innerHTML = "";
  sideAmount.innerHTML = "";
  play.style.display="inline";
  come.style.display="none";
  point.style.display = "none";
  dice1.innerHTML = "*";
  dice2.innerHTML = "*";
  console.log("Newgame called");
  refreshBoard();
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
  let sum = d1 + d2;
  return sum;
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
    newGame(); 
  }
  else if (outcome == 2) {
    if (balance > 0) {
      message += ". You lost!";
      roll.innerHTML = message;
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
      comeOutBet.style.display = "inline";
      comeOutBet.innerHTML = "<strong>Bet of $</strong>" + total + " on point roll of: "+comeOut+".<br>";
      come.style.display = "hide";
      point.style.display = "inline";
      come.style.display = "none";
    }
    bet=0;
    moneyBet.value = 0;
  }
  bettypebox.selectedIndex = 0;
}

function readSide(id, bet, bettype){
  console.log("Reading id "+ id + " type "+ bettype);
  if (bettype == 1) {
    let text = bettypebox.options[bettypebox.selectedIndex].text;
    betting.style.display = "inline";
    bettingType.innerHTML = text;
    bettingAmount.innerHTML = comebet;
  }
  else if (bettype == 2){
     let text = sidebets.options[sidebets.selectedIndex].text;
     sideBetting.style.display = "inline";
     sideType.innerHTML = text;
     sideAmount.innerHTML = sidebet;
  } 
}
/* TAKE BET: pull bet value from moneyBet
 * Update bet with integer converted value
 * @param: none
 * @return none
 */
function takeBet() {
  let toBet = moneyBet.value;
  let bet = parseInt(toBet);
  if (total == 0) gameStatus = 1;
  let betType = bettypebox.options[bettypebox.selectedIndex].text;
  if (betType != "Pass" && betType != "Come"){
    betting.style.display = "inline";
    let comebetcash = moneyBet.value;
    comebet = parseInt(comebetcash);
    readSide("bettypebox", comebet, 1);
    console.log("Bet of " + comebet + " registered as " + betType);
  }
  let sideType = sidebets.options[sidebets.selectedIndex].text;
  console.log("Checking "+ sideType + " not None");
  if (sideType != "None"){
     sideBetting.style.display = "inline";
    let sidebetcash = moneyBet.value;
    sidebet = parseInt(sidebetcash);
    readSide("sidebets", sidebet, 2);
    console.log("Sidebet of "+ sidebet + " registered as " + sideType);
  }
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
