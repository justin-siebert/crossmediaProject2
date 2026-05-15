const body = document.getElementById("guessTheWord"); // hela diven som innehåller spelet
const enterButton = document.getElementById("confirmLetter");
const guessedLetterInput = document.getElementById("guessedLetter"); // INPUT
const gamingArea = document.getElementById("gamingArea") // Visar divar
const wrongLetter = document.getElementById("wrongLetter")
const triedAlready = document.getElementById("triedAlready")
const unlockedPic = document.getElementById("unlocked")

let password = "aa"
let arrayOfDiv = createGameField()

function createGameField () {
    let boxes = []
    for (let l of password){
        const div = document.createElement("div")
        div.textContent = ""
        div.classList.add("box")
        boxes.push(div)
        gamingArea.appendChild(div)
    }
    return boxes
}

function checkInput(inputValue) {
    if (inputValue.length === 1 && isNaN(inputValue)){
        console.log("Enter funkar")
        return inputValue         
    } 
    return false
}

function checkLetter(letter) {

    triedAlready.textContent = ""

    if (wrongLetter.textContent.includes(letter.toUpperCase())){
        triedAlready.textContent = `Du har redan testat ${letter.toUpperCase()}`
        return
    }

    if (!password.includes(letter)){
        wrongLetter.textContent += letter.toUpperCase()
    }
    

    for (let i = 0; i < password.length; i++) {
        if (password[i] === letter) {
            arrayOfDiv[i].textContent = letter.toUpperCase();
            arrayOfDiv[i].classList.add("correct")
        }
    }

    
}

enterButton.addEventListener("click", () => {
    const value = guessedLetterInput.value.toLowerCase();
    const letter = checkInput(value);

    if (!letter) return;

    checkLetter(letter);
    guessedLetterInput.value = "";

    let allCorrect = arrayOfDiv.every((box) => box.classList.contains("correct"))

    if (allCorrect){
        const newsPaperSection = document.querySelector("#newsPaperSection")
        setTimeout(() => {
            body.innerHTML = "";
            body.textContent = "Välkommen åter"
        }, 500)
        setTimeout( () => {
            window.location.href = "../newspaper/newspaper.html";
        }, 3000)
    }


    console.log(allCorrect)
});

console.log(arrayOfDiv)