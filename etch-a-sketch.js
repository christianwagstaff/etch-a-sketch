const container = document.getElementById('container');
const gridButton = document.getElementById('gridSubmit');
const darkenSlider = document.getElementById('darkenColor');
const randomColorSider = document.getElementById('randomColor');
const colorSelector = document.getElementById('colorWell');
const pencilSlider = document.getElementById('userColor');
const brightenSlider = document.getElementById('brightenColor');
const eraserSlider = document.getElementById('eraser');
const clearGridBtn = document.getElementById('clearGrid');

gridButton.addEventListener('click', changeGrid);
darkenSlider.addEventListener('change', toggleDarkener);
brightenSlider.addEventListener('change', toggleBrightner);
randomColorSider.addEventListener('change', toggleRandomColorizer)
colorSelector.addEventListener('change', userColor);
pencilSlider.addEventListener('change', toggleUserColor);
eraserSlider.addEventListener('change', toggleEraser);
clearGridBtn.addEventListener('click', resetBoard);

//starting units for grid
let gridSize = 10;
let maxGridLength = 100;
let fullGrid = 500;

createGrid(gridSize);

function randomColor(e) {
    e.target.style.backgroundColor = chooseRandomColor();
}

function getCurrentColor() {
    return colorSelector.value;
}

function userColor(e) {
    e.target.style.backgroundColor = getCurrentColor();
}

function eraser(e) {
    e.target.style.backgroundColor = 'white';
    e.target.style.filter = 'brightness(100%)';
}

function toggleUserColor() {
    if (!pencilSlider
    .checked) {
        removeColorEvent(userColor);
        return;
    }
    randomColorSider.checked = false;
    removeColorEvent(randomColor);
    eraserSlider.checked = false;
    removeColorEvent(eraser);
    addColorEvent(userColor);
}

function toggleEraser() {
    if (!eraserSlider.checked) {
        removeColorEvent(eraser);
        return;
    }
    randomColorSider.checked = false;
    pencilSlider.checked = false;
    removeColorEvent(randomColor);
    removeColorEvent(userColor);
    addColorEvent(eraser);
}

function changeColor() {
    if (pencilSlider.checked) {
        removeColorEvent(userColor);
        addColorEvent(userColor);
    }
}

function toggleRandomColorizer() {
    if (!randomColorSider.checked) {
        removeColorEvent(randomColor);
        return;
    }
    pencilSlider.checked = false;
    removeColorEvent(userColor);
    eraserSlider.checked = false;
    removeColorEvent(eraser);
    addColorEvent(randomColor);
}

function toggleDarkener() {
    if (!darkenSlider.checked) {
        removeColorEvent(makeDarker);
        return;
    }
    brightenSlider.checked = false;
    removeColorEvent(makeBrighter);
    addColorEvent(makeDarker);
}
function toggleBrightner() {
    if (!brightenSlider.checked) {
        removeColorEvent(makeBrighter);
        return;
    }
    darkenSlider.checked = false;
    removeColorEvent(makeDarker);
    addColorEvent(makeBrighter);
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
    removeTools();
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
    gridButton.innerText = `${gridHeight} x ${gridHeight}`;
    for (let i = 0; i < gridHeight**2; i++) {
        let gridSize;
        let grid = document.createElement('div');
        gridSize = findGridSize(gridHeight);
        grid.classList.add('grid');
        grid.style.height = `${gridSize}px`;
        grid.style.width = `${gridSize}px`;
        grid.style.backgroundColor = 'white';
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
    userGridSize = parseInt(prompt('What Size Do You Want?'));
    if (!userGridSize) {
        return
    };
    if (userGridSize > maxGridLength) {
        alert(`Too big! Max Size is ${maxGridLength}.`);
        return;
    }
    gridSize = userGridSize;
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
    currentBrightness = currentBrightness.substring(11, 16);
    currentBrightness = parseInt(currentBrightness);
    console.log(currentBrightness);
    if (isNaN(currentBrightness)) {
        e.target.style.filter = 'brightness(80%)';
        return;
    }
    if (currentBrightness === 0) return;
    let newBrightness = currentBrightness - 20;
    console.log(newBrightness)
    e.target.style.filter = `brightness(${newBrightness}%)`;
}

function makeBrighter(e) {
    let currentBrightness = e.target.style.filter;
    currentBrightness = currentBrightness.substring(11, 16);
    currentBrightness = parseInt(currentBrightness);
    console.log(currentBrightness)
    if (isNaN(currentBrightness)) {
        e.target.style.filter = 'brightness(120%)';
        return;
    }
    if (currentBrightness == 200) return;
    let newBrightness = parseInt(currentBrightness) + 20;
    e.target.style.filter = `brightness(${newBrightness}%)`;
}

function resetBoard() {
    removeAllChildNodes(container);
    createGrid(gridSize);
    removeTools();
}

function removeTools() {
    randomColorSider.checked = false;
    pencilSlider.checked = false;
    eraserSlider.checked = false;
    darkenSlider.checked = false;
    brightenSlider.checked = false;
    removeColorEvent(randomColor);
    removeColorEvent(userColor);
    removeColorEvent(eraser);
    removeColorEvent(makeDarker);
    removeColorEvent(makeBrighter);
}