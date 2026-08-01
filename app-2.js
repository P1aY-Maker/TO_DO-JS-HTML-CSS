const taskArray = []

const taskContainer = document.querySelector(".todo-items")
const inputField = document.querySelector(".input-field")
const allTask = document.getElementById("all-task")
const activeTask = document.getElementById("active-task")
const completedTask = document.getElementById("completed-task")
const clearCompleted = document.getElementById("clear-completed")

function taskTemplate(task, idx) {

  return `
      <li class="todo-things flex gap-2 align-center">
              <!-- Checkbox style -->
              <div class="checkbox-wrapper-12">
                <div class="cbx">
                  <input type="checkbox" data-idx="${idx}" ${task.isCompleted ? `checked` : ""} id="${task.id}" />
                  <label for="${task.id}"></label>
                  <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                  </svg>
                </div>

                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="goo-12">
                      <feGaussianBlur
                        result="blur"
                        stdDeviation="4"
                        in="SourceGraphic"
                      ></feGaussianBlur>
                      <feColorMatrix
                        result="goo-12"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                        mode="matrix"
                        in="blur"
                      ></feColorMatrix>
                      <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
                    </filter>
                  </defs>
                </svg>
              </div>
              <span class="task-title task-title-${idx} ${task.isCompleted ? "completed" : ""} " > ${task.title}</span >
    <a data-idx="${idx}" href="#" class="cancel-btn">X</a>
            </li >
    `

}

function renderTask(container, array, templatefn) {

  container.innerHTML = ""
  array.forEach((task, i) => {
    container.innerHTML += taskTemplate(task, i)
  });

}

inputField.addEventListener("keydown", (e) => {
  if (e.keyCode !== 13) {
    return
  }
  const task = {
    id: crypto.randomUUID(),
    title: inputField.value,
    isCompleted: false
  }

  taskArray.push(task)
  renderTask(taskContainer, taskArray, taskTemplate)
  inputField.value = ""
})

taskContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    const index = e.target.dataset.idx
    taskArray[index].isCompleted = !taskArray[index].isCompleted
    const title = document.querySelector(`.task-title-${index}`)
    if (!title.classList.contains("completed")) {
      title.classList.add("completed")
    }
    else {
      title.classList.remove("completed")
    }
  }

  if (e.target.tagName === "A") {
    const index = e.target.dataset.idx
    taskArray.splice(index, 1)
    renderTask(taskContainer, taskArray, taskTemplate)
  }
})

allTask.addEventListener("click", () => {
  renderTask(taskContainer, taskArray, taskTemplate)
})

activeTask.addEventListener("click", () => {
  const activeTaskArr = taskArray.filter((task) => {
    if (!task.isCompleted) {
      return task
    }
  })
  renderTask(taskContainer, activeTaskArr, taskTemplate)
})

completedTask.addEventListener("click", () => {
  const completedTaskArr = taskArray.filter((task) => {
    if (task.isCompleted) {
      return task
    }
  })
  renderTask(taskContainer, completedTaskArr, taskTemplate)
})

clearCompleted.addEventListener("click", () => {

  let indexOfCompletedTasks = []
  let prevCompletedIndex = null

  for (let i = 0; i < taskArray.length; i++) {

    if (taskArray[i].isCompleted) {
      indexOfCompletedTasks.push(i)
    }

  }

  for (let i = 0; i < indexOfCompletedTasks.length; i++) {
    if (taskArray[indexOfCompletedTasks[i]].isCompleted) {
      taskArray.splice(indexOfCompletedTasks[i], 1)
      prevCompletedIndex = indexOfCompletedTasks[i]
    }

    indexOfCompletedTasks = indexOfCompletedTasks.map((j) => {
      if (j > prevCompletedIndex) {
        return j - 1
      }
      else {
        return j
      }
    })
  }

  renderTask(taskContainer, taskArray, taskTemplate)
})