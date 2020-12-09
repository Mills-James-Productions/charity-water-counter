import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Moment from "react-moment";
import moment from "moment";
import CountUp from "react-countup";

import "./withCounter.css";
const Ended = ({ data }) => {
  const [ended, setEnded] = useState(false);
  const [test_value, set_test_value] = useState(0);
  const [counter, setCounter] = useState({
    holdValue: "5:00",
    started: false,
    remaining: moment().to(moment().add(5, "m")),
    startTime: moment(),
    endTime: moment().add(5, ""),
  });

  useEffect(() => {
    let timeout = setInterval(() => {
      set_test_value(Math.floor(Math.random() * 500000));
    }, 10000);
    return () => {
      clearInterval(timeout);
    };
  }, []);

  //   useEffect(() => {
  //     let interval = setInterval(() => {
  //       let result = moment().to(counter.endTime);
  //       setCounter((prev) => ({ ...prev, remaining: result }));
  //     }, 1000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, []);

  return (
    <>
      <div className="counter-inner counter--left ended"></div>
      <div className="counter-inner counter--center">
        <div className="counter--text counter--pledged">
          <h2>
            {data.parsedData
              ? `${Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                }).format(data.parsedData.pledge_amount)}`
              : "$0"}
          </h2>
          <p className="counter-data--label">RAISED </p>
        </div>
        <div className="counter--text counter--served">
          <h2>
            {data.parsedData
              ? data.parsedData.people_served.toLocaleString()
              : "0"}
          </h2>
          <p className="counter-data--label">PEOPLE SERVED </p>
        </div>
      </div>
      <div className="counter-inner counter--right ended"></div>
    </>
  );
};

Ended.propTypes = {};

export default Ended;
