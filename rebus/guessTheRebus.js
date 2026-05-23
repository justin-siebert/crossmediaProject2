const rebusArray = [
    {
        word1: "../bilder/emojies/pine-tree.png",
        word2: "../bilder/emojies/apple.png",
        correctAnswer: "pineapple",
        hint: "A tropical fruit with a spiky top"

    },
    {
        word1: "../bilder/emojies/butter.png",
        word2: "../bilder/emojies/fly.png",
        correctAnswer: "butterfly",
        hint: "Comes in different colors and patterns"

    },
    {
        word1: "../bilder/emojies/fire.png",
        word2: "../bilder/emojies/golden-retriever.png",
        correctAnswer: "hotdog",
        hint: "A popular food at baseball games"

    },
    {
        word1: "../bilder/emojies/pagophagia.png",
        word2: "../bilder/emojies/scream.png",
        correctAnswer: "icecream",
        hint: "A cold sweet treat"

    },
    {
        word1: "../bilder/emojies/sunny.png",
        word2: "../bilder/emojies/flower.png",
        correctAnswer: "sunflower",
        hint: "A tall yellow bloom"

    },
    {
        word1: "../bilder/emojies/stack-of-books.png",
        word2: "../bilder/emojies/worm.png",
        correctAnswer: "bookworm",
        hint: "Someone who loves to read"

    },
    {
        word1: "../bilder/emojies/dunes.png",
        word2: "../bilder/emojies/package.png",
        correctAnswer: "sandbox",
        hint: "Where children play at the playground"

    }
]

const body = document.querySelector("body");
const gamingArea = document.querySelector(".gamingArea");
const guessTheRebus = document.querySelector(".guessTheRebus");
const img1 = document.querySelector("#rebusImage1");
const img2 = document.querySelector("#rebusImage2");
const answerSection = document.querySelector(".answerSection");
const guessBtn = document.createElement("button");
const hintBtn = document.createElement("button");
const revealBtn = document.createElement("button");
const nextBtn = document.createElement("button");
const phoneDiv = document.querySelector(".phone");
const actionsButtonsDiv = document.querySelector(".actionButtonsDiv");
const hintMessage = document.querySelector(".hintMessage");
const hintTrackerForUser = document.getElementById("hintTrackerForUser");
const revealTrackerForUser = document.getElementById("revealTrackerForUser");

const overlayMessageDiv = document.createElement("div");
const victoryMessageDiv = document.createElement("div");
const victoryMessageText = document.createElement("p");
const correctAnswerText = document.createElement("p");
const img = document.createElement("img");
const excitedMessage = document.createElement("p");
const startBtn = document.createElement("button");
const introText = document.createElement("p");
const userScript = document.createElement("p");

const wrongAnswerDiv = document.createElement("div");
const wrongAnswerText = document.createElement("p");
wrongAnswerDiv.appendChild(wrongAnswerText);

overlayMessageDiv.classList.add("overlayMessageDiv");
victoryMessageDiv.classList.add("victoryMessageDiv");
victoryMessageText.classList.add("victoryMessageText");
correctAnswerText.classList.add("correctAnswerText");
img.classList.add("mogelostenFinalPage");
excitedMessage.classList.add("textStyling");
introText.classList.add("textStyling");
introText.id = "introText";
userScript.classList.add("textStyling");
userScript.id = "userScript";

wrongAnswerDiv.classList.add("wrongAnswerDiv");
wrongAnswerText.classList.add("wrongAnswerText");

nextBtn.id = "nextButton";
nextBtn.classList.add("actionButtons");
nextBtn.textContent = "NEXT REBUS";

startBtn.id = "startBtn";
startBtn.classList.add("actionButtons");
startBtn.textContent = "START GAME";

revealBtn.id = "revealBtn";
revealBtn.classList.add("actionButtons")
revealBtn.textContent = "REVEAL"

guessBtn.id = "guessBtn";
guessBtn.classList.add("actionButtons");
guessBtn.textContent = "GUESS";

hintBtn.id = "hintBtn";
hintBtn.classList.add("actionButtons");
hintBtn.textContent = "HINT";

let currentIndex = 0;
let revealTracker = 0;
let finishedTracker = false;
let hintTracker = 0;
let hintsLeft = 2;
let revealsLeft = 2;
let currentRebus = undefined;
let revealedNow = false;

hintTrackerForUser.textContent = `Hints left: ${hintsLeft}`;
revealTrackerForUser.textContent = `Reveals left: ${revealsLeft}`;

//Fixa så man ej behöver scrolla upp varje gång getVictoryOverlay laddas! Mobilanpassa skiten!

function checkAnswer() {

    console.log(revealedNow, "ordet har avslöjats")

    if (revealTracker === 1) {
        revealBtn.disabled = false;
    }

    if (phoneDiv.contains(wrongAnswerDiv)) {
        phoneDiv.removeChild(wrongAnswerDiv);
    }
    const inputs = document.querySelectorAll(".inputBox");
    let userGuess = "";

    inputs.forEach(input => {
        userGuess += input.value;

        console.log(userGuess, "användarens gissning")
    });

    userGuess = userGuess.toLowerCase()

    if (userGuess === rebusArray[currentIndex].correctAnswer) {
        console.log("Rätt!")
        console.log(currentIndex);

        if (currentIndex === 6) {
            finishedTracker = true;
        }

        if (finishedTracker) {
            getFinishedPage();
        }

        currentIndex++

        if (revealedNow) {
            getNewImages();
            checkHintAndRevealTrackers();
            revealedNow = false;
        } else {
            getVictoryOverlay();
        }

    }
    else {
        getFailureMessage();
    }
}

function getFinishedPage() {
    phoneDiv.innerHTML = "";
    img.classList.add("blinking_mogelost");

    img.src = "../bilder/glad_mogelost.png";

    excitedMessage.textContent = "YES!! Vi gjorde det, vi hann före! Tack snälla, du är bäst!"
    phoneDiv.appendChild(excitedMessage);
    phoneDiv.appendChild(img);

    localStorage.setItem("rebusTaskDone", "true");

    setTimeout(() => {
        img.classList.remove("blinking_mogelost");
        img.src = "../bilder/mogelosten_armar_i_kors.png";
        excitedMessage.textContent = "Ehm, uh jag menar tack antar jag..."

        playDialogue()
    }, 3000);


    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function playDialogue() {
        await wait(3000);
        excitedMessage.textContent = "Åh det är så drygt att vi har möten hela tiden.";

        await wait(2000);
        excitedMessage.remove();
        phoneDiv.appendChild(userScript)
        userScript.textContent = "*Du*: Om vad?";

        await wait(3000);
        userScript.remove();
        phoneDiv.insertBefore(excitedMessage, img);
        excitedMessage.textContent = "Alltså jag borde egentligen inte berätta det för dig eftersom du är ny och så... men du har ju förtjänat mitt förtroende...";

        await wait(6000);
        excitedMessage.textContent = "Det är stora saker på gång. Vi ska få veta mer om det från Bossen ikväll. Bossen är paranoid så vi måste mötas på olika ställen varje gång för att ingen ska vara oss på spåren.";

        await wait(4000);
        excitedMessage.remove();
        phoneDiv.appendChild(userScript);
        userScript.textContent = "*Du*: Var ska ni träffas den här gången då?";

        await wait(4000);
        userScript.remove();
        phoneDiv.insertBefore(excitedMessage, img)
        excitedMessage.textContent = "Bara några minuter härifrån, vid Soliga kvarteret heter det. Aight, har sagt för mycket redan. Ses!";

        await wait(5000);

        const repeatConversationBtn = document.createElement("button");
        repeatConversationBtn.textContent = "REPETERA KONVERSATIONEN";
        repeatConversationBtn.id = "repeatConversationBtn";
        repeatConversationBtn.classList.add("actionButtons");
        phoneDiv.appendChild(repeatConversationBtn);

        img.remove();
        excitedMessage.textContent = "Ta dig till Soliga kvarteret nu på en gång, 55.611321, 12.973578! "

        repeatConversationBtn.addEventListener("click", () => {
            getFinishedPage();
        })

        const backToMenuBtn = document.createElement("button");
        backToMenuBtn.textContent = "TILL HUVUDMENYN";
        backToMenuBtn.classList.add("actionButtons");
        backToMenuBtn.style.marginTop = "20px";
        phoneDiv.append(backToMenuBtn)

        backToMenuBtn.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }


}




function getVictoryOverlay() {
    victoryMessageText.textContent = "CORRECT!";
    correctAnswerText.textContent = `The answer was: ${rebusArray[currentIndex].correctAnswer}`;
    victoryMessageDiv.appendChild(victoryMessageText);
    overlayMessageDiv.appendChild(victoryMessageDiv);
    overlayMessageDiv.appendChild(nextBtn);
    body.appendChild(overlayMessageDiv);
}

function removeVictoryOverlay() {
    overlayMessageDiv.innerHTML = "";
    body.removeChild(overlayMessageDiv);
}

function getFailureMessage() {
    phoneDiv.insertBefore(wrongAnswerDiv, actionsButtonsDiv)
    wrongAnswerText.textContent = "Not quite, try again!";
}

function getHint() {
    hintTracker++

    hintsLeft--;
    hintTrackerForUser.textContent = `Hints left: ${hintsLeft}`;
    const hintText = document.createElement("span");
    const hintSpan = document.createElement("span");

    hintSpan.classList.add("hintMessage");
    hintText.classList.add("hintMessage");
    hintText.id = "hintText";
    hintSpan.id = "hintSpan";
    hintText.textContent = rebusArray[currentIndex].hint;
    hintSpan.textContent = "HINT: "

    hintSpan.appendChild(hintText);
    gamingArea.appendChild(hintSpan);
}

function revealAnswer() {
    revealBtn.disabled = true;
    hintBtn.disabled = true;
    revealTracker++
    revealedNow = true;

    revealsLeft--;
    revealTrackerForUser.textContent = `Reveals left: ${revealsLeft}`;

    if (revealTracker > 0) {
        const inputBoxesList = document.querySelectorAll(".inputBox");

        inputBoxesList.forEach((box, index) => {

            if (index < rebusArray[currentIndex].correctAnswer.length) {
                box.value = rebusArray[currentIndex].correctAnswer[index];
            }
        });
        guessBtn.textContent = "Next rebus";
    }
}

function getInputBoxes(rebus) {
    answerSection.innerHTML = "";
    const allInputBoxes = [];

    for (let i = 0; i < rebus.correctAnswer.length; i++) {
        const inputBox = document.createElement("input");
        inputBox.maxLength = 1;
        inputBox.classList.add("inputBox");

        inputBox.addEventListener("input", function () {
            if (this.value.length === 1) {
                const nextInput = this.nextElementSibling;
                if (nextInput && nextInput.classList.contains("inputBox")) {
                    nextInput.focus();
                }
            }
        });

        answerSection.appendChild(inputBox);
        allInputBoxes.push(inputBox);
    }

    if (allInputBoxes.length > 0) {
        allInputBoxes[0].focus();
    }
}

function getNewImages() {
    checkHintAndRevealTrackers();
    guessBtn.textContent = "GUESS";

    currentRebus = rebusArray[currentIndex];

    if (currentRebus) {

        if (currentIndex === 3) {
            getAgnetaMessage();
        }

        img1.src = currentRebus.word1;
        img2.src = currentRebus.word2;

        getInputBoxes(currentRebus)
    }

}

function checkHintAndRevealTrackers() {
    if (hintTracker >= 2) {
        hintBtn.disabled = true;
    } else {
        hintBtn.disabled = false;
    }

    if (revealTracker >= 2) {
        revealBtn.disabled = true;
    } else {
        revealBtn.disabled = false;
    }
}

function getAgnetaMessage() {
    const AgnetaMessage = document.createElement("p");
    AgnetaMessage.classList.add("AgnetaMessage");
    AgnetaMessage.textContent = "Skynda dig! Agneta är en rebus före dig!";

    phoneDiv.appendChild(AgnetaMessage);

    setTimeout(() => {
        AgnetaMessage.remove();
    }, 5000);
}

function rebusIntroductionPage() {
    introText.textContent = "Det är totalt 7 rundor som du behöver göra klart innan Agneta57 för att gå om henne i rankningen och bli rebusmästare! Du har två reveals och två hintar till hjälp. Lycka till!";

    gamingArea.classList.remove("active");
    phoneDiv.insertBefore(introText, actionsButtonsDiv);

    actionsButtonsDiv.innerHTML = "";
    actionsButtonsDiv.appendChild(startBtn);
}

function showGame() {
    if (introText) {
        introText.remove();
    }

    gamingArea.classList.add("active");
    gamingArea.style.display = "flex";

    actionsButtonsDiv.innerHTML = "";
    actionsButtonsDiv.appendChild(guessBtn);
    actionsButtonsDiv.appendChild(hintBtn);
    actionsButtonsDiv.appendChild(revealBtn);

    getNewImages();
}

nextBtn.addEventListener("click", () => {
    hintBtn.disabled = false;
    revealBtn.disabled = false;
    getNewImages();
    removeVictoryOverlay();
    revealedNow = false

})

guessBtn.addEventListener("click", () => {
    const hintSpanElementsToRemove = document.querySelectorAll(".hintMessage");
    console.log(hintSpanElementsToRemove, "span-element som ska tas bort inför nästa rebus")
    hintSpanElementsToRemove.forEach(span => span.remove());
    checkAnswer();
})

hintBtn.addEventListener("click", () => {
    hintBtn.disabled = true;
    getHint();
})

revealBtn.addEventListener("click", () => {
    console.log("Jag vill veta svaret!");
    revealAnswer();
})

startBtn.addEventListener("click", () => {
    showGame();
})

rebusIntroductionPage()
checkHintAndRevealTrackers()