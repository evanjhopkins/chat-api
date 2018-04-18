# chat-api
Here is a very simple chat API. It allows for one-on-one conversations between users. Any two users can start a chat thread by sending the other a message. Try running it locally and sending messages between two users!

# How to run locally
`npm i` - Install Dependencies
`npm start` - Run web service locally

# Routes
## Create a user
POST: `/user/{username}` - Create a user

## Send a message
POST: `/user/{username}/send-message` - Send user a message (the user must exist, the api will validate this)
- the username in the route represents the user you are sending *TO*

request body example:
```
{
	"message": "your message",
	"usernameFrom": "grailed" // user must exist (the api will validate this)
}
```

# Things to note
- There are two test users by default (which you can use): `evanjhopkins` and `grailed`
