const timeZone = document.getElementById('cityTime');
const currentTemp = document.getElementById('current-temp');
const timeForecasts = document.getElementById('time');
const countryZone = document.getElementById('cityCountry');
const weatherForecastDiv = document.getElementById('weather-forecast');
const dateForecasts = document.getElementById('date');
const currentForecasts = document.getElementById('current-items');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const apiKey = '49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const minutes = time.getMinutes();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    const day = time.getDay();
    const date = time.getDate();
    const month = time.getMonth();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeForecasts.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`;
    dateForecasts.innerHTML = days[day] + ', ' + date + ' ' + months[month];
        
    
}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}


function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timeZone.innerHTML = data.timezone;
    countryZone.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentForecasts.innerHTML = `
    <div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
</div>
<div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
</div>
    `

let weekDaysForcast = '';
data.daily.forEach((day, idx) => {
    if(idx == 0) {
        currentTemp.innerHTML=`
        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="w-icon" class="w-icon">
        <div class="weatherCurrentCardFirts__containerValues">
            <div class="weatherCurrentCardFirts__day">${window.moment(day.dt*1000).format('dddd')}</div>
            <div class="weatherCurrentCardFirts__temp">Day - ${day.temp.day}&#176;C</div>
            <div class="weatherCurrentCardFirts__temp">Night - ${day.temp.night}&#176;C</div>
        </div>`
    }else{
        weekDaysForcast +=`
        <div class="weatherCountainer__item">
        <div class="weatherCurrentCard__day">${window.moment(day.dt*1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="w-icon" class="w-icon">
        <div class="weatherCurrentCard__temp">Day - ${day.temp.day}&#176;C</div>
        <div class="weatherCurrentCard__temp">Night - ${day.temp.night}&#176;C</div>
    </div>`
    }
})

weatherForecastDiv.innerHTML = weekDaysForcast;
}



//         }else{
//             otherDayForcast += `
//             <div class="weather-forecast-item">
//                 <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
//                 <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
//                 <div class="temp">Night - ${day.temp.night}&#176;C</div>
//                 <div class="temp">Day - ${day.temp.day}&#176;C</div>
//             </div>
            
//             `
//         }
//     })


//     weatherForecastEl.innerHTML = otherDayForcast;
// }