let order = "ASK";
let taskList = []; // создаём массив, куда потом будем пушить и сортировать

const container = document.querySelector(".container")
const buttonSort = document.querySelector(".button-Sort") //получаем доступ к кнопке sort
const mainInput = document.querySelector(".main-input") //получаем доступ к первому инпуту
const buttonRound = document.querySelector(".button-round") //получаем доступ к главной кнопке
const addDiv = document.querySelector(".list-container") //доступ к диву, куда будем добавлять
const clearTask = document.querySelector(".clear-task") //доступ к очистке





clearTask.addEventListener("click", clearInput)
buttonRound.addEventListener("click", renderTask)
buttonSort.addEventListener("click", sortTask)
container.addEventListener("keyup", (event) => {
    console.log(event.key)
    if (event.key === "Enter") {
        renderTask();
    }
})

function clearInput() {
    mainInput.value = ""
}

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
      
        addDiv.append(conteiner)
        conteiner.draggable = "true";
        conteiner.classList.add("enter-block-1", "move")

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

    //Проверяем на пустое значение
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
    const inputValue = deleteDiv.querySelector("input")
    let gg = taskList.filter(item => item !== inputValue.value)
    taskList = [...gg]
    console.log(taskList)
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


        addDiv.append(conteiner)
        conteiner.draggable = "true";
        conteiner.classList.add("enter-block-1", "move")
        conteiner.append(newInput)
        newInput.value = taskList[index]
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


//Перенос объектов

//const tasksListElement = document.querySelector(`.tasks__list`);
//Добавляем и удаляем стили с объектов, которые переносим...
const tasksListElement = document.querySelector('.list-container');

const taskElements = tasksListElement.querySelectorAll('.conteiner');

for (const task of taskElements) {
    task.draggable = true;
}

tasksListElement.addEventListener('dragstart', (evt) => {
    evt.target.classList.add(`selected`);

    const allElements = document.querySelectorAll(".enter-block-1")

    allElements.forEach((item) => {
        console.log(item)
        item.classList.remove('enter-block-1')
        item.classList.add('enter-block-2')
    })

});

tasksListElement.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);


    const allElements = document.querySelectorAll(".enter-block-2")

    allElements.forEach((item) => {
        console.log(item)
        item.classList.remove('enter-block-2')
        item.classList.add('enter-block-1')
    })


});

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;

    return nextElement;
};

tasksListElement.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();

    const activeElement = tasksListElement.querySelector(`.selected`);
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement
    if (!isMoveable) {
        return;
    }

    const nextElement = getNextElement(evt.clientY, currentElement);

    if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
    ) {
        return;
    }

    tasksListElement.insertBefore(activeElement, nextElement);
});



