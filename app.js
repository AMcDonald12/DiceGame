const dieSides = {
    1 : 'images/one.png',
    2 : 'images/two.png',
    3 : 'images/three.png',
    4 : 'images/four.png',
    5 : 'images/five.png',
    6 : 'images/six.png'
};

const numberOfSides = Object.keys(dieSides).length;
const rollBtn = document.getElementById("roll-btn");
const dieOne = document.getElementById("dieone");
const dieTwo = document.getElementById("dietwo");

let dieOneValue;
let dieTwoValue;

//EventListener and function for rolling the dice
rollBtn.addEventListener("click", function() {
    dieOneValue = rollDie();
    console.log(dieOneValue);
    dieTwoValue = rollDie();
    console.log(dieTwoValue);

    dieOne.src = dieSides[dieOneValue];
    dieTwo.src = dieSides[dieTwoValue];
})

function rollDie() {
    return Math.floor(Math.random() * numberOfSides) + 1;
}