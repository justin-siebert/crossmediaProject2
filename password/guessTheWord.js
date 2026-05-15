const body = document.getElementById("guessTheWord");
const enterButton = document.getElementById("confirmLetter");
const guessedLetterInput = document.getElementById("guessedLetter");
const gamingArea = document.getElementById("gamingArea");
const wrongLetter = document.getElementById("wrongLetter");
const triedAlready = document.getElementById("triedAlready");

let password = "bonollett"; 

let guessedLetters = JSON.parse(localStorage.getItem("guesses")) || [];

let arrayOfDiv = createGameField();
loadProgress(); // Körs direkt för att visa gamla gissningar

function createGameField() {
    gamingArea.innerHTML = ""; // Rensa om det finns gammalt
    let boxes = [];
    for (let l of password) {
        const div = document.createElement("div");
        div.textContent = "";
        div.classList.add("box");
        boxes.push(div);
        gamingArea.appendChild(div);
    }
    return boxes;
}

// Laddar sparade framsteg
function loadProgress() {
    guessedLetters.forEach(letter => {
        applyLetterToGame(letter);
    });
    checkWinCondition();
}

function applyLetterToGame(letter) {
    let found = false;
    for (let i = 0; i < password.length; i++) {
        if (password[i] === letter) {
            arrayOfDiv[i].textContent = letter.toUpperCase();
            arrayOfDiv[i].classList.add("correct");
            found = true;
        }
    }
    if (!found && !wrongLetter.textContent.includes(letter.toUpperCase())) {
        wrongLetter.textContent += letter.toUpperCase() + " ";
    }
}

function checkLetter(letter) {
    triedAlready.textContent = "";
    
    if (guessedLetters.includes(letter)) {
        triedAlready.textContent = `SYSTEM: Bokstaven ${letter.toUpperCase()} har redan testats.`;
        return;
    }

    guessedLetters.push(letter);
    localStorage.setItem("guesses", JSON.stringify(guessedLetters)); // SPARA
    
    applyLetterToGame(letter);
    checkWinCondition();
}

function checkWinCondition() {
    let allCorrect = arrayOfDiv.every((box) => box.classList.contains("correct"));
    if (allCorrect) {  
        alert("Vinst! Sparar nu...");   
        localStorage.setItem("newspaperUnlocked", "true")   
        setTimeout(() => {
            body.innerHTML = "<div class='success-msg'>ÅTKOMST BEVILJAD... ÖPPNAR FIL.</div>";
        }, 500);
        setTimeout(() => {
            window.location.href = "../newspaper/newspaper.html";
        }, 2500);
    }
}

enterButton.addEventListener("click", () => {
    const value = guessedLetterInput.value.toLowerCase();
    if (value.length === 1 && isNaN(value)) {
        checkLetter(value);
    }
    guessedLetterInput.value = "";
    guessedLetterInput.focus();
});