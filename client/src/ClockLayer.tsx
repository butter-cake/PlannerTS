import { useState, useEffect } from "react";
import "./ClockLayer.css";

/**
 * TODO:
 * We want the ClockLayer to display the time in this format: Month, Date, Day.
 * We also want the time displayed below it, with the : ticking for every second.
 */

function ClockLayer() {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setShowColon((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dateArray = [
    time.toLocaleString("default", { month: "long" }),
    time.getDate(),
    time.toLocaleString("default", { weekday: "long" }),
  ];

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="clockDivBody">
      <div className="clockDiv">
        <div className="date">
          <div>{dateArray[0]}</div>
          <div>
            {dateArray[1]}, {dateArray[2]}
          </div>
        </div>
        <div className="clock">
          {/* {formattedTime.split(":").map((part, index) => (
            <span key={index}>
              {index > 0 && showColon ? ":" : ""}
              {part}
            </span>
          ))} */}
          <div>
            {formattedTime[0]}
            {formattedTime[1]}
          </div>

          <div>
            {showColon ? (
              <div className="colonLight">{formattedTime[2]}</div>
            ) : (
              <div className="colonDark">{formattedTime[2]}</div>
            )}
          </div>

          <div>
            {formattedTime[3]}
            {formattedTime[4]}
            {formattedTime[5]}
            {formattedTime[6]}
            {formattedTime[7]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClockLayer;
