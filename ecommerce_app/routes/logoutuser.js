var express = require('express');
var router = express.Router();

const process = require('node:process');         /* I comment it on 14/11/24 */

/* GET home page. */
router.get('/', function (req, res, next) {

    console.log("Logout user has responded from process " + process.pid)          /* I comment it on 14/11/24 */

    // delete req.session;
    req.session.destroy();
    res.send(JSON.stringify({ msg: 'success' }))
});

module.exports = router;
