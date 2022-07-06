'use strict';

const billEl = document.querySelector('.bill__input');
const tipEl = document.querySelector('.tip__options');
const customTipEl = document.querySelector('.custom__tip');
const numPeopleEl = document.querySelector('.people__input');
const tipPerPerson = document.querySelector('.tip__person');
const totalPerPerson = document.querySelector('.total__person');

tipEl.addEventListener('click', function (e) {
  e.preventDefault();
  const bill = +billEl.value;
  let tip = +e.target.getAttribute('data-tip');
  const people = +numPeopleEl.value;

  if (e.target.classList.contains('custom__tip'))
    tip = +customTipEl.value / 100;

  if (!tip || !bill || !people) return;

  tipPerPerson.textContent = (bill * tip) / people;
  totalPerPerson.textContent = (bill * tip + bill / people).toFixed(2);
});
