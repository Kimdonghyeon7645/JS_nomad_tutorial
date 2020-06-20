const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY = 'b08453aefb62a2d40d599291d131b361';

function getWeather(lat, lng){
    console.log('lat: ', lat, ' , lng: ', lng, ' , url: ', `https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`);
    fetch(`https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`,
    ).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        console.log('json: ', json);
        console.log('place: ', json.name, ' , temp: ', json.main.temp); 
        // 위도 경도는 잘 가져오는데 api 서버의 응답값 이상함. (왜 일본 날씨값을 가져오는지...)
        // const temperature = (Number(json.main.temp)-32) / 1.8;
        // const place = json.name;
        const temperature = 20;
        const place = '대전시';
        weather.innerText = `${place} : ${temperature}°C`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,   // == latitude: latitude
        longitude
    };
    console.log(position, coordsObj);
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('지역에 접근할 수 없습니다!')
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();