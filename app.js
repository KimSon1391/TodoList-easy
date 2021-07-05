document.querySelector(".todoAdd").addEventListener("submit", (e) => {
  e.preventDefault();
  const nameValue = document.getElementById("name").value;
  const cardItem = {
    id: new Date().toISOString(),
    name: nameValue,
  };

  addItemToUI(cardItem);
  addItemToLS(cardItem);
  document.getElementById("name").value = "";
});

//Add Item to UI
const addItemToUI = (item) => {
  const card = document.createElement("div");
  card.className = "list__item";
  card.innerHTML = `
    <span>${item.name}</span>
    <button class = "btn remove" dat-id = "${item.id}">Remove</button>
  `;

  document.querySelector(".list").appendChild(card);
};

//Add Item to LS
const addItemToLS = (item) => {
  const list = getItem();
  list.push(item);
  localStorage.setItem("list", JSON.stringify(list));
};

//remove Item from LS
const removeItemFromLS = (id) => {
  const list = getItem();
  const index = list.findIndex((index) => index.id === id);
  list.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(list));
};

//Listen Remove
document.querySelector(".list").addEventListener("click", (e) => {
  const name = e.target.previousElementSibling.textContent;
  const isConfirm = confirm(`Do you want to remove task ${name}`);
  if (isConfirm) {
    if (e.target.classList.contains("remove")) {
      const card = e.target.parentElement;
      const id = e.target.dataset.id;

      card.remove();
      removeItemFromLS(id);
    }
  }
});

//Remove All Item
document.querySelector(".removeAll").addEventListener("click", (e) => {
  const isConfirm = confirm("Do you want to remove all task");
  if (isConfirm) {
    document.querySelector(".list").innerHTML = "";
    localStorage.removeItem("list");
  }
});

//Filter
document.getElementById("filter").addEventListener("keyup", (e) => {
  const valueItem = e.target.value.trim();
  const list = getItem();
  const filterList = list.filter((item) =>
    item.name.toLowerCase().includes(valueItem.toLowerCase())
  );

  document.querySelector(".list").innerHTML = "";
  filterList.forEach((item) => {
    addItemToUI(item);
  });
});

//Get Item
const getItem = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};

//Get Item When Reset
const init = () => {
  const list = getItem();
  list.forEach((item) => {
    addItemToUI(item);
  });
};

init();
