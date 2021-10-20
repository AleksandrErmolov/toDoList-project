let order = "ASK";
const taskList = []; // создаём массив, куда потом будем пушить и сортировать

const buttonSort = document.querySelector(".button-Sort") //получаем доступ к кнопке sort
const mainInput = document.querySelector(".main-input") //получаем доступ к первому инпуту
const buttonRound = document.querySelector(".button-round") //получаем доступ к главной кнопке
const addDiv = document.querySelector(".list-container") //доступ к диву, куда будем добавлять

buttonRound.addEventListener("click", renderTask)
buttonSort.addEventListener("click", sortTask)


//рисуем задачи
function renderTask() {
    //Очищаем документ перед добавлением    
    addDiv.innerHTML = ""

    //Вызываем функциию, для добавления элемента в Массив  
    addTask()

    //Бежим по массиву и выстраиваем наши таски
    taskList.forEach((element, index) => {

        const conteiner = document.createElement("div")
        const newInput = document.createElement("input")
        const newButton = document.createElement("button")
        addDiv.prepend(conteiner)
        conteiner.classList.add("enter-block")
        conteiner.append(newInput)
        newInput.value = taskList[index]
        newInput.classList.add("main-input")
        conteiner.append(newButton)
        newButton.addEventListener("click", deleteTask)
        newButton.classList.add("delete-task")
        mainInput.value = ""
    });
}


//Добавялем в массив значение главного инпута
function addTask() {
    let answear;

    if (mainInput.value.trim() === '') {
        answear = confirm("Вы ввели пустую строку. Вы уверены, что хотите добавить задачу?")
        if (answear) {
            taskList.push(mainInput.value)
        }
    } else {
        taskList.push(mainInput.value)
     }
    }


//Удаляем задачу
function deleteTask(event) {
    const deleteDiv = event.target.parentElement;
    deleteDiv.remove()
    taskList.pop()
}


function sortTask() {
    let sort;
    if (order === "ASK") {
        sort = sortAlphabet(taskList)
        order = "DESK"
        // buttonSort.style.backgroundImage = "url('./img/sortdown.svg')"
        buttonSort.classList.add("button-Sort")
        buttonSort.classList.remove("button-Sort-two")
    } else {
        // buttonSort.style.backgroundImage = "url('./img/sortUp.svg')"
        sort = sortBackAlphabet(taskList)
        order = "ASK"
        buttonSort.classList.add("button-Sort-two")
        buttonSort.classList.remove("button-Sort")
    }

    addDiv.innerHTML = ""
    //Бежим по массиву и выстраиваем наши таски
    sort.forEach((element, index) => {

        const conteiner = document.createElement("div")
        const newInput = document.createElement("input")
        const newButton = document.createElement("button")
        addDiv.prepend(conteiner)
        conteiner.classList.add("enter-block")
        conteiner.append(newInput)
        newInput.value = sort[index]
        newInput.classList.add("main-input")
        conteiner.append(newButton)
        newButton.addEventListener("click", deleteTask)
        newButton.classList.add("delete-task")
        mainInput.value = ""
    });
}

//Сортируем по алфавиту
function sortAlphabet(array) {
    let sort = array.sort((a, b) => {
        return b.charCodeAt(0) - a.charCodeAt(0)
    })
    return sort;
}

//Сортируем против алфавита
function sortBackAlphabet(array) {
    let sort = array.sort((a, b) => {
        return a.charCodeAt(0) - b.charCodeAt(0)
    })
    return sort;
}