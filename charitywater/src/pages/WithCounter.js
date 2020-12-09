import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Moment from "react-moment";
import moment from "moment";
import CountUp from "react-countup";
import Ended from "./Ended";
import "./withCounter.css";
const WithCounter = ({ data }) => {
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
  const startTime = () => {
    if (!counter.started) {
      let start = moment().add(5, "m");
      setCounter((prev) => ({ ...prev, started: true, endTime: start }));
    } else {
      let current = moment(counter.endTime);
      current = moment().to(current);
      setCounter((prev) => ({
        ...prev,
        started: false,
        holdValue: `${current}`,
      }));
    }
  };
  const resetTime = () => {
    let start = moment().add(5, "m");
    setCounter((prev) => ({ ...prev, started: true, endTime: start }));
  };
  const splitFilter = (d) => {
    return d.slice(2);
  };
  return (
    <TransitionGroup className="end">
      <div className={`main ${ended ? "ended" : ""}`}>
        <div className={`counter-wrap ${ended ? "ended" : ""}`}>
          {ended ? (
            <CSSTransition
              unMountOnExit
              in={ended}
              classNames="ender"
              timeout={{ appear: 0, enter: 0, exit: 300 }}
              appear
            >
              <Ended data={data} />
            </CSSTransition>
          ) : (
            <>
              <div className="counter-inner counter--left">
                <span className="website">CHARITYWATER.ORG/PLEDGE</span>
                <p className="counter-questions">
                  Questions?
                  <br />
                  concierge@charitywater.org
                </p>
              </div>
              <div className="counter-inner counter--center">
                <div className="counter--text counter--pledged">
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
                        prefix="$"
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
                      "0"
                    )}
                  </h2>
                  <p className="counter-data--label">RAISED </p>
                </div>
                <div className="counter--text counter--served">
                  <h2>
                    {data.parsedData ? (
                      <CountUp
                        formattingFn={(value) => value.toLocaleString("en")}
                        prefix="$"
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
                      "$0"
                    )}
                  </h2>
                  <p className="counter-data--label">PEOPLE SERVED</p>
                </div>
              </div>
              <div className="counter-inner counter--right">
                <h2 className="counter--timer">
                  {counter.started ? (
                    <Moment
                      interval={1000}
                      filter={splitFilter}
                      // date={counter.startTime}
                      format="mm:ss"
                      trim
                      durationFromNow
                    >
                      {counter.endTime}
                    </Moment>
                  ) : (
                    counter.holdValue
                  )}
                </h2>
              </div>
            </>
          )}
        </div>
        <div className={`counter--controls `}>
          <button
            className={` ${counter.started ? "stop" : "start"}`}
            onClick={() => startTime()}
          >
            {" "}
            {counter.started ? "Stop Time" : "Start Time"}
          </button>
          <button onClick={() => resetTime()}> Reset Time</button>
          {ended ? (
            <button onClick={() => setEnded(false)}> Undo End</button>
          ) : (
            <button onClick={() => setEnded(true)}> Trigger End</button>
          )}
        </div>
      </div>
    </TransitionGroup>
  );
};

WithCounter.propTypes = {};

export default WithCounter;
