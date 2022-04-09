// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const TotalTasks = document.querySelector(".totalTasks");
const DoneTasks = document.querySelector(".DoneTasks");
const LeftTasks = document.querySelector(".leftTasks");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list to the user interface
} else {
  // if data isn't empty
  LIST = [];
  id = 0;
}

// load items to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
  DoneLeftAll();
});

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                    <i class="far ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fas fa-times de" job="delete" id="${id}"></i>
                  </li>
                `;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    // if the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      // add item to localstorage ( this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
    DoneLeftAll();
  }
});
// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
  element.parentNode.classList.add("testing");
  setTimeout(() => {
    element.parentNode.parentNode.removeChild(element.parentNode);
  }, 500);

  LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function (event) {
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  // add item to localstorage ( this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));

  DoneLeftAll();
});

//Done Left ALL
let DoneLeftAll = () => {
  let TotalTask = 0;
  let leftTask = 0;
  let DoneTask = 0;

  LIST.filter((e) => {
    if (e.done == false && e.trash == false) {
      leftTask++;
    }
    if (e.trash == false) {
      TotalTask++;
    }
    if (e.done == true && e.trash == false) {
      DoneTask++;
    }
  });

  let arr = [DoneTask, leftTask, TotalTask];
  localStorage.setItem("DoneLeft", JSON.stringify(arr));
  let arr2 = localStorage.getItem("DoneLeft");
  let [one, two, three] = arr;

  if (two == 0 && three != 0) {
    // start
    setTimeout(function () {
      confetti.start();
    }, 0);

    //  Stop
    setTimeout(function () {
      confetti.stop();
    }, 2000);
  }

  TotalTasks.innerHTML = `<i class="fas fa-long-arrow-alt-right"></i>${three}`;
  DoneTasks.innerHTML = `<i class="fas fa-long-arrow-alt-right"></i>${one}`;
  LeftTasks.innerHTML = `<i class="fas fa-long-arrow-alt-right"></i>${two}`;
};
DoneLeftAll();

const rakib = () => {
  console.log("How are you bro!");
};
