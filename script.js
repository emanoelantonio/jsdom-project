document.addEventListener("DOMContentLoaded", displayAllTasks);

const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function () {

  const titleInput = document.getElementById("title");
  const categoryInput = document.getElementById("category");
  const timeInput = document.getElementById("time");

  const newTask = {
    title: titleInput.value.trim(),
    category: categoryInput.value.trim(),
    time: timeInput.value.trim()
  };

  if (newTask.title && newTask.category && newTask.time) {
    if (editingTaskId) {
      updateTask(newTask, editingTaskId)
        .then(() => {

          window.location.href = "./index.html";
        })
        .catch((error) => {
          console.error("Erro ao atualizar a tarefa", error);
        });
    } else {
      createTask(newTask)
        .then(() => {
          window.location.href = "./index.html";
        })
        .catch((error) => {
          console.error("Erro ao adicionar a tarefa", error);
        });
    }
  } else {
    alert("Por favor, preencha todos os campos antes de salvar.");
  }
})

currentTime();
setInterval(currentTime, 60000);

function createTask(task) {
  saveTask(task)
    .then(() => {
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.error("Erro ao adicionar a tarefa", error);
    })
}

function currentTime() {
  const currentTimeEl = document.getElementById("current-time");
  const newDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());
  currentTimeEl.innerText = newDate;
}

function addTaskToDOM(task) {
  const tasksContainer = document.getElementById("tasksContainer");
  const noTasksCard = document.getElementById("noTasksCard");

  noTasksCard.style.display = "none";

  const card = document.createElement("div");
  card.className = "card mb-3";

  card.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div class="form-check">
          <input class="form-check-input" type="radio" checked name="inputCheckTask" id="inputCheckTask">
          <label class="form-check-label" for="inputCheckTask">${task.title}</label>
        </div>
        <div class=" gap-2">
          <button type="button" class="btn btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#formModal">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button type="button" class="btn btn-danger">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <span class="card-header">${task.category}</span>
        <span class="card-time">${task.time}</span>
      </div>
    </div>
  `;

  tasksContainer.appendChild(card);

  card.setAttribute("data-task-id", task._id);

  const editButtons = document.querySelectorAll(".btn-edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const taskId = button.closest(".card").getAttribute("data-task-id");
      openEditModal(taskId)
    })
  })

  const deleteButton = card.querySelector(".btn-danger");
  deleteButton.addEventListener("click", function () {
    const taskId = card.getAttribute("data-task-id");
    deleteTaskById(taskId);
  });
}

let editingTaskId = null;

async function openEditModal(taskId) {
  editingTaskId = taskId;

  try {
    const task = await getById(taskId);

    const titleInput = document.getElementById("title");
    const categoryInput = document.getElementById("category");
    const timeInput = document.getElementById("time");
    const idInput = document.getElementById("id");

    titleInput.value = task.title;
    categoryInput.value = task.category;
    timeInput.value = task.time;
    idInput.value = task._id;

  } catch (error) {
    console.error("Erro ao obter a tarefa", error);
  }
}

async function deleteTaskById(taskId) {
  try {
    await deleteTask(taskId);
    const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskCard) {
      taskCard.remove();
    }

    const tasksContainer = document.getElementById("tasksContainer");
    const noTasksCard = document.getElementById("noTasksCard");
    if (tasksContainer.children.length === 0) {
      noTasksCard.style.display = "block";
    }
  } catch (error) {
    console.error("Erro ao excluir a tarefa", error);
  }
}
