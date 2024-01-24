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

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const taskContent = document.createElement("div");
  taskContent.className = "d-flex justify-content-between align-items-center";

  const formCheck = document.createElement("div");
  formCheck.className = "form-check";

  const inputCheck = document.createElement("input");
  inputCheck.className = "form-check-input";
  inputCheck.type = "radio";
  inputCheck.checked = true; 
  inputCheck.name = "inputCheckTask";

  const labelCheck = document.createElement("label");
  labelCheck.className = "form-check-label fw-bold";
  labelCheck.htmlFor = "inputCheckTask";
  labelCheck.innerText = task.title; 

  formCheck.appendChild(inputCheck);
  formCheck.appendChild(labelCheck);

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "gap-2";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "btn btn-primary";
  editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "btn btn-danger";
  deleteButton.innerHTML = '<i class="bi bi-trash"></i>';

  buttonGroup.appendChild(editButton);
  buttonGroup.appendChild(deleteButton);

  taskContent.appendChild(formCheck);
  taskContent.appendChild(buttonGroup);

  cardBody.appendChild(taskContent);
  card.appendChild(cardBody);

  const cardHeader = document.createElement("span");
  cardHeader.className = "card-header";
  cardHeader.innerText = task.category; 
  

  const cardTime = document.createElement("span");
  cardTime.className = "card-time";
  cardTime.innerText = task.time;
  taskContent.appendChild(cardTime);

  card.appendChild(cardHeader);

  tasksContainer.appendChild(card);
}
