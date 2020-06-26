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