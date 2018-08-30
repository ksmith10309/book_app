'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');

let app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT;

const CONSTRING = process.env.DATABASE_URL;
// const CONSTRING = 'postgres://localhost:5432/books_app';

let client = new pg.Client(CONSTRING);
client.connect();
client.on('error', err => {
  console.error(err);
});

app.get('/', showBooks);

function showBooks (request, response){

  let SQL = 'SELECT id, title, author, image_url FROM books';
  client.query(SQL)
    .then(data => {
      // console.log(data);
      let bookData = data.rows;
      response.render('index', {
        books: bookData
      });
    })
    .catch(err => {
      console.log(err);
      response.render('pages/error');
    });

}


app.get('/books', showBooks);

app.get('/books/:id', showDetails);

function showDetails(request, response){
  // Show book description GET

  let SQL = 'SELECT * FROM books WHERE id = $1';
  let id = request.params.id;
  // console.log('id', id);

  let values = [
    id
  ];
  client.query(SQL, values)
    .then(data => {
      let authorData = data.rows;
      console.log(authorData);
      response.render('pages/show', {
        detail: authorData, 'message': 'hidden'});
    });
}

// Add Book
app.get('/add-book', (request, response) => {
  response.render('pages/new');
});

app.post('/add-book', addBook);

function addBook (request, response){
  let SQL = `
    INSERT INTO books (title, author, isbn, image_url, description) 
    VALUES ( $1, $2, $3, $4, $5 )
  `;
  let values = [
    request.body.title,
    request.body.author,
    request.body.isbn,
    request.body.image_url,
    request.body.description
  ];

  client.query(SQL, values)
    .then(() => {
      let newBookData = [];
      newBookData.push(request.body);

      response.render('pages/show', {
        detail: newBookData, 'message': 'show'});
    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
    });
}

app.use( express.static('./public') );

app.use('*', (req, res) => res.render('pages/error'));

app.listen( PORT, () => console.log('Server Up on ', PORT) );
