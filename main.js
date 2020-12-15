window.addEventListener('load',()=>{
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            console.log(long+" "+lat);
        });
    }
});


const api = {
    key: '0e2ce6b08421af00d4ba69e3027b66e1',
    base: 'https://api.openweathermap.org/data/2.5/',
};
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode === 13) getResults(searchbox.value);
}
function getResults(query) {
    const url = `${api.base}weather?q=${query}&units=metric&appid=${api.key}`;
    fetch(url).then(
        (weather) => {
            return weather.json();
        }).then(displayResults);
}
function displayResults(data) {
    let city = document.querySelector('.location .city');
    city.innerHTML = `${data.name},${data.sys.country}`;
    let date = document.querySelector('.location .date');
    let now = new Date();
    date.innerHTML = dateBuilder(now);
    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(data.main.temp)}°c`;
    let min_max=document.querySelector('.current .hi-low');
    min_max.innerHTML=`${Math.round(data.main.temp_min)}°c / ${Math.round(data.main.temp_max)}°c`;
    let description=document.querySelector('.current .weather');
    description.innerHTML=`${data.weather[0].description}`;
    


}
function dateBuilder(d) {
    let months = ['January', 'Febraury', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    let days = ['sunday', 'monaday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day},${date},${month},${year}`;
}

