// 'use strict';

const state = [];
let maxRounds = 5; 

let trackerEl = document.getElementById('votingTracker');
let containerEl = document.getElementById('productImages');
let resultsTable = document.getElementById('resultsContainer');
let imgEls = document.querySelectorAll('#productImages .container img');
let pEls = document.querySelectorAll('#productImages .container p');


function CreateProduct(name, source){
  this.timesShown = 0 ;
  this.timesClicked = 0;
  this.name = name;
  this.source = source;
  state.push(this);
}

new CreateProduct('bag', './assets/img/bag.jpg');
new CreateProduct('banana', './assets/img/banana.jpg');
new CreateProduct('bathroom', './assets/img/bathroom.jpg');
new CreateProduct('boots', './assets/img/boots.jpg');
new CreateProduct('breakfast', './assets/img/breakfast.jpg');
new CreateProduct('bubblegum', './assets/img/bubblegum.jpg');
new CreateProduct('chair', './assets/img/chair.jpg');
new CreateProduct('cthulhu', './assets/img/cthulhu.jpg');
new CreateProduct('dog-duck', './assets/img/dog-duck.jpg');
new CreateProduct('dragon', './assets/img/dragon.jpg');
new CreateProduct('pen', './assets/img/pen.jpg');
new CreateProduct('pet-sweep', './assets/img/pet-sweep.jpg');
new CreateProduct('scissors', './assets/img/scissors.jpg');
new CreateProduct('shark', './assets/img/shark.jpg');
new CreateProduct('sweep', './assets/img/sweep.png');
new CreateProduct('tauntaun', './assets/img/tauntaun.jpg');
new CreateProduct('unicorn', './assets/img/unicorn.jpg');
new CreateProduct('water-can', './assets/img/water-can.jpg');
new CreateProduct('wine-glass', './assets/img/wine-glass.jpg');

console.log("CURRENTLY RENDERED IMAGES", imgEls);

console.log('CURRENT STATE', state);

renderImages();

function randomNum(){
  return Math.floor(Math.random() * state.length);
}

function renderImages(){

  let product1 = state[randomNum()];
  let product2 = state[randomNum()];
  let product3 = state[randomNum()];

    if (product1.name === product2.name || product1.name === product3.name) {
    product1 = state[randomNum()]
  } else if (product2.name === product1.name || product2.name === product3.name) {
    product2 = state[randomNum()]
  } else if (product3.name === product1.name || product3.name === product2.name) {
    product3 = state[randomNum()]
  }

  imgEls[0].src = product1.source;
  imgEls[0].id = product1.name;
  product1.timesShown += 1;


  imgEls[1].src = product2.source;
  imgEls[1].id = product2.name;
  product2.timesShown += 1;

  imgEls[2].src = product3.source;
  imgEls[2].id = product3.name;
  product3.timesShown += 1;

  pEls[0].innerHTML = `${product1.name} <br> shown ${product1.timesShown} times <br> clicked ${product1.timesClicked} times`;
  pEls[1].innerHTML = `${product2.name} <br> shown ${product2.timesShown} times <br> clicked ${product2.timesClicked} times`;
  pEls[2].innerHTML = `${product3.name} <br> shown ${product3.timesShown} times <br> clicked ${product3.timesClicked} times`;

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
    containerEl.innerHTML = '';
    containerEl.innerHTML = `
    
    <button onClick="displayResults()">Show Results</button>

    `;
  }
}

trackerEl.addEventListener('click', handleClick)



function displayResults(){
  let tbody = document.createElement('tbody');
  resultsTable.appendChild(tbody);


  resultsTable.appendChild
  state.forEach(item => {
    console.log(item.name, item.timesClicked, item.timesShown, item.source);
    // containerEl.innerHTML ='';
    let trow = document.createElement('tr');
    tbody.appendChild(trow);
    trow.innerHTML = `
    <td><img src="${item.source}"/></td>
    <td>${item.name}</td>
    <td>${item.timesClicked}</td>
    <td>${item.timesShown}</td>
    `;

    tbody.appendChild(trow);
  });


}


