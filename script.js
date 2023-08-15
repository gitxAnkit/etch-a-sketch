const DEFAULT_MODE='color';
const DEFAULT_COLOR= 'white';
const DEFAULT_SIZE= 16;

let currentColor =DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize =DEFAULT_SIZE;

function setCurrentColor(newColor){
    currentColor = newColor;
}
function setCurrentMode(newMode){
    activateButton(newMode);
    currentMode =newMode;
}
function setCurrentSize(newSize){
    currentSize = newSize;
}

const inputColor = document.getElementById("input-color");
const colorBtn =document.getElementById("color-mode");
const rainbowBtn =document.getElementById("rainbow-mode");
const eraserBtn =document.getElementById("eraser");
const clearBtn = document.getElementById("clear");
const gridSize = document.getElementById("grid-size");
const grid = document.getElementById("grid-container");
const sizeSlider = document.getElementById("size-slider");

inputColor.oninput = (e) =>setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick=() => setCurrentMode('rainbow');
eraserBtn.onclick=() => setCurrentMode('eraser');
clearBtn.onclick=() => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange =(e)=> changeSize(e.target.value);

let mousedown = false;
document.body.onmousedown= () =>(mousedown= true);
document.body.onmouseup =() =>(mousedown=false);

function changeSize(value){
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}
function updateSizeValue(value){
    gridSize.innerHTML = `${value} x ${value}`;
}
function reloadGrid(){
    clearGrid();
    setupGrid(currentSize);
}
function clearGrid(){
    grid.innerHTML ='';
}

function setupGrid(size) {
    console.log("grid");
    grid.style.gridTemplateColumns=`repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows= `repeat(${size}, 1fr)`;

    console.log("number: "+ size*size);

    for(let i=0; i<size*size;i++){

        const gridElement =document.createElement("div");
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown',changeColor);
        
        grid.appendChild(gridElement);
       // console.log(grid);
    }
}
function changeColor(e){
    if(e.type ==='mouseover' && !mousedown) return;
    if(currentMode==='rainbow'){
        const randomR =Math.floor(Math.random()* 256);
        const randomG =Math.floor(Math.random()* 256);
        const randomB =Math.floor(Math.random()* 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        
    }
    else if(currentMode ==='color'){
        e.target.style.backgroundColor =currentColor;
    } else if(currentMode ==='eraser'){
        e.target.style.backgroundColor = '#fefefe';
    }
}

function activateButton(newMode){
    if(currentMode ==='rainbow'){
        rainbowBtn.classList.remove('active');
    }else if (currentMode ==='color'){
        colorBtn.classList.remove('active');
    }else if (currentMode==='eraser'){
        eraserBtn.classList.remove('active');
    }

    if(newMode ==='rainbow'){
        rainbowBtn.classList.add('active');
    }else if (newMode ==='color'){
        colorBtn.classList.add('active');
    }else if (newMode==='eraser'){
        eraserBtn.classList.add('active');
    }        
}

window.onload =() =>{
    setupGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}

