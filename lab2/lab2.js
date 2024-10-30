class Todo {
    constructor() {
        this.tasks = [];
        this.loadTasks();
    }

    addTask(taskText, deadline) {
        this.tasks.push({ text: taskText, deadline: deadline });
        this.saveTasks();
        this.draw();
    }

    removeTask(taskText) {
        this.tasks = this.tasks.filter(task => task.text !== taskText);
        this.saveTasks();
        this.draw();
    }

    editTaskText(oldText, newText) {
        this.tasks = this.tasks.map(task => {
            if (task.text === oldText) {
                task.text = newText;
            }
            return task;
        });
        this.saveTasks();
        this.draw();
    }

    editTaskDeadline(taskText, newDeadline) {
        this.tasks = this.tasks.map(task => {
            if (task.text === taskText) {
                task.deadline = newDeadline;
            }
            return task;
        });
        this.saveTasks();
        this.draw();
    }

    searchTask(searchText) {
        const regex = new RegExp(`(${searchText})`, 'gi');
        const filteredTasks = this.tasks
            .filter(task => regex.test(task.text))
            .map(task => {
                const highlightedText = task.text.replace(regex, '<mark>$1</mark>');
                return { ...task, highlightedText };
            });
        this.draw(filteredTasks);
    }

    draw(filteredTasks = this.tasks) {
        let taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="task-text" contenteditable="true">${task.highlightedText || task.text}</span>
                <span class="task-deadline-text">${task.deadline}</span>
                <input type="date" class="task-deadline" value="${task.deadline}" style="display:none;">
                <button class="delete-task">&times;</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.draw();
    }
}

let todo = new Todo();

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
        let taskText = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        todo.removeTask(taskText);
    } else if (e.target.classList.contains('task-deadline-text')) {
        e.target.style.display = 'none';
        e.target.nextElementSibling.style.display = 'inline';
        e.target.nextElementSibling.focus();
    } else if (e.target.classList.contains('task-text')) {
        e.target.setAttribute('contenteditable', 'true');
        e.target.classList.add('editing');
        e.target.focus();
    }
});

document.getElementById('task-list').addEventListener('blur', function(e) {
    if (e.target.classList.contains('task-text')) {
        let listItem = e.target.parentElement;
        let oldText = e.target.getAttribute('data-old-text');
        let newText = e.target.textContent;

        if (oldText !== newText) {
            todo.editTaskText(oldText, newText);
        }

        e.target.classList.remove('editing');
        e.target.removeAttribute('contenteditable');
    }
}, true);

document.getElementById('task-list').addEventListener('focus', function(e) {
    if (e.target.classList.contains('task-text')) {
        e.target.setAttribute('data-old-text', e.target.textContent);
    }
}, true);

document.getElementById('task-list').addEventListener('change', function(e) {
    if (e.target.classList.contains('task-deadline')) {
        let listItem = e.target.parentElement;
        let taskText = listItem.querySelector('.task-text').textContent;
        let newDeadline = e.target.value;

        todo.editTaskDeadline(taskText, newDeadline);

        e.target.style.display = 'none';
        e.target.previousElementSibling.style.display = 'inline';
        e.target.previousElementSibling.textContent = newDeadline;
    }
}, true);

document.getElementById('search').addEventListener('input', function() {
    const searchText = this.value.trim().toLowerCase();
    todo.searchTask(searchText);
});

document.getElementById('task-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('add-task').click();
    }
});

document.getElementById('task-deadline').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('add-task').click();
    }
});