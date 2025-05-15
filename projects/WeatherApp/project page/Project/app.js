const apiKey = 'b6e040e4eaf3f5dea8150e5799e81dec';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weatherIcon');

async function checkWeather(city) {
    try {
        document.querySelector('.weather').style.display = 'none';
        document.querySelector('.error').style.display = 'none';

        searchBtn.disabled = true;
        searchBtn.innerHTML = '<div class="loading"></div>';

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        searchBtn.disabled = false;
        searchBtn.innerHTML = '<img src="images/search.png" alt="Search">';

        if (response.status == 404) {
            document.querySelector('.error').style.display = 'block';
            document.querySelector('.weather').style.display = 'none';
            return;
        }

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'images/clouds.png';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'images/clear.png';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'images/rain.png';
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'images/mist.png';
        } else {
            weatherIcon.src = 'images/clear.png';
        }

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';

        searchBtn.disabled = false;
        searchBtn.innerHTML = '<img src="images/search.png" alt="Search">';
    }
}

searchBtn.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});

