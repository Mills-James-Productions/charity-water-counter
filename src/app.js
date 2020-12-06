"use strict";
require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const exjwt = require("express-jwt");

const authRoute = require("./routes/authenticate");

run().catch((err) => console.error(err));

async function run() {
  const app = express();
  // minimum security protocol recommended by express
  app.disable("x-powered-by");
  //
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
    next();
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  app.use(bodyParser.json());
  app.use(
    express.static(path.join(__dirname, "../frontend/charity-water/build"))
  );
  //
  console.log(path.join(__dirname, "../frontend/charity-water/build"));
  // app.use(cors());

  const jwtMW = exjwt({
    secret: "welldinner2020reactnodewebapp",
    algorithms: ["sha1", "RS256", "HS256"],
  });

  let clients = [];
  let packet = { pledge_amount: 0, people_served: 0 };
  let manualValue = { pledge_amount: 0, people_served: 0 };

  app.use("/authenticate", authRoute);

  app.post("/post", jwtMW, async (req, res) => {
    console.log(req.body);

    req.body.pledge_amount
      ? (packet.pledge_amount = parseInt(req.body.pledge_amount, 10))
      : "";
    req.body.people_served
      ? (packet.people_served = parseInt(req.body.people_served, 10))
      : "";

    sendEventsToAll();
    res.json({ value: packet });
  });
  // error handling for un auth request
  app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      // Send the error rather than to show it on the console
      res.status(401).send(err);
    } else {
      next(err);
    }
  });

  function eventHandler(req, res, next) {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
    });

    res.write(`data: ${JSON.stringify(packet)}\n\n`);
    console.info("Emit", packet);

    const clientId = Date.now();
    const newClient = {
      id: clientId,
      res,
    };
    clients.push(newClient);

    req.on("close", () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter((c) => c.id !== clientId);
    });
  }

  app.get("/events", eventHandler);

  function sendBackupValue(value) {
    console.log(value);
  }

  function sendEventsToAll() {
    clients.forEach((c) => c.res.write(`data: ${JSON.stringify(packet)}\n\n`));
  }

  //fallback
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/charity-water/build/index.html")
    );
  });
  await app.listen(process.env.PORT);
  console.log(`Listening on port ${process.env.PORT}`);
}
