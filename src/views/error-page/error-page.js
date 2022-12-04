const timerWrap = document.getElementById("timer__wrap");
const timer = document.getElementById("timer");

let time = 3;
timer.textContent = "3";

setInterval(() => {
  timer.textContent = --time;
}, 1000);

setTimeout(() => {
  timerWrap.innerHTML = "홈으로 이동합니다.";
}, 3000);

setTimeout("location.href = '/'", 3300);
