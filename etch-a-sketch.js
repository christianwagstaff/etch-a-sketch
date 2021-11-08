const container = document.getElementById('container');
const gridButton = document.getElementById('gridSubmit');

gridButton.addEventListener('click', changeGrid);

let gridLength = 10;
let maxGridLength = 100;
const FULLGRID = 1000;

createGrid(gridLength);
addColorEvent();

function changeColor(e) {
    console.log(e.target);
    e.target.style.backgroundColor = 'blue';
}

function findGridSize(gridLength) {
    return Math.floor(FULLGRID / gridLength);
}

function changeGrid() {
    let gridSize;
    gridSize = getUserGridSize();
    if (!gridSize) return;
    removeAllChildNodes(container);
    createGrid(gridSize);
    addColorEvent();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createGrid(gridHeight) {
    for (let i = 0; i < gridHeight**2; i++) {
        let gridSize;
        let grid = document.createElement('div');
        grid.classList.add('grid');
        gridSize = findGridSize(gridHeight);
        grid.style.height = `${gridSize}px`;
        grid.style.width = `${gridSize}px`;
        grid.textContent = '*';
        container.appendChild(grid);
    }
}

function addColorEvent() {
    let grids = document.querySelectorAll('.grid');
    grids.forEach(e1 => e1.addEventListener('mouseover', changeColor));
}

function getUserGridSize() {
    let gridSize = parseInt(prompt('What Size Do You Want?'));
    if (!gridSize) {
        alert("You didn't enter a valid number!");
        return
    };
    if (gridSize > maxGridLength) {
        alert(`Too big! Max Size is ${maxGridLength}.`);
        return;
    }
    return gridSize;
}