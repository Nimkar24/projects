// var express = require("express");
// var router = express.Router();
// var {MongoClient} = require("mongodb");
// const dbUrl = 'mongodb://localhost:27017';
// const mongoClient = new MongoClient(dbUrl);

// router.post('/', (req, res, next) => {
//     let responseObj = {};
//     getDbConnection(req.body).then((response) => {
//         if (!response.length) {
//             responseObj.msg = 'Invalid';
//         } else {
//             responseObj.msg = 'Valid details';
//         }
//         res.send(JSON.stringify(responseObj));
//     })
// });


// async function getDbConnection(userData) {
//     console.log("Use connect method to connect to the server");
//     await mongoClient.connect(); 
//     console.log('Connected successfully to server');

//     const db = mongoClient.db("eCommerceDb");
//     const collection = db.collection('useraccountdetails');

//     return collection.find({accountId: userData.accountId, password: userData.password}).toArray();
// }

// module.exports = router;






// --------combine mongo server connection for validateUserInput.js   &   newUserSignup.js --------

var express = require('express');
var router = express.Router();
var mongoDbRef = require("../routes/common/getMongoConnection");
const bcrypt = require('bcrypt');
// require("dotenv").config();
const process = require('node:process');          /* I comment it on 14/11/24 */
// var jwt = require("jsonwebtoken");

/* POST request to authenticate user */
router.post('/', function (req, res) {

    console.log("Validate user credentials has responded from process " + process.pid)    /* I comment it on 14/11/24 */

    var responseObj = {};
    var userData = req.body;
    console.log("Received User Data:", userData);

    // console.log("process env");
    // console.log(process.env);
    // var jsonToken = jwt.sign(req.body, process.env.ACCESS_JWT_SECRET);

    // Find the user in the database by accountId
    mongoDbRef.getMongoDbRef(userData, 'find', 'useraccountdetails')
        .then(async (result) => {
            if (result.length > 0) {
                // User found, now compare passwords
                const userInDb = result[0];
                const passwordMatch = await bcrypt.compare(userData.password, userInDb.password);

                if (passwordMatch) {
                    responseObj.msg = 'Success';  // Credentials are valid
                    req.session.isLoggedinUser = true;
                    // responseObj.token = jsonToken;
                } else {
                    responseObj.msg = 'Invalid';  // Password mismatch
                    // responseObj.info = 'PWD not matching';
                    req.session.isLoggedinUser = false;
                }
            } else {
                responseObj.msg = 'Invalid';  // User not found
                // responseObj.info = 'UId not found';
                // req.session.isLoggedinUser = false;
            }
            res.send(JSON.stringify(responseObj));
        })
        .catch((err) => {
            console.error("Error in MongoDB find operation:", err);
            responseObj.msg = 'Error';
            res.status(500).send(JSON.stringify(responseObj));
        });
});

module.exports = router;

