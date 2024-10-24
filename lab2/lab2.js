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
        this.draw();
    }

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

    searchTask(searchText) {
        const filteredTasks = this.tasks.map(task => {
            const regex = new RegExp(`(${searchText})`, 'gi');
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
        let taskText = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        todo.removeTask(taskText);
    } else if (e.target.classList.contains('task-deadline-text')) {
        e.target.style.display = 'none';
        e.target.nextElementSibling.style.display = 'inline';
        e.target.nextElementSibling.focus();
    }
});

document.getElementById('task-list').addEventListener('blur', function(e) {
    if (e.target.classList.contains('task-text') || e.target.classList.contains('task-deadline')) {
        let listItem = e.target.parentElement;
        let oldText = listItem.querySelector('.task-text').textContent;
        let newText = listItem.querySelector('.task-text').textContent;
        let newDeadline = listItem.querySelector('.task-deadline').value;
        if (oldText !== newText || e.target.classList.contains('task-deadline')) {
            todo.editTask(oldText, newText, newDeadline);
        }
        if (e.target.classList.contains('task-deadline')) {
            e.target.style.display = 'none';
            e.target.previousElementSibling.style.display = 'inline';
            e.target.previousElementSibling.textContent = newDeadline;
        }
        if (e.target.classList.contains('task-text')) {
            e.target.classList.remove('editing');
            e.target.removeAttribute('contenteditable');
        }
    }
}, true);

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


document.getElementById('search').addEventListener('input', function() {
    const searchText = this.value.trim().toLowerCase();
    todo.searchTask(searchText);
});