const getUserChoice = userInput => {
userInput = userInput.toLowerCase();
 if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') { 
return userInput;
 } else {
 console.log ('Error!'); 
  } 
}

const getComputerChoice = () => {
 const randomNumber = Math.floor(Math.random() * 3);
 switch (randomNumber) {
   case 0:
   return 'rock';
   case 1: 
   return 'paper';
   case 2: 
   return 'scissors';
 }
};

const determineWinner = (userChoice, computerChoice) => {
if (userChoice === computerChoice) {
  return 'The game is a tie!';
  }
  if (userChoice === 'rock') {
    if (computerChoice === 'paper') {
    return "Sorry Computer Won!";
  } else {
    return 'GG you won!';
  }
 }

if (userChoice === 'paper') {
  if (computerChoice === 'scissors') {
    return 'Sorry you suck!';
  } else {
    return 'GG you shag!';
  }
}

if (userChoice === 'scissors') {
  if (computerChoice === 'rock') {
    return 'Sorry u stink!';
  } else {
    return 'Lets go fat cock!';
    }
  }
};

const playGame = () => {
  const userChoice = getUserChoice('scissors');
  const computerChoice = getComputerChoice();
  console.log('You threw: ' + userChoice);
  console.log('Computer threw: ' + computerChoice);

  console.log(determineWinner(userChoice, computerChoice));
};

playGame()
 
