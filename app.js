// define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks ");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listener
loadEventListener();

// load all event listener

function loadEventListener() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);


    // add task event
    form.addEventListener('submit', addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear task event
    clearBtn.addEventListener('click', clearTasks);

    // filter task event
    filter.addEventListener('keyup', filterTasks);
}


// Get task from Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// add task
function addTask(e) {
    if (taskInput.value === '') {
        // Notification Alert
        showNotification('add-task', 'block');
        setTimeout(clearNotification, 3000);

    } else {
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item'; //materialize class
        // create text node and append to the li
        li.appendChild(document.createTextNode(taskInput.value));

        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content'; //materialize class

        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></li>';
        // append the link to li
        li.appendChild(link);

        // append the li to ul
        taskList.appendChild(li);

        // Store in Local Storage
        storeTaskInLocalStorage(taskInput.value);

        // clear input
        taskInput.value = '';

        // Saved task Notification
        showNotification('saved-task', 'block');
        setTimeout(clearNotification, 3000);
    }
    e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        // console.log(e.target);
        if (confirm("Are You Sure?")) {
            e.target.parentElement.parentElement.remove();

            // remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

            // delete task notification
            showNotification('delete-task', 'block');
            setTimeout(clearNotification, 3000);
        }
    }

}

// remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// clear tasks
function clearTasks() {
    // taskList.innerHTML = "";

    // faster way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from Local Storage
    clearTasksFromLocalStorage();

    // delete task notification
    showNotification('clear-tasks', 'block');
    setTimeout(clearNotification, 3000);
}

// clear from Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLocaleLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}



// Notification Alert
function showNotification(id, value) {
    document.getElementById(id).style.display = value;
}

// clear Notification
function clearNotification() {
    showNotification('saved-task', 'none');
    showNotification('add-task', 'none');
    showNotification('delete-task', 'none');
    showNotification('clear-tasks', 'none');
}