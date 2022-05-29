let dataid = 'F-C0032-001';
let apikey = 'CWB-9CE72AA4-F1E6-4F94-B824-4017B3601BAB';
let format = 'JSON';
let url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/${dataid}?Authorization=${apikey}&format=${format}`;

let cities = [
  ['基隆市', '新北市', '臺北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣'],
  ['基隆市', '新北市', '臺北市', '桃園市', '新竹市', '新竹縣', '苗栗縣'], ['臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣'],
  ['臺南市', '高雄市', '屏東縣'], ['宜蘭縣', '花蓮縣', '臺東縣'], ['澎湖縣', '金門縣', '連江縣'],
]

let nowCities;
let orgData = {};
nowCities = cities[0];


fetch_data()

function fetch_data() {
  fetch(url)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // let data_records = data.records.location;
      console.log(data);
      organization(data);
      arrange_cities();
      // console.log(data_records);
      // let cities = [];
    })
}

function organization(data) {
  let locations = data.records.location;
  console.log('locations =>', locations);
  locations.forEach(location => {
    console.log('location =>', location);
    let locationName = location.locationName;
    console.log(locationName);
    let loc_wE_t_0 = location.weatherElement[0].time[0];

    let startTime = loc_wE_t_0.startTime;
    let endTime = loc_wE_t_0.endTime;
    let wx = loc_wE_t_0.parameter.parameterName;
    let wx_value = loc_wE_t_0.parameter.parameterValue;
    console.log(startTime);
    console.log(endTime);
    console.log(wx);
    console.log(wx_value);
    let maxT = location.weatherElement[4].time[0].parameter.parameterName;
    let minT = location.weatherElement[2].time[0].parameter.parameterName;
    console.log(maxT, minT);
    let pop = location.weatherElement[1].time[0].parameter.parameterName;
    console.log(pop);
    let ci = location.weatherElement[3].time[0].parameter.parameterName;
    console.log(ci);

    orgData[locationName] = {
      'wx': wx,
      'wx_value': wx_value,
      'startTime': startTime,
      'endTime': endTime,
      'maxT': maxT,
      'minT': minT,
      'pop': pop,
      'ci': ci,
    }
  });
  console.log('=>', orgData);
}
let areaAll = document.querySelectorAll('.area')
let card_region = document.querySelector('.card-region');

areaAll.forEach((area, index) => {
  console.log('area', area, index);
  area.addEventListener('click', function () {
    card_region.innerHTML = '';
    nowCities = cities[index];
    console.log('nowCities', index, nowCities);
    arrange_cities();
  })
});

function arrange_cities() {
  // card_region.innerHTML = '';


  nowCities.forEach((city, index) => {
    let weatherIcon;
    let cityData = orgData[city];
    console.log('cityData=>', city, cityData);
    card_region.innerHTML +=
      `
        <div class="single-card" tabindex="0">
        <h3 class="city">${city}</h3>
        <div class="time">
        <span class="timeUp">${cityData.startTime.substr(11, 5).replaceAll('-', '/')}</span>~<span class="timeEnd">${cityData.endTime.substr(11, 5).replaceAll('-', '/')}</span>
        </div>
        <div class="wx_img"><img src="./style/img/weather/icon/${cityData.wx_value}.svg"></div>
        <div class="weather">${cityData.wx}</div>
        <div class="temp">
        <div class="MT"> ${cityData.maxT}°C </div> 
        <div class="mt"> ${cityData.minT}°C </div>
        </div>
        <div class="comf">
        <div class="pop"><i class="fa-solid fa-umbrella"></i> ${cityData.pop}%</div>
        <div class="CI">${cityData.ci}</div>
        </div>
        </div>
        `
  })
}



{/* <div class="wx_img">${cityData.wx_value}</div> */ }