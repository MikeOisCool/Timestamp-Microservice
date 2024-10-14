// index.js
// where your node app starts
// const bodyParser = require('body-parser');

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:apiDate?", function (req, res) {
  let apiDate = req.params.apiDate
  let date;

  if (!apiDate) {
    date = new Date();
  }
  // Überprüfen, ob der apiDate ein gültiger Unix-Zeitstempel ist
  else if (!isNaN(apiDate)) {
    // Unix-Zeitstempel: parsest ihn
    date = new Date(parseInt(apiDate));
  } else {
    // Andernfalls: versuche, einen regulären Datums-String zu parsen
    date = new Date(apiDate);
  }

  // Fehlerbehandlung: wenn das Datum ungültig ist
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }


  const dateObject = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }

  res.json(dateObject);
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
