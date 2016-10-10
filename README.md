# Project 2

# Movie Collection App  

<h1>Planning</h1>
<p>I have created user stories that describe how the user should be able to interact with the app. https://trello.com/b/GQjYnEUz</p>

<p>Also below is a ERD describing the layout of my two models that were used.

<h1>Entity Relationship Diagram</h1>

<h4>Movie</h4>
title: String,
stars: String,
genre: String,
year: Number,
rated: String

<h4>user</h4>
username: String,
password: String,
movies: [MovieSchema]
