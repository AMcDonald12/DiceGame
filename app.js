const dieSides = {
    1 : 'images/one.png',
    2 : 'images/two.png',
    3 : 'images/three.png',
    4 : 'images/four.png',
    5 : 'images/five.png',
    6 : 'images/six.png'
};

//Initialize number bank
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
    freeze () {
        this.frozen = !this.frozen;
        if (this.frozen == true) {
            this.outline.style.borderColor = '#FFEB32';
        }
        else {
            this.outline.style.borderColor = '#131313';
        }
    }
}

//Initialize dice
let dieOne = new Dice(3, dieSides[3], false, dieOneElem, dieOneOutline);
let dieTwo = new Dice(4, dieSides[4], false, dieTwoElem, dieTwoOutline);

//initilize attmept counter and roll total
let attempt = 1;
let total = 7;

//Main Game Loop
rollBtn.addEventListener("click", function() {
    if (attempt == 1) {
        dieOne.roll();
        dieTwo.roll();
        total = dieOne.value + dieTwo.value;
        console.log(`Total: ${total}`);
        attempt += 1;
        commentary.textContent = `Total is ${total}. Roll one more time!`
    }
    else {
        dieOne.roll();
        dieTwo.roll();
        total = dieOne.value + dieTwo.value;
        console.log(`Total: ${total}`);
        attempt -= 1;
        if (uniqueNumbers.includes(total)) {
            let totalIndex = uniqueNumbers.indexOf(total);
            rolledNumbers.push(uniqueNumbers.splice(totalIndex, 1));
            console.log(uniqueNumbers);
            console.log(rolledNumbers);
            commentary.textContent = `You rolled a ${total}. Great! Keep going!`;
        }
        else {
            commentary.textContent = `You alread rolled a ${total}. Game over.`;
            //Gamover screen
        }
    }  
})