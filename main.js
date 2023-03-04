const express = require('express');
const bp = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public")); // to use static files like css, images, etc.
app.use(bp.urlencoded({extended: true})); // to use body-parser to get the data from the form in the html file
 

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
    let data = {
        members: [ 
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    let jsonData = JSON.stringify(data); // to convert the data to json format
    const url = "https://us21.api.mailchimp.com/3.0/lists/365bc5011f"; //mailchimp api url
    const options= { 
        url:'https://us21.api.mailchimp.com/3.0/365bc5011f',
        method: "POST",
        headers:{
            Authorization:'saddan:896eff4514a8d50b1d33a9e4b39343f6-us21'
        },
        body:jsonData
    }

    const request = https.request(url, options, (response)=>{// to send the data to mailchimp api
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData); // to write the data to the mailchimp api
    request.end(); // to end the request

    })

/* Here is the explanation for the code above:
1. First we require the modules: express, body-parser, request and https.
2. We create an instance of express and assign it to a variable called app.
3. We use the app.use method to use static files like css, images, etc. and we use the body-parser to get the data from the form in the html file.
4. We use the app.listen method to listen to port 3000.
5. We use the app.get method to get the home page (index.html).
6. We use the app.post method to post the data from the form and we use the req.body to get the data from the form.
7. We create a variable called url and give it the url of the mailchimp api.
8. We create a variable called options and give it the method, auth and body properties.
9. We create a variable called jsonData and give it the value of the data converted to json format.
10. We use the https.request method to send the data to the mailchimp api.
11. We use the requested.write method to write the data to the mailchimp api.
12. We use the requested.end method to end the request. */



//f8b373ac5242cb9e01fe3227b41e3416-us21

//365bc5011f