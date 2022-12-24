$(document).ready(function () {

// global variables
let arrayLength = 0;
let randomNum = 0;
let halfWord = 0;
let wordDict = {};
let count = 0;
// console.log('Hello World')

const easy = ['wonder', 'baller', 'lion']

// Resetting the page
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function() {
location.reload();
});

// determining the length of the array
function lengthArrayAndRandomWord(arr) {
    arrayLength = arr.length;
    randomNum = Math.floor(Math.random()*(arrayLength));
}


// setting trigger to easy button
$("#easy").on('click', function(){
    lengthArrayAndRandomWord(easy)
    let wordSelected = easy[randomNum];
    
    halfWord = Math.floor(wordSelected.length / 2)-1;
    let ObjClass = new AllFunction(wordSelected)
    ObjClass.divUpdateWithBlanks()




    
})

// creating class that holds all the methods along with variables
class AllFunction {
    constructor(word) {
        this.fullWord = word;
    }

    // main function to setup the word list
    divUpdateWithBlanks() {
        for (let i = 0; i < this.fullWord.length; i++) {
            let word = this.fullWord[i].toUpperCase()
            let blankOrNoBlank = Math.round(Math.random());
            
            
            if (blankOrNoBlank || i === 0 || i === this.fullWord.length-1) {
                $("#wordblank").append(
                    `<input type="text" class="wordtype" maxlength="1" value="${word}">`
                )
                wordDict[i] = true;
            } else {
                $("#wordblank").append(
                    `<input type="text" class="wordtype" maxlength="1" value="">`
                )
                wordDict[i] = false;
                count += 1
            }            
            
        }
    
        $("#easy").off('click')
    
        if (!Object.values(wordDict).includes(false) || count != halfWord) {
            $("#wordblank").empty();
            count = 0;
            wordDict = {};
            this.divUpdateWithBlanks()
        }
    
    }


}


})

