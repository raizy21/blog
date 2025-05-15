# blog project

## overview

this is a simple blog application that demonstrates full crud functionality. users can create, read, update, and delete blog posts, all persisted in a mysql database and rendered with ejs.

## technologies

- **html** for page structure
- **css** for styling and responsive layouts
- **javascript (node.js)** for server-side logic
- **ejs** as the templating engine
- **mysql** for data storage

## features

- **create** new blog posts via a form
- **read** and list all posts on the home page
- **update** existing posts through an edit interface
- **delete** posts with a confirmation step

## environment variables

create a `.env` file in the project root based on the provided `.env.example`. this file contains your database and server configuration:

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username_here
DB_PASSWORD=your_password_here
DB_NAME=blog_name_here
PORT=3000
```

make sure to add .env to your .gitignore so you don’t commit sensitive information to version control.

## database schema

### posts table

| column   | type     | notes                                |
| -------- | -------- | ------------------------------------ |
| id       | int      | primary key, auto-increment          |
| title    | varchar  | post title                           |
| summary  | varchar  | description                          |
| body     | text     | full content                         |
| date     | datetime | timestamp of creation or last update |
| authorid | int      | foreign key → authors(id)            |

### authors table

| column | type    | notes                            |
| ------ | ------- | -------------------------------- |
| id     | int     | primary key, auto-increment      |
| name   | varchar | author’s full name               |
| email  | varchar | author’s contact email (unique?) |

## dependencies

- **express**: minimal and flexible node.js web framework for handling routes and middleware
- **ejs**: embedded javascript templating engine for generating html on the server
- **mysql2**: mysql driver for node.js with promise support for querying your database

## dev dependencies

- **dotenv**: loads environment variables from a `.env` file into `process.env`
- **nodemon**: automatically restarts the server on file changes for faster development

## resources

- **html**: comprehensive guide and reference for the standard markup language – [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **css**: tutorials and reference for styling and layout – [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **javascript**: in-depth documentation and guides for the language – [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **ejs**: official templating engine docs and examples – [ejs.co](https://ejs.co)
- **mysql**: official documentation and tutorials for the relational database – [dev.mysql.com/doc/](https://dev.mysql.com/doc/)
- **dotenv**: environment variable loader for node.js – [github.com/motdotla/dotenv](https://github.com/motdotla/dotenv)
- **nodemon**: automatic server restart tool for development – [github.com/remy/nodemon](https://github.com/remy/nodemon)
