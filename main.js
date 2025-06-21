"use strict";

const newInput = document.getElementById("addInput");
const addbtn = document.getElementById("add");
const searchInput = document.getElementById("search");
const groceryListBody = document.querySelector(".grocery-list");
const groceryListarr = document.querySelector(".item-arr");
const itemCount = document.querySelectorAll(".item-count");
let groceryList = [];

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
    }
  }
  searchInput.value = "";
  newInput.value = "";
  itemCount.forEach(
    (item) =>
      (item.textContent =
        groceryList.length > 1 ? `${groceryList.length} items` : "1 item")
  );
};

updateDisplay();

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
