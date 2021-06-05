window.onload = function () {

    let inputText = document.querySelector("#texto-tarefa");
    let createJob = document.querySelector("#criar-tarefa");
    let jobList = document.querySelector("#lista-tarefas"); /* ol */
    let clearAll = document.querySelector("#apaga-tudo");
    let removeDone = document.querySelector("#remover-finalizados");
    let saveJobs = document.querySelector("#salvar-tarefas");
    let moveTop = document.querySelector("#mover-cima");
    let moveBottom = document.querySelector("#mover-baixo");
    let removeSelected = document.querySelector("#remover-selecionado");
 
    /* Criar lista de tarefas */
    createJob.addEventListener("click", addElementList);

    function addElementList() {
        let textElement = inputText.value;
        if (textElement != "") {
            let elementInsert = document.createElement("li");
            elementInsert.innerText = textElement;
            elementInsert.setAttribute("class", "list");
            jobList.appendChild(elementInsert);
            elementInsert.addEventListener("click", hooverFunction);
            elementInsert.addEventListener("dblclick", strikeOut);
            /* elementInsert.addEventListener("dblclick", strikeOutRemove); */
            inputText.value = ""; 
        }
    }

    /* Mudar cor de fundo de item selecionado */
    function hooverFunction() {
        let setLineHoover = event.target;
        console.log(setLineHoover);
        let listItem = document.getElementsByTagName("li");
        console.log(listItem);
        for (index = 0; index < listItem.length; index += 1) {
            /* let listItem = document.getElementsByClassName("li"); */
            if (listItem[index].classList.contains("hoover")) {
                listItem[index].classList.remove("hoover");
                /* setLineHoover.classList.remove("list"); */
                setLineHoover.classList.add("hoover");
                /* usar classList.add */            
            } else {
                /* setLineHoover.classList.remove("list"); */
                setLineHoover.classList.add("hoover");
            }
        }
    }

    /* Riscar itens selecionados */
    function strikeOut() {
        let setJobDone = event.target;
        if (setJobDone.classList.contains("completed")) {
            setJobDone.classList.remove("completed");
            console.log(setJobDone);
        } else {
            setJobDone.classList.add("completed");
        }
    }

    /* Limpar lista inteira */
    clearAll.addEventListener("click", clearList);

    function clearList() {
        jobList.innerHTML = "";
    }

    removeDone.addEventListener("click", clearDone);

    /* Remover itens riscados */
    function clearDone() {
        let doneList = document.querySelectorAll(".completed");
        for (index = 0; index < doneList.length; index += 1) {
            doneList[index].remove();
        }
    }

    /* Mover para cima */
    moveTop.addEventListener("click", moveUpFunction);

    function moveUpFunction() {
        let selectionUp = document.querySelector(".hoover");
        if (selectionUp != null) {
            let aux = "";
            let firstItem = selectionUp.parentNode.firstElementChild;
            let previousSibling = selectionUp.previousElementSibling;
            console.log(firstItem);
            if (firstItem !== selectionUp) {
                aux = previousSibling.innerHTML;
                previousSibling.innerHTML = selectionUp.innerHTML;
                selectionUp.innerHTML = aux;
                if (selectionUp.classList.contains("completed")) {
                    selectionUp.classList.remove("hoover");
                    selectionUp.classList.remove("completed");
                    previousSibling.classList.add("hoover");
                    previousSibling.classList.add("completed");
                } else {
                    selectionUp.classList.remove("hoover");
                    previousSibling.classList.add("hoover");
                }
            }
        }
    }

    /* Mover para baixo */
    moveBottom.addEventListener("click", moveDownFunction);

    function moveDownFunction() {
        let selectionDown = document.querySelector(".hoover");
        if (selectionDown != null) {
            let aux = "";
            let nextSibling = selectionDown.nextElementSibling;
            let lastItem = selectionDown.parentNode.lastElementChild;
            if (lastItem !== selectionDown) {
                aux = nextSibling.innerHTML;
                nextSibling.innerHTML = selectionDown.innerHTML;
                selectionDown.innerHTML = aux;
                if (selectionDown.classList.contains("completed")) {
                    selectionDown.classList.remove("hoover");
                    selectionDown.classList.remove("completed");
                    nextSibling.classList.add("hoover");
                    nextSibling.classList.add("completed");
                } else {
                    selectionDown.classList.remove("hoover");
                    nextSibling.classList.add("hoover");
                }
            }
        }
    }
    
    /* Remover item selecionado */
    removeSelected.addEventListener("click", removeSelectedItem)

    function removeSelectedItem() {
        let itemToBeRemoved = document.querySelector(".hoover");
        itemToBeRemoved.remove();
    }

    getSavedList();

    function getSavedList() {
        console.log(jobList);
        if (localStorage.getItem("ListaTarefas") !== "undefined" || localStorage.getItem("ListaTarefas") !== "null") {
            jobList.innerHTML = localStorage.getItem("ListaTarefas");
            let elementInsert = document.querySelectorAll("li");
            for (index = 0; index < elementInsert.length; index += 1) {
                elementInsert[index].addEventListener("click", hooverFunction);
                elementInsert[index].addEventListener("dblclick", strikeOut);
            }
        }
    }

    saveJobs.addEventListener("click", saveList);

    /* Salvar lista de tarefas */

    function saveList() {
        localStorage.setItem("ListaTarefas", jobList.innerHTML);
        alert("Tarefas salvas");
    }

}             