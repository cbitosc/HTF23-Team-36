document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
  
    // Initialize tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Function to save tasks to local storage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Function to render tasks
    function renderTasks() {
      taskList.innerHTML = '';
  
      tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.innerHTML = `
          <div class="task">
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="updateTask(${task.id}, 'completed', this.checked)">
            <span>${task.title}</span>
            <span>${task.dueDate}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
          </div>
        `;
        taskList.appendChild(taskItem);
      });
    }
  
    // Function to add a new task
    function addTask(title, dueDate) {
      const newTask = { id: tasks.length + 1, title, dueDate, completed: false };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      taskForm.reset();
    }
  
    // Function to update task (complete/uncomplete)
    function updateTask(id, field, value) {
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        tasks[taskIndex][field] = value;
        saveTasks();
        renderTasks();
      }
    }
  
    // Function to delete a task
    function deleteTask(id) {
      tasks = tasks.filter(task => task.id !== id);
      saveTasks();
      renderTasks();
    }
  
    // Event listener for task form submission
    taskForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const title = document.getElementById('taskTitle').value;
      const dueDate = document.getElementById('dueDate').value;
      addTask(title, dueDate);
    });
  
    // Initial rendering of tasks
    renderTasks();
  });
  
