import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import CountUp from "react-countup";
import "./site.css";

const Site = ({ data }) => {
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
                ""
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
              ) : process.env.NODE_ENV === "development" ? (
                <CountUp
                  formattingFn={(value) => value.toLocaleString("en")}
                  prefix="$ "
                  duration={2}
                  end={test_value}
                  preserveValue={true}
                />
              ) : (
                ""
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
