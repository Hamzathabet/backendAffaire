create folder backend
$npm init -y //added package.json

$npm install express body-parser cors mongoose

$npm install -g nodemon

$nodemon server // to start server
****************************************************************
// mongoose schema (class)
create user.js 

// create class
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String
    }
});

module.exports = mongoose.model('User', User);


****************************************************************


create server.js file


//init variable required

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./user.js');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

// link database to mongoose

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/affair', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

// create api routes
const UserRoutes = express.Router();

app.use('/user', UserRoutes);

// create apis

//list users
UserRoutes.route('/').get(function(req, res) {
    User.find(function(err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
});

// add user 
UserRoutes.route('/adduser').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(404).send('adding new user failed');
        });
});


