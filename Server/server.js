const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const { Router } = require("express");
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
const router = Router();

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
app.use(`/api`, router);

router.use(cors());
router.use(bodyparser.json());

router.post(
    '/login', 
    wrapAsync (async (req, res, next) => {
        // req.body = { email : String, password : String }
        // res.text = { firstName : String, lastName : String, msg : String }

        let err = '';
        const { email, password, loginType } = req.body;
        let fn = '';
        let ln = '';
        let l_email = '';
        let pic = '';
        let sql;
        let response;

        if (loginType) {
            sql = `SELECT sa_firstName, sa_lastName, sa_email, sa_profilePicture FROM SuperAdmins WHERE sa_email="${email}" AND sa_password="${password}"`;

            conn.query(sql, (error, result) => {
                console.log(result.length);
                if (error) {
                    response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: error};
                    res.status(401).json(response);
                    return;
                } else if (result.length > 0) {
                    fn = result[0].sa_firstName;
                    ln = result[0].sa_lastName;
                    l_email = result[0].sa_email;
                    pic = result[0].sa_profilePicture;
                    response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: '' };
                    res.status(200).json(response);
                    return;
                } else {
                    response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: 'You best check yourself'};
                    res.status(401).json(response);
                    return;
                }
            })
        } else {
            sql = `SELECT s_firstName, s_lastName, s_email, s_profilePicture FROM Students WHERE s_email="${email}" AND s_password="${password}"`;
            conn.query(sql, (error2, result2) => {
                console.log(result2);
                if (error2) {
                    response = {msg: error2};
                    res.status(401).json(response);
                    return;
                } else if (result2.length > 0) {
                    console.log(result2);
                    console.log(result2[0].s_firstName);
                    fn = result2[0].s_firstName;
                    ln = result2[0].s_lastName;
                    l_email = result2[0].s_email;
                    pic = result2[0].s_profilePicture;
                    response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: '' };
                    res.status(200).json(response);  
                    return;  
                } else {
                    response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: 'You best check yourself'};
                    res.status(401).json(response);
                    return;
                }
            })
        }

        // sql = `SELECT sa_firstName, sa_lastName, sa_email, sa_profilePicture FROM SuperAdmins WHERE sa_email="${email}" AND sa_password="${password}"`;

        // conn.query(sql, (error, result) => {
        //     console.log(result.length);
        //     if (error) {
        //         response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: error};
        //         res.status(401).json(response);
        //         return;
        //     } else if (result.length > 0) {
        //         fn = result[0].sa_firstName;
        //         ln = result[0].sa_lastName;
        //         l_email = result[0].sa_email;
        //         pic = result[0].sa_profilePicture;
        //         response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: '' };
        //         res.status(200).json(response);
        //         return;
        //     } else {
        //         sql = `SELECT s_firstName, s_lastName, s_email, s_profilePicture FROM Students WHERE s_email="${email}" AND s_password="${password}"`;
        //         conn.query(sql, (error2, result2) => {
        //             console.log(result2);
        //             if (error2) {
        //                 response = {msg: error2};
        //                 res.status(401).json(response);
        //                 return;
        //             } else if (result2.length > 0) {
        //                 console.log(result2);
        //                 console.log(result2[0].s_firstName);
        //                 fn = result2[0].s_firstName;
        //                 ln = result2[0].s_lastName;
        //                 l_email = result2[0].s_email;
        //                 pic = result2[0].s_profilePicture;
        //                 response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: '' };
        //                 res.status(200).json(response);  
        //                 return;  
        //             } else {
        //                 response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: 'You best check yourself'};
        //                 res.status(401).json(response);
        //                 return;
        //             }
        //         })
        //     }
        // })
        //console.log(response);
        //res.status(200).json(response);
    })
);

router.post(
    '/signup',
    wrapAsync( async (req, res) => 
    {
        let firstName = req.body.fName;
        let lastName = req.body.lName;
        let password = req.body.password;
        let email = req.body.email;
        let radioValue = req.body.userType;
        let universityName = req.body.university;
        let uniAddr1 = req.body.uniAddr1;
        let uniAddr2 = req.body.uniAddr2;
        let state = req.body.state;
        let zip = req.body.zip;

        if (radioValue === "false"){


            let sql = `SELECT u_id FROM Universities WHERE u_name = "${universityName}";`;
            conn.query(sql, async (error, result) => {
                if (error) {
                    let response = { msg: error.sqlMessage};
                    res.status(401).json(response);
                } else  {
                    let u_id = result[0].u_id;
                    sql = `INSERT INTO Students (s_firstName, s_lastName, s_password, s_email, u_id)
                    VALUES ("${firstName}", "${lastName}", "${password}", "${email}",${u_id});`;
                    conn.query(sql, async (error2, result2) => {
                        if (error2){
                            let response = {msg: error2.sqlMessage};
                            res.status(401).json(response);
                            return;
                        }
                        else {
                            let response = {msg: "Signed Up Student!"};
                            res.status(200).json(response);
                            return;
                        }
                    });
                }
            });


        }
        else {


            let sql = `INSERT INTO SuperAdmins (sa_firstName, sa_lastName, sa_password, sa_email)
            VALUES ("${firstName}", "${lastName}", "${password}", "${email}");`;
            conn.query(sql, async (error, result) => {
                if (error){
                    let response = { msg: error.sqlMessage};
                    res.status(200).json(response);
                    return;
                }
                else {
                    let sa_id = result.insertId;
                    let address = uniAddr1 + " " + uniAddr2 + ", " + state + ", " +  zip;
                    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`;
                    let googleResponse =  await fetch(url);
                    let googleJson = await googleResponse.json();
                    let lat = googleJson.results[0].geometry.location.lat;
                    let lng = googleJson.results[0].geometry.location.lng;
                    sql = `INSERT INTO Universities (u_name, u_noOfStudents, u_description, locationName, latitude, longitude)
                    VALUES ("${universityName}", 0, " ", "${universityName}", ${lat}, ${lng});`;
                    conn.query(sql, (error2, result2) => {
                        if (error2) {
                            let response = {msg: error2.sqlMessage};
                            res.status(200).json(response);
                            return;
                        }
                        else {
                            let u_id = result2.insertId;
                            sql = `INSERT INTO CreatesUniversities (u_id, sa_id)
                            VALUES (${u_id}, ${sa_id});`;
                            conn.query(sql, async (error3, result3) => {
                                if (error3) {
                                    let response = {msg: error3.sqlMessage};
                                    res.status(200).json(response);
                                    return;
                                }
                                else {
                                    let response = {msg: "Signed Up Super Admin!"};
                                    res.status(200).json(response);
                                    return;
                                }
                            });
                        }
                    });
                }
            });
        }
    })
);
 
router.post(
    '/addRating',
    wrapAsync( async (req, res) => 
    {
        let e_id = req.body.e_id;
        let s_id = req.body.s_id;
        let rating= req.body.rating;
        let sql = `INSERT INTO Rates (e_id, s_id, rating) VALUES (${e_id}, ${s_id}, ${rating});`;

        conn.query(sql, async (error, result) => {
            if (error){
                let response = {msg: error};
                res.status(200).json(response);
            }
            else {
                let response = {msg: "rating added"};
                res.status(200).json(response);
            }
        });
    })
);

router.post(
    '/updateRating',
    wrapAsync( async (req, res) => 
    {
    
        let e_id = req.body.e_id;
        let s_id = req.body.s_id;
        let rating= req.body.rating;
        let sql = `UPDATE Rates SET rating =  ${rating} WHERE e_id = ${e_id} AND s_id = ${s_id};`;
    
        conn.query(sql, async (error, result) => {
            if (error){
                let response = {msg: error.sqlMessage};
                res.status(200).json(response);
            }
            else {
                let response = {msg: "rating updated"};
                res.status(200).json(response);
            }
        });
        
    })
);

router.post(
    '/addComment',
    wrapAsync( async (req, res) => 
    {
        let e_id = req.body.e_id;
        let s_id = req.body.s_id;
        let comment= req.body.comment;
        let sql = `INSERT INTO Comments (e_id, s_id, comment) VALUES (${e_id}, ${s_id}, "${comment}");`;

        conn.query(sql, (error, result) => {
            if (error){
                let response = {msg: error.sqlMessage};
                res.status(200).json(response);
            }
            else {
                let response = {msg: "comment added"};
                res.status(200).json(response);
            }
        });
    })
);

router.post(
    '/updateComment',
    wrapAsync( async (req, res) => 
    {
        let e_id = req.body.e_id;
        let s_id = req.body.s_id;
        let comment= req.body.comment;
        let sql = `UPDATE Comments SET comment =  "${comment}" WHERE e_id = ${e_id} AND s_id = ${s_id};`;
        //let sql = `UPDATE Comments SET comment =  "${comment}" WHERE commentId = ${commnetId};`;
    
        conn.query(sql, (error, result) => {
            if (error){
                let response = {msg: error.sqlMessage};
                res.status(200).json(response);
            }
            else {
                let response = {msg: "comment updated"};
                res.status(200).json(response);
            }
        });
    })
);

router.post(
    '/deleteComment',
    wrapAsync( async (req, res) => 
    {
        let e_id = req.body.e_id;
        let s_id = req.body.s_id;
        let comment = req.body.comment;
        //depends on the data comming from the front end
        //let commentId = req.body.commentId;
        let sql = `DELETE FROM Comments WHERE e_id = ${e_id} AND s_id = ${s_id} AND comment = "${comment}";`;
        //let sql = `DELETE FROM Comments WHERE commentId = ${commnetId};`;
    
        conn.query(sql, (error, result) => {
            if (error){
                let response = {msg: error.sqlMessage};
                res.status(200).json(response);
            }
            else {
                let response = {msg: "comment deleted"};
                res.status(200).json(response);
            }
        });
    })
);

router.post(
    '/createEvent',
    wrapAsync( async (req, res) => 
    {   
        let rso_id = req.body.rso_id;
        let e_name = req.body.e_name;
        let e_description = req.body.e_description;
        let e_contactPhone = req.body.e_contactPhone;
        let e_contactEmail = req.body.e_contactEmail;
        let e_type = req.body.e_type;
        let locationName = req.body.locationName;
        let address = req.body.address;
        let e_category = req.body.e_category;
        let e_time = req.body.e_time;
        let e_date = req.body.e_date;
        let e_profilePicture = req.body.e_profilePicture;
        let isApproved = req.body.isApproved;

        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`;
        let googleResponse =  await fetch(url);
        let googleJson = await googleResponse.json();
        let lat = googleJson.results[0].geometry.location.lat;
        let lng = googleJson.results[0].geometry.location.lng;
    
    
        let sql = `INSERT INTO Events (e_name, e_description, e_contactPhone, e_contactEmail, e_type, locationName, latitude, longitude, e_category, e_time, e_date, e_profilePicture, isApproved) VALUES ("${e_name}", "${e_description}", "${e_contactPhone}", "${e_contactEmail}", "${e_type}", "${locationName}", "${lat}", "${lng}", "${e_category}", "${e_time}", "${e_date}", "${e_profilePicture}", ${isApproved});`;
        conn.query(sql,  (error, result) => {
            if (error){
                let response = { msg: error};
                res.status(200).json(response);
            }
            else {
                let e_id = result.insertId;
                sql = `INSERT INTO Hosts (e_id, rso_id) VALUES (${e_id}, ${rso_id});`;
                conn.query(sql,  (error1, result1) => {
                    if (error1){
                        let response = {msg: error1};
                        res.status(200).json(response);
                    }
                    else {
                        let response = {msg: "Event Added"};
                        res.status(200).json(response);
                    }
                });
            }
        });
        
    })
);

router.post(
    '/createRso',
    wrapAsync( async (req, res) => 
    {   
        let rso_name = req.body.rso_name;
        let rso_description = req.body.rso_description;
        let rso_profilePicture = req.body.rso_profilePicture;
        let s_id = req.body.s_id;
        let sql = `Insert into Rso (rso_name, rso_description, rso_profilePicture, s_id) values ("${rso_name}", "${rso_description}", "${rso_profilePicture}", ${s_id});`;
        conn.query(sql, (error, result) => {
            if (error){
                let response = {msg: error.sqlMessage};
                res.status(200).json(response);
            }
            else {
                let response = {msg: "Rso Created"};
                res.status(200).json(response);
            }
        });
    })
);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listenning on port ${port}`);
});

function wrapAsync(fn) {
    return (req, res, next) => {
      fn(req, res, next).catch((error) => {
        console.log(error);
        res.status(500).send();
      });
    };
  }

