var express = require('express');
var router = express.Router();
var mongoDbRef = require("../routes/common/getMongoConnection");
var productDetails = {details:[]};
// var jwt = require("jsonwebtoken");

/* POST home page. */
router.post('/', function(req, res, next) {
    
    var userFilter = req.body;

    console.log("userFilter");
    console.log(userFilter);
    mongoDbRef.getMongoDbRef(userFilter, 'findProducts', 'productDetails').then((response) => {
        productDetails.details = response;
        res.send(JSON.stringify(productDetails));
    });



    // const authheader = req.headers['authorization'];
    // if (authheader) {
    //     var token = authheader.split(' ')[1];
    //     console.log(token);
    //     jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, details) => {
    //         if (err) {
    //             res.send(JSON.stringify({msg: 'Not authorized user'}));
    //         } else {
    //             mongoDbRef.getMongoDbRef(userFilter, 'findProducts', 'productDetails').then((response) => {
    //                 productDetails.details = response;
    //                 res.send(JSON.stringify(productDetails));
    //             });
    //         }
    //     })
    // } else {
    //     res.send(JSON.stringify({msg: 'Not authorized user'}));
    // }

    

});

module.exports = router;