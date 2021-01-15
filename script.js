var lat, lon;
var tempUnit = '';
var currentTempInCelcius = 0; 

var latitude = document.getElementsByClassName("lat");
var longitude = document.getElementsByClassName("lon");
var scale = document.getElementsByClassName("scale")[0];
var ttemp = document.getElementsByClassName("t_temp")[0];
var country = document.getElementsByClassName("country")[0];
var city = document.getElementsByClassName("city")[0];
var desc = document.getElementsByClassName("desc")[0];
var more = document.getElementsByClassName("box")

var request = new XMLHttpRequest();

document.addEventListener('DOMContentLoaded', function() {
  // Latitue and longitude
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
     lon = position.coords.latitude;
      latitude[0].innerHTML =  "lat: " + lon;  
     lat = position.coords.longitude; 
      longitude[0].innerHTML =  "lon: " + lat
          getWeather(lat, lon);
    })
  } else {
    
  }
  
  // Temperature 
  scale.addEventListener("click", function() {
   scale.innerHTML = (scale.innerHTML.trim() == 'C') ? 'F' : 'C';
    if(scale.innerHTML == 'F') {
    let temp = Math.round(currentTempInCelcius * 9 / 5 + 32);
      console.log(temp);
      ttemp.innerHTML = temp + " " + String.fromCharCode(176); 
    } else {
      ttemp.innerHTML = currentTempInCelcius + " " + String.fromCharCode(176);
    }
  });
  
    // Location
  
   function getWeather(lat, lon) {
        var urlString = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;
        request.open('GET', urlString)
        request.send();
        request.onload = function() {
        let result = JSON.parse(this.response); 
  

        currentTempInCelcius = Math.round(result.main.temp * 10) / 10;
        ttemp.innerHTML = currentTempInCelcius + " " + String.fromCharCode(176); 
        scale.innerHTML = 'C'
        city.innerHTML = result.name 
        country.innerHTML =", " + result.sys.country;
        desc.innerHTML = result.weather[0].main;
        if(!result.name) {
            country.innerHTML = "Opps, please reload!";
        }
        }
      }
    
    more[0].addEventListener("click", function() {
      getWeather(40.7128, -74.0060)
    })
   more[1].addEventListener("click", function() {
       getWeather(51.5074, -0.1278)
    })
   more[2].addEventListener("click", function() {
     getWeather(28.6139,77.2090)
    })
     more[3].addEventListener("click", function() {
      getWeather(35.6762, 139.6503)
    })
})