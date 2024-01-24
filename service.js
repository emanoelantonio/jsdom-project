const key = "150810bcf7784d75afa463abefc3ef51";
const apiUrl = `https://crudcrud.com/api/${key}/tasks`;

async function findAllTasks() {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function saveTask(task) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task)
    })
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function updateTask(task, id) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task)
    })
  } catch (error) {
    throw error;
  }
}

async function displayAllTasks() {
  try {
    const tasks = await findAllTasks();
    tasks.forEach(task => {
      addTaskToDOM(task);
    });
  } catch (error) {
    console.error("Erro ao buscar as tarefas", error);
  }
}