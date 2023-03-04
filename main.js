const express = require('express');
const bp = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public")); // to use static files like css, images, etc.
app.use(bp.urlencoded({extended: true})); // to use body-parser

app.listen(3000, ()=>[ // to listen to port 3000
    console.log('Server is running on port 3000')
])

app.get('/', (req, res)=>{ // to get the home page (index.html)
    res.sendFile(__dirname + '/signup.html');
    })

app.post('/', (req, res)=>{ // to post the data from the form
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    console.log(firstName, lastName, email);
    })