import { useState, useEffect } from 'react';
import './App.css';
import {v4 as uuid} from "uuid"
import {
  FaTemperatureHigh as ThermometerIcon, 
  FaWind as WindIcon, FaSpinner} from 'react-icons/fa'



function App() {

  const [searchedCity, setSeachedCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState('')

  const translatedCurrentWeatherTable = {
    "Partly cloudy": "Parcialmente dublado",
    "Clear": "Tempo limpo",
    "Light snow": "Neve leve",
    "Sunny": "Ensolarado",
    "Rain with thunderstorm": "Chuva com tempestade",
    "Patchy rain possible": "Possibilidade de chuva irregular",
    "Light rain shower": "Chuva leve"
  }

  function handleSubmit(event) {
    event.preventDefault()
    setCity(searchedCity)
    console.log(searchedCity)
  }

  useEffect(() => {
    async function getCityWeather() {
      setLoading(true)
      try {
              const response = await fetch(`https://goweather.herokuapp.com/weather/${searchedCity}`);
    setCity(searchedCity)
    const data = await response.json()
    setWeather(data)
    console.log(data)
      } catch (error) {
      } finally {
        setLoading(false)
      }



    }

    getCityWeather()
  }, [city])

  return (
    <div className="App">

      <form action="" onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder='EX: Curitiba'
        value={searchedCity} 
        onChange={event => setSeachedCity(event.target.value)}/>
        <button type='submit'>
         {loading 
         ?<FaSpinner className='loading'/> : <span>Pesquisar Cidade</span>}
        </button>
      </form>

      {city && weather &&(
        <div className='forecast'>
          <h1>{city}</h1>
          <h2>Tempo atual</h2>
           <p>{weather.temperature}</p> 
              <p>{
                  translatedCurrentWeatherTable[weather.description]
                    ? translatedCurrentWeatherTable[weather.description] 
                    : weather.description
                 }
              </p>

           <h2>Previsão</h2>
           <ol>
            {weather.forecast.map((dayForecast, index) => {
              return (
                <li key={uuid()}>
                  <h3>
                    {index == 0 ? 'Amanha' : Intl.DateTimeFormat(
                      'pt-BR',
                      {weekday: 'long'}
                      ) 
                      .format(
                        new Date()
                        .setDate(new Date().getDate() + index + 1)
                      )
                      }
                  </h3>
                  <div>
                    <ThermometerIcon />
                    <p>{dayForecast.temperature}</p>
                  </div>
                  <div>
                    <WindIcon />
                    <p>{dayForecast.wind}</p>
                  </div>
                </li>
              )
            })}
            
           </ol>
        </div>
      )}
      <h1></h1>
    </div>
  );
}

export default App;

