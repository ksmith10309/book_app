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
      let bookData = data.rows;
      response.render('index', {books: bookData});
    })
    .catch(err => {
      console.log(err);
      response.render('pages/error');
    });
}

function showDetails(request, response){
  let SQL = 'SELECT * FROM books WHERE id = $1';
  let values = [ request.params.id ];
  client.query(SQL, values)
    .then(data => {
      let authorData = data.rows;
      console.log(authorData);
      response.render('pages/show', {detail: authorData, 'message': 'hidden'});
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
      response.render('pages/show', {detail: newBookData, 'message': 'show'});
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
      if(results.body.totalItems === 0) {
        response.render('pages/results', {'results': 'notfound'});
      } else {
        let filterBooks = results.body.items.filter(el => el.volumeInfo.imageLinks !== undefined);
        let newBooks = filterBooks.reduce((items, currentItem) => {
          let book_isbn = (currentItem.volumeInfo.industryIdentifiers) ? currentItem.volumeInfo.industryIdentifiers[0].identifier : 'not available';
          let newBook = {
            title: (currentItem.volumeInfo.title) ? currentItem.volumeInfo.title : 'Title not available',
            author: (currentItem.volumeInfo.authors) ? currentItem.volumeInfo.authors : 'Author not available',
            isbn: book_isbn,
            image_url: currentItem.volumeInfo.imageLinks.smallThumbnail,
            description: (currentItem.volumeInfo.description) ? currentItem.volumeInfo.description : 'Description not available'
          };
          items.push(newBook);
          return items;
        }, []);
        response.render('pages/results', {books: newBooks, 'results': 'found'});
      }
    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
    });
}

app.use( express.static('./public') );

app.use('*', (req, res) => res.render('pages/error'));

app.listen( PORT, () => console.log('Server Up on ', PORT) );
