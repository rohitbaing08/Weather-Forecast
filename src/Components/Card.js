import React from "react";
import "../CSS/Style.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {
  const time = [
    "00:00",
    "03:00",
    "06:00",
    "09:00",
    "12:00",
    "15:00",
    "18:00",
    "21:00",
  ];
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    getData();
  }, []);

  const getCityData = () => {
    console.log(cityInput);
    try {
      axios
        .get(
          `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=d7b1eb06630f4f8798a174343231509&q=${cityInput}&num_of_days=2&format=json`
        )
        .then((res) => {
          console.log(res);
          setData(res.data.data.current_condition[0]);
          setDesc(res.data.data.current_condition[0].weatherDesc[0].value);
          setData1(res.data.data.weather[0].hourly);
          setDate(res.data.data.weather[0].date);
          setCity(cityInput);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const { latitude, longitude } = position.coords;
        axios
          .get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=dd2a410fd154437dac9e7127a9107d33`
          )
          .then((res) => {
            setCity(`${res.data.results[0].components.city},`);
          });
        axios
          .get(
            `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=d7b1eb06630f4f8798a174343231509&q=${latitude},${longitude}&num_of_days=2&format=json`
          )
          .then((res) => {
            setData(res.data.data.current_condition[0]);
            setDesc(res.data.data.current_condition[0].weatherDesc[0].value);
            setData1(res.data.data.weather[0].hourly);
            setDate(res.data.data.weather[0].date);
            setLoading(false);
          });
      });
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="widget">
          {loading ? (
            <div></div>
          ) : (
            <>
              <div className="container2">
                <div className="details">
                  <div className="location">{city.toUpperCase() || ""}</div>
                  <div className="temperature">{`${data.temp_C || ""} °C`}</div>
                  <div className="summary">
                    <p className="summaryText">{desc || ""}</p>
                  </div>
                  <div className="precipitation">{`Precipitation: ${
                    data.precipMM || ""
                  }%`}</div>
                  <div className="wind">{`Wind: ${
                    data.windspeedKmph || ""
                  } mph`}</div>
                  <div className="humidity">{`Humidity: ${
                    data.humidity || ""
                  }%`}</div>
                </div>
                <form className="m-3 form-div">
                  <div>
                    <input
                      placeholder="Enter city to forecast"
                      type="text"
                      onChange={(res) => setCityInput(res.target.value)}
                      className="form-control"
                      id="validationCustom03"
                      required
                    />
                  </div>
                  <div className="button-div">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={(res) => {
                        res.preventDefault();
                        getCityData();
                      }}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>

              <div className="iconBig"></div>
              <div className="date">{`Date : ${date || ""}`}</div>
              <table className="weather-history-table tables">
                <thead>
                  <tr>
                    {time.map((entry) => (
                      <th
                        key={time.indexOf(entry)}
                        className="temp white border"
                      >
                        {entry || ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {data1.map((entry) => (
                      <td key={data1.indexOf(entry)} className="border">
                        <div className="table-img">
                          <img src={entry.weatherIconUrl[0].value || ""} alt="" />
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {data1.map((entry) => (
                      <td
                        key={data1.indexOf(entry)}
                        className="temp border white"
                      >
                        {entry.tempC || ""} °C
                      </td>
                    ))}
                  </tr>

                  <tr>
                    {data1.map((entry) => (
                      <td
                        key={data1.indexOf(entry)}
                        className="white temp border description"
                      >
                        {entry.weatherDesc[0].value || ""}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
