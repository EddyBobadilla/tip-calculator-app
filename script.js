const bill = document.getElementById("bill-input");
const tipPercent = document.querySelectorAll(".tip");
const tipCustom = document.getElementById("custom-input");
const people = document.getElementById("people-input");
const errorMsg = document.querySelector(".error");
const results = document.querySelectorAll(".dollar");
const reset = document.querySelector(".reset-button");

let billValue = 0;
let tipValue = 0.15;
let peopleValue = 1;
let tipAmount = 0;
let portion = 0;
let total = 0;

bill.addEventListener("input", () => {
  billValue = Number(bill.value);
  calculateTip();
});


tipPercent.forEach((tip) => {
  tip.addEventListener("click", () => {
    tipPercent.forEach((tip) => tip.classList.remove("active-tip"));
    tipCustom.value = "";

    if (!tip.classList.contains("active-tip")) {
      tip.classList.add("active-tip");
      tipValue = parseFloat(tip.innerHTML) / 100;

    }
    calculateTip();
  });
});

tipCustom.addEventListener("input", () => {
  tipPercent.forEach((tip) => tip.classList.remove("active-tip"));
  if (tipCustom.value > 0) {
    tipValue = Number(tipCustom.value) / 100;
  } else {
    tipValue = 0;
  }
  calculateTip();
});

people.addEventListener("input", () => {
  peopleValue = Number(people.value);

  if (peopleValue < 1) {
    errorMsg.classList.add("show-error-message");
    people.classList.add("error-input-highlight");
  } else {
    errorMsg.classList.remove("show-error-message");
    people.classList.remove("error-input-highlight");
  }
  calculateTip();
});

function calculateTip() {
  tipAmount = (billValue * tipValue) / peopleValue;
  portion = (billValue + tipAmount) / peopleValue;
  total = billValue * (1 + tipValue);

  if (peopleValue > 0) {
    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    results[1].innerHTML = "$" + portion.toFixed(2);
    results[2].innerHTML = "$" + total.toFixed(2);
  } else {
    results[0].innerHTML = "$0.00";
    results[1].innerHTML = "$0.00";
  }
}


reset.addEventListener("click", () => {
  bill.value = "";
  tipPercent[1].click();
  tipCustom.value = "";
  people.value = "";

  results[0].innerHTML = "$0.00";
  results[1].innerHTML = "$0.00";
  results[2].innerHTML = "$0.00";
});