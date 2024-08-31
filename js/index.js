let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")
let weatherData

let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextconditionImg = document.getElementsByClassName("next_condition_img")
let nextconditionText = document.getElementsByClassName("next_condition_text")


let searchInput = document.getElementById("search")




// fetch api 


async function getWeatherData(cityName) {
    
   
    // let city = searchInput.value 
     
    // let url = `https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${city}&days=3`
    // let url = `https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=London&days=3`
    // let url = `https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${city}&days=3`



    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)


    let weatherData = await weatherResponse.json()
    




    return weatherData



}
getWeatherData()




// dsiplay today
function dsiplayToDayData(data) {

    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" })
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", { month: "long" })

    todayName.innerHTML = data.location.country
    todayNumber.innerHTML = data.location.localtime
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c + "°C";
    todayConditionImg.setAttribute("src", data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph + "km/h"
    windDirection.innerHTML = data.current.wind_dir




}

//dsiplay tomorrow
function dsiplayNextData(data) {
    let forecastData = data.forecast.forecastday

    for (let i = 0; i < 2; i++) {

        let todayDate = new Date(forecastData[i + 1].date)
        nextDay[i].innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" })

       



        nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c
        nextconditionImg[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
        nextconditionText[i].innerHTML = forecastData[i + 1].day.condition.text


    }


}

// Start app
async function startApp(cityName="london" ) {
    
    let weatherData = await getWeatherData(cityName)
    if (!weatherData.error) {
        dsiplayToDayData(weatherData)
    dsiplayNextData(weatherData)

    }
    // dsiplayToDayData(weatherData)
    // dsiplayNextData(weatherData)

}
startApp()


searchInput.addEventListener("input", function () {
    startApp(searchInput.value)




})

















