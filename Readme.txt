How to run the client app -  
1. MongoDB - Install MongoDB and create a database and username password. 
2. Specify the MongoDB details like this at the .env folder in server root - 
	MONGODBURI = "mongodb://<username>:<password>@localhost:27017/<dbname>?authSource=admin".
	Specify the SCRETKEY too. This is used to sign and generate the JWT tokens. 
	SCRETKEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
3. Create an user at "dbname" database to log into the client app. 
	Generate a salt 10 password string from https://bcrypt-generator.com/ and create an user to log into client app
	Sample MongoDB command to create user -  
	db.users.insert( {username: "palash", email: "palash@xxxyyyyzz.com", password:"$2a$10$50WZFa2gfdsfdsdshfgsdhfgdshfdsfgfdsdU"} );
	You need to encrypt the password using salt 10 encryption and then log into the app by specifying your email and password( this is unencrypted password).
	
4. This application uses JWT authentication.

How to invoke backend REST API's which are secured by JWT auth token - 

1. You need to get the token by calling the login api - 
url - http://localhost:3000/api/auth/login | 
HTTP Method - POST  
Payload at the body - 
{
"email" : "palash@xxxyyyyzz.com", 
"password" : "<unencrypted password created at step-3 above" ( means - if you used "password" string to generate the encrypted password above, mention "password" here. )
} 

Reply ( example) - 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU0NTRjNTM1MzI2OGI1MGFjZGNkZjYiLCJpYXQiOjE3MTY4MDI3NjUsImV4cCI6MTcxNjgwNjM2NX0.PHHWULxUIPDSW8CW5a-Wfqybis3kga3LBKSagcdSxpM"
} 

2. The we can call all the other API's after setting the "Authorization" header and specifying the value as "Bearer <token>". 
3. Here are few of the API's used to generate this client application - 

a. Create a task - 
http://localhost:3000/api/tasks/  | POST 
{
 "title" : "Requirement Analysis",
  "description": "Perform detailed requirement analysis",
  "status": "To Do"
}


b) Update a task - 
http://localhost:3000/api/tasks/664eb96294dd80da63f85d8d | PUT 
Payload - 
{
"status": "Done"
}
or,
{
"description": "Perform detailed requirement analysis on May-23"
}


c) Get a task by its id - 
http://localhost:3000/api/tasks/664eb96294dd80da63f85d8d | GET 


d) Get all the tasks - 
http://localhost:3000/api/tasks/   | GET 


e)  Delete a task - 
http://localhost:3000/api/tasks/664ec27d94dd80da63f85d90 | DELETE 


How to run the code from Visual Studio Code IDE - 
1. Open Terminal inside VS Code.  
2. Start Server - npx ts-node src/app.ts
3. Server should run on port - 3000.
4. Client runs on port 4200. 
5. Go to client folder and run "ng serve" to start the client. 
6. Server app is the backend JWT based secure API server. 
7. Client app is the Angular JS client. 