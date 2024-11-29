var express = require('express');
var router = express.Router();
var mongoDbRef = require("../routes/common/getMongoConnection");

/* GET home page. */
router.post('/', function (req, res, next) {
    console.log(req.body); 
    var resObj = {};
    mongoDbRef.getMongoDbRef(req.body, 'insert', 'productDetails').then((result) => {
        resObj.msg = 'success';
        res.send(JSON.stringify(resObj));
    });
});

module.exports = router;