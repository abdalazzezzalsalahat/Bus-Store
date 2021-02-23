'use strict';
const imgPaths = ['bag.jpg'
  ,'banana.jpg'
  ,'bathroom.jpg'
  ,'boots.jpg'
  ,'breakfast.jpg'
  ,'bubblegum.jpg'
  ,'chair.jpg'
  ,'cthulhu.jpg'
  ,'dog-duck.jpg'
  ,'dragon.jpg'
  ,'pen.jpg'
  ,'pet-sweep.jpg'
  ,'scissors.jpg'
  ,'shark.jpg'
  ,'sweep.png'
  ,'tauntaun.jpg'
  ,'unicorn.jpg'
  ,'usb.gif'
  ,'water-can.jpg'
  ,'wine-glass.jpg'];

const imgs = [];
const extention = [];
const liked = [];
const viewed = [];
let cuntr = 0;
const laps = 25;
const imgSection = document.getElementById('imgSec');
const ritImg = document.getElementById('rit');
const midImg = document.getElementById('mid');
const lftImg = document.getElementById('lft');
const resultsBtn = document.getElementById('btn');

function randmVal (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getExtention(img) {
  let idx = img.lastIndexOf('.');
  return (idx < 1) ? '' : img.substr(idx + 1);
}
// eslint-disable-next-line no-unused-vars
function imgName(name){
  imgs.push(name.split('.').slice(0, -1).join('.'));
}
for (let i = 0; i < imgPaths.length; i++) {
  imgs.push(imgPaths[i].split('.').slice(0, -1).join('.'));
}
for (let i = 0; i < imgPaths.length; i++) {
  extention.push(getExtention(imgPaths[i]));
}
function RandImg(imgName, extention) {
  this.name = imgName;
  this.path = './imgs/' + imgName + '.' + extention;
  this.likes = 0;
  this.views = 0;
  RandImg.all.push(this);
}
RandImg.all = [];
for (let i = 0; i < imgs.length; i++) {
  new RandImg(imgs[i], extention[i]);
}
function render () {
  let prevMidIndx = -2;
  let prevLftIndx = -1;
  let prevRightIndx = 0;
  /**************************************LEFT IMAGE********************************************/
  let lftIndx = randmVal(0, imgs.length);
  while (lftIndx === prevLftIndx || lftIndx === prevMidIndx || lftIndx === prevRightIndx) {
    lftIndx = randmVal(0, imgs.length);
    if(lftIndx !== prevLftIndx && lftIndx !== prevMidIndx && lftIndx !== prevRightIndx){
      break;
    }
  }
  lftImg.src = RandImg.all[lftIndx].path;
  lftImg.title = RandImg.all[lftIndx].name;
  lftImg.alt = RandImg.all[lftIndx].name;
  RandImg.all[lftIndx].views++;
  /**************************************MID IMAGE********************************************/
  let midIndx = randmVal(0, imgs.length);
  while (midIndx === prevLftIndx || midIndx === prevMidIndx || midIndx === prevRightIndx || midIndx === lftIndx) {
    midIndx = randmVal(0, imgs.length);
    if(midIndx !== prevLftIndx && midIndx !== prevMidIndx && midIndx !== prevRightIndx && midIndx !== lftIndx) {
      break;
    }
  }
  midImg.src = RandImg.all[midIndx].path;
  midImg.title = RandImg.all[midIndx].name;
  midImg.alt = RandImg.all[midIndx].name;
  RandImg.all[midIndx].views++;
  /**************************************RIGHT IMAGE********************************************/
  let rightIndx = randmVal(0, imgs.length);
  while (rightIndx === prevLftIndx || rightIndx === prevMidIndx || rightIndx === prevRightIndx || rightIndx === lftIndx || rightIndx === midIndx) {
    rightIndx = randmVal(0, imgs.length);
    if(rightIndx !== prevLftIndx && rightIndx !== prevMidIndx && rightIndx !== prevRightIndx && rightIndx !== lftIndx && rightIndx !== midIndx){
      break;
    }
  }
  ritImg.src = RandImg.all[rightIndx].path;
  ritImg.title = RandImg.all[rightIndx].name;
  ritImg.alt = RandImg.all[rightIndx].name;
  RandImg.all[rightIndx].views++;

  prevMidIndx = midIndx;
  prevLftIndx = lftIndx;
  prevRightIndx = rightIndx;
}
function barChart (){
  const ctx = document.getElementById('chartCont').getContext('2d');
  for (let i = 0; i < imgs.length; i++) {
    liked.push(RandImg.all[i].likes);
    viewed.push(RandImg.all[i].views);
  }
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: imgs,
      datasets: [
        {
          barPercentage: 0.5,
          borderWidth: 1,
          label: '# of Likes:',
          backgroundColor: '#2e2e2e',
          borderColor: '#2e2e2e',
          data: liked,
        },
        {
          barPercentage: 0.5,
          borderWidth: 1,
          label: '# of Views:',
          backgroundColor: '#e2e2e2',
          borderColor: '#e2e2e2',
          data: viewed,
        },
      ],
    },
    options: {indexAxis: 'y'}
  });
}
function clkabilty(event) {
  if(event.target.id !== 'imgSec'){
    for (let i = 0; i < RandImg.all.length; i++) {
      if (RandImg.all[i].name === event.target.title) {
        RandImg.all[i].likes++;
      }
    }
    render();
    cuntr = cuntr + 1;
    if(cuntr === laps){
      imgSection.removeEventListener('click', clkabilty);
      barChart();
      const resBtn = document.createElement('button');
      resultsBtn.appendChild(resBtn);
      resBtn.textContent = 'View Results';
      resBtn.className = 'btn';
      resultsBtn.addEventListener('click', resultBtn);
    }
  }
}
function resultBtn() {
  resultsBtn.removeEventListener('click', resultBtn);
  const listSec = document.getElementById('list');
  const ul = document.createElement('ul');
  listSec.appendChild(ul);
  for (let i = 0; i < RandImg.all.length; i++) {
    const li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${RandImg.all[i].name.toUpperCase()} had "${RandImg.all[i].likes}" likes and was shown "${RandImg.all[i].views}" times.`;
  }
}
function getPrev(){
  if(localStorage.length > 0) {
    const prevLiks = JSON.parse(localStorage.getItem('likes'));
    const preViews = JSON.parse(localStorage.getItem('views'));
    for (let i = 0; i < viewed.length; i++) {
      liked[i] += prevLiks[i];
      viewed[i] += preViews[i];
      liked.push(prevLiks);
      viewed.push(preViews);
    }
  }
}
render();
// eslint-disable-next-line no-undef
imgSec.addEventListener('click', clkabilty);
getPrev();
