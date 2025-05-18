document.addEventListener('DOMContentLoaded', function() {
    const citySelect = document.querySelector('.city-select');
    const weatherForecast = document.querySelector('.weather-forecast');

    function loadCities() {
        Papa.parse('city_coordinates.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                const cities = results.data;
                cities.sort((a, b) => a.city.localeCompare(b.city));
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = `${city.latitude},${city.longitude}`;
                    option.textContent = `${city.city}, ${city.country}`;
                    citySelect.appendChild(option);
                });
            },
            error: function(error) {
                console.error('Error loading city data:', error);
                const option = document.createElement('option');
                option.textContent = 'Error loading city data';
                citySelect.appendChild(option);
            }
        });
    }

    async function fetchWeatherForecast(coordinates) {
        const [lat, lon] = coordinates.split(',').map(Number);
        const apiUrl = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.dataseries;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    }

    function getWeatherIcon(weatherCode) {
        // Map weather codes to appropriate icons
        const iconMap = {
            'clear': 'clear.png',
            'cloudy': 'cloudy.png',
            'fog': 'fog.png',
            'humid': 'humid.png',
            'ishower': 'ishower.png',
            'lightrain': 'lightrain.png',
            'lightsnow': 'lightsnow.png',
            'mcloudy': 'mcloudy.png',
            'oshower': 'oshower.png',
            'pcloudy': 'pcloudy.png',
            'rain': 'rain.png',
            'rainsnow': 'rainsnow.png',
            'snow': 'snow.png',
            'tsrain': 'tsrain.png',
            'tstorm': 'tstorm.png',
            'windy': 'windy.png'
        };
        
        const defaultIcon = 'cloud.png';
        return `/images/${iconMap[weatherCode] || defaultIcon}`;
    }

    function formatDate(dateString) {
        let year, month, day;
        if (dateString.length === 8) {
            year = parseInt(dateString.slice(0, 4));
            month = parseInt(dateString.slice(4, 6)) - 1;
            day = parseInt(dateString.slice(6, 8));
        } else if (dateString.length === 6) {
            year = parseInt(dateString.slice(0, 2)) + 2000;
            month = parseInt(dateString.slice(2, 4)) - 1;
            day = parseInt(dateString.slice(4, 6));
        } else {
            return dateString; // fallback
        }
    
    const date = new Date(year, month, day);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    
    return `${dayName} ${monthName} ${day.toString().padStart(2, '0')}`;
}

    function displayForecast(forecastData) {
        weatherForecast.innerHTML = '';
        console.log(`Forecast Data:`, forecastData )
        
        forecastData.forEach((dayData, index) => {
            const dateStr = dayData.date.toString().padStart(6, '0');
            const formattedDate = formatDate(dateStr);
            console.log(`Card ${index}: raw=${dayData.date}, padded=${dateStr}, formatted=${formattedDate}`);
            const weatherIcon = getWeatherIcon(dayData.weather);
            
            const card = document.createElement('div');
            card.className = 'weather-card';
            card.innerHTML = `
                <div class='date'><strong>${formattedDate}</strong></div>
                <img src="${weatherIcon}" class="weather-icon" alt="${dayData.weather}">
                <div class='weather'>${dayData.weather.toUpperCase()}</div>
                <div class='temp'>H: ${dayData.temp2m.max}°C</div>
                <div class='temp'>L: ${dayData.temp2m.min}°C</div>
            `;
            weatherForecast.appendChild(card);
        });
    }

    citySelect.addEventListener('change', async function() {
        if (this.value) {
            const forecastData = await fetchWeatherForecast(this.value);
            if (forecastData) {
                displayForecast(forecastData);
            } else {
                weatherForecast.innerHTML = '<div class="error">Failed to load weather data</div>';
            }
        } else {
            weatherForecast.innerHTML = '';
        }
    });

    loadCities();
});