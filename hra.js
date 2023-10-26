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

/* vyhodnocení výtězství */
const uzNekdoVyhral = () => {
  const vitez = findWinner(herniPole);
  if (vitez === 'o' || vitez === 'x') {
    alert(`Vyhrál hráč se symbolem ${vitez}.`);
    location.reload();
  } else if (vitez === 'tie') {
    alert(`Hra skončila nerozhodně.`);
    location.reload();
  }
}; //acient legends, holy recitation, granite, boundless

/* reakce na kliknutí na políčko */
const hracuvTah = (event) => {
  /*
  event.target = to co vrací aktivní prvek
  parentNode = rodičovcký element
  children = vrátí všechny děti rodičovského elementu
  ... - to je operátor, který rozkládá pole: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  indexOf = zjistí pořadí nečeho v poli
  event.target = zjistí pořadí sebe v seznamu všech dětí nadřazeného rodiče = zjistí moji polohu*/
  const indexPole = [...event.target.parentNode.children].indexOf(event.target); // zjistí mi aktuállní pozici v herniPole[]

  if (hracNaTahu === 'kruh') {
    event.target.classList.add('piskvorkyHra__policko--kruh');
    herniPole[event] = 'o';
    event.target.disabled = true;
    ikonaHracElement.src = 'cross.svg';
    herniPole[indexPole] = 'o';
    hracNaTahu = 'krizek';
    aiHracX();
    setTimeout(uzNekdoVyhral, 300);
  } else {
    event.target.classList.add('piskvorkyHra__policko--krizek');
    herniPole[event] = 'x';
    event.target.disabled = true;
    ikonaHracElement.src = 'circle.svg';
    herniPole[indexPole] = 'x';
    hracNaTahu = 'kruh';
  }
};

/* přidání AI - nápověda*/
const aiHracX = async () => {
  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: herniPole,
        player: 'x', // Hledá tah pro křížek.
      }),
    },
  );
  const data = await response.json();
  const { x, y } = data.position; // x bude 0 a y bude 1, protože to je jediné volné políčko. x 0 odpovídá prvnímu sloupci a y 1 druhému řádku.
  const poleX = vsechnaPole[x + y * 10]; // Najde políčko na příslušné pozici.
  poleX.click(); // Simuluje kliknutí. Spustí událost `click` na políčku.
};

/* výběr všech políček */
vsechnaPole.forEach((pole) => {
  pole.addEventListener('click', hracuvTah);
});

/* ošetření omylem restartované hry */
const chceteRestartovatHru = (event) => {
  if (!confirm('Chcete restartovat hru?')) {
    event.preventDefault();
  } /*else {
    vsechnaPole.forEach((pole) => {
      pole.classList.remove('piskvorkyHra__policko--krizek');
      pole.classList.remove('piskvorkyHra__policko--kruh');
      pole.target.disabled = false;
      console.log(herniPole);
      event.preventDefault();
    });
  }*/
};

/* kliknutí na tlačítko restart */
document
  .querySelector('.piskvorkyHra__tlacitka--restart')
  .addEventListener('click', chceteRestartovatHru);
