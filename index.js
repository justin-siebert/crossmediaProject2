// --- KOORDINATER (Dina uppdaterade mål) ---
const locations = {
    phone: { lat: 55.610201, lon: 12.972288, key: "phoneUnlocked", name: "Telefonen" },
    bench: { lat: 55.610965, lon: 12.976365, key: "benchUnlocked", name: "Bänken" },
    electric: { lat: 55.611458, lon: 12.973549, key: "electricUnlocked", name: "Elskåpet" },
    cheese: { lat: 55.612034, lon: 12.972083, key: "cheeseUnlocked", name: "Cheese-gömman" },
    mic: { lat: 55.611321, lon: 12.973578, key: "micUnlocked", name: "Avlyssningsplatsen" },
    end: { lat: 55.610636, lon: 12.974856, key: "endUnlocked", name: "Gängträffen" }
};

const THRESHOLD = 30; 

document.addEventListener("DOMContentLoaded", () => {
    updateMenu();
});

function updateMenu() {
    console.log("Uppdaterar meny...")
    // 1. Artikel
    unlockIfDone("newspaperUnlocked", "nav-newspaper");

    // 2. Info Hittad tel (GPS)
    unlockIfDone("phoneUnlocked", "nav-phone");

    // 3. Videon (Efter PIN-kod)
    unlockIfDone("phoneTaskDone", "nav-video");

    // 4. Bänken/Hämta väska (GPS)
    unlockIfDone("benchUnlocked", "nav-bench");

    // 5. Mögelost uppdrag vid Elskåpet (Låses upp när man läst infon vid bänken)
    unlockIfDone("benchTaskDone", "nav-electric");

    // 6. Judy-spel / Hämta cheese (Låses upp via GPS-scan vid Cheese-gömman)
    // Spelaren får koordinaterna från Mögelost-sidan
    unlockIfDone("cheeseUnlocked", "nav-cheese");

    // 7. Rebus (Låses upp när Judy-spelet/Ostspelet är helt klart)
    // Här sparar du "cheeseTaskDone" inne i Judy-spelet
    unlockIfDone("cheeseTaskDone", "nav-rebus");

    // 8. Placera Mic (GPS)
    // unlockIfDone("cheeseTaskDone", "nav-rebus");

    // // 8. Hide Microphone (GPS-knappen låses upp när REBUSEN är klar)
    // unlockIfDone("rebusTaskDone", "nav-mic")
    unlockIfDone("micUnlocked", "nav-mic");

    // 9. Mejla Polis (Låses upp efter mic-uppdrag)
    unlockIfDone("micTaskDone", "nav-email");

    // 10. Gängträff (GPS)
    unlockIfDone("endUnlocked", "nav-end");
}

function unlockIfDone(storageKey, elementId) {
    const value = localStorage.getItem(storageKey);
    const btn = document.getElementById(elementId);
    
    console.log(`Kollar ${storageKey}: värde = ${value}, hittade knapp = ${btn !== null}`);

    if (value === "true") {
        if (btn) {
            btn.classList.remove("locked");
            console.log(`${elementId} är nu upplåst!`);
        }
    }
}

// --- GPS-LOGIK ---
function checkProximity() {
    if (!navigator.geolocation) return alert("Ingen GPS hittades.");

    navigator.geolocation.getCurrentPosition((position) => {
        const uLat = position.coords.latitude;
        const uLon = position.coords.longitude;
        let foundAny = false;

        for (let key in locations) {
            const loc = locations[key];
            const distance = calculateDistance(uLat, uLon, loc.lat, loc.lon);

            if (distance <= THRESHOLD) {
                // Spara upplåsningen
                localStorage.setItem(loc.key, "true");
                alert(`KONTAKT ETABLERAD: ${loc.name} identifierad!`);
                foundAny = true;
                break;
            }
        }

        if (foundAny) {
            updateMenu();
        } else {
            alert("Söker... Inga kända enheter i närheten. Kontrollera dina koordinater!");
        }
    }, (err) => alert("GPS-fel. Se till att platstjänster är på."), { enableHighAccuracy: true });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}