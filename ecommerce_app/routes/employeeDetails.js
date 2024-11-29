var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var empDetails = [
        {
            name: 'Raj',
            age: 20,
            gender: 'MAle',
            location: 'Hyderabad',
            profilePic: 'https://imageio.forbes.com/specials-images/imageserve/6537dafe8772a8222e8108ae/Why-companies-should-prioritize-employee-health-and-happiness-in-2024/960x0.jpg?format=jpg&width=960'
        },
        {
            name: 'Krishna',
            age: 20,
            gender: 'MAle',
            location: 'Hyderabad',
            profilePic: 'https://imageio.forbes.com/specials-images/imageserve/6537dafe8772a8222e8108ae/Why-companies-should-prioritize-employee-health-and-happiness-in-2024/960x0.jpg?format=jpg&width=960'
        },
        {
            name: 'Krish',
            age: 20,
            gender: 'MAle',
            location: 'Hyderabad',
            profilePic: 'https://imageio.forbes.com/specials-images/imageserve/6537dafe8772a8222e8108ae/Why-companies-should-prioritize-employee-health-and-happiness-in-2024/960x0.jpg?format=jpg&width=960'
        },
        {
            name: 'Teena',
            age: 20,
            gender: 'MAle',
            location: 'Hyderabad',
            profilePic: 'https://imageio.forbes.com/specials-images/imageserve/6537dafe8772a8222e8108ae/Why-companies-should-prioritize-employee-health-and-happiness-in-2024/960x0.jpg?format=jpg&width=960'
        }
    ]
    // res.send(JSON.stringify(resObj));
    res.render("employeeDetails", { empDetails: empDetails });

});

module.exports = router;