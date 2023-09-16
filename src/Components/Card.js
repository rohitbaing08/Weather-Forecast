import React from "react";
import "../CSS/Style.css";
import { useEffect, useState,useRef } from "react";
import axios from "axios";

const Card = () => {
  var initialData = {
    temp_C:'',
    windspeedKmph:'',
    humidity:'',
    precipMM:'',
  };
  const time = ['00:00','03:00','06:00','09:00','12:00','15:00','18:00','21:00']
  const [data, setData] = useState({ initialData });
  const [data1, setData1] = useState([]);
  const [desc,setDesc] =useState('');
  const [icon,setIcon] =useState('');
  const [date,setDate] =useState('');
  useEffect(() => {
    console.log(data);
    getData();
    console.log(data);
  }, []);
  const getData = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const { latitude, longitude } = position.coords;
        await axios
          .get(
            `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=d7b1eb06630f4f8798a174343231509&q=${latitude},${longitude}&num_of_days=2&format=json`
          )
          .then((res) => {
            setData(res.data.data.current_condition[0]);
            setDesc(res.data.data.current_condition[0].weatherDesc[0].value);
            setIcon(res.data.data.current_condition[0].weatherIconUrl[0].value);
            setData1(res.data.data.weather[0].hourly);
            setDate(res.data.data.weather[0].date);
            console.log(res.data.data.weather[0].hourly)
            console.log(res.data.data.current_condition[0])
          });
      });
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="widget">
          <div className="container2">
            <div className="details">
              <div className="location">{`Thane,`}</div>
              <div className="summary1">
                <p className="state">Maharashtra, India</p>
              </div>
              <div className="temperature">{`${data.temp_C} °C`}</div>
              <div className="summary">
                <p className="summaryText">{desc}</p>
              </div>
              <div className="precipitation">{`Precipitation: ${data.precipMM}%`}</div>
              <div className="wind">{`Wind: ${data.windspeedKmph} mph`}</div>
              <div className="humidity">{`Humidity: ${data.humidity}%`}</div>
            </div>
            <div className="weather-img">
              <img
                src={icon}
                alt="weather-img"
              />
            </div>
          </div>
          <div className="iconBig"></div>
          <div className="date">{`Date : ${date}`}</div>
          <table className="weather-history-table tables">
          <thead>
            <tr>
          {time.map((entry) => (
                <th className="temp white border">{entry}</th>
            ))}
            </tr>
          </thead>
          <tbody>
          <tr>
            {data1.map((entry) => (
                <td className="border"><div className="table-img"><img src={entry.weatherIconUrl[0].value}/></div></td>
            ))}
            </tr>
            <tr>
            {data1.map((entry) => (
                <td className="temp border white">{entry.tempC} °C</td>
            ))}
            </tr>
            
            <tr>
            {data1.map((entry) => (
                <td className="white temp border description">{entry.weatherDesc[0].value}</td>
            ))}
            </tr>
          </tbody>
        </table>
        </div>
        
      </div>
    </div>
  );
};

export default Card;
