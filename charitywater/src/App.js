import { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CountUp from "react-countup";
import "./App.css";

import LED from "./pages/led";
import Site from "./pages/site";
import WithCounter from "./pages/WithCounter";
function App() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState({});

  //for the count up function

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("/events");

      events.onmessage = (e) => {
        console.log(e.data);
        const parsedData = JSON.parse(e.data);

        setData((data) => ({
          parsedData,
        }));
        console.log(parsedData);
      };
      setListening(true);
    }
  }, [data]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
            <h1> Go Somewhere!</h1>
            <Link to={"/site"}>Site Link</Link>
            <br />
            <Link to={"/led"}>LED Link</Link>
            <br />
            <Link to={"/with-counter"}>Counter Link</Link>
          </div>
        </Route>
        <Route path="/led">
          <LED data={data} />
        </Route>
        <Route path="/site">
          <Site data={data} />
        </Route>
        <Route path="/with-counter">
          <WithCounter data={data} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
