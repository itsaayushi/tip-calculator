const bill_el = document.querySelector(".bill-input-box");
const tip_el = document.querySelectorAll(".tips");
const custom_tip_el = document.querySelector(".tip-custom");
const people_el = document.querySelector(".people-input-box");
const tip_amount_el = document.querySelector(".tip-amount-data");
const total_el = document.querySelector(".total-data");
const reset_btn_el = document.querySelector(".reset-btn");
const error_msg = document.querySelector(".errormsg");
const people_input_box = document.querySelector(".people-input-box");

bill_el.addEventListener("input", billvaluefn);
tip_el.forEach(function (val) {
  val.addEventListener("click", handleClick);
});
people_el.addEventListener("input", peoplevaluefn);

reset_btn_el.addEventListener("click", resetBtnfn);
custom_tip_el.addEventListener("input", customTipfn);

bill_el.value = "0.0";
people_el.value = "1";
tip_amount_el.innerHTML = "$" + (0.0).toFixed(2);
total_el.innerHTML = "$" + (0.0).toFixed(2);

let billvalue = 0;
function billvaluefn() {
  billvalue = parseFloat(bill_el.value);

  calculateTip();
}

let tipValue = 0;
function handleClick(event) {
  tip_el.forEach(function (val) {
    val.classList.remove("active-tip");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active-tip");
      tipValue = parseFloat(val.innerHTML) / 100;
    }
  });

  calculateTip();
}

let peoplevalue = 1;
function peoplevaluefn() {
  peoplevalue = parseFloat(people_el.value);

  if (peoplevalue < 1) {
    error_msg.style.display = "flex";
    people_input_box.style.border = "thick solid red";
  } else {
    error_msg.style.display = "none";
    people_input_box.style.border = "none";
    calculateTip();
  }
}

function customTipfn() {
  tipValue = parseFloat(custom_tip_el.value) / 100;
  tip_el.forEach(function (val) {
    val.classList.remove("active-tip");
  });

  calculateTip();
}

function calculateTip() {
  tipAmount = (billvalue * tipValue) / peoplevalue;
  totalAmount = (billvalue + tipAmount) / peoplevalue;
  tip_amount_el.innerHTML = "$" + tipAmount.toFixed(2);
  total_el.innerHTML = "$" + totalAmount.toFixed(2);
  reset_btn_el.classList.add("reset-btn-active");
  reset_btn_el.classList.remove("reset-btn");
}

function resetBtnfn() {
  bill_el.value = "0.0";
  billvaluefn();
  people_el.value = "1";
  handleClick();
  custom_tip_el.value = "";

  reset_btn_el.classList.remove("reset-btn-active");
  reset_btn_el.classList.add("reset-btn");
}
