const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const mysql = require('mysql');
const conn = mysql.createConnection({
    host : process.env.DATA_BASE_HOST,
    user : process.env.DATA_BASE_USER,
    password : process.env.DATA_BASE_PASSWORD,
    database : process.env.DATA_BASE_NAME,
    dialectOptions: {
        insecureAuth: true
    }
});
conn.connect( (err) => {
    if (err) console.log('Database error');
    else console.log('Database connected');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.post('/api/login', async (req, res, next) => 
{
  // req.body = { email : String, password : String }
  // res.text = { firstName : String, lastName : String, error : String }

    let err = '';
    const { email, password } = req.body;
    let fn = '';
    let ln = '';

    if ( email === 'stacey@email.com' && password === 'Test' )
    {
        fn = 'Stacey';
        ln = 'Dale';
    } else {
        err = 'Invalid user name/password';
    }

    let response = { firstName:fn,lastName:ln, error:err };
    console.log(response);
    res.status(200).json(response);
});

app.post('/api/signup', async (req, res) => 
{
    // let firstName = req.body.fName;
    // let lastName = req.body.lName;
    // let password = req.body.password;
    // let email = req.body.email;
     let radioValue = req.body.radioValue;
    // let sql;
    // if (radioValue == 0) {
    //     sql = `INSERT INTO SuperAdmins (sa_firstName, sa_lastName, sa_password, sa_email)
    //     VALUES (${firstName}, ${lastName}, ${password}, ${email});`;
        
    // }
    // else {
    //     sql = `INSERT INTO Students (s_firstName, s_lastName, s_password, s_email)
    //     VALUES (${firstName}, ${lastName}, ${password}, ${email});`;
    // }
    // conn.query(sql, (error, result) => {
    //     if (error) {
    //         let response = {msg: error};
    //         res.status(200).json(response);
    //     }
    //     else {
    //         let response = {msg: "Signed Up!"};
    //         res.status(200).json(response);
    //     }
    // });
    if (radioValue == 1){
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.GOOGLE_GEOCODE_API_KEY}`;
        let response = await fetch(url);
        let json = await response.json();
        //console.log(json);
        //res.status(200).json(json);
        let lat = json.results[0].geometry.location.lat;
        let lng = json.results[0].geometry.location.lng;
        let address = json.results[0].formatted_address;
        let result = {address : address, longitude : lng, lattitude : lat};
        res.status(200).json(result);
        console.log(result);    
    }
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listenning on port ${port}`);
});
