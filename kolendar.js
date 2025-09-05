const monthYear = document.getElementById('month-year');
const daysContainer = document.getElementById('days');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];