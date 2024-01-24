document.addEventListener("DOMContentLoaded", displayAllTasks);

const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function() {
  const titleInput = document.getElementById("title");
  const categoryInput = document.getElementById("category");
  const timeInput = document.getElementById("time");

  if (titleInput.value.trim() && categoryInput.value.trim() && timeInput.value.trim()) {
    const newTask = {
      title: titleInput.value.trim(),
      category: categoryInput.value.trim(),
      time: timeInput.value.trim()
    };
    createTask(newTask);
  }
})

function createTask(task) {
  saveTask(task)
    .then(() => {
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.error("Erro ao adicionar a tarefa", error);
  })
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
          <label class="form-check-label fw-bold" for="inputCheckTask">${task.title}</label>
        </div>
        <div class=" gap-2">
          <button type="button" class="btn btn-primary">
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
}
