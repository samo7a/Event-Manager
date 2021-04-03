const express = require('express');
const fileUpload = require('express-fileupload');
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

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
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

app.post('/api/uploadUniPic', async (req, res, next) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;
    const { id } = req.body;

    file.mv(`${__dirname}/../frontend/public/src/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        const fp = `/uploads/${file.name}`;
        let sql = `UPDATE Universities SET u_profilePicture = ${fp} WHERE u_id=(SELECT u_id FROM createsUniversity WHERE sa_id=${id})`

        conn.query(sql, error => {
            if (error) {
                return res.status(500).json( {msg: error, fileName: file.name, filePath: fp });
            } else {
                return res.status(200).json( {fileName: file.name, filePath: fp });
            }
        });
    })
})

app.post('/api/login', async (req, res, next) => {
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
    });

app.post('/api/signup', async (req, res) => {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let password = req.body.password;
    let email = req.body.email;
    let regstrType = req.body.regstrType;
    let universityName = req.body.university;
    let uniAddr1 = req.body.uniAddr1;
    let uniAddr2 = req.body.uniAddr2;
    let state = req.body.state;
    let zip = req.body.zip;

    if (!regstrType) { // false = student , true = super admin
        conn.beginTransaction( async function(err) {
            if (err) { 
                return res.status(401).json({msg: err.sqlMessage});
            }
            let sql1 = `SELECT u_id FROM Universities WHERE u_name = "${universityName}";`;
            let u_id;
            conn.query(sql1, async function (error, results) {
                if (error || results.length === 0) {
                    return conn.rollback(function() {
                        return res.status(401).json({msg: error.sqlMessage});
                    });
                }
                u_id = results[0].u_id;
                //console.log(JSON.stringify(results));
                let sql2 = `INSERT INTO Students (s_firstName, s_lastName, s_password, s_email, u_id)
                    VALUES ("${firstName}", "${lastName}", "${password}", "${email}",${u_id});`;
                conn.query(sql2, async function (error2, results2) {
                    if (error2) {
                    return conn.rollback(function() {
                        return res.status(401).json({msg: error2.sqlMessage});
                    });
                    }
                    conn.commit(async function(error3) {
                        if (error3) {
                            return conn.rollback(function() {
                                return res.status(401).json({msg: error3.sqlMessage});
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
                return res.status(401).json({msg: err.sqlMessage}); 
            }
            let sql1 = `INSERT INTO SuperAdmins (sa_firstName, sa_lastName, sa_password, sa_email)
            VALUES ("${firstName}", "${lastName}", "${password}", "${email}");`;
            let sa_id;
            conn.query(sql1, async function (error, results) {
                if (error) {
                    return conn.rollback(function() {
                        return res.status(401).json({msg: error.sqlMessage});
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
                        return res.status(401).json({msg: error2.sqlMessage}); 
                    });
                    }
                    u_id = results.insertId;
                    let sql3 = `INSERT INTO CreatesUniversities (u_id, sa_id)
                    VALUES (${u_id}, ${sa_id});`;
                    conn.query(sql3, async function (error3, results3) {
                        if (error) {
                        return conn.rollback(function() {
                            return res.status(401).json({msg: error.sqlMessage}); 
                        });
                        }
                        conn.commit( async function(error4) {
                            if (error4) {
                                return conn.rollback(function() {
                                    return res.status(401).json({msg: error4.sqlMessage}); 
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

app.post('/api/updateRating', async (req, res) => {
    const {e_id, s_id, rating} = req.body;
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

app.post('/api/addComment', async (req, res) => {
    const {e_id, s_id, comment} = req.body;
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

app.post('/api/updateComment', async (req, res) => {
    const {commentId, e_id, s_id, comment} = req.body;
    let sql = `UPDATE Comments SET comment =  "${comment}" WHERE e_id = ${e_id} AND s_id = ${s_id} AND commentId = ${commentId};`;
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

app.post('/api/deleteComment', async (req, res) => {
    const {e_id, commentId} = req.body;
    // let s_id = req.body.s_id;
    // let comment = req.body.comment;
    //depends on the data comming from the front end
    //let sql = `DELETE FROM Comments WHERE e_id = ${e_id} AND s_id = ${s_id} AND comment = "${comment}";`;
    let sql = `DELETE FROM Comments WHERE commentId = ${commentId} AND e_id = ${e_id};`;

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

app.post('/api/createEventRso', async (req, res) => {  
    const {rso_id, e_name, e_description, e_contactPhone, e_contactEmail, e_type, locationName, address, e_category, e_time, e_date, e_profilePicture, isApproved} = req.body; 
    conn.beginTransaction(async function (err){
        if (err){
            return res.status(401).json({msg: err.sqlMessage});
        }

        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`;
        let googleResponse =  await fetch(url);
        let googleJson = await googleResponse.json();
        let lat = googleJson.results[0].geometry.location.lat;
        let lng = googleJson.results[0].geometry.location.lng;
        let sql = `INSERT INTO Events (e_name, e_description, e_contactPhone, e_contactEmail, 
            e_type, locationName, latitude, longitude, e_category, e_time, e_date, e_profilePicture, 
            isApproved) VALUES ("${e_name}", "${e_description}", "${e_contactPhone}", "${e_contactEmail}", 
            "${e_type}", "${locationName}", "${lat}", "${lng}", "${e_category}", "${e_time}", "${e_date}", 
            ${e_profilePicture}, ${isApproved});`;
        conn.query(sql, async function (error, results){
            if (error){
                return conn.rollback(function (){
                    return res.status(401).json({msg: error.sqlMessage});
                });
            }
            let e_id = results.insertId;
            sql = `INSERT INTO Hosts (e_id, rso_id) VALUES (${e_id}, ${rso_id});`;
            conn.query(sql, async function(error2, results2){
                if (error2){
                    return conn.rollback(function(){
                        return res.status(401).json({msg: error2.sqlMessage});
                    });
                }
                conn.commit (async function(error3){
                    if (error3){
                        return conn.rollback(function(){
                            return res.status(401).json({msg: error.sqlMessage});
                        });
                    }
                    return res.status(200).json({msg: "Event created"});
                });
            });
        });
    });
});
 
app.post('/api/createEventStudent', async (req, res) => { 
    const {s_id, e_name, e_description, e_contactPhone, e_contactEmail, e_type, locationName, address, e_category, e_time, e_date, e_profilePicture, isApproved} = req.body;
    conn.beginTransaction(async function(err) {
        if (err) {
            return res.status(401).json({msg: err.sqlMessage}); 
        }

        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`;
        let googleResponse =  await fetch(url);
        let googleJson = await googleResponse.json();
        let lat = googleJson.results[0].geometry.location.lat;
        let lng = googleJson.results[0].geometry.location.lng;
        let sql = `INSERT INTO Events (e_name, e_description, e_contactPhone, e_contactEmail, e_type, 
            locationName, latitude, longitude, e_category, e_time, e_date, e_profilePicture, isApproved) 
            VALUES ("${e_name}", "${e_description}", "${e_contactPhone}", "${e_contactEmail}", "${e_type}", 
            "${locationName}", "${lat}", "${lng}", "${e_category}", "${e_time}", "${e_date}", ${e_profilePicture}, ${isApproved});`;
        conn.query(sql, async function (error, results){
            if (error){
                return conn.rollback(function() {
                    return res.status(401).json({msg: error.sqlMessage});
                });
            }
            let e_id = results.insertId;
            sql = `INSERT INTO CreatesEvents (e_id, s_id) VALUES (${e_id}, ${s_id});`;
            conn.query(sql, async function (error2, results2){
                if (error2){
                    return conn.rollback(function(){
                        return res.status(401).json({msg : error2.sqlMessage});
                    });
                }
                conn.commit(async function (error3){
                    if (error3) {
                        return conn.rollback(function () {
                            return res.status(401).json({msg: error3.sqlMessage});
                        });
                    }
                    return res.status(200).json({msg: "Event Created!"});
                });
            });
        });
    });
});

app.post('/api/createRso', async (req, res) => {   
    const { rso_name, rso_description, rso_profilePicture, s_id } = req.body;
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
app.post('/api/joinRso', async (req, res) => { 
    const { s_id, rso_id } = req.body;
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
app.post('/api/leaveRso', async (req, res) => { 
    const { s_id, rso_id } = req.body;
    
    let sql = `Delete from isAMember Where rso_id = ${rso_id} AND  s_id = ${s_id};`;
    conn.query(sql, (error, result) => {
        if (error){
            let response = {msg: error.sqlMessage};
            res.status(200).json(response);
        }
        else {
            let response = {msg: "left", rso_id : rso_id};
            res.status(200).json(response);
        }
    });
});

app.post('/api/updateAccount', async (req, res) => {
    const { id, firstName, lastName, email, regstrType, profilePicture } = req.body;

    let sql;

    if (!regstrType){
        sql = `UPDATE Students SET s_firstName = "${firstName}", s_lastName = "${lastName}", s_email = "${email}", s_profilePicture = ${profilePicture}
        WHERE s_id = ${id};`;    
    }
    else {
        sql = `UPDATE SuperAdmins SET sa_firstName = "${firstName}", sa_lastName = "${lastName}", sa_email = "${email}", sa_profilePicture = ${profilePicture}
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
    let rso_name = req.body.rso_name;
    let rso_description = req.body.rso_description;
    let rso_profilePicture = req.body.rso_profilePicture;
    let rso_id = req.body.rso_id;
    let sql = `UPDATE Rso SET rso_name = "${rso_name}" , rso_description = "${rso_description}", rso_profilePicture = ${rso_profilePicture} WHERE rso_id = ${rso_id}`;
    conn.query(sql, async function (error) {
        if (error){
            return res.status(401).json({msg : error.sqlMessage});
        }
        return res.status(200).json({msg : "Rso Updated"});
    });


});
app.post('/api/updateEvent', (res, req) => {
    let e_id = req.body.e_id;
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


    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`;
    let googleResponse =  await fetch(url);
    let googleJson = await googleResponse.json();
    let lat = googleJson.results[0].geometry.location.lat;
    let lng = googleJson.results[0].geometry.location.lng;
    let sql = `Update Events SET e_name = "${e_name}", e_description = "${e_description}", e_contactPhone = "${e_contactPhone}",
        e_contactEmail = "${e_contactEmail}", e_type = "${e_type}", locationName = "${locationName}", 
        latitude = "${lat}", longitude = "${lng}", e_category = "${e_category}", e_time = "${e_time}", e_date "${e_date}",
         e_profilePicture = ${e_profilePicture} WHERE e_id = ${e_id};`;
    conn.query(sql, async function (error){
        if (error){
            return res.status(401).json({msg: error.sqlMessage});
        }
        return res.status(200).json({msg : "Event Updated"});
    });
});

app.post('/api/getUniversity', async (req, res) => {
    const {sa_id} = req.body;
    let sql = `SELECT u_name, u_noOfStudents, u_profilePicture, u_description, locationName, latitude, longitude FROM Universities WHERE u_id=(SELECT u_id FROM CreatesUniversities WHERE sa_id=${sa_id})`;
    conn.query(sql, (error, result) => {
        if (error){
            let response = {msg: error.sqlMessage};
            res.status(500).json(response);
        } else if (result.length == 0){
            let response = { msg: "You are not authorized, fool!"};
            res.status(404).json(response);
        } else {
            let u_name = result[0].u_name;
            let u_noOfStudents = result[0].u_noOfStudents;
            let u_profilePicture = result[0].u_profilePicture;
            let u_description = result[0].u_description;
            let locationName = result[0].locationName;
            let latitude = result[0].latitude;
            let longitude = result[0].longitude;
            let response = {u_name: u_name, u_noOfStudents: u_noOfStudents, u_profilePicture: u_profilePicture, u_description: u_description, locationName: locationName, latitude: latitude, longitude: longitude};
            res.status(200).json(response);
        }
    })
})
app.post('/api/updateUniversity', async (req, res) => {  
    const {u_id, universityName, uniAddr1, uniAddr2, state, zip, u_description, u_profilePicture} = req.body; 
    let address = uniAddr1 + " " + uniAddr2 + ", " + state + ", " +  zip;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`;
    let googleResponse =  await fetch(url);
    let googleJson = await googleResponse.json();
    let lat = googleJson.results[0].geometry.location.lat;
    let lng = googleJson.results[0].geometry.location.lng;
    let sql = `UPDATE Universities SET u_name = "${universityName}", u_description = "${u_description}", locationName = "${universityName}",
                latitude = ${lat}, longitude = ${lng}, u_profilePicture = ${u_profilePicture} WHERE u_id = ${u_id};`;
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

app.post('/api/approveEvent', async (req, res) => { 

});
 
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listenning on port ${port}`);
});

