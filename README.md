# Project 2

<h2>Movie Collection App</h2>  

# Purpose Of App
<p>The purpose of this app is to allow users to create and edit their own movie collection that saves to a Mongo DB. Users are also able to have their own username and password making their account only accessible to themselves.</p>

# Technologies Used
<p>HTML, CSS, Javascript, MongoDB, Mongoose, and Express Node.js</p>

<h1>Planning</h1>
<p>I have created user stories that describe how the user should be able to interact with the app. https://trello.com/b/GQjYnEUz</p>

<p>Also below is a ERD that describes the layout of the two models that were used.

<h1>Entity Relationship Diagram</h1>

<h4>Movie</h4>
title: String,<br>
stars: String,<br>
genre: String,<br>
year: Number,<br>
rated: String<br>

<h4>user</h4>
username: String,<br>
password: String,<br>
movies: [MovieSchema]<br>

<h1>Unsolved Problems</h1>
I wouldve loved to implement flash messages on my page rather than redirecting a user when theires an error with their credentials. I tried to install the dependency, required it, and added it to my middle wear section but for some reason wasn't able to figure out how to use it.


