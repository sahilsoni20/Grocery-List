document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const ul = document.querySelector("ul");
  const btn = document.getElementById("btn");
  const clearBtn = document.getElementById("clear");
  let editMode = false;
  let editedLi = null;

  // Load data from localStorage when the page loads
  loadFromLocalStorage();

  // Function to load data from localStorage
  function loadFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    ul.innerHTML = ""; // Clear the <ul> element before populating it
    items.forEach((item) => {
      const li = createListItem(item);
      ul.appendChild(li);
    });
  }

  // Event listener for button click
  btn.addEventListener("click", function () {
    const inputValue = input.value.trim();
    if (inputValue !== "") {
      if (editMode && editedLi) {
        editedLi.querySelector("#text").textContent = inputValue;
        updateLocalStorage();
        editMode = false;
        editedLi = null;
        btn.textContent = "Add Item";
        input.value = ""; // Clear the input field
      } else {
        const li = createListItem(inputValue);
        ul.appendChild(li);
        input.value = ""; // Clear the input field after adding the item
        updateLocalStorage(); // Update localStorage
      }
    }
  });

  // Function to create a list item with edit and delete buttons
  function createListItem(text) {
    const li = document.createElement("li");
    li.innerHTML = `
<span id="text">${text}</span>
<i class="far fa-edit edit" style="color:green;"></i>
<i class="fas fa-trash delete" style="color:green;"></i>
`;
    // Add event listener for delete button
    li.querySelector(".delete").addEventListener("click", function () {
      li.remove();
      updateLocalStorage();

      var fadeDiv = document.getElementById("remove");
      fadeDiv.style.opacity = 1;
      fadeDiv.style.background = "rgb(234, 112, 112)";
      fadeDiv.querySelector("#value-change").textContent = "Item Deleted";

      setTimeout(function () {
        fadeDiv.style.opacity = 0;
        fadeDiv.style.background = "rgb(234, 112, 112)";
        fadeDiv.querySelector("#value-change").textContent = "Item Deleted";
      }, 2000);
    });

    // Add event listener for edit button
    li.querySelector(".edit").addEventListener("click", function () {
      input.value = text;
      editMode = true;
      editedLi = li;
      btn.textContent = "Update";

      var fadeDiv = document.getElementById("remove");
      fadeDiv.style.opacity = 1;
      fadeDiv.style.background = "lightgreen";
      fadeDiv.querySelector("#value-change").textContent = "Update Value";

      setTimeout(function () {
        fadeDiv.style.opacity = 0;
        fadeDiv.style.background = "lightgreen";
        fadeDiv.querySelector("#value-change").textContent = "Update Value";
      }, 2000);
    });

    return li;
  }

  // Function to update localStorage
  function updateLocalStorage() {
    const items = Array.from(ul.querySelectorAll("li")).map((li) =>
      li.querySelector("#text").textContent.trim()
    );
    localStorage.setItem("items", JSON.stringify(items));
  }

  // Event listener for clear button click
  clearBtn.addEventListener("click", function () {
    ul.innerHTML = ""; // Clear the <ul> element
    localStorage.removeItem("items"); // Remove data from localStorage
  });
});
