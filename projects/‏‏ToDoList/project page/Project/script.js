const addBtn = document.getElementById('add-button');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');


addBtn.addEventListener('click', addTask);




function addTask() {

    if (taskInput.value.trim() === '') {
        return;
    }

    let newTask = document.createElement('li');
    let taskText = document.createElement('span');
    let taskActions = document.createElement('div');
    let completeBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

    taskList.append(newTask);

    newTask.appendChild(taskText);
    newTask.appendChild(taskActions);

    taskText.innerText = taskInput.value;
    taskText.classList.add('task-text');
    taskInput.value = '';



    taskActions.classList.add('task-actions');
    completeBtn.classList.add('complete-button');
    deleteBtn.classList.add('delete-button');

    completeBtn.innerText = 'Complete';
    deleteBtn.innerText = 'Delete';


    taskActions.appendChild(completeBtn);
    taskActions.appendChild(deleteBtn);
    saveData()

    completeBtn.addEventListener('click', () => {
        taskText.classList.toggle('completed');

        saveData()
    });

    deleteBtn.addEventListener('click', () => {
        newTask.remove();

        saveData()
    });
}

function saveData() {
    localStorage.setItem('data', taskList.innerHTML);
}
function showTask() {
    taskList.innerHTML = localStorage.getItem('data');
    const completeBtns = document.querySelectorAll('.complete-button');
    const deleteBtns = document.querySelectorAll('.delete-button');

    completeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const taskText = btn.parentElement.previousElementSibling;
            taskText.classList.toggle('completed');
            saveData();
        });
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.remove();
            saveData();
        });
    });
}
showTask();

