const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

/* Cross-domain */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({
    routes_available: [
      {
        route: "/api/v1/users",
        method: "GET",
        response: "list of 'users'"
      },
    ]
  });
});

app.get("/api/v1/users", (req, res) => {
  const data = require("./data.json");
  res.json(data).status(200);
});

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));
