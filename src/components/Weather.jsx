import React, { useEffect, useState, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png'; // Correct name
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => { // Capitalize the component name

    
    const [weatherData, setWeatherData] = useState(null);
    const inputRef = useRef()

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async (city) => {
        if(city===""){
            alert("Enter city name")
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return
            }

            console.log(data);
            if (data && data.weather && data.weather[0]) {
                const icon = allIcons[data.weather[0].icon] || clear_icon;
                setWeatherData({
                    humidity: data.main.humidity,
                    windspeed: data.wind.speed,
                    temp: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon,
                });
            }
        } catch (error) {
            setWeatherData(false)
            console.log("Failed to fetch weather data");
        }
    };

    useEffect(() => {
        search("Mumbai");
    }, []);

    if (!weatherData) return <div>Loading...</div>; // Render a loading state

    return (
        <div className='weather'>
            <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="Search"  onClick={()=>search(inputRef.current.value)}/>
            </div>
            {weatherData?<>
            

                <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
            <p className='temp'>{weatherData.temp}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className='weather-data'>
                <div className="col">
                    <img src={humidity_icon} alt="Humidity" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className="col">
                    <img src={wind_icon} alt="Wind Speed" />
                    <div>
                        <p>{weatherData.windspeed} Km/h</p>
                        <span>Wind speed</span>
                    </div>
                </div>
            </div>


            </>:<></>}

            
        </div>
    );
};

export default Weather;
