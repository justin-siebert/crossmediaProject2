const buttons = document.querySelectorAll(".shootBtn");

// Vi antar att du har din sleep-funktion kvar:
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

buttons.forEach((b) => {
    b.addEventListener("click", async () => {
        await sleep(500)
        // 1. Starta ut-suddningen
        document.body.classList.add("scene-change");

        // Vänta tills animationen är klar (samma tid som i CSS, t.ex. 1.5s)
        await sleep(1500);

        // 2. Förbered "Boom"-scenen
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        document.body.innerHTML = `<h1 class="boom-text">💥 Boom 💥</h1>`;
        
        // Ta bort klassen för att tona in "Boom"
        document.body.classList.remove("scene-change");

        // Låt texten ligga kvar en stund
        await sleep(2000);

        // 3. Tona ut "Boom"
        document.body.classList.add("scene-change");
        await sleep(1500);

        // 4. Visa det sista meddelandet
        document.body.innerHTML = `
            <div style="text-align:center; max-width: 600px; font-size: 1.5rem;">
                Tydligen hade Mögelosten en bomb i väskan som du träffade. 
                <br><br>
                <span style="color: red;">Alla dog!</span>
            </div>
        `;
        
        // Tona in sista texten
        document.body.classList.remove("scene-change");
    });
});