import React from "react";
import logo from "../images/logo.png";
import CountUp from "react-countup";
import "./site.css";

const Site = ({ data }) => {
  return (
    <div className="site-wrap">
      <div className="site-data">
        <div className="site-data--inner-box">
          <div className="site-data--inner-flex1">
            <img src={logo} alt="logo" />
          </div>
          <div className="site-data--inner-flex2">
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
                "$500,000"
              )}
            </h2>
            <span className="site-data--label">RAISED </span>
            <div className="site-spacer"></div>
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
                "5000"
              )}
            </h2>
            <span className="site-data--label">PEOPLE SERVED </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Site.propTypes = {};

export default Site;
