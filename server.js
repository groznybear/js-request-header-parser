// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.redirect('/api/whoami');
});

app.get('/api/whoami', (req, res) => {
  res.end(JSON.stringify(whoami(req.headers)));
});

var whoami = (headers) => 
{  
  var agent = headers["user-agent"];
  var fromIndex = agent.indexOf('(');
  var toIndex = agent.indexOf(')');
  
  var me = {
    ipaddress: headers["x-forwarded-for"].split(',')[0],
    language: headers["accept-language"].split(';')[0].split(',')[0],
    software: agent.substring(fromIndex + 1, toIndex),
  }
  
  return me;
};

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
