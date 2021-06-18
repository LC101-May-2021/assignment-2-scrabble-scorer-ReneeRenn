// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85
const input = require("readline-sync");
let yourWord ="";

function initialPrompt() {
   yourWord = input.question("Let's play some scrabble!\n\nEnter a word to Score: ");
   return yourWord;
};

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function simpleScorer(word) {
  word = word.toUpperCase();
  /*console.log(`${yourWord} is worth ${word.length} points.`);*/
  return word.length
}

simpleScorer(yourWord);

function vowelBonusScorer(word) {
  let total = 0;
  const vowel = ['a','e','i','o','u'];

  for (let letter of word.toLowerCase()) {
        if (vowel.includes(letter)) {
            total = total + 3;
    } else {
      total++;
    }
  }
  return total;
}   
  const result = vowelBonusScorer(yourWord);
  /*console.log(`${yourWord} is worth ${result} points.`);*/
  vowelBonusScorer(yourWord);

function oldScrabbleScorer(word) {
	word = word.toLowerCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      /*if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
     }*/
    }
	 }
	return letterPoints;
 }

oldScrabbleScorer(yourWord);

let simpleScore = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: simpleScorer
};

let vowelBonusScore = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoreFunction: vowelBonusScorer
};

let scrabbleScores = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoreFunction: scrabbleScore
};

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScores];

function scorerPrompt() {
  let num = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");
  
  while(num<0 || num>2) {
    num = input.question('INVALID INPUT. Please enter a number from 0-2:');
    num = Number(num);
  }
    console.log(`Score for '${yourWord}': ${scoringAlgorithms[num].scoreFunction(yourWord,newPointStructure)}`);
}

function transform(object) {
  let newObject = {};
  for (let key in object) {
    let letters = object[key];
    for (let i=0; i<letters.length; i++) {
      newObject[letters[i].toLowerCase()] = Number(key)
    }
  }
  return newObject;
}

let newPointStructure = transform(oldPointStructure);

function scrabbleScore(word, pointStructure) {
  word = word.toLowerCase();
  total = 0;
  for (i=0; i<word.length; i++) {
    total += pointStructure[word[i]];
  }
return total;

}

function runProgram() {
   initialPrompt();
   scorerPrompt();   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

