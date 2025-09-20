function renderAnalysis() {
  // --- To-Do анализ ---
  const allTodos = JSON.parse(localStorage.getItem("tasksByDate")) || {};
  let todoCount = 0;
  let completedCount = 0;

  Object.values(allTodos).forEach(dayTasks => {
    dayTasks.forEach(task => {
      todoCount++;
      if (task.completed) completedCount++;
    });
  });

  let todoPercent = todoCount ? Math.round((completedCount / todoCount) * 100) : 0;
  document.getElementById("todoProgressBar").style.width = todoPercent + "%";
  document.getElementById("todoProgressText").textContent = `${todoPercent}% done`;

  // --- Привычки ---
  const allHabits = JSON.parse(localStorage.getItem("habitsByDate")) || {};
  let habitCount = 0;
  let habitDone = 0;

  Object.values(allHabits).forEach(dayHabits => {
    dayHabits.forEach(habit => {
      habitCount++;
      if (habit.checked) habitDone++;
    });
  });

  let habitPercent = habitCount ? Math.round((habitDone / habitCount) * 100) : 0;
  document.getElementById("habitProgressBar").style.width = habitPercent + "%";
  document.getElementById("habitProgressText").textContent = `${habitPercent}% done`;

  const recList = document.getElementById("recommendationList");
  recList.innerHTML = "";


if (todoPercent < 50) {
    recList.innerHTML += "<li>Focus on fewer tasks but complete them fully — quality over quantity!</li>";
} else if (todoPercent < 80) {
    recList.innerHTML += "<li>Great job! You're almost at the top — keep up the momentum.</li>";
} else {
    recList.innerHTML += "<li>You're a productivity master — keep crushing it!</li>";
}

if (habitPercent < 50) {
    recList.innerHTML += "<li>Don't overload yourself with habits. Start with 1–2 and gradually add more.</li>";
} else if (habitPercent < 80) {
    recList.innerHTML += "<li>Awesome! Your habits are slowly becoming part of your daily routine.</li>";
} else {
    recList.innerHTML += "<li>You consistently follow your habits — amazing work!</li>";
}

}

// Вызов анализа при загрузке страницы
renderAnalysis();
