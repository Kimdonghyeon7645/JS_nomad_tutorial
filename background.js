const body = document.querySelector('body');

const IMG_NUMBER = 4;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `./img/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function getRandom(){
    return Math.floor(Math.random() * IMG_NUMBER);
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();