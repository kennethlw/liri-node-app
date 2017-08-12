# liri-node-app

NPM Packages Used
-fs
Used to log all information searched in the log.txt file to allow the user to reference this information at a later time
-Prompt
Used to inform the user what should be typed to access the information category of their choosing. also used to ask the user what specific thing they wish to look up under Spotify and OMDB
-Twitter
Used to access my twitter feed and return the latest tweets
-Spotify
Used to access the Spotify API and search for song information
-Request
Used to request the OMDB API

Introduction
I created a node.js app called LIRI. LIRI is like Apple's SIRI, except for the bash terminal/CLI.

LIRI is a Language Interpretation and Recognition Interface.

LIRI will be a command line node app that takes in parameters and gives you back console data.

LIRI will do any of the below command when you enter them into the command line.

my-tweets
spotify-this-song
movie-this
do-what-it-says

my-tweets will give you the most recent tweets from a specific user. Right now, it is configured to return tweets from the POTUS.

spotify-this-song 'song name' will return information about the specific song

movie-this 'movie name' will return certain information about the movie

do-what-it-says is the wildcard and will run whatever command is held in the random.txt file
