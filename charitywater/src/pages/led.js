import React from "react";
import PropTypes from "prop-types";
import CountUp from "react-countup";
import "./led.css";
const LED = ({ data }) => {
  return (
    <div className="led-wrap">
      {data.parsedData ? (
        <div className="led-data">
          <div className="led-data--inner-box">
            <h2>
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
            </h2>
            <span className="led-data--label">RAISED </span>

            <h2>
              <CountUp
                formattingFn={(value) => value.toLocaleString("en")}
                prefix="$ "
                duration={2}
                end={data.parsedData.people_served}
                preserveValue={true}
              />
            </h2>
            <span className="led-data--label">PEOPLE SERVED </span>
          </div>
        </div>
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
};

LED.propTypes = {};

export default LED;
