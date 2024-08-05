let session = document.getElementById("session");
let offTime = document.getElementById("break");
let state = document.querySelector("h1");
let root = document.querySelector("body");

let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");

let display = document.getElementById("display");

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);

let timeInSec;
let isFocused = true;
let intervalId;
let sessionCount = 0;
let breakCount = 0;

function startTimer() {
  if (isFocused) state.innerText = "Session - " + ++sessionCount;
  else state.innerText = "Break - " + ++breakCount;

  timeInSec = (isFocused ? session.value : offTime.value) * 60;
  intervalId = setInterval(() => {
    showTime(timeInSec--);
    console.log("isFocused = " + isFocused + " " + timeInSec);
  }, 1000);
}

function showTime(time) {
  let mins = Math.floor(time / 60);
  let sec = time % 60;
  if (time == 0) {
    stopTimer();
    isFocused = !isFocused;
    startTimer();
  }
  display.textContent = `${mins < 10 ? "0" + mins : `${mins}`} : ${
    sec < 10 ? "0" + sec : `${sec}`
  }`;
}
function stopTimer() {
  clearInterval(intervalId);

  showPopUp();
}

let results = document.createElement("div");
let div = document.createElement("div");
div.className = "blur";
results.className = "result";
function showPopUp() {
  results.innerHTML = `<h4>Worked : ${
    sessionCount * session.value
  } minutes</h4> <h4>Rested : ${
    breakCount * offTime.value
  } minutes</h4><button id="restart">Restart</button>`;
  root.append(results);
  let restart = document.querySelector("#restart");
  restart.addEventListener("click", removeBox);
  root.append(div);
}

function removeBox() {
  results.remove();
  div.remove();
  display.innerText = ""
  session.value = ""
  offTime.value = ""
  state.innerText = "Pomodoro"
}
