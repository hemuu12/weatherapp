import { TbMapSearch, TbSearch,  TbMoon, TbSun } from "react-icons/tb";
import { useState} from "react";
import DetailsCard from "./components/DetailsCard";
import SummaryCard from "./components/SummaryCard";
import Astronaut from "./asset/not-found.svg";
import SearchPlace from "./asset/search.svg";
import LakeBackground from "./asset/lake-background.jpg";
import BackgroundImage from "./components/BackgroundImage";
import BackgroundColor from "./components/BackgroundColor";

import axios from "axios";

function App() {
  const API_KEY ="76aba4d09b8576d91454fac4870f80b0";


  const [noData, setNoData] = useState("no-data");
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("unknown-location");
  const [weatherIcon, setWeatherIcon] = useState(
    `https://openweathermap.org/img/wn/10n@2x.png`
  );

  const [loading, setLoading] = useState(false);
  const [backgroundSoundEnabled, setBackgroundSoundEnabled] = useState(true);
 

  

  const toggleDark = () => {
    let mode = localStorage.getItem('mode');
    if(mode === null)
      mode = 'light';
    document.body.classList.toggle("dark");
  
    (mode === 'light') ? (mode='dark') : (mode = 'light');

    localStorage.setItem('mode', mode);
  };

 

  const handleChange = (input) => {
    const { value } = input.target;
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(searchTerm);
  };


  const getWeather = async (location) => {
    setLoading(true);
    setWeatherData([]);
    let how_to_search =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    const url = "https://api.openweathermap.org/data/2.5/forecast?";
    axios.post(`${url}${how_to_search}&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`)
    .then((response)=>{
      setWeatherData(response.data);
      setLoading(false);
      setCity(`${response.data.city.name}, ${response.data.city.country}`);
      setWeatherIcon(
        `${
          "https://openweathermap.org/img/wn/" + response.list[0].weather[0]["icon"]
        }@4x.png`
      );
      setTimeout(() => {
        checkMode();
      }, 2000);
    }).catch((error)=>{
      setNoData("Location Not Found");
      setLoading(false);
    })
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
  };

    // load current location weather info on load
  window.addEventListener("load", function() {
    navigator.geolocation.getCurrentPosition(myIP)
  })

  const checkMode = () => {
    const mode = localStorage.getItem('mode');
    if(mode !== null && mode === 'dark'){
      document.getElementById('checkbox').checked = true;
      document.body.classList.toggle("dark");
    }
  }

  return (
    <div className="container" onLoad={checkMode}>
      <div
        className="blur"
        style={{
          background: `${
            weatherData ? BackgroundColor(weatherData) : "#a6ddf0"
          }`,
          top: "-10%",
          right: "0",
        }}
      ></div>
      <div
        className="blur"
        style={{
          background: `${
            weatherData ? BackgroundColor(weatherData) : "#a6ddf0"
          }`,
          top: "36%",
          left: "-6rem",
        }}
      ></div>
      <div className="content">
        <div
          className="form-container"
          style={{
            backgroundImage: `url(${
              weatherData ? BackgroundImage(weatherData) : LakeBackground
            })`,
          }}
        >
          <div className="name">
            <div className="logo">
              Weather App<hr></hr>
            </div>
            <div className="toggle-container">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onChange={toggleDark}
              />
              <label htmlFor="checkbox" className="label">
                <TbMoon
                  style={{
                    color: "#a6ddf0",
                  }}
                />
                <TbSun
                  style={{
                    color: "#f5c32c",
                  }}
                />
                <div className="ball" />
              </label>
            </div>
            <div className="city">
              <TbMapSearch />
              <p>{city}</p>
            </div>
          </div>
          <div className="search">
            
            <hr />
            <form className="search-bar" noValidate onSubmit={handleSubmit}>
              <input
                type="text"
                name=""
                id=""
                placeholder="Search for City"
                onChange={handleChange}
                required
              />
              <button className="s-icon">
                <TbSearch
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(myIP);
                  }}
                />
              </button>
            </form>

          </div>
        </div>
        <div className="info-container">
        
          {loading ? (
            <div className="loader"></div>
          ) : (
            <span>
              {weatherData.length === 0 ? (
                <div className="nodata">
                  <h1>{noData}</h1>
                  {noData === "Location Not Found" ? (
                    <>
                      <img
                        src={Astronaut}
                        alt="Where I am"
                      />
                      <p>Oh oh! We've lost the location</p>
                    </>
                  ) : (
                    <>
                      <img
                        src={SearchPlace}
                        alt="a person thinking about what place to find"
                      />
                      <p style={{ padding: "20px" }}>
                        Don't worry, if you don't know what search, try with:
                        India.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <h1 className="centerTextOnMobile">today</h1>
                  <DetailsCard
                    weather_icon={weatherIcon?weatherIcon:null}
                    data={weatherData?weatherData:null}
                    soundEnabled={backgroundSoundEnabled?backgroundSoundEnabled:null}
                
                  />
                  <h1 className="title centerTextOnMobile">
                     {city}
                  </h1>
                  <ul className="summary">
                    {weatherData.list.map((days, index) => (
                      <SummaryCard key={index} day={days?days:null}/ >
                    ))}
                  </ul>
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
