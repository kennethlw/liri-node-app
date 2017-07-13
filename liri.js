//we use require to let the program know we need these files to run. Our API keys are stored in keys.js
var keys = require("./keys.js");
var fs = require("fs");

//we will be logging all command line arguments to "log.txt"
var textFile = "log.txt";

//this is our driver, command will let LIRI know what command to run
var command = process.argv[2];

//making these variables global so they dont get overridden in the function
var song = "";
var type = "";

//for the omdb
var title = "";

var dataArr = [];


var commandLine = "";

//loop through the commandline and start at the command since they all begin with paths at 0 and 1
for (var i = 2; i < process.argv.length; i++) {
	commandLine += process.argv[i] + " ";
}
//add a new line when it prints out to log.txt to make it easier to read
commandLine = commandLine + "\n";


//wrapped everything in a function so that the random.txt could execute properly
fs.appendFile(textFile, "\n*******************************" + "\nCommand requested: " + commandLine + "*******************************", function chooseCommand() {
//if the user enters my-tweets on the command line
if (command === "my-tweets") {

	var Twitter = require('twitter');

	var client = new Twitter ({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});

	console.log(client);

 	var params = {screen_name: 'realDonaldTrump'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for (var i = 0; i < tweets.length; i++) {
    			console.log("Tweet created at: " + JSON.stringify(tweets[i].created_at, null, 2));
    			console.log("Tweet: " + JSON.stringify(tweets[i].text, null, 2));
    			console.log(" ");

    			fs.appendFile(textFile, "\nTweet created at: " + JSON.stringify(tweets[i].created_at, null, 2), function(err) {
    				if (err) {
    					console.log(err);
  					}
    			});
    			fs.appendFile(textFile, " " + "Tweet: " + JSON.stringify(tweets[i].text, null, 2), function(err) {
    				if (err) {
    					console.log(err);
  					}
    			});
    			fs.appendFile(textFile, "\n", function(err) {
    				if (err) {
    					console.log(err);
  					}
    			});

    		}
  		}
  	});
}

//SPOTIFY commands
if (command === "spotify-this-song") {

	var Spotify = require('node-spotify-api');
 
	var spotify = new Spotify({
  		id: keys.spotifyKeys.client_id,
  		secret: keys.spotifyKeys.client_secret
	});
 	
	if(process.argv.length === 3 && dataArr[1] != undefined) {
		song = dataArr[1];
		type = "track";
	}
 	else if (process.argv.length === 3) {
		song = "The Sign Ace of Base";
		type = "track";
 	}
 	else if (process.argv.length > 3 ) {
		for (var i = 3; i < process.argv.length; i++) {
			song += process.argv[i] + " ";
		}
		type = "track";
	}

	spotify.search({ type: type, query: song }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
  	}


  		for (var i = 0; i < data.tracks.items.length; i++) {
  			for (var j = 0; j < data.tracks.items[i].artists.length; j++) {
				console.log("Artist(s): " + data.tracks.items[i].artists[j].name);

				fs.appendFile(textFile, "\nArtist(s): " + data.tracks.items[i].artists[j].name, function(err) {
    				if (err) {
    					console.log(err);
  					}
    			});
			}
			console.log("Song Name: " + data.tracks.items[i].name); 
			console.log("Preview URL: " + data.tracks.items[i].preview_url); 
			console.log("Album: " + data.tracks.items[i].album.name);

			fs.appendFile(textFile, "\nSong Name: " + data.tracks.items[i].name, function(err) {
    			if (err) {
    				console.log(err);
  				}
    		});
			fs.appendFile(textFile, "\nPreview URL: " + data.tracks.items[i].preview_url, function(err) {
    			if (err) {
    				console.log(err);
  				}
    		});
			fs.appendFile(textFile, "\nAlbum: " + data.tracks.items[i].album.name + "\n", function(err) {
    			if (err) {
    				console.log(err);
  				}
    		});
		}
	});	
}
//OMDB commands
if (command === "movie-this") {
	var request = require("request");
	
	//checks to see if do what it says includes a movie search
	//if so, search for that movie
	if (process.argv.length === 3 && dataArr[1] != undefined ) {
		title = dataArr[1];
	}
	//if there is no movie title provided, then default to "Mr. Nobody"
	else if (process.argv.length === 3) {
		title = "Mr. Nobody";
	}
	//else search for the user entered title on the arg line
	else if (process.argv.length > 3) {
		for (var i = 3; i < process.argv.length; i++) {
			title += process.argv[i] + " ";
		}
	}
	
	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  	  if (!error && response.statusCode === 200) {

		console.log("Title of the movie: " + JSON.parse(body).Title);
		console.log("Year of the movie: " + JSON.parse(body).Year);
    	console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    	if (JSON.parse(body).Ratings[1] == null) {
    		console.log("There is no Rotten Tomatoes rating for this movie.");	
    	}
    	else {
    		console.log("Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
    	}
    	console.log("Country where movie was produced: " + JSON.parse(body).Country);
    	console.log("Language of the movie: " + JSON.parse(body).Language);
    	console.log("Plot of the movie: " + JSON.parse(body).Plot);
    	console.log("Actors in the movie: " + JSON.parse(body).Actors);

    	fs.appendFile(textFile, "\nTitle of the movie: " + JSON.parse(body).Title, function(err) {
    		if (err) {
    			console.log(err);
  			}
    	});
    	fs.appendFile(textFile, "\nYear of the movie: " + JSON.parse(body).Year, function(err) {
    		if (err) {
    			console.log(err);
  			}
    	});
    	fs.appendFile(textFile, "\nThe movie's rating is: " + JSON.parse(body).imdbRating, function(err) {
    		if (err) {
    			console.log(err);
  			}
    	});
    	if (JSON.parse(body).Ratings[1] == null) {
    		fs.appendFile(textFile, "\nThere is no Rotten Tomatoes rating for this movie.", function(err) {
    			if (err) {
    				console.log(err);
    			} 
    		});
    	}
    	else {
    		fs.appendFile(textFile, "\nRotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value, function(err) {
    			if (err) {
    				console.log(err);
  				}
    		});
    	}
    	fs.appendFile(textFile, "\nCountry where movie was produced: " + JSON.parse(body).Country, function(err) {
    		if (err) {
    			console.log(err);
  			}
    	});
    	fs.appendFile(textFile, "\nLanguage of the movie: " + JSON.parse(body).Language, function(err) {
    		if (err) {
    			console.log(err);
  			}
    	});
    	fs.appendFile(textFile, "\nPlot of the movie: " + JSON.parse(body).Plot, function(err) {
    		if (err) {
    			console.log(err);
  			}
    	});
    	fs.appendFile(textFile, "\nActors in the movie: " + JSON.parse(body).Actors + "\n", function(err) {
    		if (err) {
    			console.log(err);
  			}
    	});
     } 
	});
}

if (command === "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  dataArr = data.split(",");
  

  command = dataArr[0];
  song = dataArr[1];
  title = dataArr[1];
  

  chooseCommand();

   });

  }
//close function
});

//chooseCommand();

  
	
