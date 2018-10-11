const appKey = "85e72f335026af0446c3b0e9c0b87e49";

let searchButton = document.getElementById('search-btn');
let searchInput = document.getElementById('search-input');
let cityName = document.getElementById('name');
let country = document.getElementById('country');
let icon = document.getElementById('icon');
let temperature = document.getElementById('temperature');


searchButton.addEventListener("click", checkWeather);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
  if (event.key === "Enter") {
    checkWeather();
  }
}

function checkWeather() {
  if (searchInput.value === "") {
  
  }else {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
   makeRequest(searchLink, theResponse);
  }
 }

 function makeRequest(url, callback) {
  console.log("making request!");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => { 
        if (xhr.readyState == 4 && xhr.status == 200)
            callback(xhr.responseText);
    }
    xhr.open("GET", url, true); // true for asynchronous 
    xhr.send();
}

function theResponse(response) {
  let temporary, dayNight, weatherInfo, iconName, timeInfo;
  let jsonObject = JSON.parse(response);
  console.log(jsonObject);
  cityName.innerHTML = jsonObject.name;
  country.innerHTML = `, ${jsonObject.sys.country}`;
  temporary = jsonObject.weather[0].icon;
  dayNight = temporary.charAt(2);
  
  
  weatherInfo = jsonObject.weather[0].description;
  console.log(weatherInfo);

  if(dayNight === 'n') {
    timeInfo = 'night';
  } else if(dayNight === 'd') {
    timeInfo = 'day';
  } else {
    timeInfo = 'night';
  }

  switch (weatherInfo) {
    case 'clear sky':
    if (timeInfo === 'day') {
      iconName = `wi-${timeInfo}-sunny`;
      break;
    } else {
      iconName = `wi-${timeInfo}-clear`;
      break;
    }
    
    case 'few clouds':
    iconName = `wi-${timeInfo}-cloudy`;
        break;
    case 'scattered clouds':
    iconName = `wi-${timeInfo}-cloudy`;
        break;
    case 'overcast clouds':
    iconName = `wi-${timeInfo}-cloudy`;
        break;
    case 'broken clouds':
    iconName = `wi-${timeInfo}-cloudy`;
        break;
    case 'shower rain':
    iconName = `wi-${timeInfo}-rain-mix`;
        break;
    case 'rain':
    iconName = `wi-${timeInfo}-rain`;
        break;
    case 'thunderstorm':
    iconName = `wi-${timeInfo}-thunderstorm`;
        break;
    case 'snow':
    iconName = `wi-${timeInfo}-snow`;
        break;
    case 'haze':
    case 'smoke':
    case 'mist':
    case 'fog':
    case 'sand':
    case 'squalls':
    if (timeInfo === 'night') {
      iconName = `wi-${timeInfo}-fog`;
      break;
    } else {
      iconName = `wi-${timeInfo}-haze`;
      break;
    }
  }
  icon.innerHTML = `<i class="wi ${iconName} animated bounce"></i>`

  /*
    Groups Handling
  */
  if (jsonObject.weather[0].id >= 200 && jsonObject.weather[0].id <= 232) {
    iconName = `wi-${timeInfo}-thunderstorm`;
  } else if (jsonObject.weather[0].id >= 300 && jsonObject.weather[0].id <= 321) {
    iconName = `wi-${timeInfo}-showers`;
  } else if (jsonObject.weather[0].id >= 500 && jsonObject.weather[0].id <= 501) {
    iconName = `wi-${timeInfo}-showers`;
  } else if (jsonObject.weather[0].id >= 503 && jsonObject.weather[0].id <= 531) {
    iconName = `wi-${timeInfo}-hail`;
  } else if (jsonObject.weather[0].id >= 600 && jsonObject.weather[0].id <= 622) {
    iconName = `wi-${timeInfo}-snow`;
  } else if (jsonObject.weather[0].id >= 701 && jsonObject.weather[0].id <= 781) {
    if (timeInfo === 'night') {
      iconName = `wi-${timeInfo}-fog`;
    } else {
      iconName = `wi-${timeInfo}-haze`;
    }
  }
  temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + " ° C";
  icon.innerHTML = `<i class="wi ${iconName} animated bounce"></i>`
  
  console.log(iconName);
}

