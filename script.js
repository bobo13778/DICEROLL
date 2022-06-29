$(function($){

  //DOM elements to be manipulated
  const newGameBtn = $("#newGameBtn");
  const rollDiceBtn = $("#rollDiceBtn");
  const holdScoreBtn = $("#holdScoreBtn");
  const player1Turn = $("#player1Turn");
  const player2Turn = $("#player2Turn");
  const diceImg = $("#dice");
  const player1TotalScore = $("#player1TotalScore");
  const player2TotalScore = $("#player2TotalScore");
  const player1CurrentScore = $("#player1CurrentScore");
  const player2CurrentScore = $("#player2CurrentScore");


  //Variables declaration
  let turn = 0;
  let player1CurScore = 0;
  let player2CurScore = 0;
  let player1TotScore = 0;
  let player2TotScore = 0;

  //List of images'URL for the dice
  let diceSrc = [
    "./images/dice/dice1.png",
    "./images/dice/dice2.png",
    "./images/dice/dice3.png",
    "./images/dice/dice4.png",
    "./images/dice/dice5.png",
    "./images/dice/dice6.png"
  ];

  //function for randomnumber between 1 and 6
  let ramNum = () => {
    return parseInt(Math.random()*6+1);
  };

  //function to animate the DOM's dice image and manage the result 
  let rollDice = () => {
    for (let i=2; i<10; i++) {
      setTimeout(() => {
        diceImg.attr("src", diceSrc[ramNum()-1]);    
      }, (4000/i));
    };
    let rollResult= ramNum();
      setTimeout(() => {
        diceImg.attr("src", diceSrc[rollResult-1]);
        if (rollResult !== 1) {
          if(turn % 2 === 1) {
            player1CurScore += rollResult; 
            player1CurrentScore.text(player1CurScore);
          } else {
            player2CurScore += rollResult;
            player2CurrentScore.text(player2CurScore);
          };
        } else {
          player1CurScore =0 ;
          player2CurScore = 0;
          player1CurrentScore.text(0);
          player2CurrentScore.text(0);
          changePlayer();
        };
      }, (3000));
  };

  //function to manage the hold action and the end of the game
  let holdScore = () => {
    if(turn % 2 === 1) {
      player1TotScore += player1CurScore;
      player1TotalScore.text(player1TotScore);
    } else {
      player2TotScore += player2CurScore;
      player2TotalScore.text(player2TotScore);
    };
    player1CurScore = 0 ;
    player2CurScore = 0;
    player1CurrentScore.text(0);
    player2CurrentScore.text(0);
    changePlayer();

    if (player1TotScore >= 100) {
      $("#player1Result").text("You won the game!");
      $("#player2Result").text("You lose...");

      $("#holdScoreBtn svg").css("color", "#EA4D4C");
      $("#holdScoreBtn p").css("color", "black");  
      disableBtn();
    } else if (player2TotScore >= 100) {
      $("#player2Result").text("You won the game!");
      $("#player1Result").text("You lose...");

      $("#holdScoreBtn svg").css("color", "#EA4D4C");
      $("#holdScoreBtn p").css("color", "black");  
      disableBtn();
    };
  };

  //Event listeners

  //Event listeners on New Game
  newGameBtn.mousedown(() =>{
    $("#newGameBtn svg").css("color", "black");
    $("#newGameBtn h1").css("color", "#EA4D4C");
  newGame();  
  });
  newGameBtn.mouseup(() =>{
    $("#newGameBtn svg").css("color", "#EA4D4C");
    $("#newGameBtn h1").css("color", "black");  
  });

  //Fonction to enable playing buttons
  let enableBtn = () => {
    //Event listeners on Roll Dice
    rollDiceBtn.mousedown(() =>{
      $("#rollDiceBtn svg").css("color", "black");
      $("#rollDiceBtn p").css("color", "#EA4D4C");  
      rollDice();
    });
    rollDiceBtn.mouseup(() =>{
      $("#rollDiceBtn svg").css("color", "#EA4D4C");
      $("#rollDiceBtn p").css("color", "black");  
    });
  
    //Event listeners on Hold Score
    holdScoreBtn.mousedown(() =>{
      $("#holdScoreBtn svg").css("color", "black");
      $("#holdScoreBtn p").css("color", "#EA4D4C");
      holdScore();
    });

    holdScoreBtn.mouseup(() =>{
      $("#holdScoreBtn svg").css("color", "#EA4D4C");
      $("#holdScoreBtn p").css("color", "black");  
    });
  };

  //Function to disable playing buttons
  let disableBtn = () => {
    rollDiceBtn.off();
    holdScoreBtn.off();
  };

  //Function to change player
  let changePlayer = () => {
    turn++;
    if(turn % 2 === 1) {
      player1Turn.removeClass("d-none");
      player2Turn.addClass("d-none");
    } else {
      player2Turn.removeClass("d-none");
      player1Turn.addClass("d-none");
    };
  };

  let newGame = () => {
   
    //Reseting values
    turn = 0;
    player1CurScore = 0;
    player2CurScore = 0;
    player1TotScore = 0;
    player2TotScore = 0;

    player1CurrentScore.text(0);
    player2CurrentScore.text(0);
    player1TotalScore.text(0);
    player2TotalScore.text(0);
    $("#player1Result").text("");
    $("#player2Result").text("");
    changePlayer();
    disableBtn();
    enableBtn();
  };

});

