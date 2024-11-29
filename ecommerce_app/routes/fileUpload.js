var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require("path");

var file_path;
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/product_images/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, callback) {
        file_path = "userImage-" + Date.now() + path.extname(file.originalname);
        callback(null, file_path);
    }
});

var upload = multer({ storage: storage }).single('prodImage');

/* GET home page. */
router.post('/', function (req, res, next) {
    var resobj = {};
    upload(req, res, function (err) {
        if (err) {
            resobj.msg = "ERROR"
            console.log(err);
        } else {
            resobj.file_path = file_path;
            resobj.msg = 'success';
        }
        res.send(JSON.stringify(resobj));
    });
});

module.exports = router;