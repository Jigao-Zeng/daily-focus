import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faSmog } from "@fortawesome/free-solid-svg-icons";
import styles from "./HourCard.module.scss";

var moment = require("moment");

const weatherIcon = {
    Thunderstorm: <FontAwesomeIcon icon={faBolt} />,
    Rain: <FontAwesomeIcon icon={faCloudRain} />,
    Snow: <FontAwesomeIcon icon={faSnowflake} />,
    Atmosphere: <FontAwesomeIcon icon={faSmog} />,
    Clear: <FontAwesomeIcon icon={faSun} />,
    Clouds: <FontAwesomeIcon icon={faCloud} />,
};

function HourCard(props) {
    const [icon, setIcon] = useState(undefined);

    const getWeatherIcon = (rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
                setIcon(weatherIcon.Thunderstorm);
                break;
            case rangeId >= 300 && rangeId <= 321:
                setIcon(weatherIcon.Rain);
                break;
            case rangeId >= 500 && rangeId <= 521:
                setIcon(weatherIcon.Rain);
                break;
            case rangeId >= 600 && rangeId <= 622:
                setIcon(weatherIcon.Snow);
                break;
            case rangeId >= 701 && rangeId <= 781:
                setIcon(weatherIcon.Atmosphere);
                break;
            case rangeId === 800:
                setIcon(weatherIcon.Clear);
                break;
            case rangeId >= 801 && rangeId <= 804:
                setIcon(weatherIcon.Clouds);
                break;
            default:
                setIcon(weatherIcon.Clouds);
        }
    };

    const toCelsius = (temp) => {
        let cell = Math.floor(temp - 273.15);
        return cell;
    };

    /*let date = new Date();
    const weekday = props.hour.dt * 1000;
    date.setTime(weekday);*/

    let dt = props.hour.dt;
    let date = new Date(dt * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    useEffect(() => {
        getWeatherIcon(props.hour.weather[0].id);
    });

    return (
        <div className={styles.hourCard}>
            <div className="hour">{moment(formattedTime, "HH:mm:ss").format("hh:mm a")}</div>
            <div>{icon}</div>
            <div>{toCelsius(props.hour.temp)} °C</div>
        </div>
    );
}

export default HourCard;