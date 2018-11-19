# movies-app

Ruby on Rails + React.js

## Patterns

Flux and MVC.

## Getting Started

### Prerequisites

Make sure you have Node.js, Ruby on Rails and the Postgresql server installed.

Add user with structure and data privileges to Postgresql server with username "admin" and password "admin".

### Installing libraries

Go to the root folder of the project and run the following line:

```
yarn install
```

### Execute migration

Run the following line:

```
rake db:migrate
```

## Run project

Run the next line to start Ruby on Rails:

```
rails s
```

Then run in other terminal to start the Webpacher Server:

```
ruby ./bin/webpack-dev-server
```

The app should now be running on localhost:3000.
