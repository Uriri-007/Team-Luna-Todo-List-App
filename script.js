// A single object to hold all DOM elements for easy access
const Domaccess = (() => {
  const navItems = document.querySelectorAll('.nav-item');
  const projectNavItems = document.querySelectorAll('.project-list-house li');
  const navInboxPrj = document.querySelector("#nav-inbox");
  const todayInboxPrj = document.querySelector("#today-nav-inbox");
  const projectLi = document.querySelector("#nav-project");
  const projectHousing = document.querySelector(".project-list-house");
  const newTaskTitleInput = document.querySelector("#task-input-title");
  const newTaskDateInput = document.querySelector("#task-input-date");
  const newTaskPriorityInput = document.querySelector("#task-input-priority");
  const newPrjNameInput = document.querySelector("#project-name");
  const newTaskAddBtn = document.querySelector("#btn-add-submit");
  const newTaskCancelBtn = document.querySelector("#btn-cancel");
  const newPrjAddBtn = document.querySelector("#project-add");
  const newPrjCancelBtn = document.querySelector("#project-cancel");
  const taskAreaSctn = document.querySelector(".task-area");
  const taskCreatingDiv = document.querySelector("#add-task-form");
  const projectCreatingDiv = document.querySelector("#project-factory-form");
  const taskAreaH1 = document.querySelector(".section-title");
  const taskStatDiv = document.querySelector(".task-stat");
  const queenCntainer = document.querySelector(".container");
  const taskList = document.querySelector(".task-list");
  const btnAddTask = document.querySelector("#btn-add-task");
  
  return {
    navItems,
    projectNavItems,
    navInboxPrj,
    todayInboxPrj,
    projectLi,
    projectHousing,
    newTaskTitleInput,
    newTaskDateInput,
    newTaskPriorityInput,
    newPrjNameInput,
    newTaskAddBtn,
    newTaskCancelBtn,
    newPrjAddBtn,
    newPrjCancelBtn,
    taskAreaSctn,
    taskCreatingDiv,
    projectCreatingDiv,
    taskAreaH1,
    taskStatDiv,
    queenCntainer,
    taskList,
    btnAddTask
  };
})();

// -- DATA MODEL --
let allTasks = [];
let allProjects = [];

// To track the application state
let activeView = "inbox"; // Can be 'inbox', 'today', or 'project'
let activeProject = null; // Stores the active Project object

class Task {
  constructor(title, date, priority, projectId = null, isCompleted = false) {
    this.id = this.generateId();
    this.title = title;
    this.date = date;
    this.priority = priority;
    this.projectId = projectId;
    this.isCompleted = isCompleted;
  }
  generateId() {
    return `${this.title}-${new Date().getTime()}`;
  }
}

class Project {
  constructor(name) {
    this.id = this.generateId();
    this.name = name;
  }
  generateId() {
    return `${this.name}-${new Date().getTime()}`;
  }
}

// -- LOCAL STORAGE LOGIC --
function saveToLocalStorage() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  localStorage.setItem('allProjects', JSON.stringify(allProjects));
}

function loadFromLocalStorage() {
  const storedTasks = localStorage.getItem('allTasks');
  const storedProjects = localStorage.getItem('allProjects');
  if (storedTasks) {
    allTasks = JSON.parse(storedTasks);
  }
  if (storedProjects) {
    allProjects = JSON.parse(storedProjects);
  }
}

// -- UI LOGIC --
function showTaskForm() {
  Domaccess.taskCreatingDiv.style.display = "block";
  Domaccess.queenCntainer.style.display = "none";
}

function hideTaskForm() {
  Domaccess.taskCreatingDiv.style.display = "none";
  Domaccess.queenCntainer.style.display = "grid";
  // Reset form inputs
  Domaccess.newTaskTitleInput.value = "";
  Domaccess.newTaskDateInput.value = "";
  Domaccess.newTaskPriorityInput.value = "1";
}

function showProjectForm() {
  Domaccess.projectCreatingDiv.style.display = "block";
  Domaccess.queenCntainer.style.display = "none";
}

function hideProjectForm() {
  Domaccess.projectCreatingDiv.style.display = "none";
  Domaccess.queenCntainer.style.display = "grid";
  Domaccess.newPrjNameInput.value = "";
}

// -- CRUD OPERATIONS --
function addNewTask() {
  const title = Domaccess.newTaskTitleInput.value;
  const date = Domaccess.newTaskDateInput.value;
  const priority = Domaccess.newTaskPriorityInput.value;

  if (title === "") {
    alert("Task name cannot be empty");
    return;
  }

  const newTask = new Task(title, date, priority, activeProject ? activeProject.id : null);
  allTasks.push(newTask);
  saveToLocalStorage();
  hideTaskForm();
  renderUI();
}

function deleteTask(taskId) {
  const isDel = confirm("Delete task?");
  if (isDel) {
    allTasks = allTasks.filter(task => task.id !== taskId);
    saveToLocalStorage();
    renderUI();
  }
}

function toggleTaskCompletion(taskId) {
  const taskIndex = allTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    allTasks[taskIndex].isCompleted = !allTasks[taskIndex].isCompleted;
    saveToLocalStorage();
    renderUI();
  }
}

function editTask(taskId) {
  const task = allTasks.find(t => t.id === taskId);
  if (task) {
    Domaccess.newTaskTitleInput.value = task.title;
    Domaccess.newTaskDateInput.value = task.date;
    Domaccess.newTaskPriorityInput.value = task.priority;
    showTaskForm();
    
    // Temporarily replace the 'add' button's functionality
    Domaccess.newTaskAddBtn.onclick = () => {
      task.title = Domaccess.newTaskTitleInput.value;
      task.date = Domaccess.newTaskDateInput.value;
      task.priority = Domaccess.newTaskPriorityInput.value;
      saveToLocalStorage();
      hideTaskForm();
      renderUI();
      // Restore original functionality
      Domaccess.newTaskAddBtn.onclick = addNewTask;
    };
  }
}

function addNewProject() {
  const projectName = Domaccess.newPrjNameInput.value;
  if (projectName === "") {
    alert("Project name cannot be empty");
    return;
  }
  const newProject = new Project(projectName);
  allProjects.push(newProject);
  saveToLocalStorage();
  hideProjectForm();
  renderUI();
}

// -- MAIN RENDERING LOGIC --
function renderProjectsSidebar() {
  Domaccess.projectHousing.innerHTML = "";
  
  allProjects.forEach(project => {
    const projectItem = document.createElement('li');
    projectItem.className = 'nav-item project-item';
    if (activeView === 'project' && activeProject?.id === project.id) {
      projectItem.classList.add('active');
    }
    projectItem.innerHTML = `<i class="fas fa-folder"></i><span>${project.name}</span>`;
    projectItem.addEventListener('click', () => {
      activeView = 'project';
      activeProject = project;
      renderUI();
    });
    Domaccess.projectHousing.appendChild(projectItem);
  });
  
  // Add the "Add Project" button back
  const addProjectItem = document.createElement('li');
  addProjectItem.className = 'add-project-item';
  addProjectItem.id = 'nav-project';
  addProjectItem.innerHTML = `<i class="fas fa-plus"></i><span>Add Project</span>`;
  addProjectItem.addEventListener('click', () => {
    showProjectForm();
    // This is a simple implementation, you might want to handle active state
    // on a project list click more robustly.
    Domaccess.projectLi.classList.remove('active');
    Domaccess.navItems.forEach(item => item.classList.remove('active'));
  });
  Domaccess.projectHousing.appendChild(addProjectItem);
}

function renderUI() {
  // 1. Manage active class for sidebar navigation
  Domaccess.navItems.forEach(item => item.classList.remove('active'));
  if (activeView === 'inbox') {
    Domaccess.navInboxPrj.classList.add('active');
  } else if (activeView === 'today') {
    Domaccess.todayInboxPrj.classList.add('active');
  }

  // 2. Determine which tasks to display based on the active view
  let tasksToDisplay = [];
  let title = "";
  if (activeView === 'inbox') {
    tasksToDisplay = allTasks;
    title = "Inbox";
  } else if (activeView === 'today') {
    const today = new Date().toISOString().split('T')[0];
    tasksToDisplay = allTasks.filter(task => task.date === today);
    title = "Today";
  } else if (activeView === 'project' && activeProject) {
    tasksToDisplay = allTasks.filter(task => task.projectId === activeProject.id);
    title = activeProject.name;
  }
  
  // 3. Update main section title
  Domaccess.taskAreaH1.textContent = title;
  
  // 4. Update task list and status message
  Domaccess.taskList.innerHTML = ""; // Clear existing tasks
  if (tasksToDisplay.length === 0) {
    Domaccess.taskStatDiv.innerHTML = `<p>Oops! No tasks here.</p>`;
  } else {
    Domaccess.taskStatDiv.innerHTML = `<p>You have ${tasksToDisplay.length} ${
      tasksToDisplay.length > 1 ? "tasks" : "task"
    } in your ${title.toLowerCase()}.</p>`;
    tasksToDisplay.forEach(task => {
      Domaccess.taskList.innerHTML += `
        <div id="${task.id}" class="task-item">
          <input type="checkbox" class="task-checkbox" ${task.isCompleted ? 'checked' : ''} onchange="toggleTaskCompletion('${task.id}')">
          <div class="task-details">
            <h3 class="task-name task-text ${task.isCompleted ? 'completed' : ''}">${task.title}</h3>
            <p class="task-deadline task-text ${task.isCompleted ? 'completed' : ''}">Deadline: ${task.date}</p>
            <p class="task-priority task-text ${task.isCompleted ? 'completed' : ''}">Priority: ${task.priority}</p>
          </div>
          <div class="task-actions">
            <button type="button" onclick="editTask('${task.id}')"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" onclick="deleteTask('${task.id}')"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      `;
    });
  }
  
  // 5. Render the projects in the sidebar
  renderProjectsSidebar();
}

// -- EVENT LISTENERS --
Domaccess.navInboxPrj.addEventListener("click", () => {
  activeView = "inbox";
  activeProject = null;
  renderUI();
});

Domaccess.todayInboxPrj.addEventListener("click", () => {
  activeView = "today";
  activeProject = null;
  renderUI();
});

Domaccess.btnAddTask.addEventListener("click", () => {
  showTaskForm();
  Domaccess.newTaskAddBtn.onclick = addNewTask; // Ensure 'add' button creates a new task
});

Domaccess.newTaskAddBtn.addEventListener("click", addNewTask);
Domaccess.newTaskCancelBtn.addEventListener("click", hideTaskForm);

Domaccess.projectLi.addEventListener("click", showProjectForm);
Domaccess.newPrjAddBtn.addEventListener("click", addNewProject);
Domaccess.newPrjCancelBtn.addEventListener("click", hideProjectForm);

// -- INITIALIZATION --
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderUI();
});

// To make functions accessible from inline HTML event attributes
window.deleteTask = deleteTask;
window.editTask = editTask;
window.toggleTaskCompletion = toggleTaskCompletion;