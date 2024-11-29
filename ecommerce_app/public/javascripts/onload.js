var loadSeletedPage = (type) => {
    var templateUrl;
    switch(type) {
        case 'login':
            // Show login block and hide logout block when loading login page
            $("#headerLoginBlock").show();
            $("#headerLogoutBlock").hide();  // Hide logout block initially
            templateUrl = 'templates/login.htm';
            break;
        case 'pdetails':
            // Hide login block and show logout block after successful login
            $("#headerLoginBlock").hide();
            $("#headerLogoutBlock").show();
            templateUrl = 'templates/productDetails.htm';
            break;
    }

    axios.get(templateUrl).then((result) => {
        $("main").html(result.data);
        if (type == 'pdetails') {
            console.log("inside pdetails section");
            loadProductDetails(); // You may want to load your product details here
        }
    }).catch((err) => {
        console.error(err);
    });
};

// Call to load the login page initially
// loadSeletedPage('login');

var loadOnloadPage = () => {
    axios.get('/check/isValidSession').then((response) => {
        console.log(response);
        if (response.data.isUserLoggedIn) {
            loadSeletedPage('pdetails');
        } else {
            loadSeletedPage('login');
        }
    });
}
loadOnloadPage();

var logoutUserSession = () => {
    loadSeletedPage('login'); 
}

var logoutUser = () => {
    axios.get('/user/logout').then(() => {
        loadSeletedPage('login');
    })
}
