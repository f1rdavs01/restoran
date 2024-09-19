import { catigor } from "./service.js";

const categories = document.querySelector(".categories");
const cardsEl = document.querySelector(".cards");
const zakaz = document.querySelector(".zakaz");

catigor("catalog").then((data) => {
  console.log(data);

  data.map((item, index) => {
    categories.innerHTML += `<button data-path=${
      index == 0
        ? "hotdishes"
        : index == 1
        ? "colddishes"
        : index == 2
        ? "soup"
        : index == 3
        ? "grill"
        : "dessert"
    }  class=" hover:text-[#e37f6d] text-white   font-semibold relative after:absolute after:bg-red-400 after:rounded-lg after:w-0 after:hover:w-full transition-all duration-500 ease-in-out after:transition-all after:duration-500 after:ease-in-out after:h-[4px] after:-bottom-2 after:left-0">${
      item.name
    }</button>
`;
  });
});

categories.addEventListener("click", (e) => {
  const path = e.target.dataset.path;
  if (path) {
    render(path);
  }
});

render("hotdishes");
function render(path) {
  

  catigor(path).then((data) => {
    cardsEl.innerHTML = "";
  
    data
      .map((item) => {
        cardsEl.innerHTML += `
    <div class="text-white w-[230px] bg-[#090820] rounded-md text-center flex flex-col ">
    <img class="rounded-[50%] w-[132px] h-[132px] mr-auto ml-auto mt-[-20%]" src="${item.img}" alt="">
    <div class="p-2">
    <h1>${item.text}</h1>
    <p>${item.title}</p>
    <p class="text-red-500">${item.price} $</p>
    <div class="p-2">
    <button data-path="${path}/${item.id}"  class="py-1 px-5 rounded-md bg-red-500">Show</button>
    </div>
      </div>
    
    </div>
    `;
      })
      .join("");
  });
}

cardsEl.addEventListener("click", (e) => {
  const path = e.target.dataset.path;
 
  if (path) {
    catigor(path).then((data) => local(data));
  }
});

const local = (data) => {
  const localData = JSON.parse(localStorage.getItem("data")) || [];
  const newData = localData.filter((item) => item.id !== data.id);
  localStorage.setItem("data", JSON.stringify([data, ...newData]));
  zakaz.innerHTML = localData.map((item) => {
    return `
    <div class="flex gap-2 p-4">
   <img class="w-[100px] h-[100px]" src="${item.img}" alt="">
    <h1 class="text-white">${item.title}</h1>
    
    </div>
    `;
  });
};

