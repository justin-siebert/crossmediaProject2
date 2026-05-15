const clickMessage = document.createElement("p");
const microphone = document.querySelector("#microphoneImg");
const successText = document.createElement("p");
const br = document.createElement("br");
const phoneDiv = document.querySelector(".phone");

// Skapa knappen för att gå tillbaka
const backBtn = document.createElement("button");
backBtn.textContent = "RAPPORTERA TILL CHEFEN";
backBtn.classList.add("actionButtons"); // Använd samma styling som dina andra knappar
backBtn.style.marginTop = "20px";

successText.classList.add("textStyling");
clickMessage.classList.add("textStyling");
clickMessage.textContent = "Klicka på mikrofonen för att gömma den!";

phoneDiv.prepend(clickMessage);

microphone.addEventListener("click", () => {
    clickMessage.remove();
    microphone.classList.add("moveIntoStone");

    successText.textContent = "En riktig rackare är du! Här är de nästa koordinaterna som du behöver för att ta dig vidare:";
    successText.appendChild(br);
    
    // Vi skapar en span för koordinaterna så de syns tydligt
    const coordSpan = document.createElement("span");
    coordSpan.textContent = "55.611321, 12.973578";
    coordSpan.style.fontWeight = "bold";
    coordSpan.style.display = "block";
    successText.appendChild(coordSpan);

    setTimeout(() => {
        phoneDiv.prepend(successText);
        phoneDiv.appendChild(backBtn); // Visa knappen efter att micken är gömd
    }, 1000);
});

// Logik för när man klickar på rapport-knappen
backBtn.addEventListener("click", () => {
    // 1. Spara att mikrofon-uppdraget är klart
    localStorage.setItem("micTaskDone", "true");

    // 2. Skicka spelaren tillbaka till menyn
    window.location.href = "../index.html";
});