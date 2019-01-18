NC News Stack

https://nc-news-stack.herokuapp.com/

****Description****;

NC-News-Stack provides an open API to many exciting features such as viewing topics, articles, comments and user data.

You can make specific queries to get specific tailored endpoints to your requests as well as post and ammend data entries.

The key url lines are documented at; **https://nc-news-stack.herokuapp.com/api**

****Routes****

/api 

> **GET** responds with a json object of all endpoints

/api/topics

> **GET** lists all topics
> **POST** a new topic

/api/topics/*:topic*/articles

> **GET** all articles from a specific topic

/api/articles

> **GET** lists all articles

/api/articles/*:article_id*

> **GET** a specified article
> **PATCH** ammend votes to an article
> **DELETE** an article

/api/articles/*:article_id*/comments

> **GET** all comments about the specified article
> **POST** a new comment to the article

/api/articles/*:articles_id*/comments/*:comment_id*

> **PATCH** ammend the votes on a specified comment
> **DELETE** the specified comment

/api/users

> **GET** lists all users

/api/users/*:username*

> **GET** a specified user

..............................

****Running this project locally****;

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