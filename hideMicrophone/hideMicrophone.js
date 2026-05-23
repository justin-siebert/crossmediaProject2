const clickMessage = document.createElement("p");
const microphone = document.querySelector("#microphoneImg");
const successText = document.createElement("p");
const br = document.createElement("br");
const phoneDiv = document.querySelector(".phone");

const backBtn = document.createElement("button");
backBtn.textContent = "RAPPORTERA TILL CHEFEN";
backBtn.classList.add("actionButtons");
backBtn.style.marginTop = "20px";

// NYTT: Skapa en knapp för att starta ljudet manuellt
const listenBtn = document.createElement("button");
listenBtn.textContent = "LYSSNA PÅ SAMTALET";
listenBtn.classList.add("actionButtons"); // Använder samma styling som dina andra knappar
listenBtn.style.marginTop = "15px";

// NYTT: Skapa en påminnelsetext om att slå på ljudet
const volumeReminder = document.createElement("p");
volumeReminder.classList.add("textStyling");
volumeReminder.style.color = "#ffcc00"; // Gul/Orange färg för att varna/påminna
volumeReminder.style.fontSize = "0.9rem";
volumeReminder.textContent = "⚠️ OBS! Se till att ha ljudet påslaget på din mobil.";

const audioTrack = new Audio("../ljud/overhearMeeting.mp3"); 

// Kontrollera status när sidan laddas
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("micTaskDone") === "true") {
        visaKlarStadie();
    } else {
        clickMessage.classList.add("textStyling");
        clickMessage.textContent = "Klicka på mikrofonen för att gömma den!";
        phoneDiv.prepend(clickMessage);
    }
});

// Om uppdraget redan är klart sedan tidigare
function visaKlarStadie() {
    microphone.classList.add("moveIntoStone"); 
    visaKoordinater("Du har redan gömt mikrofonen. Koordinaterna är:");
    phoneDiv.appendChild(backBtn); 
}

// Hjälpfunktion för att generera texten och Google Maps-länken
function visaKoordinater(meddelandeText) {
    successText.classList.add("textStyling");
    successText.textContent = meddelandeText;
    successText.appendChild(br);
    
    const coordSpan = document.createElement("span");
    coordSpan.innerHTML = '<a href="https://share.google/0UBij1seXQwrz3NWy" target="_blank" style="color: #34c759; text-decoration: none;">Ta dig till 55.610636, 12.974856</a>';
    coordSpan.style.fontWeight = "bold";
    coordSpan.style.display = "block";
    coordSpan.style.marginTop = "10px";
    successText.appendChild(coordSpan);
    
    phoneDiv.prepend(successText);
}

// 1. Klicka på mikrofonen för att gömma den
microphone.addEventListener("click", () => {
    if (localStorage.getItem("micTaskDone") === "true") return;

    clickMessage.remove();
    microphone.classList.add("moveIntoStone");

    // Istället för att spela direkt, visar vi instruktionerna, påminnelsen och lyssna-knappen
    setTimeout(() => {
        successText.classList.add("textStyling");
        successText.textContent = "Mikrofonen är säkrad i stenen. Avlyssningskanalen är redo.";
        
        phoneDiv.prepend(successText);
        phoneDiv.appendChild(volumeReminder); // Lägg till "Ha ljudet igång"
        phoneDiv.appendChild(listenBtn);     // Lägg till "LYSSNA PÅ SAMTALET"
    }, 800);
});

// 2. NYTT: När spelaren klickar på "LYSSNA PÅ SAMTALET"
listenBtn.addEventListener("click", () => {
    listenBtn.disabled = true; // Inaktivera knappen så man inte kan spamma den
    listenBtn.textContent = "AVLYSSNAR...";
    volumeReminder.remove();   // Ta bort påminnelsen när ljudet väl är igång

    audioTrack.play().catch(error => {
        console.log("Fel vid uppspelning:", error);
        listenBtn.disabled = false;
        listenBtn.textContent = "FÖRSÖK IGEN";
    });
});

// 3. När ljudklippet har spelat klart
audioTrack.addEventListener("ended", () => {
    listenBtn.remove(); // Ta bort avlyssningsknappen
    
    setTimeout(() => {
        visaKoordinater("Avlyssningen klar! Ljudfilen har krypterats och laddats upp. Här är nästa koordinater:");
        phoneDiv.appendChild(backBtn); // Visa rapportknappen till chefen
    }, 500);
});

backBtn.addEventListener("click", () => {
    localStorage.setItem("micTaskDone", "true");
    window.location.href = "../index.html";
});