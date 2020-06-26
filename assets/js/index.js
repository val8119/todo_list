// selectors
const addInput = document.querySelector(".task-input");
const addButton = document.querySelector(".task-add");
const tasksList = document.querySelector(".tasks-list");

// listeners
addButton.addEventListener("click", addTask);

tasksList.addEventListener("click", checkDelCompl);

// functions
function addTask(event) {
    event.preventDefault(); // stop refresh

    // create task item div
    const taskItemDiv = document.createElement("div");
    taskItemDiv.classList.add("task");

    // create task item li
    const taskItemLi = document.createElement("li");
    taskItemLi.innerText = addInput.value;
    taskItemLi.classList.add("task-text");

    // add list item to div
    taskItemDiv.appendChild(taskItemLi);

    // create completed button
    const taskCompletedButton = document.createElement("button");
    taskCompletedButton.innerHTML = '<i class="fas fa-check"></i>';
    taskCompletedButton.classList.add("task-compl");

    // add button to div
    taskItemDiv.appendChild(taskCompletedButton);

    // create delete button
    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    taskDeleteButton.classList.add("task-del");

    // add button to div
    taskItemDiv.appendChild(taskDeleteButton);

    // insert div into document
    tasksList.appendChild(taskItemDiv);

    // clear input box
    addInput.value = "";
}

function checkDelCompl(event) {
    const target = event.target;

    // check if clicked on delete button
    if (target.classList[0] === "task-del") {
        target.parentElement.classList.toggle("deleted");

        // check if animation has ended
        target.parentElement.addEventListener("transitionend", function () {
            target.parentElement.remove();
        });
    }

    // check if clicked on completed button
    if (target.classList[0] === "task-compl") {
        target.parentElement.classList.toggle("completed");
    }
}

function saveTasks(task) {
    // check
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}



/* OLD CODE

// variables
const addButton = document.querySelector(".task-add");
const addInput = document.querySelector(".task-input");
const taskText = document.querySelector(".task-test");
const tasksList = document.querySelector(".tasks-list");

var tasks = [];

// functions
function deleteTask() {
    for (var i = 0; i < delButton.length; i++) {
        delButton[i].onclick = function () {
            var listItemDiv = this.parentElement;
            listItemDiv.remove();
        }
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));

    for (var i in storedTasks) {
        tasks.push(storedTasks[i])
    }
}

function clearTasks() {
    var allTaskDivs = allTaskDivs = document.querySelectorAll(".task");

    allTaskDivs.forEach(function (div) {
        div.remove();
    });
}

function createTasks() {
    for (var i in tasks) {
        console.log(tasks[i]);

        var taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "task");

        var taskListEl = document.createElement("li");
        taskListEl.setAttribute("class", "task-text");
        taskListEl.innerHTML = tasks[i];

        var taskDelBtn = document.createElement("button");
        taskDelBtn.setAttribute("class", "task-del");
        taskDelBtn.innerHTML = ('<i class="fas fa-trash-alt"></i>');

        taskDiv.appendChild(taskListEl);
        taskDiv.appendChild(taskDelBtn);

        tasksList.appendChild(taskDiv);
    }
}

function addTask() {
    tasks.push(addInput.value);

    addInput.value = "";

    clearTasks();

    createTasks();

    saveTasks();
}

// listeners
window.onload = getTasks();

window.onload = createTasks();

addButton.addEventListener("click", addTask);

var delButton = document.getElementsByClassName("task-del");
for (var i = 0; i < delButton.length; i++) {
    delButton[i].onclick = function () {
        var listItemDiv = this.parentElement;
        listItemDiv.style.display = "none";

        console.log(tasks)

        console.log(i)

        tasks = tasks.splice(i, i);

        console.log(tasks)

        saveTasks();
    }
}

*/