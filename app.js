const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoute = require('./routes/auth');
const privateRoute = require('./routes/privateRoutes');

//CONNECT TO DB
// mongoose.connect('mongodb+srv://487user:soen487@cluster0-8deyj.mongodb.net/usersDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
// 	console.log('Conneteto db !');
// });

mongoose.connect('mongodb://localhost:27017/parking-app', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log('Connected to db.');
});


// Middleware
app.use(express.json());
app.use(cors());

// Routes MIDDLEWARES
app.use('/api/user', authRoute);
app.use('/api/private', privateRoute);

//How to start listening to the server
app.listen(3000, () => console.log('Server is running on port 3000...'));