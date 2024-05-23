let score = 0;
let molesLeft = 30;
let popupLength = 3000;
let hideTimeout;
let clickable = false;

function popUpRandomMole() {
  if (molesLeft <= 0) {
    document.querySelector('.sb__game-over').classList.remove('sb__game-over--hidden');
    return;
  }

  const moleHeads = document.querySelectorAll('.wgsMoleHead');

  if (moleHeads.length === 0) {
    return;
  }
  const moleIndex = Math.floor(Math.random() * moleHeads.length);
  const moleHead = moleHeads[moleIndex];

  clickable = true;

  // UNCOMMENT THIS LINE OF CODE WHEN DIRECTED
  moleHead.classList.remove('wgsMoleHeadHidden', 'wgsMoleHeadWacked');

  molesLeft -= 1;
  document.querySelector('.sb__moles').innerHTML = molesLeft;

  hideTimeout = setTimeout(() => hideMole(moleHead), popupLength);
}

function hideMole(mole) {
  clickable = false;
  mole.classList.add('wgsMoleHeadHidden');

  setTimeout(popUpRandomMole, 500);
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(popUpRandomMole, 0);

  const moleHeads = document.querySelectorAll('.wgsMoleHead');
  for (let moleHead of moleHeads) {
    moleHead.addEventListener('click', event => {
      if (!clickable) return;

      score += 1;
      document.querySelector('.sb__score').innerHTML = score;
      popupLength -= popupLength / 10;

      clearTimeout(hideTimeout);
      hideMole(event.target);

      // UNCOMMENT THIS LINE OF CODE WHEN DIRECTED
      event.target.classList.add('wgsMoleHeadHidden');

      // UNCOMMENT THIS LINE OF CODE WHEN DIRECTED FOR THE BONUS
      event.target.classList.add('wgsMoleHeadWacked');
    });
  }
});

//Added code below from assignment
/*
window.addEventListener('DOMContentLoaded', () => {

  setInterval(() => {
    const moleHeads = document.querySelectorAll('.wgsMoleHead');
    for (let moleHead of moleHeads) {
      moleHead.classList.toggle('wgsMoleHeadHidden');
    }
  }, 1000);

});
*/
