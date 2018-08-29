'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');


let app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT;

const CONSTRING = process.env.DATABASE_URL;
// const CONSTRING = 'postgres://trevorstam:1910@localhost:5432/books';
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
  //Show book description GET

  let SQL = 'SELECT * FROM books WHERE id = $1';
  console.log('response ');
  let id = request.params.id;
  // console.log('id', id);

  let values = [
    id
  ];
  client.query(SQL, values)
    .then(data => {
      // console.log(data);
      let authorData = data.rows;
      response.render('pages/show', {
        data: authorData
      });
    });
}


app.use( express.static('./public') );

app.use('*', (req, res) => res.render('pages/error'));

app.listen( PORT, () => console.log('Server Up on ', PORT) );
