$(document).ready(function () {
  // global variables
  currentDate();
  let arrayLength = 0;
  let randomNum = 0;
  let halfWord = 0;
  let wordDict = {};
  let count = 5;
  let start = false;

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
            // `<input type="text" class="wordtype" maxlength="1" value="${word}" readonly>`
          );
          //   wordDict[i] = true;
        } else {
          $("#wordblank").append(
            `<p class="wordtype"></p>`
            // `<input type="text" class="wordtype" maxlength="1" value="" readonly>`
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

      if (!foundKey) {
        count -= 1;
        if (count) {
          this.countValueChange(count);
        }
      }

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
        document.getElementById("level-button").style.marginTop = "35px";
        $("#level-button").append(
          `<h3 style="color: white;">Tries Remaining:</h3>`
        );

        $("#winLoss").append(` <div class="winLoss" id="winLoss">5</div>`);
        $("#level-button").fadeIn(1000);
        $("#winLoss").fadeIn(1000);
      }
    }

    countValueChange(val = 5) {
      $("#winLoss").fadeOut(100);
      delayTime(200);
      this.countHeader.innerHTML = val;
      this.countValue[0].innerHTML = count;
      $("#winLoss").fadeIn(500);
    }

    winLoss() {
      if (count === 0 && Object.keys(wordDict).length != 0) {
        $("#winLoss").fadeOut(100);
        delayTime(200);
        this.countHeader.innerHTML = "YOU LOST!!";
        $("#winLoss").fadeIn(500);
        $("#wordblank").empty()
        document.getElementById('wordblank').style.backgroundImage = 'url("gifs/SkeletonDacingvLose.gif")'
      } else if (count != 0 && Object.keys(wordDict).length === 0) {
        $("#winLoss").fadeOut(100);
        delayTime(200);
        this.countHeader.innerHTML = "YOU WON!!";
        $("#winLoss").fadeIn(500);
        $("#wordblank").empty()
        document.getElementById('wordblank').style.backgroundImage = 'url("gifs/SkeletonDacingv1.gif")'
      }
      
    }
  }

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

function delayTime(intTime) {
  const currentMS = new Date().getTime();
  const newMs = currentMS + intTime;
  while (true) {
    if (new Date().getTime() === newMs) {
      break;
    }
  }
}
