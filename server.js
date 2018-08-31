'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');

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


//GET REQUESTS

app.get('/', showBooks);

app.get('/books', showBooks);

app.get('/books/:id', showDetails);

// Add Book
app.get('/add-book', (request, response) => {
  response.render('pages/new');
});

app.get('/search-book', (request, response) => {
  response.render('pages/search');
});

app.get('/results', searchBook);

//POST REQUESTS

app.post('/add-book', addBook);

//FUNCTIONS

function showBooks(request, response) {

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

function searchBook(request, response){
  let search = encodeURIComponent(request.query.search);
  let url = 'https://www.googleapis.com/books/v1/volumes?q=in'+ request.query.by + ':' + search;

  superagent.get(url)
    .then( results => {
      let listNewBooks = results.body.items.reduce((items, currentItem) => {
        let newBook = {
          title: currentItem.volumeInfo.title,
          author: currentItem.volumeInfo.authors,
          image_url: currentItem.volumeInfo.imageLinks.smallThumbnail,
          isbn: currentItem.volumeInfo.industryIdentifiers[0].identifier,
          description: currentItem.volumeInfo.description
        };
        items.push(newBook);
        return items;
      }, []);

      response.render('pages/results', {books: listNewBooks});

    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
    });
}

app.use( express.static('./public') );

app.use('*', (req, res) => res.render('pages/error'));

app.listen( PORT, () => console.log('Server Up on ', PORT) );
