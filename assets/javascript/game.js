//VARIABLES
var words = [
"rogue",
 "jeangrey",
  "gamora",
   "okoye",
    "peggycarter",
     "hopepym",
      "sif",
        "scarletwitch"]

//Empty variables to store values later
var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;


// ALL FUNCTIONS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//__________________________________________________________
//GAME START FUNCTION
//__________________________________________________________
function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

    //console logging 
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}


//__________________________________________________________
//AUDIO FUNCTION
//__________________________________________________________

//variables for audio function
var avenger = document.getElementById("avengers");
var blackpanther = document.getElementById("bpanther");
var marvel = document.getElementById("marvel");
var xmen = document.getElementById("xmen");
var gtog = document.getElementById("gotg");


function aud() {
 
    //Rogue Audio & Image
    //---------------------------
    if (randomWord === words[0]) {
        avenger.pause();
        blackpanther.pause();
        marvel.pause();
        xmen.play();
        gotg.pause();
        document.getElementById("image").src = "./assets/images/rogue.gif";
    }
    //Jean Grey Audio & Image
    //---------------------------
    else if (randomWord === words[1]) {
        avenger.pause();
        blackpanther.pause();
        marvel.pause();
        xmen.play();
        gotg.pause();
        document.getElementById("image").src = "./assets/images/JeanGrey.gif";
    }
    //Gamora Audio & Image
    //---------------------------
    else if (randomWord === words[2]) {
        avenger.pause();
        blackpanther.pause();
        marvel.pause();
        xmen.pause();
        gotg.play();
        document.getElementById("image").src = "./assets/images/Gamora.gif";
    }
    //Okoye Audio & Image
    //---------------------------
    else if (randomWord === words[3]) {
        avenger.pause();
        blackpanther.play();
        marvel.pause();
        xmen.pause();
        gotg.pause();
        document.getElementById("image").src = "./assets/images/okoye.gif";
    }
    //Peggy Carter Audio & Image
    //---------------------------
    else if (randomWord === words[4]) {
        avenger.play();
        blackpanther.pause();
        marvel.pause();
        xmen.pause();
        gotg.pause();
        document.getElementById("image").src = "./assets/images/AgentCarter.gif";
    }
    //Hope Pym Audio & Image
    //---------------------------
    else if (randomWord === words[5]) {
        avenger.play();
        blackpanther.pause();
        marvel.pause();
        xmen.pause();
        gotg.pause();
        document.getElementById("image").src = "./assets/images/wasp.gif";
    }
    //Sif Audio & Image
    //---------------------------
    else if (randomWord === words[6]) {
        avenger.pause();
        blackpanther.pause();
        marvel.play();
        xmen.pause();
        gotg.pause();
        document.getElementById("image").src = "./assets/images/LadySif.gif";
    }
     //Scarlet Witch Audio & Image
    //---------------------------
    else if (randomWord === words[7]) {
        avenger.play();
        blackpanther.pause();
        marvel.pause();
        xmen.pause();
        gotg.pause();
        document.getElementById("image").src = "./assets/images/ScarletWitch.gif";
    }
};

//__________________________________________________________
//RESET FUNCTION
//__________________________________________________________
function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//__________________________________________________________
//CHECK LETTERS/COMPARE FUNCTION
//__________________________________________________________

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}

//__________________________________________________________
//FINAL COMPLETE FUNCTION
//__________________________________________________________

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        aud()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/Snap.gif"
        document.getElementById("losstracker").innerHTML = " " + losses;
        alert("You lose!");
        marvel.play();
        avenger.pause();
        blackpanther.pause();
        xmen.pause();
        gotg.pause();
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}
    


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//_____________________________________________________
// EXECUTE CODE 
//_____________________________________________________

//call start game function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}