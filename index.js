document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from local storage on page load
    loadTasks();

    // Add event listener to the form
    document.getElementById('taskForm').addEventListener('submit', function (e) {
        e.preventDefault();
        addTask();
    });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        // Create new task item
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskInput.value}</span>
            <div>
                <button onclick="toggleTaskStatus(this)">Toggle Status</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        // Append task item to the list
        taskList.appendChild(taskItem);

        // Save tasks to local storage
        saveTasks();

        // Clear input field
        taskInput.value = '';
    }
}

function toggleTaskStatus(button) {
    const taskItem = button.closest('li');
    taskItem.classList.toggle('completed');

    // Save tasks to local storage
    saveTasks();
}

function deleteTask(button) {
    const taskItem = button.closest('li');
    taskItem.remove();

    // Save tasks to local storage
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
    }
}
