# Node Express Server Boilerplate
This is a node server with express for performing CRUD operations. Mongoose is being used as the database.

## Features Implemented
Some basic features have already been implemented:
- Basic mongoose model for **User**
- User Registrartion and Login
- Validation and sanatization using `express-validator`
- Error Handling middleware
- Pre-enabled cors
- Authorization middleware for JWT token authentication in `middleware/auth.js`

## Node Version Used
```
$ node -v
v16.16.0
$ npm -v
v8.15.0
```

## Setup
After cloning the repo run the following command to install all the dependencies:

```
$ npm install
```

<b>Note:</b> Make sure that mongoDB is installed and running if you are going to use local database.

By default, the app will start on port 5000 using the `local` environment. For overriding the default environment, run the below commands using the <environment\> from `local`/`dev`/`live`.
```
$ set NODE_ENV=<environment>
```
For overriding the default port just provide a port number as an environment variable before running `npm start` 
```
$ set PORT=<port_number>
```
After the dependencies have been installed successfully and the environment variables have been set, run the following command to start the application:
```
$ node index.js
```

### Changing Environment Variables
Make your way to `src/EnvConfigs/<environment>.js` and change the environment variables according to your needs.

#### Database
You can easily change the MongoDB URI by changing the value of the database key for the local variable in the `src/EnvConfigs/<environment>.js` file for your environment.