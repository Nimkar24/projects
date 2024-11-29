// script3 - Signup Insertion Script

var express = require('express');

var router = express.Router();
//handle different types of requests (like GET, POST, PUT, DELETE, etc.)

var mongoDbRef = require("../routes/common/getMongoConnection");
const bcrypt = require('bcrypt');



// router.post('/new/userSignup', function(req, res) {
// });

//OR

/* POST request for user signup     // Handle POST request for user signup */
router.post('/', function(req, res) {
    var responseObj = {};
    var userData = req.body;
    
    // Hash the password before saving
    userData.password = bcrypt.hashSync(userData.password, 5);
    console.log("Prepared User Data for Signup:", userData);
    
    mongoDbRef.getMongoDbRef(userData, 'insert', 'useraccountdetails')
        .then((result) => {
            console.log("MongoDB Insert Result:", result);
            responseObj.msg = 'Success';
            res.send(JSON.stringify(responseObj));
        })
        .catch((err) => {
            console.error("Error in MongoDB insert operation:", err);
            responseObj.msg = 'Error';
            res.status(500).send(JSON.stringify(responseObj));
        });
});

module.exports = router;
