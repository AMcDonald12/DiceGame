const dieSides = {
    1 : 'images/one.png',
    2 : 'images/two.png',
    3 : 'images/three.png',
    4 : 'images/four.png',
    5 : 'images/five.png',
    6 : 'images/six.png'
};

const colorList = ['#2285EB','#FFEB32','#AB47BB']

//Initialize number banks
let uniqueNumbers = [2,3,4,5,6,7,8,9,10,11,12];
let rolledNumbers = [];

//get elements to be changed
const numberOfSides = Object.keys(dieSides).length;
const rollBtn = document.getElementById("roll-btn");
const dieOneElem = document.getElementById("dieone");
const dieOneOutline = document.getElementById("outline1");
const dieTwoElem = document.getElementById("dietwo");
const dieTwoOutline = document.getElementById("outline2");
const commentary = document.getElementById("comm");

//Dice class to control each die object seperately during game
class Dice {
    constructor(value, image, frozen, element, outline) {
        this.value = value;
        this.image = image;
        this.frozen = frozen;
        this.element = element;
        this.outline = outline;
    }
    roll() {
        if (this.frozen == false) {
            this.value = Math.floor(Math.random() * numberOfSides) + 1;
            this.image = dieSides[this.value];
            this.element.src = this.image;
            console.log(this.value);
        }
    }
    //this method is linked in the html on the img elements
    freeze () {
            this.frozen = !this.frozen;
            if (this.frozen == true) {
                this.outline.style.borderColor = '#FFEB32';
            }
            else {
                this.outline.style.borderColor = '#131313';
            }
    }
    unfreeze () {
        this.frozen = false;
        this.outline.style.borderColor = '#131313';
    }
}

//Initialize dice
let dieOne = new Dice(3, dieSides[3], false, dieOneElem, dieOneOutline);
let dieTwo = new Dice(4, dieSides[4], false, dieTwoElem, dieTwoOutline);

//initilize game variables
var attempt = 1;
let colorCounter = 0;
let gameOver = false;
let total = 7;

//Main Game Loop
rollBtn.addEventListener("click", function() {
    if (gameOver == false) {
        //First attempt logic
        if (attempt == 1) {
            dieOne.roll();
            dieTwo.roll();
            total = dieOne.value + dieTwo.value;
            console.log(`Total: ${total}`);
            attempt += 1;
            commentary.textContent = `Total is ${total}. Roll one more time!`
        }
        //Second attempt logic
        else {
            dieOne.roll();
            dieTwo.roll();
            total = dieOne.value + dieTwo.value;
            console.log(`Total: ${total}`);
            attempt -= 1;
            
            //If second attmept rolls a new number:
            if (uniqueNumbers.includes(total)) {
                
                //update data structures
                let totalIndex = uniqueNumbers.indexOf(total);
                rolledNumbers.push(uniqueNumbers.splice(totalIndex, 1));
                console.log(rolledNumbers);
                //update interface
                commentary.textContent = `You rolled ${total}. Great! You have two rolls for the next number...`;
                var numberToColor = document.getElementById(`n${total}`);
                numberToColor.style.color = colorList[colorCounter];
                
                //reset dice
                dieOne.unfreeze();
                dieTwo.unfreeze();
                
                //rotate through colors
                if (colorCounter < 2){
                    colorCounter += 1;
                }
                else {
                    colorCounter = 0;
                }

                //check for win condition
                if (rolledNumbers.length == 11) { 
                    commentary.textContent = 'Congratulations! You Win!';
                    gameOver = true;
                    dieOneOutline.style.borderColor = '#39FF14';
                    dieTwoOutline.style.borderColor = '#39FF14';
                    rollBtn.textContent = 'play again';
                    rollBtn.style.backgroundColor = '#39FF14';
                }
            }
            //If you roll a repeat number GAMEOVER
            else {
                commentary.textContent = `You alread rolled ${total}. Game over.`;
                gameOver = true;
                dieOneOutline.style.borderColor = '#E93F33';
                dieTwoOutline.style.borderColor = '#E93F33';
                rollBtn.textContent = 'try again';
                rollBtn.style.backgroundColor = '#E93F33';
            }
        }
    }
    //Reset game after win or loss 
    else {
        location.reload();
    }
})