var started = false;
var difference = 0;
var updater;

document.addEventListener("DOMContentLoaded", () => {
  let datepicker = document.getElementById("birthday");
  let restart = document.getElementById("new-birthday");
  restart.addEventListener("click", (e) => {
    location.reload();
  });
  datepicker.addEventListener("change", (e) => {
    let timeleft = document.getElementById("birthday-until");
    if (timeleft.classList.contains("hide")) {
      setTimeout(() => {
        timeleft.classList.remove("hide");
      }, 100);
    }

    if (started) {
      started = false;
      clearInterval(updater);
    }

    started = true;
    let date = e.target.value;
    calculate_time(date);
  });
});

calculate_time = (date) => {
  let birthday = new Date(date);
  let today = new Date();
  if (birthday < today) {
    return;
  }

  difference = Math.floor(Math.abs(birthday - today) / 1000);
  updater = setInterval(() => {
    update_time();
  }, 1000);
};

update_time = () => {
  difference--;
  if (difference < 0) {
    document.getElementById("birthday-input").classList.add("hide");
    document.getElementById("birthday-until").classList.add("hide");
    document.getElementById("happy-birthday").classList.remove("hide");
    clearInterval(updater);
    return;
  }
  let total = 0;

  let years = Math.floor(difference / 31557600);
  total += years * 31557600;

  let months = Math.floor((difference - total) / 2629743);
  total += months * 2629743;
  let days = Math.floor((difference - total) / 86400);
  total += days * 86400;

  let hours = Math.floor((difference - total) / 3600);
  total += hours * 3600;

  let minutes = Math.floor((difference - total) / 60);
  total += minutes * 60;

  let seconds = Math.floor(difference - total);

  document.getElementById("years-number").innerText = format(years);
  document.getElementById("months-number").innerText = format(months);
  document.getElementById("days-number").innerText = format(days);
  document.getElementById("hours-number").innerText = format(hours);
  document.getElementById("minutes-number").innerText = format(minutes);
  document.getElementById("seconds-number").innerText = format(seconds);
};

format = (target) => {
  if (target < 10) {
    return `0${target}`;
  } else return target;
};
