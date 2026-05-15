// --- Gemensamma variabler ---
const pincode = ["1", "3", "1", "2"];
let userChosenPin = [];
let wrongs = 0;

// --- SÄKERHETSKONTROLL: info.html ---
const mainContainer = document.querySelector("#phoneText");
if (mainContainer) {
    let message = "Du har hittat måltavlastens telefon. Enheten är krypterad och kräver en fyrsiffrig kod för att låsas upp. Inuti finns de koordinater och instruktioner du behöver för att gå vidare till nästa steg i uppdraget. Lås upp telefonen för att få din nästa order.";
    
    // Vi kör funktionen direkt
    typeOutSlowly(message.split(" "));
}

// --- SÄKERHETSKONTROLL: phoneGame.html ---
const numpad = document.querySelector(".numpad");
if (numpad) {
    const allButton = document.querySelectorAll("button");
    const dots = document.querySelectorAll(".dot");
    const dotContainer = document.querySelector("#dotContainer");

    allButton.forEach((b) => {
        b.addEventListener("click", async () => {
            if (Number(b.textContent) || b.textContent == "0") {
                if (userChosenPin.length < 4) userChosenPin.push(b.textContent);
            }
            if (b.textContent == "⌫" && userChosenPin.length > 0) {
                userChosenPin.pop();
            }

            dots.forEach((d, index) => {
                d.style.backgroundColor = index < userChosenPin.length ? "black" : "white";
            });

            if (userChosenPin.length === 4) {
                const isCorrect = userChosenPin.join('') === pincode.join('');
                if (isCorrect) {
                    localStorage.setItem("phoneTaskDone", "true");
                    setTimeout(() => {
                        const img = document.querySelector("img");
                        numpad.classList.add("displayNone");
                        if(dotContainer) dotContainer.classList.add("displayNone");
                        if(img) img.classList.remove("displayNone");
                    }, 200);
                    // Här kan video-logik läggas till senare
                } else {
                    handleWrongPin();
                }
            }
        });
    });
}

function handleWrongPin() {
    wrongs++;
    const dotContainer = document.querySelector("#dotContainer");
    if (dotContainer) dotContainer.classList.add('shake-error');
    
    setTimeout(() => {
        if (dotContainer) dotContainer.classList.remove('shake-error');
        userChosenPin = [];
        document.querySelectorAll(".dot").forEach(d => d.style.backgroundColor = "white");
    }, 500);

    if (wrongs == 5) alert("Tips: Vi gillar inte polisen");
    if (wrongs == 10) alert("Lösenordet är 1312!");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeOutSlowly(words) {
    const container = document.getElementById("phoneText");
    if (!container) return;

    // Felsäkring: Om textDivFirstMission inte finns i HTML, skapa den här
    let div = document.getElementById("textDivFirstMission");
    if (!div) {
        div = document.createElement("div");
        div.id = "textDivFirstMission";
        container.appendChild(div);
    }
    
    div.textContent = "";
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    div.appendChild(cursor);

    for (const word of words) {
        for (const letter of word) {
            cursor.before(letter);
            if (letter === "." || letter === "!" || letter === "?") {
                await sleep(500);
            } else {
                await sleep(40);
            }
        }
        cursor.before(" ");
        await sleep(20);
    }
    
    // Visa knappen (oavsett om den heter startBtn eller är en vanlig knapp)
    const btn = document.querySelector("button[onclick='startGame()']");
    if (btn) btn.style.display = "block";
}