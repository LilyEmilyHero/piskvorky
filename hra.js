const poleElement = document.querySelector('.piskvorkyHra__policko');
const ikonaHracElement = document.querySelector('.piskvorkyHra__ikona--hrac');

let hracNaTahu = 'kruh';

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

document.querySelector('#pole00').addEventListener('click', hracuvTah);
document.querySelector('#pole01').addEventListener('click', hracuvTah);
document.querySelector('#pole02').addEventListener('click', hracuvTah);
document.querySelector('#pole03').addEventListener('click', hracuvTah);
document.querySelector('#pole04').addEventListener('click', hracuvTah);
document.querySelector('#pole05').addEventListener('click', hracuvTah);
document.querySelector('#pole06').addEventListener('click', hracuvTah);
document.querySelector('#pole07').addEventListener('click', hracuvTah);
document.querySelector('#pole08').addEventListener('click', hracuvTah);
document.querySelector('#pole09').addEventListener('click', hracuvTah);

const chceteRestartovatHru = (event) => {
  if (!confirm('Chcete restartovat hru?')) {
    event.preventDefault();
  }
};

document
  .querySelector('.piskvorkyHra__tlacitka--restart')
  .addEventListener('click', chceteRestartovatHru);
