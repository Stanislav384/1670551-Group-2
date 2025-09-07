// ======== Календарь ========
const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("days");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// ======== Модалка и задачи ========
const taskModal = document.getElementById("taskModal");
const addTaskBtn = document.getElementById("addTask");
const newTaskInput = document.getElementById("newTask");
const taskList = document.getElementById("taskList");

let tasksByDate = JSON.parse(localStorage.getItem("tasksByDate")) || {};
let currentDate = ""; // выбранная дата "DD.MM.YYYY"

// открыть модалку для выбранной даты
function openModal(date) {
  currentDate = date;
  taskModal.style.display = "block";
  newTaskInput.focus();
  renderTasks();
}

// закрыть модалку
function closeModal() {
  taskModal.style.display = "none";
}

// закрытие модалки по ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// рендер задач для текущей даты
function renderTasks() {
  taskList.innerHTML = "";
  const tasks = tasksByDate[currentDate] || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;

    // двойной клик — отметить выполненным
    li.addEventListener("dblclick", () => {
      li.classList.toggle("completed");
    });

    taskList.appendChild(li);
  });
}

// добавление задачи
addTaskBtn.addEventListener("click", () => {
  const taskText = newTaskInput.value.trim();
  if (!taskText) return;

  if (!tasksByDate[currentDate]) tasksByDate[currentDate] = [];
  tasksByDate[currentDate].push(taskText);
  localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));

  newTaskInput.value = "";
  renderTasks();
});

// ======== Функция рендера календаря ========
function renderCalendar(month, year) {
  monthYear.textContent = `${months[month]} ${year}`;
  daysContainer.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // пустые ячейки до первого дня
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    daysContainer.appendChild(emptyDiv);
  }

  // дни месяца
  for (let i = 1; i <= lastDate; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;

    // подсветка сегодняшнего дня
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    // клик по дню — открыть модалку для этой даты
    dayDiv.addEventListener("click", () => {
      const dateStr = `${i}.${month + 1}.${year}`; // формат "DD.MM.YYYY"
      openModal(dateStr);
    });

    daysContainer.appendChild(dayDiv);
  }
}

// переключение месяцев
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// первый рендер календаря
renderCalendar(currentMonth, currentYear);
