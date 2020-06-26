// selectors
const addInput = document.querySelector(".task-input");
const addButton = document.querySelector(".task-add");
const tasksList = document.querySelector(".tasks-list");

// listeners
addButton.addEventListener("click", addTask);

tasksList.addEventListener("click", checkDelCompl);

document.addEventListener("DOMContentLoaded", getTasks);

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

    // save task name to local storage
    saveTasks(addInput.value);

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
    const task = event.target;

    // check if clicked on delete button
    if (task.classList[0] === "task-del") {
        task.parentElement.classList.toggle("deleted");

        // deletes task from local storage
        delStorageTask(task);

        // check if animation has ended
        task.parentElement.addEventListener("transitionend", function () {
            task.parentElement.remove();
        });
    }

    // check if clicked on completed button
    if (task.classList[0] === "task-compl") {
        task.parentElement.classList.toggle("completed");
    }
}

function saveTasks(task) {
    // check if local storage is empty
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    // append to tasks array
    tasks.push(task);

    // save array to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    // check if local storage is empty
    let tasks = [];
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        // create task item div
        const taskItemDiv = document.createElement("div");
        taskItemDiv.classList.add("task");

        // create task item li
        const taskItemLi = document.createElement("li");
        taskItemLi.innerText = task;
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
    });
}

function delStorageTask(task) {
    // check if local storage is empty
    let tasks = [];
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    // get the index of the task
    const taskIndex = task.parentElement.children[0].innerText;

    // remove item at the task index
    tasks.splice(tasks.indexOf(taskIndex), 1);

    // save the new tasks array
    localStorage.setItem("tasks", JSON.stringify(tasks));
}