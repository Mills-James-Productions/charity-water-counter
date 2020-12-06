import React from "react";
import PropTypes from "prop-types";
import CountUp from "react-countup";
import "./site.css";

const Site = ({ data }) => {
  return (
    <div className="site-wrap">
      {data.parsedData ? (
        <div className="site-data">
          <div className="site-data--inner-box">
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
            <span className="site-data--label">RAISED </span>

            <h2>
              <CountUp
                formattingFn={(value) => value.toLocaleString("en")}
                prefix="$ "
                duration={2}
                end={data.parsedData.people_served}
                preserveValue={true}
              />
            </h2>
            <span className="site-data--label">PEOPLE SERVED </span>
          </div>
        </div>
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
};

Site.propTypes = {};

export default Site;
