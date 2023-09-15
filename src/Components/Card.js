import React from "react";
import "../CSS/Style.css";

const Card = () => {
  return (
    <div className="card">
      <div class="container">
        <div class="widget">
          <div className="container2">
            <div class="details">
              <div class="location">Mumbai,</div>
              <div class="summary1">
                <p class="state">Maharashtra, India</p>
              </div>
              <div class="temperature">20°</div>
              <div class="summary">
                <p class="summaryText">Mostly Cloudy</p>
              </div>
              <div class="precipitation">Precipitation: 20%</div>
              <div class="wind">Wind: 3 mph</div>
              <div class="humidity">Humidity: 75%</div>
            </div>
            <div class="weather-img">
              <img
                src="https://img.freepik.com/premium-vector/cloud-with-sun-3d-realistic-weather-icon-isolated-vector-illustration-realistic-3d-icon-design-mobile-app-website_558965-127.jpg?w=740"
                alt="weather-img"
              />
            </div>
          </div>
          <div class="iconCloudBig"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
