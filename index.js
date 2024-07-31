const ui = {
  taskform: document.querySelector("#taskform"),
  taskinput: document.querySelector("#taskinput"),
  taskStatusConent: document.querySelector("#taskStatusConent"),
  taskContent: document.querySelector("#taskContent"),
  taskStatusConent: document.querySelector("#taskStatusConent"),
};

const tasks = [
  { text: "Task 1", status: 0 },
  { text: "Text 2", status: 1 },
];
let editIndex = "";

const taskitme = (index) => {
  const task = tasks[index];
  return `
    <div data-index="${index}" class="flex justify-between items-center my-[10px] border px-[10px] h-[40px] w-full rounded-[4px]">
                <label ${task.status ? 'class="line-through"' : ""} class="flex items-center gap-[6px]">
                   <input class='js-status' type="checkbox" class="border border-[b8b8b8] text-[15px] outline-none" ${
                     task.status ? "checked" : ""
                   } />
                   <span  class="font-bold text-[15px] ">${task.text}</span>
                </label> 
                <div class="flex itme-center justify-between gap-[8px]">
                   <button data-type = 'delete' class=" bg-[red]  rounded-[5px] size-[20px] flex item-center justify-center " > <i class="fa fa-trash text-[10px] my-auto text-[#fff]"></i></button>
                   <button data-type = 'edit' class=" bg-[blue] size-[20px]  rounded-[5px] flex item-center justify-center"> <i class="fa fa-pen text-[10px] my-auto text-[#fff]"></i></button>
                </div>
              </div>
              
    `;
};

const render = (status = "") => {
  ui.taskContent.innerHTML = "";
  for (let index in tasks) {
    if (status) {
      if (tasks[index].status === parseInt(status)) {
        ui.taskContent.innerHTML += taskitme(index);
      }
    } else {
      ui.taskContent.innerHTML += taskitme(index);
    }
  }
  for (let input of document.querySelectorAll(".js-status")) {
    input.addEventListener("change", (e) => {
      const parent = e.target.closest("[data-index]");
      const index = parent.getAttribute("data-index");
      tasks[index].status = e.target.checked ? 1 : 0;
      render();
      console.log(index);
    });
  }
};

render();

const deletTask = (index) => {
  tasks.splice(index, 1);
  render();
};

const editTask = (index) => {
  const task = tasks[index];
  ui.taskinput.value = task.text;
  editIndex = index;
};
// bu funcisya inputdan gelen deyeri tods arrayina elave edir, ve hemde edit islemi gorur
ui.taskform.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = ui.taskinput.value;
  if (value.trim()) {
    if (editIndex) {
      tasks[editIndex].text = value;
      editIndex = "";
    } else {
      tasks.unshift({ text: value, status: 0 });
    }
  }
  ui.taskinput.value = "";

  const activeBtn = document.querySelector(".active");
  const status = activeBtn.getAttribute("data-status");
  render(status);
});

//
ui.taskContent.addEventListener("click", (e) => {
  //
  const obj = e.target.closest("button") ? e.target.closest("button") : e.target;
  if (obj.tagName === "BUTTON") {
    const parent = obj.closest("[data-index]");
    const index = parent.getAttribute("data-index");
    const type = obj.getAttribute("data-type");
    console.log(type);
    if (index) {
      if (type === "delete") deletTask(index);
      else if (type === "edit") editTask(index);
    }
  }
});

// todos filter eden buttonlarin stausun goturen event ve bu butondan goturulen status deyerin veririk render funcsiyasina
ui.taskStatusConent.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const status = e.target.getAttribute("data-status");
    render(status);
  }
});

// active class
ui.taskStatusConent.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "BUTTON") {
    //
    let activeBtn = document.querySelector(".active");
    activeBtn.classList.remove("active");
    //
    e.target.classList.add("active");
  }
});
