window.onload = function() { 
    
    let color1 = document.querySelector("#firstColor");
    let color2 = document.querySelector("#secondColor");
    let color3 = document.querySelector("#thirdColor");
    let color4 = document.querySelector("#fourthColor");
    let color5 = document.querySelector("#fifthColor");
    let color6 = document.querySelector("#sixthColor");
    let fontRGB = document.querySelector("#rgb-color");
    let labelMessage = document.querySelector("#answer");
    let resetButton = document.querySelector("#reset-game");
    let labelScore = document.querySelector("#score");
    let initialValue = 0;

    generateRGB();

    function generateRGB() {
        color1.style.backgroundColor = "rgb(" + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + ")";
        color2.style.backgroundColor = "rgb(" + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + ")";
        color3.style.backgroundColor = "rgb(" + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + ")";
        color4.style.backgroundColor = "rgb(" + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + ")";
        color5.style.backgroundColor = "rgb(" + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + ")";
        color6.style.backgroundColor = "rgb(" + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + "," + (Math.floor(Math.random()* 255) + 1) + ")";
    } 
      
    openMessage();

    function openMessage() {
/*         fontRGB.innerText = "Escolha uma cor"; */
        labelMessage.innerText = "Escolha uma cor";
        labelScore.innerText = 0;
        getRGB();
    }

    function getRGB() {
        color1.classList.remove("selected");
        color2.classList.remove("selected");
        color3.classList.remove("selected");
        color4.classList.remove("selected");
        color5.classList.remove("selected");
        color6.classList.remove("selected");
        let selectColor = Math.floor(Math.random()* 6) + 1;
        switch (selectColor) {
        case 1: 
        color1.classList.add("selected");
        fontRGB.innerText = color1.style.backgroundColor;
        /* callBaseFunctions(); */
        case 2: 
        color2.classList.add("selected");
        fontRGB.innerText = color2.style.backgroundColor;
        /* callBaseFunctions(); */
        case 3:
        color3.classList.add("selected");
        fontRGB.innerText = color3.style.backgroundColor;
        /* callBaseFunctions(); */
        case 4:
        color4.classList.add("selected");
        fontRGB.innerText = color4.style.backgroundColor;
        /* callBaseFunctions() */
        case 5:
        color5.classList.add("selected");
        fontRGB.innerText = color5.style.backgroundColor;
        /* callBaseFunctions() */
        case 6:
        color6.classList.add("selected");
        fontRGB.innerText = color6.style.backgroundColor;
        /* callBaseFunctions() */
        }
    }

    color1.addEventListener("click", callMessage);
    color2.addEventListener("click", callMessage);
    color3.addEventListener("click", callMessage);
    color4.addEventListener("click", callMessage);
    color5.addEventListener("click", callMessage);
    color6.addEventListener("click", callMessage);

    function callMessage() {
        let setColor = event.target;
        if (setColor.classList.contains("selected")) {
            initialValue += 3;
            console.log(initialValue);
            labelScore.innerText = initialValue;
            localStorage.setItem("ScorePoints", labelScore.innerHTML);
            startAgain();
        } else {
            labelMessage.innerText = "Errou! Tente novamente!";
        }
    }

    resetButton.addEventListener("click", callBaseFunctions);

    function startAgain() {
        labelMessage.innerText = "Acertou!";
        generateRGB();
        getRGB()
        if (localStorage.getItem("ScorePoints") !== "undefined") {
            labelScore.innerHTML = localStorage.getItem("ScorePoints");
        }
    }

    function callBaseFunctions() {
        generateRGB();
        getRGB();
        labelMessage.innerText = "Escolha uma cor";
        if (localStorage.getItem("ScorePoints") !== "undefined") {
            labelScore.innerHTML = localStorage.getItem("ScorePoints");
        }
    }
}