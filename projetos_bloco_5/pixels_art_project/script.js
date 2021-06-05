window.onload = function () {
    
    /* let board = document.querySelectorAll(".pixel"); */
    let clearButton = document.querySelector("#clear-board");
    let setNumberTable = document.querySelector("#generate-board"); /* button */
    let numberTable = document.querySelector("#board-size"); /* input */
    let selectedColor = document.querySelector(".selected");
    let color1 = document.querySelector(".black");
    let color2 = document.querySelector(".orange");
    let color3 = document.querySelector(".pink");
    let color4 = document.querySelector(".blue");
    let boardTotal = document.querySelector("#pixel-board");

    /* Mudar a cor selecionada */
    color1.addEventListener("click", setSelectedColor);
    color2.addEventListener("click", setSelectedColor);
    color3.addEventListener("click", setSelectedColor);
    color4.addEventListener("click", setSelectedColor);

    function setSelectedColor() {
        let setColor = event.target;
        if (selectedColor !== setColor) {
            selectedColor.classList.remove("selected");
            setColor.classList.add("selected");
            selectedColor = document.querySelector(".selected");
        }
        return selectedColor;
    }

    /* Colocar cores aleatórias */
    /* https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Elementos_construtivos/Events */
    getRandomColors();
    
    /* Colocar cores aleatórias */
    /* https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Elementos_construtivos/Events */
    function getRandomColors () {
        let variable1 = Math.floor(Math.random()* 255) + 1;
        let variable2 = Math.floor(Math.random()* 255) + 1;
        let variable3 = Math.floor(Math.random()* 255) + 1;
        color2.style.backgroundColor = "rgb(" + variable1 + "," + variable2 + "," + variable3 + ")";
        color3.style.backgroundColor = "rgb(" + variable3 + "," + variable1 + "," + variable2 + ")";
        color4.style.backgroundColor = "rgb(" + variable2 + "," + variable3 + "," + variable1 + ")";
        console.log(color2);
        console.log(color3);
        console.log(color4);
        console.log(color4.style.backgroundColor);
    }

    /* Pintar quadro de pixels */
    selectPixel()
    function selectPixel () {
        let newBoard = document.querySelectorAll(".pixel");
        for (let index = 0; index < newBoard.length; index += 1) {
            newBoard[index].addEventListener("click", paintPixels);
        }
    }

    function paintPixels() {
        let setPixel = event.target;
        console.log(setPixel);
        let paintColor = window.getComputedStyle(document.querySelector(".selected")).backgroundColor;
        setPixel.classList.remove("black");
        setPixel.classList.remove("orange");
        setPixel.classList.remove("pink");
        setPixel.classList.remove("blue");
        setPixel.style.backgroundColor = paintColor;
        console.log(document.querySelector(".selected"));
        console.log(document.querySelector(".selected").style);
        console.log(paintColor);
        console.log(window.getComputedStyle(document.querySelector(".selected")).backgroundColor);
    }
    /* Style da classe é alterado apenas para o elemento e não é alterada a classe em si usando o classlist[1]*/

    /* Limpando o quadro de pixels */
    clearButton.addEventListener("click", clearPixels);
    
    function clearPixels() {
        let newBoard = document.querySelectorAll(".pixel");
        let numberOfPixels = newBoard.length;
        for (let index = 0; index < numberOfPixels; index += 1) {
            newBoard[index].style.backgroundColor = "rgb(255, 255, 255)";
        }
    }

    /* Definindo tamanho do quadro de pixels pelo usuário */
    setNumberTable.addEventListener("click", functionColection);

    function functionColection() {
        alertFunction();
        deleteBoard();
        createNewBoard();
    }

    function alertFunction() {
        let setNumberValue = numberTable.value;
        console.log(setNumberValue);
         if (setNumberValue < 1) {
            alert("Board inválido!");
        } else if (setNumberValue < 5) {
            numberTable.value = 5;
            alert("Número mínimo: 5!");
        } else if (setNumberValue > 50) {
            numberTable.value = 50;
            alert("Número máximo: 50!");
        }
    }

    function deleteBoard() {
        boardTotal.innerHTML = "";
        /*  for (index = 0; index < boardTotal.children.length; index += 1) {
            boardTotal.removeChild(boardTotal.children[index]);
        } */
    }

    function createNewBoard() {
        let setNumberValue = numberTable.value;
        if (setNumberValue >= 5 && setNumberValue <=50) {
            for (let index = 0; index < setNumberValue; index += 1) {
                let newLine = document.createElement("div");
                boardTotal.appendChild(newLine);
                newLine.setAttribute("class", "line");
                let setColumn = document.querySelectorAll(".line");
                for (let jIndex = 0; jIndex < setNumberValue; jIndex += 1) {
                    let newColumn = document.createElement("div");
                    setColumn[index].appendChild(newColumn);
                    newColumn.setAttribute("class", "pixel");
                    console.log(newColumn);
                }
            }
            selectPixel();
        }
    }
}