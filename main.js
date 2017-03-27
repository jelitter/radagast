var port       = 80;
var twitter    = require('./twitter'); 
var favourites = require('./favourites');
var express    = require('express');
var time       = require('express-timestamp')
var app        = express();

process.stdout.write('\033c');  // clear console

console.log("##########################################################");
preload();
console.log("  RADAGAST - Twitter search API started on port "+port);
console.log("##########################################################");
app.set('view engine', 'jade');
app.use(time.init);


// ----------------------------------------------------
//         USER - work in progress
// ----------------------------------------------------

// app.route('/user')
//   .get(function (req, res) {
//     res.send('Get a random user')
//   })
//   .post(function (req, res) {
//     res.send('Add an user')
//   })
//   .put(function (req, res) {
//     res.send('Update an user')
//   })
//   .delete(function (req, res) {
//     res.send('Delete an user')
//   })




// ----------------------------------------------------
//         TWITTER SEARCH
// ----------------------------------------------------

app.get('/api/v1/twitter/search/', function(req, res){
  if (!req.query.q) {
    // console.log(req.timestamp.format() + "-> Wrong query: " + JSON.stringify(req.query));
    log(req, "Incorrect query");
    res.sendFile('html/api-doc.html', {root: __dirname })
  } else {
    // console.log(req.timestamp.format() + "-> /api/v1/search/ -> " + req.query.q);
    log(req, "Search: " + req.query.q);
    twitter.getTwitsSearch(res, req.query.q, req.query.lang, req.query.count);
  }
});

app.get('/api/v1/twitter/remove/', function(req, res){
  if (!req.query.q) {
    // console.log(req.timestamp.format() + "-> Wrong query: " + JSON.stringify(req.query));
    log(req, "Incorrect query");
    res.sendFile('html/api-doc.html', {root: __dirname })
  } else {
    // console.log(req.timestamp.format() + "-> /api/v1/search/ -> " + req.query.q);
    log(req, "Remove: " + req.query.q);
    twitter.removeTwitsSearch(res, req.query.q);
  }
});

app.get('/api/v1/twitter/all/', function(req, res){
  // console.log(req.timestamp.format() + "-> /api/v1/all/");
  log(req, "All results");
  twitter.getAllTwits(res, req);
});


// ----------------------------------------------------
//         FAVOURITES
// ----------------------------------------------------

app.get('/api/v1/favourites/add/', function(req, res){
  // console.log(req.timestamp.format() + "-> /api/v1/favourites/add/ -> " + req.query.user + " -> " + req.query.text);
  log(req, req.query.user +", "+ req.query.text);

  if (!req.query.user || !req.query.text) {
    // console.log(req.timestamp.format() + "-> Wrong query: " + JSON.stringify(req.query));
    log(req, "Incorrect query");
    res.sendFile('html/api-doc.html', {root: __dirname })
  } else {
    favourites.add(req.query.user, req.query.text, res);
  }
});

app.get('/api/v1/favourites/remove/', function(req, res){
  // console.log(req.timestamp.format() + "-> /api/v1/favourites/remove/ -> " + req.query.user + " -> " + req.query.text);
  log(req, req.query.user +", "+ req.query.text);

  if (!req.query.user || !req.query.text) {
    // console.log(req.timestamp.format() + "-> Wrong query: " + JSON.stringify(req.query));
    log(req, "Incorrect query")
    res.sendFile('html/api-doc.html', {root: __dirname })
  } else {
    favourites.remove(req.query.user, req.query.text, res);
  }
});

app.get('/api/v1/favourites/get/', function(req, res){
  console.log(req.timestamp.format() + "-> /api/v1/favourites/get/ -> " + req.query.user);

  if (!req.query.user) {
    // console.log(req.timestamp.format() + "-> Wrong query: " + JSON.stringify(req.query));
    log(req, "Incorrect query")
    res.sendFile('html/api-doc.html', {root: __dirname })
  } else {
    favourites.get(req.query.user, req, res);
  }
});


// ----------------------------------------------------
//         Default API route handler
// ----------------------------------------------------

app.get('/api/',function (req, res) {
  res.sendFile('html/api-doc.html', {root: __dirname });
  // console.log(req.timestamp.format() + "-> Help");
  log(req, "API Doc");
});

app.get('/api/?*',function (req, res) {
  // console.warn(req.timestamp.format() + "-> Wrong route: " + + req.originalUrl);
  log(req, "Incorrect API call");
  res.redirect('/api/');
});

// app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(express.static(__dirname + "/html"));

app.get(/\w{1,}/,function (req, res) {
  log(req, "Wrong route (404)");
  // console.warn(req.timestamp.format() + "-> Wrong route (404): " + req.originalUrl);
  res.sendFile('html/404.html', {root: __dirname });
});


// ----------------------------------------------------
//         MAIN Page
// ----------------------------------------------------

app.use('/', index);
app.use('html/', index);
app.use('html/index.html', index);
app.use('/about', about);


function index(req, res) {
  log(req, "Index")
  res.sendFile('/index.html', {root: __dirname });
  // console.log(req.timestamp.format() + "-> Index");
}

function about(req, res) {
  log(req, "About")
  res.sendFile('/about.html', {root: __dirname });
  // console.log(req.timestamp.format() + "-> Index");
}


// ----------------------------------------------------
//         Server Start
// ----------------------------------------------------

app.listen(port);




// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------


function preload() {
  try {
    twitter.loadData();
    console.log("  Twitter data loaded.");
  } catch (e) {
    console.log("[!] Couldn't load Twitter data.");
  }

  try {
    favourites.load()
    console.log("  Favourites loaded.");
  } catch (e) {
    console.log("[!] Couldn't load favourites.\n" + JSON.stringify(e));
  }
}

function log(req, log) {

  // var ip = (req.ip || req.connection.remoteAddress).replace(/::ffff:/, "");
  var ip;
  if (req.ip) {
    ip = req.ip.replace(/::ffff:/, "");
  } else {
    ip = ""
  }
  console.warn(req.timestamp.format() + " ["+ ip +"] "+req.originalUrl + " : "+ log);
}