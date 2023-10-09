/* uložený prvků do proměných */
const vsechnaPole = document.querySelectorAll('.piskvorkyHra__policko');
const ikonaHracElement = document.querySelector('.piskvorkyHra__ikona--hrac');

/* výchozí nastavení aktuálního hráce */
let hracNaTahu = 'kruh';

/* reakce na kliknutí na políčko */
const hracuvTah = (event) => {
  if (hracNaTahu === 'kruh') {
    event.target.classList.add('piskvorkyHra__policko--kruh');
    event.target.disabled = true;
    ikonaHracElement.src = 'cross.svg';
    hracNaTahu = 'krizek';
  } else if (hracNaTahu === 'krizek') {
    event.target.classList.add('piskvorkyHra__policko--krizek');
    event.target.disabled = true;
    ikonaHracElement.src = 'circle.svg';
    hracNaTahu = 'kruh';
  }
};

/* výběr všech políček */
vsechnaPole.forEach((pole) => {
  pole.addEventListener('click', hracuvTah);
});

/* ošetření omylem restartované hry */
const chceteRestartovatHru = (event) => {
  if (!confirm('Chcete restartovat hru?')) {
    event.preventDefault();
  }
};

/* kliknutí na restart */
document
  .querySelector('.piskvorkyHra__tlacitka--restart')
  .addEventListener('click', chceteRestartovatHru);
