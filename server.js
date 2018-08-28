'use strict';

const express = require('express');
const pg = require('pg');

let app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;

const CONSTRING = process.env.DATABASE_URL || 'postgres://localhost:5432/books_app';
let client = new pg.Client(CONSTRING);
client.connect();

app.get('/', (request, response) => {
  response.render('index');
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
      response.render('books', {books:bookData});

    //   bookCountQuery();
    });
});

// function bookCountQuery() {
//   let SQL = "SELECT COUNT(*) FROM books";
//   client.query(SQL)
//     .then( data => {
//       console.log(data);
//       let countData = data.rows;
//       response.render('books', {count:countData});
//     });
// }

// app.get('/books', (request, response) => {
//   let SQL = "SELECT COUNT(*) FROM books";
//   client.query(SQL)
//     .then( data => {
//       console.log(data);
//       let bookData = data.rows;
//       response.render('books', {books:bookData});
//     });
// });

// app.get('/categories', showCategories);
// app.get('/links', showLinks);

// function showCategories( request, response ) {
//   let SQL = "SELECT * FROM categories";
//   client.query(SQL)
//     .then( data => {
//       let categories = data.rows;
//       response.render('categories', {items:categories});
//     });
// }

// function showLinks( request, response ) {
//   let SQL = "SELECT * FROM links";
//   client.query(SQL)
//     .then( data => {
//       let listings = data.rows;
//       console.log(listings);
//       response.render('links', {items:listings});
//     });
// }

app.use( express.static('./public') );

app.listen( PORT, () => console.log('Server Up on ', PORT) );

