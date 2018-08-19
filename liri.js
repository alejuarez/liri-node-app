//TODO : put require files all at top
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;
var spotifyClient = new Spotify(spotifyKeys);
var music = "";
var command = process.argv[2];

switch (command) {
  case "movie-this":
    myOMdb();
    break;

  case "my-tweets":
    myTwitter();
    break;

  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function(err, music) {
      mySpotify(music);
      if (err) {
        return console.log(err);
      }
    });
    break;

  case "spotify-this-song":
    var music = process.argv[3];
    if (process.argv[3] === undefined) {
      music = "The Sign";
      console.log(
        "====================================================================="
      );
      console.log("Artist: Ace of Base");
      console.log("Song's name: The Sign");
      console.log(
        "Spotify link : https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE"
      );
      console.log("Album: The Sign (US Album) [Remastered]");
      console.log(
        "====================================================================="
      );
    } else {
      mySpotify(music);
    }
    break;
}

function myOMdb() {
  var request = require("request");
  var nodeArgs = process.argv;
  var movieName = "";

  if (process.argv[3] === undefined) {
    movieName = "Mr. Nobody";
  } else {
    for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
      } else {
        movieName += nodeArgs[i];
      }
    }
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      console.log(
        "====================================================================="
      );
      console.log("Title : ", JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("Imdb Rating : ", JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes : ", JSON.parse(body).Ratings[1].Value);
      console.log("Country : ", JSON.parse(body).Country);
      console.log("Language: ", JSON.parse(body).Language);
      console.log("Plot : ", JSON.parse(body).Plot);
      console.log("Actors : ", JSON.parse(body).Actors);
      console.log(
        "====================================================================="
      );
    } else if (error || undefined) {
      console.log("Look it on Netflix!");
    }
  });
}

function myTwitter() {
  var Twitter = require("twitter");
  var twitterClient = new Twitter(twitterKeys);

  var params = { screen_name: "nodejs" };
  twitterClient.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(" Date: ", tweets[i].created_at);
        console.log(" Text: ", tweets[i].text);

        console.log(
          "====================================================================="
        );
      }
    }
  });
}

function mySpotify(music) {
  spotifyClient
    .search({ type: "track", query: music })
    .then(function(response) {
      for (var i = 0; i < 1; i++) {
        console.log(
          "====================================================================="
        );
        console.log("Artist:", response.tracks.items[i].artists[0].name);
        console.log("Song's name:", response.tracks.items[i].name);
        console.log(
          "Spotify link :",
          response.tracks.items[i].external_urls.spotify
        );
        console.log("Album:", response.tracks.items[i].album.name);
        console.log(
          "====================================================================="
        );
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}
