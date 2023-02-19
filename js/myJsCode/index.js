// global variables
let mainSearch = document.querySelector("#mainSearch");
let mainCardLeft = document.querySelector("#mainCard .left");
let mainCardRight = document.querySelector("#mainCard .right .swiper-wrapper");
let allSubCards = document.querySelector("#allSubCards");
baseurl = "https://api.weatherapi.com/v1/forecast.json";
myKey = "4d37e9be19274637a6b124006231802";
days = "7";

// call api function
function callApi(city) {
  myUrl = `${baseurl}?key=${myKey}&q=${city}&days=${days}`;
  fetch(myUrl)
    .then((res) => res.json())
    .then((json) => {
      // main card => left side
      mainCardLeft.innerHTML = `
            <h4>${json.location.name}, ${json.location.country}</h4>
            <sp>${json.location.region}</sp>
            <div class="d-flex align-items-center alltodayTemperature">
              <span class="todayTemperature">${Math.round(
                json.current.feelslike_c
              )}<sup>o</sup>C</span>
              <img src="https:${json.current.condition.icon}" alt="">
            </div>
            <span class="weatherType">${json.current.condition.text}</span>
            <div class="allIcons flex-wrap d-flex">
              <div class="icon">
                <i class="fa-solid fa-umbrella"></i>
                <span class="possibilityOfRain">${json.current.uv}%</span>
              </div>
              <div class="icon">
                <i class="fa-solid fa-wind"></i>
                <span class="wind">${json.current.wind_kph}km/h</span>
              </div>
              <div class="icon">
                <i class="fa-solid fa-diamond-turn-right"></i>
                <span class="direction">${json.current.wind_dir}</span>
              </div>
            </div>
      `;
      // main card => right side (Get this day's weather hour by hour)
      let mainCardRightTemp = "";
      let base1 = json.forecast.forecastday[0].hour;
      for (let i = 0; i < base1.length; i++) {
        mainCardRightTemp += `
          <div class="swiper-slide">
            <img src="https:${base1[i].condition.icon}" style="width: 64px;">
            <p>${base1[i].time.replace(/\d{4}-\d{2}-\d{2}/g, "")}</p>
            <h6>${base1[i].condition.text} ${Math.trunc(
          base1[i].temp_c
        )}<sup>o</sup></h6>
        <div class="icon">
        <i class="fa-solid fa-umbrella"></i>
        <span class="direction">${base1[i].uv}%</span>
        </div>
          </div>
        `;
      }
      mainCardRight.innerHTML = mainCardRightTemp;
      // sub cads => get weather information for 7 days
      let allSubCardsTemp = "";
      let base2 = json.forecast.forecastday;
      for (let i = 0; i < base2.length; i++) {
        allSubCardsTemp += `
        <div class="swiper-slide">
        <div class="subCard cardX">
          <div class="card-title">
            <p>${base2[i].date}</p>
          </div>
          <div class="card-body">
            <img src="https:${base2[i].day.condition.icon}" alt="..">
            <div class="d-flex align-items-center justify-content-center">
            <h2 class="nextTemprature">${Math.trunc(
              base2[i].day.maxtemp_c
            )}<sup>o</sup></h2>
            <h5 class="nextTemprature ms-2">${Math.trunc(
              base2[i].day.mintemp_c
            )}<sup>o</sup></h5>
            </div>
            <div class="icon mb-2">
            <i class="fa-solid fa-umbrella"></i>
            <span class="possibilityOfRain">${base2[i].day.uv}%</span>
            </div>
            <span class="weatherType">${base2[i].day.condition.text}</span>
          </div>
        </div>
      </div>
        `;
      }
      // for style sub card one dark and one light
      allSubCards.innerHTML = allSubCardsTemp;
      let subCard = document.querySelectorAll(".subCard");
      for (let i = 0; i < base2.length; i++) {
        if (i % 2 == 0) {
          subCard[i].classList.add("lightCard");
        } else {
          subCard[i].classList.add("darkCard");
        }
      }
      mainSearch.classList.remove("error");
    })
    // When searching for a city that does not exist, the color of the border changes
    .catch((err) => {
      if (err) {
        mainSearch.classList.add("error");
      }
    });
}
// invoke function => alexander defualt argument 
callApi("alex");

// Search function => if mainSearch.value == "" send alex as defualt argument
mainSearch.addEventListener("keyup", () => {
  callApi(mainSearch.value || "alex");
});

// for display currend date in main card header
let monthsArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var daysArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dataNow2 = new Date();
let cardTitle = document.querySelector("#card-title");
cardTitle.innerHTML = `
<p>${daysArr[dataNow2.getDay()]}</p>
<p>${dataNow2.getDate()} ${monthsArr[dataNow2.getMonth()]}</p>
`;




