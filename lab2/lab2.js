// document.addEventListener('DOMContentLoaded', function() {
//     const taskInput = document.getElementById('task-input');
//     const taskDeadline = document.getElementById('task-deadline');
//     const addTaskButton = document.getElementById('add-task');
//     const taskList = document.getElementById('task-list');
//
//     // Function to add a task to the list
//     function addTask(taskText, deadline) {
//         const listItem = document.createElement('li');
//         listItem.innerHTML = `
//             <span class="task-text">${taskText}</span>
//             <span class="task-deadline">${deadline}</span>
//             <button class="delete-task">&times;</button>
//         `;
//         taskList.appendChild(listItem);
//     }
//
//     // Add example tasks
//     addTask('Buy groceries', '2023-10-10');
//     addTask('Finish project report', '2023-10-15');
//     addTask('Call the plumber', '2023-10-20');
//
//     addTaskButton.addEventListener('click', function() {
//         const taskText = taskInput.textContent.trim();
//         const deadline = taskDeadline.value;
//
//         if (taskText && deadline) {
//             addTask(taskText, deadline);
//             taskInput.textContent = '';
//             taskDeadline.value = '';
//         }
//     });
//
//     taskList.addEventListener('click', function(e) {
//         if (e.target.classList.contains('delete-task')) {
//             e.target.parentElement.remove();
//         }
//     });
// });