var jsonfile = require('jsonfile')
jsonfile.spaces = 2;
var favfile = './api/data/favourites.json'
var favourites = {};


exports.add = function(user, text, res) {

  if (user == "" || text == "") {
    res.send({
      "status" : "error",
      "message" : "Favourite not added - Specify 'user' and 'text'."
    });
  } else {

    if (favourites[user]) {
      if (favourites[user].indexOf(text) < 0) {
        favourites[user].push(text);
      } else {
        res.send({
          "status" : "OK",
          "message" : "Favourite was already in user favourites list " + user + ": '"+text+"'"
        });
        return;
      }
    } else {
      favourites[user] = [text];
    }
    res.send({
      "status" : "OK",
      "message" : "Favourite added to user " + user + ": '"+text+"'"
    });
    this.save();
  }
}

exports.remove = function(user, text, res) {

  if (user == "" || text == "") {
    res.send({
      "status" : "error",
      "message" : "Favourite not removed - Specify 'user' and 'text'."
    });
  } else {

    if (favourites[user]) {
      var pos = favourites[user].indexOf(text);
      if (pos >= 0) {
        favourites[user].splice(pos,1);
      } else {
        res.send({
          "status" : "error",
          "message" : "Favourite was not in user favourites list " + user + ": '"+text+"'"
        });
        return;
      }
    } else {

      res.send({
      "status" : "error",
      "message" : "Favourite not removed - This user has not saved favourites: " + user
    });

    }
    res.send({
      "status" : "OK",
      "message" : "Favourite removed from user " + user + ": '"+text+"'"
    });
    this.save();
  }
}

exports.get = function(user, req, res) {
  res.send(favourites[user]);
}

exports.load = function() {
  try {
    favourites = jsonfile.readFileSync(favfile);
  } catch (e) {
    console.log("Error parsing favourites from file.")
  }
}

exports.save = function() {
  try {
    jsonfile.writeFileSync(favfile, favourites)
    // console.log("Favourites saved.")
  } catch (e) {
    // console.log("Error saving favourites.")
  }
}