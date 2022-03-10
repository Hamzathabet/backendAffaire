const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./user.js');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

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

const UserRoutes = express.Router();


app.use('/user', UserRoutes);


UserRoutes.route('/').get(function(req, res) {
    User.find(function(err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
});

UserRoutes.route('/:role').get(function(req, res) {
    User.find(User.role, function(err, user) {
       
           res.json(user) ;
        
    });
});
/* add user */
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