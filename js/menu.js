const container = document.querySelector(".container");
const button = document.querySelector(".Menubtn");
const menu = document.querySelector(".menu");
const menuCross = document.querySelector(".menuButton");

button.addEventListener("click", () => {
  menu.classList.add("showmenu");
});

menuCross.addEventListener("click", () => {
  menu.classList.remove("showmenu");
});

container.addEventListener("click", (e) => {
  const header = e.target.classList.value;
  if (header != "showmenu") {
    menu.classList.remove("showmenu");
  }
});
