import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

/* uložený prvků do proměných */
const vsechnaPole = document.querySelectorAll('.piskvorkyHra__policko');
const ikonaHracElement = document.querySelector('.piskvorkyHra__ikona--hrac');

/* výchozí nastavení aktuálního hráce */
let hracNaTahu = 'kruh';

/* herní plocha do pole */
let herniPole = [];
vsechnaPole.forEach((polickoPole) => {
  let hodnota = polickoPole.textContent;
  if (hodnota === '') hodnota = '_';
  herniPole.push(hodnota);
});

/* výpočet výtězství */
const uzNekdoVyhral = () => {
  const vitez = findWinner(herniPole);
  if (vitez === 'o' || vitez === 'x') {
    alert(`Vyhrál hráč se symbolem ${vitez}.`);
    location.reload();
  } else if (vitez === 'tie') {
    alert(`Hra skončila nerozhodně.`);
    location.reload();
  }
};

/* reakce na kliknutí na políčko */
const hracuvTah = (event) => {
  const indexPole = [...event.target.parentNode.children].indexOf(event.target); // zjistí mi aktuállní pozici v herniPole[]

  if (hracNaTahu === 'kruh') {
    event.target.classList.add('piskvorkyHra__policko--kruh');
    event.target.disabled = true;
    ikonaHracElement.src = 'cross.svg';
    herniPole[indexPole] = 'o';
    hracNaTahu = 'krizek';
  } else {
    event.target.classList.add('piskvorkyHra__policko--krizek');
    event.target.disabled = true;
    ikonaHracElement.src = 'circle.svg';
    herniPole[indexPole] = 'x';
    hracNaTahu = 'kruh';
  }

  if (event.target.classList.contains('piskvorkyHra__policko--kruh')) {
    herniPole[event] = 'o';
  } else if (event.target.classList.contains('piskvorkyHra__policko--krizek')) {
    herniPole[event] = 'x';
  }
  console.log(herniPole);

  //const vitez = findWinner(herniPole);
  setTimeout(uzNekdoVyhral, 250);

  /*
  if (vitez === 'o' || vitez === 'x') {
    setTimeout(alert(`Vyhrál hráč se symbolem ${vitez}.`), 5000); //alert(`Vyhrál hráč se symbolem ${vitez}.`);
    location.reload();
  } else if (vitez === 'tie') {
    alert(`Hra skončila nerozhodně.`);
    location.reload();
  }*/
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

// window.location.reload();
