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
function imgName(name){
    imgs.push(name.split('.').slice(0, -1).join('.'));
}
for (let i = 0; i < imgPaths.length; i++) {
    imgs.push(imgPaths[i].split('.').slice(0, -1).join('.'));
}
for (let i = 0; i < imgPaths.length; i++) {
    extention.push(getExtention(imgPaths[i]));
}
function randImg(name, extention) {
    this.name = name;
    this.path = `./imgs/${name}.${extention}`;
    this.likes = 0;
    this.views = 0;
    randImg.all.push(this);
}
randImg.all = [];
for (let i = 0; i < imgs.length; i++) {
    new randImg(imgs[i], extention[i]);
}
function render () {
    let lftIndx = randmVal(0, imgs.length-1);
    lftImg.src = randImg.all[lftIndx].path;
    lftImg.title = randImg.all[lftIndx].name;
    lftImg.alt = randImg.all[lftIndx].name;
    randImg.all[lftIndx].views++;
    let midIndex = lftIndx;
    while (midIndex === lftIndx) {
      midIndex = randmVal(lftIndx, imgs.length-1);
      if(midIndex !== lftIndx) {
        break;
      }
    }
    midImg.src = randImg.all[midIndex].path;
    midImg.title = randImg.all[midIndex].name;
    midImg.alt = randImg.all[midIndex].name;
    randImg.all[midIndex].views++;
    let rightIndex;
    while (midIndex !== lftIndx) {
      rightIndex = randmVal(0, imgs.length -1);
      if(rightIndex === lftIndx || rightIndex === midIndex){
        rightIndex = randmVal(0, imgs.length -1);
      } else {
        break;
      }
    }
    ritImg.src = randImg.all[rightIndex].path;
    ritImg.title = randImg.all[rightIndex].name;
    ritImg.alt = randImg.all[rightIndex].name;
    randImg.all[rightIndex].views++;
}
function clkabilty(event) {
    if(event.target.id !== 'imgSec'){
      for (let i = 0; i < randImg.all.length; i++) {
        if (randImg.all[i].name === event.target.title) {
          randImg.all[i].likes++;
        }
      }
      render();
      cuntr = cuntr + 1;
      if(cuntr === laps){
        imgSection.removeEventListener('click', clkabilty);
        const resBtn = document.createElement('button');
        resultsBtn.appendChild(resBtn);
        resBtn.textContent = 'View Results';
        resBtn.className = 'btn';
        resultsBtn.addEventListener('click', resultBtn);
      }
    }
}
function resultBtn(event) {
    resultsBtn.removeEventListener('click', resultBtn);
    const listSec = document.getElementById('list');
    const ul = document.createElement('ul');
    listSec.appendChild(ul);
    for (let i = 0; i < randImg.all.length; i++) {
      const li = document.createElement('li');
      ul.appendChild(li);
      li.textContent = `${randImg.all[i].name.toUpperCase()} had "${randImg.all[i].likes}" likes and was shown "${randImg.all[i].views}" times.`;
    }
}
render();
imgSec.addEventListener('click', clkabilty);

