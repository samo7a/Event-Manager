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
    },
    multipleStatements: true
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

app.post(
    '/api/login', 
    async (req, res, next) => {
        // req.body = { email : String, password : String }
        // res.text = { userId: Int, firstName : String, lastName : String, msg : String }

        let err = '';
        const { email, password, loginType } = req.body;
        let id = -1;
        let fn = '';
        let ln = '';
        let l_email = '';
        let pic = '';
        let sql;
        let response;

        if (loginType) {
            sql = `SELECT sa_id, sa_firstName, sa_lastName, sa_email, sa_profilePicture FROM SuperAdmins WHERE sa_email="${email}" AND sa_password="${password}"`;

            conn.query(sql, (error, result) => {
                console.log(result.length);
                if (error) {
                    response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: error.sqlMessage};
                    res.status(401).json(response);
                    return;
                } else if (result.length > 0) {
                    id = result[0].sa_id;
                    fn = result[0].sa_firstName;
                    ln = result[0].sa_lastName;
                    l_email = result[0].sa_email;
                    pic = result[0].sa_profilePicture;
                    response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: '' };
                    res.status(200).json(response);
                    return;
                } else {
                    response = { userId: id, firstName: fn, lastName: ln, email: l_email, picture: pic, msg: 'You best check yourself'};
                    res.status(401).json(response);
                    return;
                }
            })
        } else {
            sql = `SELECT s_firstName, s_lastName, s_email, s_profilePicture FROM Students WHERE s_email="${email}" AND s_password="${password}"`;
            conn.query(sql, (error2, result2) => {
                console.log(result2);
                if (error2) {
                    response = {msg: error2.sqlMessage};
                    res.status(401).json(response);
                    return;
                } else if (result2.length > 0) {
                    id = result2[0].s_id;
                    fn = result2[0].s_firstName;
                    ln = result2[0].s_lastName;
                    l_email = result2[0].s_email;
                    pic = result2[0].s_profilePicture;
                    response = { firstName: fn, lastName: ln, email: l_email, picture: pic, msg: '' };
                    res.status(200).json(response);  
                    return;  
                } else {
                    response = { userId: id, firstName: fn, lastName: ln, email: l_email, picture: pic, msg: 'You best check yourself'};
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
    });

app.post('/api/signup', async (req, res) => {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let password = req.body.password;
    let email = req.body.email;
    let radioValue = req.body.regstrType;
    let universityName = req.body.university;
    let uniAddr1 = req.body.uniAddr1;
    let uniAddr2 = req.body.uniAddr2;
    let state = req.body.state;
    let zip = req.body.zip;

    if (radioValue) { // true = student , false = super admin
        conn.beginTransaction( async function(err) {
            if (err) { 
                return res.status(401).json({msg: err});
            }
            let sql1 = `SELECT u_id FROM Universities WHERE u_name = "${universityName}";`;
            let u_id;
            conn.query(sql1, async function (error, results) {
                if (error || results.length === 0) {
                    return conn.rollback(function() {
                        return res.status(401).json({msg: error});
                    });
                }
                u_id = results[0].u_id;
                //console.log(JSON.stringify(results));
                let sql2 = `INSERT INTO Students (s_firstName, s_lastName, s_password, s_email, u_id)
                    VALUES ("${firstName}", "${lastName}", "${password}", "${email}",${u_id});`;
                conn.query(sql2, async function (error2, results2) {
                    if (error2) {
                    return conn.rollback(function() {
                        return res.status(401).json({msg: error2});
                    });
                    }
                    conn.commit(async function(error3) {
                        if (error3) {
                            return conn.rollback(function() {
                                return res.status(401).json({msg: error3});
                            }); 
                        } 
                        else {
                            let response = {msg: "Student Signed Up!"};
                            return res.status(200).json(response);
                        }
                    }); 
                }); 
            });
        });
    } else {
        conn.beginTransaction( async function(err) {
            if (err) { 
                return res.status(401).json({msg: err}); 
            }
            let sql1 = `INSERT INTO SuperAdmins (sa_firstName, sa_lastName, sa_password, sa_email)
            VALUES ("${firstName}", "${lastName}", "${password}", "${email}");`;
            let sa_id;
            conn.query(sql1, async function (error, results) {
                if (error) {
                    return conn.rollback(function() {
                        return res.status(401).json({msg: error});
                    });
                }
                sa_id = results.insertId;
                let address = uniAddr1 + " " + uniAddr2 + ", " + state + ", " +  zip;
                let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`;
                let googleResponse =  await fetch(url);
                let googleJson = await googleResponse.json();
                let lat = googleJson.results[0].geometry.location.lat;
                let lng = googleJson.results[0].geometry.location.lng;
                let sql2 = `INSERT INTO Universities (u_name, u_noOfStudents, u_description, locationName, latitude, longitude)
                VALUES ("${universityName}", 0, " ", "${universityName}", ${lat}, ${lng});`;
                let u_id;
                conn.query(sql2, async function (error2, results2) {
                    if (error2) {
                    return conn.rollback(function() {
                        return res.status(401).json({msg: error2}); 
                    });
                    }
                    u_id = results.insertId;
                    let sql3 = `INSERT INTO CreatesUniversities (u_id, sa_id)
                    VALUES (${u_id}, ${sa_id});`;
                    conn.query(sql3, async function (error3, results3) {
                        if (error) {
                        return conn.rollback(function() {
                            return res.status(401).json({msg: error}); 
                        });
                        }
                        conn.commit( async function(error4) {
                            if (error4) {
                                return conn.rollback(function() {
                                    return res.status(401).json({msg: error4}); 
                                }); 
                            } 
                            else {
                                let response = {msg: "Super Admin Signed Up!"};
                                return res.status(200).json(response);
                                
                            }
                        }); 
                    });
                }); 
            });
        });
    }
});

app.post(
    '/api/updateRating',
    async (req, res) => 
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
        
    });

app.post(
    '/api/addComment',
    async (req, res) => 
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
    });

app.post(
    '/api/updateComment',
    async (req, res) => 
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
    });

app.post(
    '/api/deleteComment',
    async (req, res) => 
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
    });

app.post(
    '/api/createEventRso',
    async (req, res) => 
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
                let response = { msg: error.sqlMessage};
                res.status(200).json(response);
            }
            else {
                let e_id = result.insertId;
                sql = `INSERT INTO Hosts (e_id, rso_id) VALUES (${e_id}, ${rso_id});`;
                conn.query(sql,  (error1, result1) => {
                    if (error1){
                        let response = {msg: error1.sqlMessage};
                        res.status(200).json(response);
                    }
                    else {
                        let response = {msg: "Event Added", e_id: e_id };
                        res.status(200).json(response);
                    }
                });
            }
        });
        
    });
 
app.post(
    '/api/createEventStudent',
    async (req, res) => 
    {   
        let s_id = req.body.s_id;
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
                let response = { msg: error}.sqlMessage;
                res.status(200).json(response);
            }
            else {
                let e_id = result.insertId;
                sql = `INSERT INTO CreateEvents (e_id, s_id) VALUES (${e_id}, ${s_id});`;
                conn.query(sql,  (error1, result1) => {
                    if (error1){
                        let response = {msg: error1.sqlMessage};
                        res.status(200).json(response);
                    }
                    else {
                        let response = {msg: "Event Added", e_id: e_id };
                        res.status(200).json(response);
                    }
                });
            }
        });
    });
app.post(
    '/api/createRso',
    async (req, res) => 
    {   
        let rso_name = req.body.rso_name;
        let rso_description = req.body.rso_description;
        let rso_profilePicture = req.body.rso_profilePicture;
        let s_id = req.body.s_id;
        //TODO: ask the team.
        // let s_id1 = req.body.s_id1;
        // let s_id12 = req.body.s_id2;
        // let s_id3 = req.body.s_id3;
        // let s_id4 = req.body.s_id4;
        let sql = `Insert into Rso (rso_name, rso_description, rso_profilePicture, s_id) values ("${rso_name}", "${rso_description}", "${rso_profilePicture}", ${s_id});`;
        conn.query(sql, (error, result) => {
            if (error){
                let response = {msg: error.sqlMessage};
                res.status(200).json(response);
            }
            else {
                let rso_id = result.insertId;
                let response = {msg: "Rso Created", rso_id : rso_id};
                res.status(200).json(response);
            }
        });
    });
app.post(
    '/api/joinRso',
    async (req, res) => 
    {   let s_id = req.body.s_id;
        let rso_id = req.body.rso_id;
        
        let sql = `Insert into isAMember (rso_id, s_id) values (${rso_id}, ${s_id});`;
        conn.query(sql, (error, result) => {
            if (error){
                let response = {msg: error.sqlMessage};
                res.status(200).json(response);
            }
            else {
                let response = {msg: "joined", rso_id : rso_id};
                res.status(200).json(response);
            }
        });
    });
app.post(
    '/api/updateUniversity',
    async (req, res) => 
    {   let u_id = req.body.u_id;
        let universityName = req.body.universityName;
        let uniAddr1 = req.body.uniAddr1;
        let uniAddr2 = req.body.uniAddr2;
        let state = req.body.state;
        let zip = req.body.zip;
        let address = uniAddr1 + " " + uniAddr2 + ", " + state + ", " +  zip;
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`;
        let googleResponse =  await fetch(url);
        let googleJson = await googleResponse.json();
        let lat = googleJson.results[0].geometry.location.lat;
        let lng = googleJson.results[0].geometry.location.lng;
        let u_description = req.body.u_description;
        let u_profilePicture = req.body.u_profilePicture;
        let sql = `UPDATE Universities SET u_name = "${universityName}", u_description = ${u_description}, locationName = "${universityName}",
                    latitude = ${lat}, longitude = , ${lng}, u_profilePicture = ${u_profilePicture} WHERE u_id = ${u_id};`;
        conn.query(sql, (error, result) => {
            if (error){
                let response = {msg: error.sqlMessage};
                res.status(200).json(response);
            }
            else {
                let response = {msg: "University Updated"};
                res.status(200).json(response);
            }
        });
    });
    app.post(
        '/api/updateAccount',
        async (req, res) => 
        {
            let id = req.body.id;
            let firstName = req.body.fName;
            let lastName = req.body.lName;
            let email = req.body.email;
            let radioValue = req.body.regstrType;
            let profilePicture = req.body.profilePicture;
            let sql;
    
            if (radioValue){
                sql = `UPDATE Students SET s_firstName = ${firstName}, s_lastName = ${lastName}, s_email = ${email}, s_profilePicture = ${profilePicture}
                WHERE s_id = ${id};`;    
            }
            else {
                sql = `UPDATE SuperAdmins SET sa_firstName = ${firstName}, sa_lastName = ${lastName}, sa_email = ${email}, sa_profilePicture = ${profilePicture}
                WHERE sa_id = ${id};`;                  
            }
            conn.query(sql, async (error, result) => {
                if (error){
                    let response = { msg: error.sqlMessage};
                    res.status(200).json(response);
                }
                else {
                    let response = { msg: "Account Updated"};
                    res.status(200).json(response);
                }
            });
        });
app.post('/api/updateRso', (res, req) => {

});
app.post('/api/updateEvent', (res, req) => {

});
app.post(
    '/api/leaveRso',
    async (req, res) => 
    {   let s_id = req.body.s_id;
        let rso_id = req.body.rso_id;
        
        let sql = `Delete from isAMember (rso_id, s_id) values (${rso_id}, ${s_id});`;
        conn.query(sql, (error, result) => {
            if (error){
                let response = {msg: error.sqlMessage};
                res.status(200).json(response);
            }
            else {
                let response = {msg: "joined", rso_id : rso_id};
                res.status(200).json(response);
            }
        });
    });
 
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listenning on port ${port}`);
});

