const fs = require('fs');
const gameBoard = document.querySelector('.gameboard');
const form = document.querySelector('#input-form');
const statusElement = document.querySelector('.status-board-text');
let totalTiles;
let correctTiles = 0;
let counter = 1;

let rawdata = fs.readFileSync('words.json');
console.log(rawdata);


const createRow = length => {
  let row = document.createElement('DIV');
  row.className = 'row-div';
  let randNr1 = Math.floor(Math.random() * length);
  let randNr2 = Math.floor(Math.random() * length);
  let randNr3 = Math.floor(Math.random() * length);
  let randNr4 = Math.floor(Math.random() * length);
  let randNr5 = Math.floor(Math.random() * length);
  let arr = [randNr1, randNr2, randNr3, randNr4, randNr5];
  for (let i = 0; i < length; i += 1) {
    if (!arr.includes(i)) {
      let oneTile = document.createElement('DIV');
      oneTile.innerHTML = `
      <input
        class="input"
        type="text"
        name="tile"
        id= ${counter}
        maxlength="1"
        size="1"
        placeholder = ''
      />`;
      counter += 1;
      oneTile.className = 'char-tile';
      row.appendChild(oneTile);
    } else {
      let oneTile = document.createElement('DIV');
      oneTile.innerHTML = `
      <input
        class="non-input"
        type="text"
        name="tile"
        id= ${counter}
        maxlength="1"
        size="1"
        readonly
      />`;
      counter += 1;
      oneTile.className = 'char-tile';
      row.appendChild(oneTile);
    }
  }
  gameBoard.appendChild(row);
};

const createBoard = sLength => {
  for (let i = 0; i < sLength; i += 1) {
    createRow(sLength);
  }
};

const removeOrphanedTiles = () => {
  let countBlack = 1;
  for (let i = 1; i <= totalTiles; i += 1) {
    let sideLength = Math.sqrt(totalTiles);
    let currentTile = document.getElementById(i);
    let leftExistVal =
      document.getElementById(i - 1) &&
      document.getElementById(i - 1).className === 'input'
        ? 1
        : 0;
    let rightExistVal =
      document.getElementById(i + 1) &&
      document.getElementById(i + 1).className === 'input'
        ? 1
        : 0;
    let upperExistVal =
      document.getElementById(i - sideLength) &&
      document.getElementById(i - sideLength).className === 'input'
        ? 1
        : 0;
    let lowerExistVal =
      document.getElementById(i + sideLength) &&
      document.getElementById(i + sideLength).className === 'input'
        ? 1
        : 0;
    if (currentTile.className === 'input') {
      if (leftExistVal + rightExistVal + upperExistVal + lowerExistVal === 0) {
        currentTile.className = 'non-input';
        currentTile.setAttribute('readonly', 'readonly');
      }
    }
  }
};

const updateStatusBoard = () => {
  statusElement.innerHTML = `Your progress: ${correctTiles / totalTiles}`;
};

form.addEventListener('submit', event => {
  event.preventDefault();
  counter = 1;
  let formValue = new FormData(document.querySelector('#input-form'));
  gameBoard.innerHTML = '';
  createBoard(formValue.get('size-input'));
  totalTiles = formValue.get('size-input') * formValue.get('size-input');
  removeOrphanedTiles();
  updateStatusBoard();
});
