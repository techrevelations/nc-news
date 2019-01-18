NC News Stack

https://nc-news-stack.herokuapp.com/

Description;

NC-News-Stack provides an open API to many exciting features such as viewing topics, articles, comments and user data.

You can make specific queries to get specific tailored endpoints to your requests as well as post and ammend data entries.

The key url lines are documented at; https://nc-news-stack.herokuapp.com/api

Running this project locally;

Sensative data has not been made available on this repo. You will need to establish a .knexfile(.js) containing the following;

Declare a variable const {DB_URL} = process.env;

Then export an object containing your SQL database. An example is detailed below;

test: {
		client: 'pg',
		connection: {
			database: 'test_database_goes_here'
		},
		migrations: {
			directory: './db/migrations'
		}

You will need to declare additional objects if you wish to run the project in development or production modes.