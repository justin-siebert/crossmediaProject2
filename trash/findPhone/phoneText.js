const main = document.querySelector("#phoneText");
let count = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeOutSlowly(words) {
    const div = document.createElement("div");
    main.appendChild(div);
    div.id = "textDivFirstMission"
    div.style.whiteSpace = "pre-wrap"; 

    for (const word of words) {
        for (const letter of word) {
            div.textContent += letter

            if (letter === "." || letter === "...") {
                div.textContent += "\n";
                await sleep(300);
            } else {
                await sleep(30);
            }
        }

        const space = document.createElement("span");
        space.textContent = " ";
        div.appendChild(space);

        await sleep(100);
    }
}

document.addEventListener("DOMContentLoaded", async(event) => {
    await typeOutSlowly(text.split(" "))
})

let text = "Du har hittat måltavlastens telefon. Enheten är krypterad och kräver en fyrsiffrig kod för att låsas upp. Inuti finns de koordinater och instruktioner du behöver för att gå vidare till nästa steg i uppdraget. Lås upp telefonen för att få din nästa order."

function startGame() {
    window.location.href = "phoneGame.html";
}

// ----------------------- PhoneGame ------------------------

const allButton = document.querySelectorAll("button")
const dots = document.querySelectorAll(".dot")

allButton.forEach((b) => {b.type ="button"})

const pincode = ["1", "3", "1", "2"];
let userChosenPin = [];

let wrongs = 0;

allButton.forEach( (b) =>{
    b.addEventListener("click", async () => {

        if(Number(b.textContent) || b.textContent == "0") {
            userChosenPin.push(b.textContent)
        }

        if(isNaN(b.textContent) && userChosenPin.length > 0){
            userChosenPin.pop()
        }

        dots.forEach((d, index) => {
            if (index < userChosenPin.length) {
                d.style.backgroundColor = "black";
            } else d.style.backgroundColor = "white";
        })
        
        if(userChosenPin.length === 4){
            const unlock = await checkPin(userChosenPin)

            if(unlock){
                
                setTimeout(() => {
                    const img = document.querySelector("img")
                    const dotContainer = document.querySelector("#dotContainer")
                    const phoneButtons = document.querySelector(".numpad")
                    phoneButtons.classList.add("displayNone")
                    dotContainer.classList.add("displayNone")
                    img.classList.remove("displayNone")
                }, 200)
                setTimeout( () => {
                    //något byte till video
                }, 3000)
            }

            else {
                wrongs++
                triggerErrorShake()
                if (wrongs == 5){
                    alert("Tips: Vi gillar inte polisen")
                }

                if (wrongs == 8){
                    alert("Tips: ACAB")
                }

                if (wrongs == 10){
                    alert("Lösenordet var fkn 1312! Hur fan lyckas du inte?? Telefonen är låst nu fattar du, usel åsna")
                }
            }


        }
    })
})


let counter = 0
function checkPin(array) {
    return new Promise((resolve) => {
        setTimeout(() => {
            for (let i = 0; i < array.length; i++){
                if(array[i] == pincode[i]){
                    counter++
                    if (counter == 4){
                        counter = 0
                        resolve(true)
                    }
                }
            }

            dots.forEach((d) => {d.style.background = "white"})
            counter = 0
            userChosenPin = []

            resolve(false)
        }, 300)
    })
}

function triggerErrorShake() {
    dotContainer.classList.add('shake-error');

    setTimeout(() => {
        dotContainer.classList.remove('shake-error');
    }, 500);
}