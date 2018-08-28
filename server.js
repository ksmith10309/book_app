'use strict';

const express = require('express');
const pg = require('pg');

let app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;

const CONSTRING = process.env.DATABASE_URL || 'postgres://localhost:5432/books_app';
let client = new pg.Client(CONSTRING);
client.connect();
client.on('error', err => {
  console.error(err);
});

app.get('/', (request, response) => {
  let SQL = 'SELECT title, author, image_url FROM books';
  client.query(SQL)
    .then( data => {
      console.log(data);
      let bookData = data.rows;
      response.render('index', {books:bookData});
    })
    .catch(err => {
      console.log(err);
      response.render('pages/error');
    });
});

//Temporary route to render index.ejs
app.get('/hello', (request, response) => {
  response.render('index');
});

app.get('/books', (request, response) => {
  let SQL = 'SELECT title, author, image_url FROM books';
  client.query(SQL)
    .then( data => {
      console.log(data);
      let bookData = data.rows;
      response.render('index', {books:bookData});
    })
    .catch(err => {
      console.log(err);
      response.render('pages/error');
    });
});

app.use( express.static('./public') );

app.listen( PORT, () => console.log('Server Up on ', PORT) );
