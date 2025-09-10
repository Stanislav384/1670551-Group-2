const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("days");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const modalDateSpan = document.getElementById("modalDate");
const newHabitInput = document.getElementById("newHabit");
const addHabitBtn = document.getElementById("addHabit");
const habitList = document.getElementById("habitList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let habitsByDate = JSON.parse(localStorage.getItem("habitsByDate")) || {};
let currentDate = "";

function openDate(date) {
  currentDate = date;
  modalDateSpan.textContent = currentDate;
  renderHabits();
}

function renderHabits() {
  habitList.innerHTML = "";
  const habits = habitsByDate[currentDate] || [];

  habits.forEach((habit, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.completed || false;

    checkbox.addEventListener("change", () => {
      habit.completed = checkbox.checked;
      if (!habitsByDate[currentDate]) habitsByDate[currentDate] = [];
      habitsByDate[currentDate][index] = habit;
      localStorage.setItem("habitsByDate", JSON.stringify(habitsByDate));
      updateProgress();
      li.classList.toggle("completed", checkbox.checked);
    });

    li.appendChild(checkbox);
    const label = document.createElement("label");
    label.textContent = habit.name || habit;
    li.appendChild(label);

    li.classList.toggle("completed", checkbox.checked);

    habitList.appendChild(li);
  });

  updateProgress();
}

function addHabit() {
  const habitText = newHabitInput.value.trim();
  if (!habitText) return;

  if (!habitsByDate[currentDate]) habitsByDate[currentDate] = [];
  habitsByDate[currentDate].push({ name: habitText, completed: false });

  localStorage.setItem("habitsByDate", JSON.stringify(habitsByDate));
  newHabitInput.value = "";
  renderHabits();
}

function updateProgress() {
  const habits = habitsByDate[currentDate] || [];
  if (habits.length === 0) {
    progressBar.style.width = "0%";
    progressText.textContent = "0%";
    return;
  }
  const done = habits.filter(h => h.completed).length;
  const percent = Math.round((done / habits.length) * 100);
  progressBar.style.width = percent + "%";
  progressText.textContent = `${percent}%`;
}

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function renderCalendar(month, year) {
  monthYear.textContent = `${months[month]} ${year}`;
  daysContainer.innerHTML = "";
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) daysContainer.appendChild(document.createElement("div"));

  for (let i = 1; i <= lastDate; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;
    if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear())
      dayDiv.classList.add("today");

    dayDiv.addEventListener("click", () => {
      const dateStr = `${i}.${month + 1}.${year}`;
      openDate(dateStr);
    });

    daysContainer.appendChild(dayDiv);
  }
}

prevBtn.addEventListener("click", () => {
  currentMonth--; if(currentMonth<0){currentMonth=11; currentYear--;}
  renderCalendar(currentMonth, currentYear);
});
nextBtn.addEventListener("click", () => {
  currentMonth++; if(currentMonth>11){currentMonth=0; currentYear++;}
  renderCalendar(currentMonth, currentYear);
});

addHabitBtn.addEventListener("click", addHabit);

renderCalendar(currentMonth, currentYear);
