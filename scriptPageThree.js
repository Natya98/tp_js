let meteo = document.getElementById("weather-section")
let data = []
const cities = ['Oslo','Lille','Tokyo','Dublin','Milan']

const url = "https://api.open-meteo.com/v1/forecast?latitude=59.9127,50.633,35.6895,53.3331,45.4643&longitude=10.7461,3.0586,139.6917,-6.2489,9.1895&current=temperature_2m,apparent_temperature,is_day,precipitation,wind_speed_10m"


function fetchStatus() {
    fetch(url).then(response => response.json()).then(json => { data=[] 
        for(let i=0; i<5;i++){
        data.push(json.slice(i,i+1))}
        renderData()
    })
}

function renderData(){
    meteo.innerHTML=' '
    let newContent = ' '
    for(let i = 0; i<data.length;i++){
        newContent+=`<div class="weather">
                            <div class="location">${cities[i]}</div>
                            <div class="temp">It is ${data[i][0].current.temperature_2m} degrees Celsius</div>
                            <div class="apparent_temp">It currently feels like it is ${data[i][0].current.apparent_temperature} degrees Celsius</div>
                            <div class="precipitation">The likelihood of rain is ${data[i][0].current.precipitation}%</div>
                            <div class="wind_speed">The wind speed is currently ${data[i][0].current.wind_speed_10m}km/h</div>
                    </div>`
    }
    meteo.innerHTML=newContent
}

window.addEventListener('load', function() {
    fetchStatus()
    const fetchInterval = 30000 // 30sec in milliseconds
    setInterval(fetchStatus, fetchInterval)
})