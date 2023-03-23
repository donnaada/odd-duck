// 'use strict';

let state = [];
let maxRounds =5;

let trackerEl = document.getElementById('votingTracker');
let imgEls = document.querySelectorAll('#productImages .container img');
let pEls = document.querySelectorAll('#productImages .container p');

let showResultsBtn = document.getElementById('showResultBtn');
showResultsBtn.style.display='none';

let canvas = document.getElementById('canvas');

function CreateProduct(name, source, alt){
  this.timesShown = 0 ;
  this.timesClicked = 0;
  this.name = name;
  this.source = source;
  this.altTxt = alt;
  state.push(this);
}

new CreateProduct('bag', './assets/img/bag.jpg','r2d2 design luggage');
new CreateProduct('banana', './assets/img/banana.jpg','banana shaped slicer');
new CreateProduct('bathroom', './assets/img/bathroom.jpg','tablet and tissue holder');
new CreateProduct('boots', './assets/img/boots.jpg','yellow rain boots');
new CreateProduct('breakfast', './assets/img/breakfast.jpg','breakfast and coffee maker combo');
new CreateProduct('bubblegum', './assets/img/bubblegum.jpg','meatball bubble gum');
new CreateProduct('chair', './assets/img/chair.jpg','chair');
new CreateProduct('cthulhu', './assets/img/cthulhu.jpg','action figure');
new CreateProduct('dog-duck', './assets/img/dog-duck.jpg','dog wearing duck bill');
new CreateProduct('dragon', './assets/img/dragon.jpg','canned dragon meat');
new CreateProduct('pen', './assets/img/pen.jpg','pen utensils');
new CreateProduct('pet-sweep', './assets/img/pet-sweep.jpg','pet mop shoes');
new CreateProduct('scissors', './assets/img/scissors.jpg','pizza scissorss');
new CreateProduct('shark', './assets/img/shark.jpg','person in shark sleeping bag');
new CreateProduct('sweep', './assets/img/sweep.png','infant using outfit with microfiber sweeper');
new CreateProduct('tauntaun', './assets/img/tauntaun.jpg','toddler in sleeping bag');
new CreateProduct('unicorn', './assets/img/unicorn.jpg','canned unicorn meat');
new CreateProduct('water-can', './assets/img/water-can.jpg','bent watering can');
new CreateProduct('wine-glass', './assets/img/wine-glass.jpg','unique wine glass');

renderImages();
function randomNum(){
  return Math.floor(Math.random() * state.length);
}

function renderImages(){
  canvas.style.display='none';
  let prevImgs = [];

  for (let i = 0; i < 3; i++) {
    let product = state[randomNum()];

    // Check for duplicate product names
    while (product.name === imgEls[0].id || product.name === imgEls[1].id || product.name === imgEls[2].id || prevImgs.includes(product.name) ) {
      product = state[randomNum()];
    }

    prevImgs.push(product.name);

    imgEls[i].src = product.source;
    imgEls[i].id = product.name;
    imgEls[i].alt = product.altTxt;
    product.timesShown += 1;
    product.productClicked +=1;

    pEls[i].textContent = `${product.name}`;
  }


}

function handleClick(event){
  let productClicked = event.target.id;

  state.forEach(img => {
    if (img.name === productClicked){
      img.timesClicked += 1;
    }
  });

  if (maxRounds -1 ){
    renderImages();
    maxRounds--;
  } else {
    trackerEl.removeEventListener('click',handleClick);
    // trackerEl.style.display = 'none';
    showResultsBtn.style.display='block';


  }

  storeData();
}

function drawChart(){
  let labels = [];
  let timesShownVal =[];
  let timesClickedVal =[];

  state.forEach(item => {
    labels.push(item.name);
    timesClickedVal.push(item.timesClicked);
    timesShownVal.push(item.timesShown);

  });

  canvas.style.display='block';


  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Times Clicked',
        data: timesClickedVal,
        borderWidth: 1
      }, {
        label: 'Times Shown',
        data: timesShownVal,
        borderWidth: 1
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function displayResults(){
  drawChart();
}

function storeData(){
  let data = JSON.stringify(state);
  localStorage.setItem('productData', data);
}

function readData(){
  let data = localStorage.getItem('productData');

  if (data){
    state = JSON.parse(data);
  } else {
    storeData();
  }
}

readData();

trackerEl.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', displayResults);



