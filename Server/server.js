const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.listen(5000);
