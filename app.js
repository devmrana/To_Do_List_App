document.addEventListener("DOMContentLoaded", loadTasks);
        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(task => createTaskElement(task));
        }
        function addTask() {
            let taskInput = document.getElementById("taskInput");
            let taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Task cannot be empty!");
                return;
            }
            createTaskElement(taskText);
            saveTask(taskText);
            taskInput.value = "";
        }
        function createTaskElement(taskText) {
            let li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span>${taskText}</span>
                <div>
                    <button class="btn btn-sm btn-warning me-2" onclick="editTask(this)">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTask(this)">Delete</button>
                </div>
            `;
            document.getElementById("taskList").appendChild(li);
        }
        function saveTask(taskText) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        function editTask(button) {
            let newTask = prompt("Edit your task:", button.parentElement.previousElementSibling.innerText);
            if (newTask && newTask.trim() !== "") {
                let oldTask = button.parentElement.previousElementSibling.innerText;
                button.parentElement.previousElementSibling.innerText = newTask;
                updateLocalStorage(oldTask, newTask);
            }
        }
        function deleteTask(button) {
            let taskText = button.parentElement.previousElementSibling.innerText;
            if (confirm("Are you sure you want to delete this task?")) {
                button.parentElement.parentElement.remove();
                removeFromLocalStorage(taskText);
            }
        }
        function updateLocalStorage(oldTask, newTask) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let index = tasks.indexOf(oldTask);
            if (index !== -1) {
                tasks[index] = newTask;
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        }
        function removeFromLocalStorage(taskText) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }