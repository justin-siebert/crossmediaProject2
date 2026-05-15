const main = document.querySelector("#firstMission");
let count = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeOutSlowly(words) {
    const div = document.createElement("div");
    main.appendChild(div);
    div.id = "textDivFirstMission"

    for (const word of words) {
        for (const letter of word) {
            div.textContent += letter

            if (letter === "." || letter === "...") {
                await sleep(300);
            } else {
                await sleep(40);
            }
        }

        const space = document.createElement("span");
        space.textContent = " ";
        div.appendChild(space);

        await sleep(100);
    }
}

window.addEventListener("keydown", async(event) => {
    if (event.key === "Enter" && count == 0){
        count++
        await typeOutSlowly(["FRÅN:", "Anonym_Källa_82"])
        await typeOutSlowly(["TILL:", "[REDAKTIONEN]"])
        await typeOutSlowly(["ÄMNE:", "Det som döljer sig under betongen..."])
        await typeOutSlowly(text.split(" "))
    }
})


let text = ` De sa att Bo01 var framtiden. Ekologisk hållbarhet, arkitektonisk briljans, en ny era för Malmö. Men de glömde berätta vad det kostade – och vem som egentligen betalade.
Jag har kommit över dokument som Percy Persson och hans 'elit' skulle göra vad som helst för att begrava. Miljonerna som rullade in under byggboomen försvann inte bara i dyra fasader. De tvättades rena i Öresunds vågor.
Du är den enda journalist jag litar på. Jag har lämnat fragment av sanningen utspridda i Västra Hamnen. Om du kan pussla ihop dem innan de hittar mig, så har vi århundradets scoop.
Börja vid Scaniaparken. Leta efter spåren de missade att städa bort.`