# Book App - Course 301 Week 3 Project

**Author**: Trevor Stam and Katherine Smith

**Version**: 1.0.5

## Overview
This is a web app that displays a list of books from a SQL database. The user can manually input information to add a new book. The user can also search the Google Books API to add a new book.

## Getting Started
- Fork and clone the repository
- Make sure Node and PostgreSQL are installed
- Run `npm i` in the terminal to install dependencies
- Run `psql books_app -f books_app.sql` in the terminal to populate database
- Create .env file with PORT and DATABASE_URL information
- Run `node server.js` in the terminal and go to localhost:PORT in the browser

## Architecture
- Languages: HTML, CSS, JavaScript
- Server-Side Scripting: Node.js
- Dependencies: dotenv, ejs, express, pg, superagent
- Hosting: Heroku

## Change Log
- Version 1.0.5 / Release Date: Mon Sep 3
    - Update README file and make final touch-ups to styling

- Version 1.0.4 / Release Date: Sat Sep 1
    - Fix search to account for missing data
    - Move labels for radio buttons
    - Change data unavailable text
    - Create custom radio buttons

- Version 1.0.3 / Release Date: Fri Aug 31
    - books from google books api displaying and added to database + styling
    - added error handling

- Version 1.0.2 / Release Date: Thu Aug 30
    - Add sql file and change constring
    - Add form for adding new book and feedback validation
    - Style app according to SMACSS
    - Change constring for Heroku

- Version 1.0.1 / Release Date: Wed Aug 29
    - wrapped SQL functions, app.get for details not working
    - implement detail view working now
    - styled pages

- Version 1.0.0 / Release Date: Tue Aug 28
    - Set up repository file structure
    - Get books to render on page
    - Implement error handling
    - Add reset.css and style home page
    - Update README file

## Credits and Collaborations
- Instructors: John Cokos, Allie Grampa
- TAs: Katy Robinson, Koko Kassa
- Resources: MDN Web Docs, Stack Overflow, W3Schools
