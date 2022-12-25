$(document).ready(function () {
  // global variables
  currentDate();
  let arrayLength = 0;
  let randomNum = 0;
  let halfWord = 0;
  let wordDict = {};
  let count = 5;
  let start = false;

  const easy = ["wonder", "baller", "lion"];

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
    ObjClass.divUpdateWithBlanks();
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
            `<input type="text" class="wordtype" maxlength="1" value="${word}" readonly>`
          );
          //   wordDict[i] = true;
        } else {
          $("#wordblank").append(
            `<input type="text" class="wordtype" maxlength="1" value="" readonly>`
          );
          wordDict[i] = word;
        }
      }

      // if the crieteria does not meeting run the function again
      // if all the dictWord is true or if the blank are not (word Char = 1) then rerun the method
      if (Object.keys(wordDict).length != halfWord) {
        $("#wordblank").empty();
        wordDict = {};
        this.divUpdateWithBlanks();
      }
    }

    updatingBlanks(mark) {
      for (const [key, value] of Object.entries(wordDict)) {
        if (value === mark) {
          let blankValue = document.querySelectorAll(".wordtype");
          blankValue[key].value = mark;
          delete wordDict[key];
          count += 1;
          break;
        }
      }

      count -= 1;
      this.countValueChange(count);

      if (count === 0 || Object.keys(wordDict).length === 0) {
        this.allKeyboardFunctionDisabled();
      }

      this.winLoss();
    }

    allKeyboardFunctionDisabled() {
      $("#keyboardLayer1").children("button").off("click");
      $("#keyboardLayer2").children("button").off("click");
      $("#keyboardLayer3").children("button").off("click");
    }

    clearOutDiv() {
      $("#level-button").fadeOut(500);
      $("#winLoss").fadeOut(500);
      setTimeout(newFunc, 1000);
      function newFunc() {
        $("#level-button").empty();
        $("#winLoss").empty();
        $("#level-button").append(`<h3>You have following tries left:</h3>`);
        $("#winLoss").append(` <div class="winLoss" id="winLoss">5</div>`);
        $("#level-button").fadeIn(1000);
        $("#winLoss").fadeIn(1000);
      }

      //   this.countValueChange();
    }

    countValueChange(val = 5) {
      this.countHeader.innerHTML = val;
      this.countValue[0].innerHTML = count;
    }

    winLoss() {
      if (count === 0 && Object.keys(wordDict).length != 0) {
        this.countHeader.innerHTML = "YOU LOST!!";
      } else if (count != 0 && Object.keys(wordDict).length === 0) {
        this.countHeader.innerHTML = "YOU WON!!";
      }
    }
  }

  function currentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
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
