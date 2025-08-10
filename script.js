const Domaccess = (() => {
  const allNavLi = document.querySelectorAll("li");
  const liArr = Array.from(allNavLi);
  const navInboxPrj = document.querySelector("#nav-inbox");
  const todayInboxPrj = document.querySelector("#today-nav-inbox");
  const projectLi = document.querySelector("#nav-project");
  const projectHousing = document.querySelector(".project-list-house");
  const newTaskTitleInput = document.querySelector("#task-input-title");
  const newTaskDateInput = document.querySelector("#task-input-date");
  const newTaskPriorityInput = document.querySelector("#task-input-priority");
  const newPrjNameInput = document.querySelector("#project-name");
  const newTaskAddBtn = document.querySelector("#btn-add");
  const newTaskDelBtn = document.querySelector("#btn-cancel");
  const newPrjAddBtn = document.querySelector("#project-add");
  const newPrjCancelBtn = document.querySelector("#project-cancel");
  const taskAreaSctn = document.querySelector(".task-area");
  const taskCreatingDiv = document.querySelector("#add-task-form");
  const projectCreatingDiv = document.querySelector("#project-factory-form");
  const taskAreaH1 = document.querySelector(".section-title");
  const taskStatDiv = document.querySelector(".task-stat");
  const queenCntainer = document.querySelector(".container");
  const taskList = document.querySelector(".task-list");
  const projectList = document.querySelector(".project-list");

  return {
    liArr,
    navInboxPrj,
    todayInboxPrj,
    projectLi,
    projectHousing,
    newTaskTitleInput,
    newTaskDateInput,
    newTaskPriorityInput,
    newPrjNameInput,
    newTaskAddBtn,
    newTaskDelBtn,
    newPrjAddBtn,
    newPrjCancelBtn,
    taskAreaSctn,
    taskCreatingDiv,
    projectCreatingDiv,
    taskAreaH1,
    taskStatDiv,
    queenCntainer,
    taskList,
    projectList,
  };
})();

Domaccess.liArr.forEach((elem) => {
  elem.addEventListener("click", () => {
    const activeElem = Domaccess.liArr.findIndex((elem) =>
      elem.classList.contains("active")
    );
    Domaccess.liArr[activeElem].classList.remove("active");
    elem.classList.add("active");
  });
});

const allTaskArr = [];
let currentTaskObj = {};
const projectArr = [];

class Task {
  constructor(title, date, priority) {
    this.title = title;
    this.date = date;
    this.priority = priority;
  }
}

function refine(value) {
  if (!value) {
    alert("Task name cannot be empty");
    return;
  } else {
    return value;
  }
}

function displayTaskFactory() {
  Domaccess.taskCreatingDiv.style.display = "block";
  Domaccess.queenCntainer.style.display = "none";
}

function arrangeTaskDetails() {
  const taskIDIndex = allTaskArr.findIndex(
    (task) => task.id === currentTaskObj?.id
  );
  const taskTitle = Domaccess.newTaskTitleInput.value;
  const taskDate = Domaccess.newTaskDateInput.value;
  const taskPriority = Domaccess.newTaskPriorityInput.value;
  if (taskIDIndex === -1) {
    // creating a special id for all tasks
    const date = new Date();
    const secs = date.getTime();
    const taskId = `${taskTitle}-${secs}`;

    const newTask = new Task(taskTitle, taskDate, taskPriority);
    currentTaskObj = {
      title: newTask.title,
      date: newTask.date,
      priority: newTask.priority,
      id: taskId,
      category: ""
    };

    allTaskArr.push(currentTaskObj);
  } else {
    const newTask = new Task(taskTitle, taskDate, taskPriority);
    currentTaskObj.title = newTask.title;
    currentTaskObj.date = newTask.date;
    currentTaskObj.priority = newTask.priority;
    allTaskArr.splice(taskIDIndex, 1, currentTaskObj);
  }

  currentTaskObj = {};
  reset();
}

function deleteTask(self) {
  const btnAncestor = self.parentElement.parentElement;
  const taskIndex = allTaskArr.findIndex((task) => task.id === btnAncestor.id);
  const isDel = confirm("Delete task?");
  if (isDel === true) {
    allTaskArr.splice(taskIndex, 1);
    updateUI();
    return;
  }
}

function editTask(self) {
  const btnAncestor = self.parentElement.parentElement;
  const taskIndex = allTaskArr.findIndex((task) => task.id === btnAncestor.id);
  currentTaskObj = allTaskArr[taskIndex];
  Domaccess.newTaskTitleInput.value = currentTaskObj.title;
  Domaccess.newTaskDateInput.value = currentTaskObj.date;
  Domaccess.newTaskPriorityInput.value = currentTaskObj.priority;
  displayTaskFactory();
}

function accomplishTask(self) {
  const siblings = self.parentElement.children;
  const siblingsArr = Array.from(siblings).reverse();
  let [me, ...elders] = siblingsArr;

  elders.forEach((elem) => {
    elem.classList.toggle("completed");
  });
}

function updateUI() {
  Domaccess.taskList.innerHTML = "";

  allTaskArr.forEach(({ title, date, priority, id }) => {
    Domaccess.taskList.innerHTML += `
    <div id="${id}" class="task-item">
    <div>
      <h3 class="task-name task-text">${title}</h3>
      <p class="task-deadline task-text">${date}</p>
      <p class="task-priority task-text">${priority}</p>
      <input type="checkbox" class="task-checkbox" onchange="accomplishTask(this)">
    </div>

    <div class="task-actions">
       <button type="button" onclick="deleteTask(this)"><i class="fa fa-solid fa-bin"></i></button>
        <button type="button" onclick="editTask(this)"><i class="fa fa-solid fa-pencil"></i></button>
    </div>

</div>
    `;
  });

  Domaccess.queenCntainer.style.display = "grid";
  Domaccess.taskCreatingDiv.style.display = "none";
}

function reset() {
  Domaccess.newTaskTitleInput.value = "";
  Domaccess.newTaskDateInput.value = "";
  Domaccess.newTaskPriorityInput.value = "1";
}

function cancel() {
  reset();
  Domaccess.queenCntainer.style.display = "grid";
  Domaccess.taskCreatingDiv.style.display = "none";
}

function startNewProject() {
  Domaccess.queenCntainer.style.display = "none";
  Domaccess.projectCreatingDiv.style.display = "block";
}

function openUpPrj(self) {
  const title = self.textContent;
  Domaccess.taskList.style.display = "none";
  Domaccess.taskAreaH1.textContent = title;

  const taskArr = [];
  
}

Domaccess.todayInboxPrj.addEventListener("click", () => {
  Domaccess.taskAreaH1.textContent = "Today";
  if (allTaskArr.length == 0) {
    Domaccess.taskStatDiv.innerHTML = `<p>Oops! Looks like there are no tasks for today.
      <br>
      <button type="button" class="btn" onclick="displayTaskFactory()">Add a new task</button>
      </p>`;
  } else {
    Domaccess.taskStatDiv.innerHTML = `<button type="button" class="btn" onclick="displayTaskFactory()">Add a new task</button>`;
  }
});

Domaccess.navInboxPrj.addEventListener("click", () => {
  Domaccess.taskAreaH1.textContent = "Inbox";
  if (allTaskArr.length == 0) {
    Domaccess.taskStatDiv.innerHTML = `<p>Oops! There are no current tasks in your inbox. <br>Check out Today</p>`;
  } else {
    Domaccess.taskStatDiv.innerHTML = `You have ${allTaskArr.length} ${
      allTaskArr.length > 1 ? "tasks" : "task"
    } in your inbox`;
  }
});

Domaccess.newTaskAddBtn.addEventListener("click", () => {
  Domaccess.taskStatDiv.innerHTML = `<button type="button" class="btn" onclick="displayTaskFactory()">Add a new task</button>`;
  arrangeTaskDetails();
  updateUI();
});

Domaccess.newTaskDelBtn.addEventListener("click", () => {
  cancel();
});

Domaccess.newPrjAddBtn.addEventListener("click", () => {
  const projectName = refine(Domaccess.newPrjNameInput.value);
  if (projectName) {
  projectArr.push(projectName);

 if (projectArr.length > 0) {
    Domaccess.projectLi.style.display = "none";
  }

  Domaccess.queenCntainer.style.display = "grid";
  Domaccess.projectCreatingDiv.style.display = "none";
  Domaccess.taskList.style.display = "flex";
  Domaccess.newPrjNameInput.value = "";

  Domaccess.projectHousing.innerHTML += `<li onclick="openUpPrj(this)">${projectName}</li>`;
  }
});

Domaccess.projectLi.addEventListener("click", () => {
  Domaccess.taskAreaH1.textContent = "Projects";
  Domaccess.taskStatDiv.innerHTML = `
  <button type="button" class="btn" onclick="startNewProject()">Start a new project</button>
  `;
});
