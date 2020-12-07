import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import CountUp from "react-countup";
import "./led.css";
const LED = ({ data }) => {
  const [test_value, set_test_value] = useState(0);

  useEffect(() => {
    let timeout = setInterval(() => {
      set_test_value(Math.floor(Math.random() * 500000));
    }, 10000);
    return () => {
      clearInterval(timeout);
    };
  });
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
              ) : process.env.NODE_ENV === "development" ? (
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
                  end={test_value}
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
              ) : process.env.NODE_ENV === "development" ? (
                <CountUp
                  formattingFn={(value) => value.toLocaleString("en")}
                  prefix="$ "
                  duration={2}
                  end={test_value}
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
