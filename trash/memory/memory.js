const memoryContainer = document.getElementById("memoryContainer")
const colors = ["blue", "green", "red", "yellow", "tomato", "beige", "aqua", "purple", "pink", "orange", "violet"];

function createDiv (){
    let blocks = []
    for (let block of colors){
        const div = document.createElement("div")
        div.classList.add("block", "flipped")
        div.textContent = block

        blocks.push(div)
    }

    return blocks
}

function randomDoubleColor (){
    const color = colors[Math.floor(Math.random() * colors.length)]
    const div = document.createElement("div")
    div.classList.add("block", "flipped")
    div.textContent = color

    return div
}

let allblocks = createDiv()
const doubleColor = randomDoubleColor()
allblocks.push(doubleColor) // array borde shufflas här 

let targets = [];

for (let div of allblocks){
    memoryContainer.appendChild(div)
    div.addEventListener("click", (event) => {
        if (event.target.classList.contains("flipped")) {
            div.style.backgroundColor = div.textContent
            event.target.classList.remove("flipped")   
            targets.push(event.target)
        }
        if (targets.length === 2){
            if (targets[0].textContent === targets[1].textContent){
                setTimeout(() =>{
                    alert("yippie")
                    targets = []
                }, 300)
            } else {
                    setTimeout(() => {
                        for (let d of targets) {
                            d.classList.add("flipped");
                            d.style.backgroundColor = "white"; // Glöm inte att nollställa färgen här också!
                        }
                        targets = []; // Rensa först efter att de vänts tillbaka
                    }, 500);    
            }
        }
    })
}


