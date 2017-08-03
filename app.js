/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//to keep track of scores for p1 and p2
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

//event handler/listener on the roll dice, with a function when mouse clicked
//using an anonymous function inside, change the current dice to one of the 6
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1. random number is generated when button is clicked
    dice = Math.floor(Math.random() * 6) + 1;

    //2. display the result as a block with correct name
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'; //right after .block

    // 3. update round score if the rolled number is not a 1
    if (dice === 6 && lastDice === 6) {
        //player loses the score if rolls two sixes
        scores[activePlayer] = 0;
        document.querySelector('#scoes-' + activePlayer).textContent = '0';
        nextPlayer();
    } else if (dice !== 1) {
      //add score if dice is not rolled at 1 whcih mean the score resets to 0
      roundScore += dice;
      //update the current score with the roundScore and view it
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // dice roll is 1 therefore the current score resets
        // check whose the player to play right now
        nextPlayer();
    }
    // store the value of the last dice played
    lastDice = dice;
  }

});


//event handler/listener for the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    //1. as sooon as user clicks, add the player score to global score
    scores[activePlayer] += roundScore;

    //2. update the UI according to the scores and change the global score for that player
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // user input on the final score you want to play till
    var input = document.querySelector('.final-score').value;

    // if input is true create a winning score else its to 100
    if (input) {
      var winningScore = input;
    } else {
      winningScore = 100;
    }

    //3. check if the player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#names-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';

      //to get rid of the red dot that says the active player, only do if player won
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false; //gets out of the game

    } else {
      // upcoming player is and whose playing, therefore call nextPlayer
      // that person gets the turn
      nextPlayer();
    }
  }

});


function nextPlayer() {

  //next player using ternary operator
  //same as if activePlayer is equal to 0 then activePlayer = 1, else activePlayer = 0
  activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
  roundScore = 0;

  //reset the current score for either player
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //as soon as the player switches, the active panel is removed/switched onto
  //the active player (i.e. the shadow on the player to move is toggled)
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

//when starting a new game
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  //1. resets all scores to 0
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  //hide the die in the beginning of the game
  //selecting a class rather than ID we use dot selector (.dice)
  document.querySelector('.dice').style.display = 'none';

  //alternative to querySelector and is faster
  //reset all scores to 0 in the beginning of the game
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //change the winner name to player 1 and player 2
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  //removing the winner class on both panels
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');

}
