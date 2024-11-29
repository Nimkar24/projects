var express = require('express');
var router = express.Router();

const process = require('node:process');          /* I comment it on 14/11/24 */

/* GET home page. */
router.get('/', function (req, res, next) {

    console.log("Checked valid user credentials has responded from process " + process.pid)     /* I comment it on 14/11/24 */

    res.send(JSON.stringify({ isUserLoggedIn: req.session.isLoggedinUser }))
});

module.exports = router;
