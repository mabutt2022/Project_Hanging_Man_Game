$(document).ready(function () {
  // global variables
  currentDate();
  let arrayLength = 0;
  let randomNum = 0;
  let halfWord = 0;
  let wordDict = {};
  let count = 5;
  let start = false;

  // easy array of words
  const easy = [
    "wonder",
    "baller",
    "lion",
    "better",
    "panda",
    "zebra",
    "rocky",
    "movie",
    "builder",
    "kitchen",
  ];
  // medium array of words
  const medium = [
    "chequebook",
    "pacemaker",
    "chickenpox",
    "appreciate",
    "backpacker",
    "blackjacks",
    "carjacking",
    "everything",
    "empathized",
    "friendship",
  ];
  // hard array of words
  const hard = [
    "hockeypockey",
    "homozygous",
    "jackhammer",
    "jargonized",
    "quiczmaster",
    "quicksteps",
    "showjumper",
    "zigzaggery",
    "texturized",
    "vampirized",
  ];

  // Resetting the page
  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", function () {
    location.reload();
  });

  // determining the length of the array
  function lengthArrayAndRandomWord(arr) {
    arrayLength = arr.length;
    randomNum = Math.floor(Math.random() * arrayLength);
  }

  // setting trigger to easy button
  $("#easy").on("click", function () {
    start = true;
    lengthArrayAndRandomWord(easy);
    let wordSelected = easy[randomNum];

    // assessing the number of charters to be blank in the word game
    halfWord = Math.floor(wordSelected.length / 2) - 1;
    // selecting the class and running the function
    let ObjClass = new AllFunction(wordSelected);
    ObjClass.clearOutDiv();
    setTimeout(function () {
      ObjClass.divUpdateWithBlanks();
    }, 2000);
  });

  // setting trigger to medium button
  $("#medium").on("click", function () {
    start = true;
    lengthArrayAndRandomWord(medium);
    let wordSelected = medium[randomNum];

    // assessing the number of charters to be blank in the word game
    halfWord = Math.floor(wordSelected.length / 2) - 1;
    // selecting the class and running the function
    let ObjClass = new AllFunction(wordSelected);
    ObjClass.clearOutDiv();
    setTimeout(function () {
      ObjClass.divUpdateWithBlanks();
    }, 2000);
  });

  // setting trigger to medium button
  $("#hard").on("click", function () {
    start = true;
    lengthArrayAndRandomWord(hard);
    let wordSelected = hard[randomNum];

    // assessing the number of charters to be blank in the word game
    halfWord = Math.floor(wordSelected.length / 2) - 1;
    // selecting the class and running the function
    let ObjClass = new AllFunction(wordSelected);
    ObjClass.clearOutDiv();
    setTimeout(function () {
      ObjClass.divUpdateWithBlanks();
    }, 2000);
  });

  // Keyboard key connection
  $("#keyboardLayer1")
    .children("button")
    .on("click", function () {
      if (start) {
        let mark = $(this).text();
        let ObjClass = new AllFunction();
        ObjClass.updatingBlanks(mark);
      }
    });

  $("#keyboardLayer2")
    .children("button")
    .on("click", function () {
      if (start) {
        let mark = $(this).text();
        let ObjClass = new AllFunction();
        ObjClass.updatingBlanks(mark);
      }
    });

  $("#keyboardLayer3")
    .children("button")
    .on("click", function () {
      if (start) {
        let mark = $(this).text();
        let ObjClass = new AllFunction();
        ObjClass.updatingBlanks(mark);
      }
    });

  // creating class that holds all the methods along with variables
  class AllFunction {
    constructor(word) {
      this.fullWord = word;
      this.countHeader = document.querySelector("#winLoss");
      this.countValue = document.querySelectorAll(".count");
    }

    // main function to setup the word list
    divUpdateWithBlanks() {
      for (let i = 0; i < this.fullWord.length; i++) {
        let word = this.fullWord[i].toUpperCase();
        let blankOrNoBlank = Math.round(Math.random());

        if (blankOrNoBlank || i === 0 || i === this.fullWord.length - 1) {
          $("#wordblank").append(
            `<p class="wordtype"><span>${word}</span></p>`
          );
        } else {
          $("#wordblank").append(`<p class="wordtype"></p>`);
          wordDict[i] = word;
        }
      }

      // checking if based on the random function all the blanks were caught or not, if so, rerun the function to get the blanks
      if (Object.keys(wordDict).length != halfWord) {
        $("#wordblank").empty();
        wordDict = {};
        this.divUpdateWithBlanks();
      }
    }

    // Function to update the blanks of the word
    updatingBlanks(mark) {
      let foundKey = false;
      for (const [key, value] of Object.entries(wordDict)) {
        if (value === mark) {
          let blankValue = document.querySelectorAll(".wordtype");
          blankValue[key].innerHTML = `<span>${mark}</span>`;
          blankValue[key].style.color = "green";
          delete wordDict[key];
          foundKey = true;
          break;
        }
      }
      // This will reduce the count only if the char selected is not part of the full word
      if (!foundKey) {
        count -= 1;
        if (count) {
          this.countValueChange(count);
        }
      }

      // If the count turns to 0 or there is nothing left in the dicionary above disable all the keyboard function
      if (count === 0 || Object.keys(wordDict).length === 0) {
        this.allKeyboardFunctionDisabled();
      }

      // checking to see if there is a winner or a loser
      this.winLoss();
    }

    // disable all the keyboard funtion afterwords
    allKeyboardFunctionDisabled() {
      $("#keyboardLayer1").children("button").off("click");
      $("#keyboardLayer2").children("button").off("click");
      $("#keyboardLayer3").children("button").off("click");
    }

    // Clearing out the divs and bringing the new text with the fade in and out function
    clearOutDiv() {
      $("#level-button").fadeOut(500);
      $("#winLoss").fadeOut(500);
      setTimeout(newFunc, 1000);
      function newFunc() {
        $("#level-button").empty();
        $("#winLoss").empty();
        document.getElementById("level-button").style.marginTop = "35px";
        $("#level-button").append(
          `<h3 style="color: white;">Tries Remaining:</h3>`
        );

        $("#winLoss").append(` <div class="winLoss" id="winLoss">5</div>`);
        $("#level-button").fadeIn(1000);
        $("#winLoss").fadeIn(1000);
      }
    }

    // Updating the count value in the HTML
    countValueChange(val = 5) {
      $("#winLoss").fadeOut(100);
      delayTime(200);
      this.countHeader.innerHTML = val;
      this.countValue[0].innerHTML = count;
      $("#winLoss").fadeIn(500);
    }

    // Checking if there is a winner or loser function
    winLoss() {
      if (count === 0 && Object.keys(wordDict).length != 0) {
        $("#winLoss").fadeOut(100);
        delayTime(200);
        this.countHeader.innerHTML = "YOU LOST!!";
        $("#winLoss").fadeIn(500);
        $("#wordblank").empty();
        document.getElementById("wordblank").style.backgroundImage =
          'url("gifs/SkeletonDacingvLose.gif")';
      } else if (count != 0 && Object.keys(wordDict).length === 0) {
        $("#winLoss").fadeOut(100);
        delayTime(200);
        this.countHeader.innerHTML = "YOU WON!!";
        $("#winLoss").fadeIn(500);
        $("#wordblank").empty();
        document.getElementById("wordblank").style.backgroundImage =
          'url("gifs/SkeletonDacingv1.gif")';
      }
    }
  }

  // Getting the current date and updating the HTML
  function currentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "-" + dd + "-" + yyyy;
    let countValue = document.querySelectorAll(".date");
    countValue[0].innerHTML = today;
  }

  // i need to check the innerHTML char for the button
  // it gets the key (index) of all the false in the wordDict
  // if the index value in the word is the same as innerHTML then it will update the below
  // value of the same index of input box
});

// Alternative to Sleep functioni like python - setTimeout function was not working everytime.
function delayTime(intTime) {
  const currentMS = new Date().getTime();
  const newMs = currentMS + intTime;
  while (true) {
    if (new Date().getTime() === newMs) {
      break;
    }
  }
}
