$(document).ready(function () {
  // global variables
  let arrayLength = 0;
  let randomNum = 0;
  let halfWord = 0;
  let wordDict = {};
  let count = 0;
  // console.log('Hello World')

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
    lengthArrayAndRandomWord(easy);
    let wordSelected = easy[randomNum];

    // assessing the number of charters to be blank in the word game
    halfWord = Math.floor(wordSelected.length / 2) - 1;

    // selecting the class and running the function
    let ObjClass = new AllFunction(wordSelected);
    ObjClass.divUpdateWithBlanks();
    // console.log(wordDict)
  });


  // Keyboard key connection
  $("#keyboardLayer1").children("button").on('click', function() {
    let mark = $(this).text()
    let ObjClass = new AllFunction();
    ObjClass.updatingBlanks(mark);  
})

$("#keyboardLayer2").children("button").on('click', function() {
    let mark = $(this).text()
    let ObjClass = new AllFunction();
    ObjClass.updatingBlanks(mark);
})

$("#keyboardLayer3").children("button").on('click', function() {
    let mark = $(this).text()
    let ObjClass = new AllFunction();
    ObjClass.updatingBlanks(mark);
})

  // creating class that holds all the methods along with variables
  class AllFunction {
    constructor(word) {
      this.fullWord = word;
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

      $("#easy").off("click");

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
                delete wordDict[key]
                count -= 1;
                break;
            } 
        }
        
        count += 1
        console.log(count)
        let countValue = document.querySelectorAll(".count");
        countValue[0].innerHTML = count;

        console.log(wordDict)
        if (count === 5 || Object.keys(wordDict).length === 0) {
            $("#keyboardLayer1").children("button").off("click");
            $("#keyboardLayer2").children("button").off("click");
            $("#keyboardLayer3").children("button").off("click");
        }

        
        
    }

  }


// i need to check the innerHTML char for the button
// it gets the key (index) of all the false in the wordDict
// if the index value in the word is the same as innerHTML then it will update the below
// value of the same index of input box




});
