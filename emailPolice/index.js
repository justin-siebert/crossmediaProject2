const textContainer = document.querySelector("#textContainer");
const main = document.querySelector("main");
const textArea = document.querySelector("textArea");

const signs = [".", ",", "!", "?", "+", "-", ";", ":"]
const checkLength = []
async function sendEmail() {
    if(!textArea.value){
        alert("Fält får inte lämnas tom")
        return
    }

    for (let x of textArea.value.split(" ")){
        if(!signs.includes(x)){
            checkLength.push(x)
        }
    }

    if(checkLength.length < 10){
        alert("Skriv minst 10 ord")
        return
    } else {
        main.innerHTML = "";
        textContainer.textContent = ""
        const answer = "Uppfattat.Gör nånting åt det.Mvh Chefen"
        await typeOutSlowly(["FRÅN:", "CHEFEN"])
        await typeOutSlowly(["TILL:", "UNDERCOVER POPO"])
        await typeOutSlowly(["ÄMNE:", "Uppdatering Infiltrering"])
        await typeOutSlowly("----------------------------")
        await typeOutSlowly(answer.split(" "))
        // När mejlet har "skickats" (t.ex. vid klick på skicka-knappen)
        localStorage.setItem("emailTaskDone", "true");

        setTimeout(()=>{
            window.location.href = "../index.html";
        }, 500)
    }

}


// -------------------------- TEXT ---------------------------
let count = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeOutSlowly(words) {
    const div = document.createElement("div");
    textContainer.appendChild(div);
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

let text = "Rapportera läget tillbaka till din chef. Skriv ett mejl om vad du såg."
