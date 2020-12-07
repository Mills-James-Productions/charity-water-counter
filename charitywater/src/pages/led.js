import React from "react";
import logo from "../images/logo.png";
import CountUp from "react-countup";
import "./led.css";
const LED = ({ data }) => {
  return (
    <div className="led-wrap">
      <div className="led-data">
        <div className="led-data--inner-box">
          <div className="led-data--inner-flex-1">
            <img src={logo} alt="logo" />
          </div>
          <div className="led-data--inner-flex-2">
            <h2>
              {data.parsedData ? (
                <CountUp
                  formattingFn={(value) =>
                    Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    }).format(value)
                  }
                  prefix="$ "
                  duration={2}
                  end={data.parsedData.pledge_amount}
                  preserveValue={true}
                />
              ) : (
                "134"
              )}
            </h2>

            <span className="led-data--label">RAISED </span>
            <div className="led-spacer"></div>
            <h2>
              {data.parsedData ? (
                <CountUp
                  formattingFn={(value) => value.toLocaleString("en")}
                  prefix="$ "
                  duration={2}
                  end={data.parsedData.people_served}
                  preserveValue={true}
                />
              ) : (
                "140,000"
              )}
            </h2>
            <span className="led-data--label">PEOPLE SERVED </span>
          </div>
        </div>
      </div>
    </div>
  );
};

LED.propTypes = {};

export default LED;
