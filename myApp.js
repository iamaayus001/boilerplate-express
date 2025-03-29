let express = require("express");
let app = express();
let dotenv = require("dotenv");
let bodyParser = require("body-parser");

dotenv.config({ path: `${__dirname}/.env` });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = Date().toString();
    next();
  },
  (req, res) => {
    res.status(200).json({
      time: req.time,
    });
  }
);

app.get("/:word/echo", (req, res) => {
  res.status(200).json({
    echo: req.params.word,
  });
});

app.use("/public", express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.status(200).sendFile(`${__dirname}/views/index.html`);
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.status(200).json({
      message: "HELLO JSON",
    });
  } else {
    res.status(200).json({
      message: "Hello json",
    });
  }
});

app.get("/name", (req, res) => {
  res.status(200).json({
    name: `${req.query.first} ${req.query.last}`,
  });
});

//Respond with the same JSON object as before: {name: 'firstname lastname'}. Test if your endpoint works using the html form we provided in the app frontpage.
app.post("/name", (req, res) => {
  res.status(200).json({
    name: `${req.body.first} ${req.body.last}`,
  });
});

//Tip: There are several other http methods other than GET and POST. And by convention there is a correspondence between the http verb, and the operation you are going to execute on the server. The conventional mapping is:

//POST (sometimes PUT) - Create a new resource using the information sent with the request,

//GET - Read an existing resource without modifying it,

//PUT or PATCH (sometimes POST) - Update a resource using the data sent,

//DELETE - Delete a resource.

module.exports = app;
