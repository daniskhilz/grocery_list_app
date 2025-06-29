"use strict";

const newInput = document.getElementById("addInput");
const addbtn = document.getElementById("add");
const searchInput = document.getElementById("search");
const groceryListBody = document.querySelector(".grocery-list");
const groceryListarr = document.querySelector(".item-arr");
const itemCount = document.querySelectorAll(".item-count");
let groceryList = [];
let filteredList = [];

// initialize display
(function () {
  if (groceryList.length === 0) {
    groceryListarr.innerHTML = '<div class="none">No items at the moment</div>';
  }
})();

//update display
const updateDisplay = function () {
  if (groceryList.length === 0) {
    groceryListarr.innerHTML = '<div class="none">No items at the moment</div>';
    document.querySelector(".top").classList.add("hidden");
    itemCount.forEach((item) => (item.textContent = "0 items"));
  } else {
    document.querySelector(".top").classList.remove("hidden");
    groceryListarr.innerHTML = "";
    for (const [index, item] of groceryList.entries()) {
      const itemHTML = document.createElement("div");
      itemHTML.classList.add("items");
      itemHTML.id = `${index + 1}`;
      itemHTML.innerHTML = `
              <p>${item}</p>
              <button class="remove" onclick = "removeFn(${index})">Remove</button>`;
      groceryListarr.appendChild(itemHTML);
      itemCount.forEach(
        (item) =>
          (item.textContent =
            groceryList.length > 1 ? `${groceryList.length} items` : "1 item")
      );
    }
  }
  searchInput.value = "";
  newInput.value = "";
};

updateDisplay();

// filter function
const filterList = function () {
  const searchValue = searchInput.value.toLowerCase();
  filteredList = groceryList.filter((item) =>
    item.toLowerCase().includes(searchValue)
  );

  if (filteredList.length === 0) {
    groceryListarr.innerHTML = '<div class="none">No items found</div>';
  } else {
    groceryListarr.innerHTML = "";
    for (const [index, item] of filteredList.entries()) {
      const itemHTML = document.createElement("div");
      itemHTML.classList.add("items");
      itemHTML.id = `${index + 1}`;
      itemHTML.innerHTML = `
              <p>${item}</p>
              <button class="remove" onclick = "removeFn(${groceryList.indexOf(
                item
              )})">Remove</button>`;
      groceryListarr.appendChild(itemHTML);
    }
  }
};

// activate search
searchInput.addEventListener("input", filterList);

// add new list
const addNewList = function () {
  // checks for null input
  if (newInput.value === "") {
    alert("Please Input an Item");
    return;
  } else {
    //checks for duplicates
    let isSame = false;
    for (const item of groceryList) {
      if (newInput.value === item) {
        isSame = true;
        break;
      } else {
        continue;
      }
    }

    if (isSame) {
      alert("Item already exists");
    } else {
      groceryList.push(newInput.value);
      updateDisplay();
      console.log(groceryList);
    }
  }
};

const removeFn = function (index) {
  groceryList.splice(index, 1);
  updateDisplay();
  console.log(index);
};

const clearAll = function () {
  groceryList = [];
  updateDisplay();
};

// use keyboard events
// document.addEventListener("keydown", function (e) {
//   if (e.key === "Enter") {
//     if (newInput.value !== "") {
//       addNewList();
//     } else if (searchInput.value !== "") {
//       filterList();
//     }
//   }
// });
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (newInput.value !== "") {
      addNewList();
    } else if (searchInput.value !== "") {
      filterList();
    }
  } else if (e.key === "Escape") {
    searchInput.value = "";
    updateDisplay();
  }
});
