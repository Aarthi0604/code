// Get elements
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const list = document.getElementById("list");
const balance = document.getElementById("bal");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");

let income = 0;
let expense = 0;
let total = 0;

// Add transaction
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value;
  const amount = parseFloat(amountInput.value);

  if (name === "" || isNaN(amount)) {
    alert("Please enter valid data");
    return;
  }

  const li = document.createElement("li");
  const sign = amount < 0 ? "-" : "+";
  li.textContent = `${name} ${sign}$${Math.abs(amount).toFixed(2)}`;
  li.className = amount < 0 ? "minus" : "money-plus";

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";

  // Delete logic
  deleteBtn.addEventListener("click", function () {
    list.removeChild(li); // Remove list item

    // Adjust the totals
    if (amount < 0) {
      expense -= Math.abs(amount);
    } else {
      income -= amount;
    }

    total = income - expense;

    balance.textContent = `$${total.toFixed(2)}`;
    moneyPlus.textContent = `+$${income.toFixed(2)}`;
    moneyMinus.textContent = `-$${expense.toFixed(2)}`;
  });

  li.appendChild(deleteBtn); // Add delete button to li
  list.appendChild(li); // Add li to list

  // Update totals
  if (amount < 0) {
    expense += Math.abs(amount);
  } else {
    income += amount;
  }

  total = income - expense;

  balance.textContent = `$${total.toFixed(2)}`;
  moneyPlus.textContent = `+$${income.toFixed(2)}`;
  moneyMinus.textContent = `-$${expense.toFixed(2)}`;

  // Clear input
  nameInput.value = "";
  amountInput.value = "";
});
