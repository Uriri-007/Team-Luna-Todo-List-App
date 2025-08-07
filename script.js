const Domaccess = (() => {
  const allNavLi = document.querySelectorAll("li");
  const liArr = Array.from(allNavLi);
  const navInboxPrj = document.querySelector(".nav-inbox");
  const todayInboxPrj = document.querySelector(".today-nav-inbox");
  const addProjectDiv = document.querySelector(".project-house");
  const addANewTask = document.querySelector(".add-task-form");
  const newTaskInput = document.querySelector(".task-input");
  const newTaskAddBtn = document.querySelector(".btn-add");
  const newTaskDelBtn = document.querySelector(".btn-cancel");
  const taskAreaSctn = document.querySelector(".task-area");
  // const navInbox = document.querySelector("");
  // const navInbox = document.querySelector("");
  return {
    liArr,
    navInboxPrj,
    todayInboxPrj,
    addProjectDiv,
    addANewTask,
    newTaskInput,
    newTaskAddBtn,
    newTaskDelBtn,
    taskAreaSctn,
  };
})();

class Task {
  constructor(title) {
    this.title = title;
  }
}

Domaccess.liArr.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    const activeElem = Domaccess.liArr.findIndex((elem) =>
      elem.classList.contains("active")
    );
    Domaccess.liArr[activeElem].classList.remove("active");
    elem.classList.add("active");
  });
});

Domaccess.todayInboxPrj.addEventListener("click", () => {
  Domaccess.taskAreaSctn.innerHTML = `
    <h2 class="section-title">Today</h2>
    <div class="add-task-form">
            <input
              type="text"
              placeholder="Add a new task..."
              class="task-input"
            />
            <div class="form-actions">
              <button type="button" class="btn btn-add">Add</button>
              <button type="button" class="btn btn-cancel">Cancel</button>
            </div>
          </div>
    `;
});

Domaccess.navInboxPrj.addEventListener("click", () => {
  Domaccess.taskAreaSctn.innerHTML = `
    <h2 class="section-title">Inbox</h2>
    `;
});

function getNewTask(params) {
    const newTask = new Task(Domaccess.newTaskInput)
    
}