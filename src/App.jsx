import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [data, setdata] = useState({})
  const [longitude,setlongitude] = useState(null)
  const [latitude, setlatitude] = useState(null)
  const [isunit, setisunit] = useState(true)
  let icon = `http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`;
  
  function changeUnit(){
    setisunit(!isunit)
  }

  function success(pos) {
    const crd = pos.coords;
    setlongitude(crd.longitude)
    setlatitude(crd.latitude)
  }
  navigator.geolocation.getCurrentPosition(success)
  
  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=883677c2ced9f2e407540823ef0e2046&units=${ isunit ? "metric" : "imperial"}`)
    .then(res => setdata(res.data));
  },[isunit,latitude])

  return (
    <div className="App">
     <div className='card-container'> 
      <div className='title'>
          <h1>Weather App</h1>
          <h3>{data.name}, {data.sys?.country}</h3>
      </div>
      <div className='content'>
        <div className='wetherImg'>
          <img src= {icon} alt="" />
          <p>{data.main?.temp} { isunit ? "°C" : "°F"}</p>
        </div>
        <div className='details'>
          <h3>"{data.weather?.[0].description}"</h3>
          <p> <span>Wind Spedd:</span> {data.wind?.speed} { isunit ? "m/s" : "mi/h"}</p>
          <p> <span>Clouds:</span> {data.clouds?.all}%</p>
          <p><span>Pressure:</span> {data.main?.pressure} hPa</p>
        </div>
      </div>
      <button onClick={changeUnit}>F/C</button>
     </div>
    </div>
  )
}
export default App
