app.post("/manual", async (req, res) => {
  console.log(req.body);
  manualValue = req.body;
  sendBackupValue(req.body);
});
