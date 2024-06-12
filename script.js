document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const API_KEY = '27a7664b3eb04259bf414bc4c4abf78a'; // Replace with your Weatherbit API key
    const BASE_URL = 'https://api.weatherbit.io/v2.0/current';

    try {
        const response = await fetch(`${BASE_URL}?city=${city}&key=${API_KEY}`);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        if (data.data && data.data.length > 0) {
            displayWeather(data.data[0]);
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        alert('Error fetching weather data: ' + error.message);
    }
});

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    document.getElementById('city-name').textContent = data.city_name;
    document.getElementById('description').textContent = data.weather.description;
    document.getElementById('temperature').textContent = data.temp;
    document.getElementById('humidity').textContent = data.rh;
    
    weatherResult.classList.remove('hidden');
    weatherResult.classList.add('visible');
}
