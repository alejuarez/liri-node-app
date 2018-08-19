# liri-node-app

This app will run commands such as:

    * `node liri.js my-tweets`* - this will show the last 20 tweets and the day they were created

    * `node liri.js spotify-this-song '<song name here>'`* - this will show you the following information about the song
     - Artist(s)
     - The song's name
     - A preview link of the song from Spotify
     - The album that the song is from
     - If no song is provided then your program will default to "The Sign" by Ace of Base

    * `node liri.js movie-this '<movie name here>'* - this will show you the following information:
       - Title of the movie
       - Year the movie it was released
       - IMDB Rating of the movie
       - Rotten Tomatoes Rating of the movie
       - Country where the movie was produced
       - Language of the movie
       - Plot of the movie
       - Actors in the movie
        If the movie is undefined or is in blank the output will be "Mr. Nobody"

    * `node liri.js do-what-it-says `* - this will run the default song "I Want it That Way"
