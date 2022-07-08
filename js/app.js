'use strict';

const billEl = document.querySelector('.bill__input');
const tipEl = document.querySelector('.tip__options');
const customTipEl = document.querySelector('.custom__tip');
const numPeopleEl = document.querySelector('.people__input');
const tipPerPerson = document.querySelector('.tip__person');
const totalPerPerson = document.querySelector('.total__person');
const resetBtn = document.querySelector('.reset__btn');
const tipSelectors = document.querySelectorAll('.tip__selector');

const reset = function () {
  tipPerPerson.textContent = '$0.00';
  totalPerPerson.textContent = '$0.00';
  billEl.value = '';
  numPeopleEl.value = '';
  customTipEl.value = '';
  numPeopleEl.parentElement.classList.remove('num__people--error');
  billEl.parentElement.classList.remove('bill__amount--error');
  resetBtn.classList.add('reset__btn--inactive');
  removeClass();
};

const removeClass = function () {
  tipSelectors.forEach((el) => el.classList.remove('tip__selector--selected'));
};

tipEl.addEventListener('click', function (e) {
  const bill = +billEl.value;
  let tip = +e.target.getAttribute('data-tip');
  const people = +numPeopleEl.value;

  if (e.target.classList.contains('custom__tip')) {
    tip = +customTipEl.value / 100;
  }

  // Makes reset button active
  if (tip && bill && people) {
    resetBtn.classList.remove('reset__btn--inactive');
    tipPerPerson.textContent = `$${((bill * tip) / people).toFixed(2)}`;
    totalPerPerson.textContent = `$${(
      bill / people +
      (bill * tip) / people
    ).toFixed(2)}`;
  }

  // Checks for positive numbers
  if (bill < 0 || !bill) {
    billEl.parentElement.classList.add('bill__amount--error');
  } else {
    billEl.parentElement.classList.remove('bill__amount--error');
  }

  if (people <= 0 || !people) {
    numPeopleEl.parentElement.classList.add('num__people--error');
  } else {
    numPeopleEl.parentElement.classList.remove('num__people--error');
  }
});

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
