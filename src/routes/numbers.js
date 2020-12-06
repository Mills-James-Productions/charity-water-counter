app.get("/numbers", cors(corsOptions), async function (req, res) {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();
  // Tell the client to retry every 10 seconds if connectivity is lost
  res.write("retry: 10000\n\n");
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.info("Emit", packet);
    // Emit an SSE that contains the current 'count' as a string \n \n signifies new event
    // res.write(`data: { number : ${testValue}}, \n\n`);
    res.write("data:" + JSON.stringify(packet) + "\n\n");
  }
});
