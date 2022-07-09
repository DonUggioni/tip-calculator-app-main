'use strict';

const billEl = document.querySelector('.bill__input');
const tipEl = document.querySelector('.tip__options');
const customTipEl = document.querySelector('.custom__tip');
const numPeopleEl = document.querySelector('.people__input');
const tipPerPerson = document.querySelector('.tip__person');
const totalPerPerson = document.querySelector('.total__person');
const resetBtn = document.querySelector('.reset__btn');
const tipSelectors = document.querySelectorAll('.tip__selector');
const inputs = document.querySelectorAll('.input');

let billInput;
let tipInput;
let tipBtn;
let peopleInput;

const calcTipPerPerson = function (bill, tip, person) {
  return (bill * tip) / person;
};

const calcTotalPerPerson = function (bill, tip, person) {
  return bill / person + (bill * tip) / person;
};

const reset = function () {
  tipPerPerson.textContent = '$0.00';
  totalPerPerson.textContent = '$0.00';
  billEl.value = '';
  numPeopleEl.value = '';
  customTipEl.value = '';
  numPeopleEl.parentElement.classList.remove('num__people--error');
  billEl.parentElement.classList.remove('bill__amount--error');
  resetBtn.classList.add('reset__btn--inactive');
  billInput = 0;
  tipInput = 0;
  peopleInput = 0;
  removeClass();
};

const removeClass = function () {
  tipSelectors.forEach((el) => el.classList.remove('tip__selector--selected'));
};

const renderTotals = function () {
  tipPerPerson.textContent = `$${calcTipPerPerson(
    billInput,
    tipInput,
    peopleInput
  ).toFixed(2)}`;
  totalPerPerson.textContent = `$${calcTotalPerPerson(
    billInput,
    tipInput,
    peopleInput
  ).toFixed(2)}`;
};

const removeTotals = function () {
  tipPerPerson.textContent = '$0.00';
  totalPerPerson.textContent = '$0.00';
};

const app = function () {
  inputs.forEach((input) => {
    input.addEventListener('keyup', function (e) {
      // Gets bill value
      if (e.target === billEl) {
        billInput = +input.value;
      }
      console.log();

      // Select tip when button clicked
      tipBtn = tipSelectors.forEach((selector) => {
        selector.addEventListener('click', function (e) {
          tipInput = +e.target.getAttribute('data-tip');
          customTipEl.value = '';
          if (peopleInput && billInput && tipInput) {
            renderTotals();
            resetBtn.classList.remove('reset__btn--inactive');
          }
        });
      });

      // Gets custom tip value
      if (e.target === customTipEl) {
        tipInput = +input.value / 100;
      }

      // Gets number of people value
      if (e.target === numPeopleEl) {
        peopleInput = +input.value;
      }

      // Display totals after all fields are filled
      if (tipInput && billInput && peopleInput) {
        resetBtn.classList.remove('reset__btn--inactive');
        renderTotals();
      }

      // Resets totals to zero in case the user deletes all numbers from one of the fields
      if (!tipInput || !billInput || !peopleInput) {
        removeTotals();
      }

      // Checks for positive numbers
      if (billInput < 1) {
        billEl.parentElement.classList.add('bill__amount--error');
      } else {
        billEl.parentElement.classList.remove('bill__amount--error');
      }

      if (peopleInput <= 0) {
        numPeopleEl.parentElement.classList.add('num__people--error');
      } else {
        numPeopleEl.parentElement.classList.remove('num__people--error');
      }
    });
  });
};

// Adds selected class to tip buttons
tipEl.addEventListener('click', function (e) {
  removeClass();
  if (
    !e.target.classList.contains('custom__tip') &&
    !e.target.classList.contains('tip__options')
  )
    e.target.classList.add('tip__selector--selected');
});

resetBtn.addEventListener('click', reset);

app();
