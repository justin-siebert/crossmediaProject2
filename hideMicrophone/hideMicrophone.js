const clickMessage = document.createElement("p");
const microphone = document.querySelector("#microphoneImg");
const successText = document.createElement("p");
const br = document.createElement("br");
const phoneDiv = document.querySelector(".phone");

const backBtn = document.createElement("button");
backBtn.textContent = "RAPPORTERA TILL CHEFEN";
backBtn.classList.add("actionButtons");
backBtn.style.marginTop = "20px";

// NYTT: Kontrollera status när sidan laddas
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("micTaskDone") === "true") {
        visaKlarStadie();
    } else {
        clickMessage.classList.add("textStyling");
        clickMessage.textContent = "Klicka på mikrofonen för att gömma den!";
        phoneDiv.prepend(clickMessage);
    }
});

function visaKlarStadie() {
    microphone.classList.add("moveIntoStone"); // Antingen dölj den eller låt den vara i "gömt" läge
    
    successText.classList.add("textStyling");
    successText.textContent = "Du har redan gömt mikrofonen. Koordinaterna är:";
    successText.appendChild(br);
    
    const coordSpan = document.createElement("span");
    coordSpan.textContent = "55.610636, 12.974856";
    //coordSpan.innerHTML = '<a href="https://share.google/0UBij1seXQwrz3NWy" target="_blank">Ta dig till 55.610636, 12.974856</a>';
    coordSpan.style.fontWeight = "bold";
    coordSpan.style.display = "block";
    successText.appendChild(coordSpan);
    
    phoneDiv.prepend(successText);
}

microphone.addEventListener("click", () => {
    // Om det redan är klart, gör inget mer
    if (localStorage.getItem("micTaskDone") === "true") return;

    clickMessage.remove();
    microphone.classList.add("moveIntoStone");

    successText.textContent = "En riktig rackare är du! Här är de nästa koordinaterna:";
    successText.appendChild(br);
    
    const coordSpan = document.createElement("span");
    coordSpan.textContent = "55.610636, 12.974856";
    coordSpan.style.fontWeight = "bold";
    coordSpan.style.display = "block";
    successText.appendChild(coordSpan);

    setTimeout(() => {
        phoneDiv.prepend(successText);
        phoneDiv.appendChild(backBtn);
    }, 1000);
});

backBtn.addEventListener("click", () => {
    localStorage.setItem("micTaskDone", "true");
    window.location.href = "../index.html";
});