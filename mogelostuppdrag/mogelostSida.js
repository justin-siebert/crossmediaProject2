document.addEventListener("DOMContentLoaded", function() {
    const knapp = document.getElementById("mogelBtn");
    const sida1 = document.getElementById("mogelOstSida1");
    const sida2 = document.getElementById("mogelOstSida2");
    const sida3 = document.getElementById("mogelOstSida3");
    const sida4 = document.getElementById("mogelOstSida4");
    const sida5 = document.getElementById("mogelOstSida5");
    const vaskaBild = document.getElementById("vaskaBild");
    const mogelinfo2 = document.getElementById("mogelinfo2");
    const mogelBtnSida3 = document.getElementById("mogelBtnSida3");
    const skickaBtn = document.getElementById("skickaBtn");

    // Sida 1 → Sida 2
    knapp.addEventListener("click", function() {
        sida1.classList.add("displayNone");
        sida2.classList.remove("displayNone");
    });

    // Klick på väskan
    vaskaBild.addEventListener("click", function() {
        mogelinfo2.style.top = "255px";
        mogelinfo2.style.left = "15px";
        mogelinfo2.querySelector("p").textContent = "Bra jobbat!";

        const nyKnapp = document.createElement("button");
        nyKnapp.textContent = "FORTSÄTT";
        nyKnapp.id = "fortsattKnapp";
        mogelinfo2.appendChild(nyKnapp);

        // Fortsätt knapp → Sida 3
        nyKnapp.addEventListener("click", function() {
            sida2.classList.add("displayNone");
            sida3.classList.remove("displayNone");
        });
    });

    // Sida 3 → Sida 4
    mogelBtnSida3.addEventListener("click", function() {
        sida3.classList.add("displayNone");
        sida4.classList.remove("displayNone");
    });

    // Sida 4 → Sida 5
    skickaBtn.addEventListener("click", function() {
        const videoUpload = document.getElementById("videoUpload");

        if (videoUpload.files.length === 0) {
            alert("Du måste ladda upp ett bevis först! ");
            return;
        }

        localStorage.setItem("electricTaskDone", "true");

        sida4.classList.add("displayNone");
        sida5.classList.remove("displayNone");
    });
});