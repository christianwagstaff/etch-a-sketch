const container = document.getElementById('container');
const gridButton = document.getElementById('gridSubmit');
const darkenSlider = document.getElementById('darkenColor');

gridButton.addEventListener('click', changeGrid);
darkenSlider.addEventListener('change', addDarkener);

//starting units for grid
let gridLength = 10;
let maxGridLength = 100;
let fullGrid = 500;

createGrid(gridLength);
addColorEvent(randomColor);

function randomColor(e) {
    e.target.style.backgroundColor = chooseRandomColor();
}

function addDarkener(e) {
    console.log(darkenSlider.checked);
    if (!darkenSlider.checked) {
        removeColorEvent(makeDarker);
        return;
    }
    addColorEvent(makeDarker);
}

function findGridSize(gridLength) {
    let gridSize = Math.floor(fullGrid / gridLength);
    return gridSize;
}

function changeGrid() {
    let gridSize;
    gridSize = getUserGridSize();
    if (!gridSize) return;
    removeAllChildNodes(container);
    createGrid(gridSize);
    addColorEvent(changeColor);
    addColorEvent(addDarkener);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createGrid(gridHeight) {
    let tempGridSize = findGridSize(gridHeight);
    let fullGrid = tempGridSize * gridHeight;
    container.style.height = `${fullGrid}px`;
    container.style.width = `${fullGrid}px`;
    for (let i = 0; i < gridHeight**2; i++) {
        let gridSize;
        let grid = document.createElement('div');
        gridSize = findGridSize(gridHeight);
        grid.classList.add('grid');
        grid.style.height = `${gridSize}px`;
        grid.style.width = `${gridSize}px`;
        //grid.textContent = '*';
        container.appendChild(grid);
    }
}

function addColorEvent(color) {
    let grids = document.querySelectorAll('.grid');
    grids.forEach(e1 => e1.addEventListener('mouseover', color));
}

function removeColorEvent(color) {
    let grids = document.querySelectorAll('.grid');
    grids.forEach(e1 => e1.removeEventListener('mouseover', color));
}

function getUserGridSize() {
    gridSize = parseInt(prompt('What Size Do You Want?'));
    if (!gridSize) {
        return
    };
    if (gridSize > maxGridLength) {
        alert(`Too big! Max Size is ${maxGridLength}.`);
        return;
    }
    return gridSize;
}

function chooseRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
}

function makeDarker(e) {
    let currentBrightness = e.target.style.filter;
    currentBrightness = currentBrightness.substring(11, 13);
    if (!currentBrightness) {
        e.target.style.filter = 'brightness(80%)';
        return;
    }
    if (currentBrightness === 0) return;
    let newBrightness = currentBrightness - 20;
    e.target.style.filter = `brightness(${newBrightness}%)`;
}

function resetGrid() {

}