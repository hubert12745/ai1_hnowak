class Todo {
    constructor() {
        this.tasks = [];
    }

    addTask(taskText, deadline) {
        this.tasks.push({ text: taskText, deadline: deadline });
        this.draw();
    }
    removeTask(taskText) {
        this.tasks = this.tasks.filter(task => task.text !== taskText);
        this.draw();}
    editTask(oldText, newText, newDeadline) {
        this.tasks = this.tasks.map(task => {
            if (task.text === oldText) {
                task.text = newText;
                task.deadline = newDeadline;
            }
            return task;
        });
        this.draw();
    }

    draw() {
        let taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <span class="task-deadline">${task.deadline}</span>
                <button class="delete-task">&times;</button>
            `;
            taskList.appendChild(listItem);
        });
    }
}

let todo = new Todo();
todo.tasks = [{ text: 'Buy groceries', deadline: '2023-10-10' }, { text: 'Finish project report', deadline: '2023-10-15' }, { text: 'Call the plumber', deadline: '2023-10-20' }];
todo.draw();

document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskDeadline = document.getElementById('task-deadline');
    const taskText = taskInput.textContent.trim();
    const deadline = taskDeadline.value;

    if (taskText.length >= 3) {
        todo.addTask(taskText, deadline);
        taskInput.textContent = '';
        taskDeadline.value = '';
    } else {
        alert('Task text must be at least 3 characters long');
    }
});

document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-task')) {
        let taskText = e.target.previousElementSibling.previousElementSibling.textContent;
        todo.removeTask(taskText);
    }
});

document.getElementById('task-list').addEventListener('blur', function(e) {
    if (e.target.classList.contains('task-text') || e.target.classList.contains('task-deadline')) {
        let listItem = e.target.parentElement;
        let oldText = listItem.querySelector('.task-text').defaultValue;
        let newText = listItem.querySelector('.task-text').value;
        let newDeadline = listItem.querySelector('.task-deadline').value;
        if (oldText !== newText || e.target.classList.contains('task-deadline')) {
            todo.editTask(oldText, newText, newDeadline);
        }
    }
}, true);