document.addEventListener("DOMContentLoaded", function() {
    const spelIntro = document.getElementById("spelIntro");
    const mogelSpel = document.getElementById("mogelSpel");
    const korBtn = document.getElementById("korBtn");
    const osten = document.getElementById("osten");
    const poangEl = document.getElementById("poang");
    const timerEl = document.getElementById("timer");
    const spelSlut = document.getElementById("spelSlut");
    const slutText = document.getElementById("slutText");
    const goraOmBtn = document.getElementById("goraOmBtn");

    // Intro → Spelet
    korBtn.addEventListener("click", function() {
        spelIntro.classList.add("displayNone");
        mogelSpel.classList.remove("displayNone");
        startaSpel();
    });

    function startaSpel() {
        let poang = 0;
        let tidKvar = 25;

        // återställ
        osten.style.display = "block";
        spelSlut.classList.add("displayNone");
        poangEl.textContent = "0";
        timerEl.textContent = "25";

        function flyttaOsten() {
            const maxX = window.innerWidth - 80;
            const maxY = window.innerHeight - 80;
            osten.style.left = Math.floor(Math.random() * maxX) + "px";
            osten.style.top = Math.floor(Math.random() * maxY) + "px";
        }

        flyttaOsten();

        const klickHandler = function() {
            poang++;
            poangEl.textContent = poang;
            flyttaOsten();

            if (poang >= 30) {
                clearInterval(interval);
                osten.removeEventListener("click", klickHandler);
                osten.style.display = "none";

                localStorage.setItem("cheeseTaskDone", "true");
                
                slutText.textContent = "Snyggt jobbat! Du klarade det!";
                spelSlut.classList.remove("displayNone");
                goraOmBtn.textContent = "Gå tillbaka till uppdragen";
                goraOmBtn.onclick = function() {
                    window.location.href = "../index.html";
                }
            }
        };

        osten.addEventListener("click", klickHandler);

        const interval = setInterval(function() {
            tidKvar--;
            timerEl.textContent = tidKvar;

            if (tidKvar <= 0) {
                clearInterval(interval);
                osten.removeEventListener("click", klickHandler);
                osten.style.display = "none";
                slutText.textContent = "Tiden tog slut! Du hann bara " + poang + "/30 klick!";
                spelSlut.classList.remove("displayNone");
                goraOmBtn.textContent = "Försök igen!";
                goraOmBtn.onclick = function() {
                    spelSlut.classList.add("displayNone");
                    startaSpel();
                };
            }
        }, 1000);
    }
});