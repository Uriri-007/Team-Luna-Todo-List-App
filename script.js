const Domaccess = (() => {
  const allNavLi = document.querySelectorAll("li");
  const liArr = Array.from(allNavLi);
  const navInboxPrj = document.querySelector("#nav-inbox");
  const todayInboxPrj = document.querySelector("#today-nav-inbox");
  const addProjectDiv = document.querySelector(".project-house");
  const addANewTask = document.querySelector(".add-task-form");
  const newTaskTitleInput = document.querySelector("#task-input-title");
  const newTaskDateInput = document.querySelector("#task-input-date");
  const newTaskPriorityInput = document.querySelector("#task-input-priority");
  const newTaskAddBtn = document.querySelector(".btn-add");
  const newTaskDelBtn = document.querySelector(".btn-cancel");
  const taskAreaSctn = document.querySelector(".task-area");
  const taskCreatingDiv = document.querySelector(".add-task-form");
  const taskAreaH1 = document.querySelector(".section-title");
  const taskStatDiv = document.querySelector(".task-stat");
  const queenCntainer = document.querySelector(".container");
  const taskList = document.querySelector(".task-list");

  return {
    liArr,
    navInboxPrj,
    todayInboxPrj,
    addProjectDiv,
    addANewTask,
    newTaskTitleInput,
    newTaskDateInput,
    newTaskPriorityInput,
    newTaskAddBtn,
    newTaskDelBtn,
    taskAreaSctn,
    taskCreatingDiv,
    taskAreaH1,
    taskStatDiv,
    queenCntainer,
    taskList
  };
})();

Domaccess.liArr.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    const activeElem = Domaccess.liArr.findIndex((elem) =>
      elem.classList.contains("active")
    );
    Domaccess.liArr[activeElem].classList.remove("active");
    elem.classList.add("active");
  });
});

const allTaskArr = [];
let currentTaskObj = {};

class Task {
  constructor(title, date, priority) {
    this.title = title;
    this.date = date;
    this.priority = priority;
  }

  //  get validTitle (title) {
  //    return refine(title);
  //  }

  //  get 
}

function refine(value) {
  if (!value) {
    alert("Task name cannot be empty")
    return
  } 
}

function displayTaskFactory() {
  Domaccess.taskCreatingDiv.style.display = "block";
  Domaccess.queenCntainer.style.display = "none";
}

// class RefinedTask extends RawTask{
//   constructor(id) {
//     super(title, date, priority)
//     this.id = id
//   }

//   get refinedTitle() {
//     const regex 
//   }
// }


function arrangeTaskDetails() {
  const taskTitle = Domaccess.newTaskTitleInput.value;
  const taskDate = Domaccess.newTaskDateInput.value;
  const taskPriority = Domaccess.newTaskPriorityInput.value;

  // creating a special id for all tasks
  const date = new Date();
  const secs = date.getTime();
  const taskId = `${taskTitle}-${secs}`;

  const newTask = new Task(taskTitle, taskDate, taskPriority);
  currentTaskObj = {
    title: newTask.title,
    date: newTask.date,
    priority: newTask.priority,
    id: taskId
  };

  allTaskArr.push(currentTaskObj);
  currentTaskObj = {};
  reset();
  console.log(taskId)
}

 function deleteTask(self) {
    const btnAncestor = self.parentElement.parentElement;
    const taskIndex = allTaskArr.findIndex(task => task.id === btnAncestor.id);
    const isDel = confirm("Delete task?");
    if (isDel === true) {
      allTaskArr.splice(taskIndex, 1);
      updateUI();
      return
    }
  }

  function editTask(self) {
    const btnAncestor = self.parentElement.parentElement;
    const taskIndex = allTaskArr.findIndex(task => task.id === btnAncestor.id);
    currentTaskObj = allTaskArr[taskIndex];
    Domaccess.newTaskTitleInput.value = currentTaskObj.title;
    Domaccess.newTaskDateInput.value = currentTaskObj.date;
    Domaccess.newTaskPriorityInput.value = currentTaskObj.priority;
    displayTaskFactory();
  }

function updateUI() {
  Domaccess.taskList.innerHTML = "";
  allTaskArr.forEach(({title, date, priority, id}) => {
    Domaccess.taskList.innerHTML += `
    <div id="${id}" class="task-item">
    <div>
      <h3 class="task-name task-text">${title}</h3>
      <p class="task-deadline" task-test>${date}</p>
      <p class="task-priority task-text">${priority}</p>
      <input type="checkbox" class="task-checkbox">
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


Domaccess.todayInboxPrj.addEventListener("click", () => {
  Domaccess.taskAreaH1.textContent = "Today";
  if (allTaskArr.length == 0) {
    Domaccess.taskStatDiv.innerHTML = `<p>Oops! Looks like there are no tasks for today.
      <br>
      <button type="button" class="btn" onclick="displayTaskFactory()">Add a new task</button>
      </p>`;
  } else {
    Domaccess.taskStatDiv.innerHTML = `<button type="button" class="btn" onclick="displayTaskFactory()">Add a new task</button>`
  }
});

Domaccess.navInboxPrj.addEventListener("click", () => {
  Domaccess.taskAreaH1.textContent = "Inbox";
  if (allTaskArr.length == 0) {
    Domaccess.taskStatDiv.innerHTML = `<p>Oops! There are no current tasks in your inbox. <br>Check out Today</p>`;
  } else {
    Domaccess.taskStatDiv.innerHTML = `You have ${allTaskArr.length} ${allTaskArr.length > 1 ? "tasks" : "task"} in your inbox`
  }
});

Domaccess.newTaskAddBtn.addEventListener("click", () => {
  Domaccess.taskStatDiv.innerHTML = `<button type="button" class="btn" onclick="displayTaskFactory()">Add a new task</button>`;
  arrangeTaskDetails();
  updateUI();
});
// document.addEventListener("DOMContentLoaded", () => {

// })

Domaccess.newTaskDelBtn.addEventListener("click", () => {
  cancel()
})