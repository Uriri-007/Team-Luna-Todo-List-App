const Domaccess = (() => {
  const allNavLi = document.querySelectorAll("li");
  const liArr = Array.from(allNavLi);
  const navInboxPrj = document.querySelector("#nav-inbox");
  const todayInboxPrj = document.querySelector("#today-nav-inbox");
  const addProjectDiv = document.querySelector(".project-house");
  const addANewTask = document.querySelector(".add-task-form");
  const newTaskInput = document.querySelector(".task-input");
  const newTaskAddBtn = document.querySelector(".btn-add");
  const newTaskDelBtn = document.querySelector(".btn-cancel");
  const taskAreaSctn = document.querySelector(".task-area");
  const taskCreatingDiv = document.querySelector(".add-task-form");
  const taskAreaH1 = document.querySelector(".section-title");
  const taskStatDiv = document.querySelector(".task-stat");
  const queenCntainer = document.querySelector(".container"); 
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
    taskCreatingDiv,
    taskAreaH1,
    taskStatDiv,
    queenCntainer
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

class Task {
  constructor(title) {
    this.title = title;
  }
}

Domaccess.todayInboxPrj.addEventListener("click", () => {
  Domaccess.taskAreaH1.textContent = "Today";
  if (allTaskArr.length == 0) {
    Domaccess.taskStatDiv.innerHTML =
      `<p>Oops! Looks like there are no tasks for today.
      <br>
      <button type="button" class="btn" onclick="${displayTaskFactory}">Add a new task</button>
      </p>`;
  } else {
  }
});

Domaccess.navInboxPrj.addEventListener("click", () => {
  Domaccess.taskAreaSctn.innerHTML = `
    <h2 class="section-title">Inbox</h2>
    `;
});

function displayTaskFactory() {
  Domaccess.taskCreatingDiv.style.display = "block";
  Domaccess.queenCntainer.style.display = "none";
}