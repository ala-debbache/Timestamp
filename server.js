// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if(!isNaN(req.params.date)){
    var date = new Date(parseInt(req.params.date));
  }else{
    var date = new Date(req.params.date);
  }
  var dateToSend = date.toLocaleString('default', { weekday: 'short' })+", "+date.toLocaleString('default', { day: 'numeric' })+" "+date.toLocaleString('default', { month: 'short', year: 'numeric' })+" "+date.toLocaleString('default', { hour:"numeric", minute: "numeric", second: "numeric", hour12: false, timeZoneName: "short" });
  res.json({unix: date.getTime(),utc: dateToSend});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
