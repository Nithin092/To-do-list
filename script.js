let inputText = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");

function addTask() {
    let input = inputText.value.trim();
    if (input === "") {
        window.alert("Please enter task");
    } else {
        createTaskElement(input, false);
        inputText.value = "";
        updateCounter();
        saveData();
    }
}

function createTaskElement(taskText, isCompleted) {
    var li = document.createElement("li");

    li.innerHTML = `
        <label>
            <input type="checkbox" class="checkbox" ${isCompleted ? "checked" : ""}> 
            <span>${taskText}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </label>`;

    if (isCompleted) {
        li.classList.add("completed");
    }

    listContainer.appendChild(li);

    const checkbox = li.querySelector(".checkbox");
    const span = li.querySelector("span");
    const edtbtn = li.querySelector(".edit-btn");
    const deletebtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed");
        updateCounter();
        saveData();
    });

    edtbtn.addEventListener("click", function () {
        var update = prompt("Edit task:", span.textContent);
        if (update !== null && update.trim() !== "") {
            span.textContent = update.trim();
            li.classList.remove("completed");
            updateCounter();
            saveData();
        }
    });

    deletebtn.addEventListener("click", function () {
        li.remove();
        updateCounter();
        saveData();
    });
}

function updateCounter() {
    const completedCounter = document.querySelectorAll("li.completed").length;
    const uncompletedCounter = document.querySelectorAll("li:not(.completed)").length;
    document.getElementById("completed-counter").textContent = completedCounter;
    document.getElementById("uncompleted-counter").textContent = uncompletedCounter;
}

// 🔁 Save task data to localStorage
function saveData() {
    const tasks = [];
    const listItems = listContainer.querySelectorAll("li");
    listItems.forEach(li => {
        const text = li.querySelector("span").textContent;
        const completed = li.classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔁 Load and display tasks from localStorage
function showTask() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    listContainer.innerHTML = "";
    storedTasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
    updateCounter();
}

// 🚀 Load tasks when page loads
window.onload = showTask;
