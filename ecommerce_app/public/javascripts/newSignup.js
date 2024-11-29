// script2 - Signup Function
function signupNewUser() {
    if (!validatePassword()) return; // Prevent signup if validation fails

    var userDetails = {
        userName: $("#signup_your_name").val(),
        accountId: $("#signup_user_name").val(),
        password: $("#createPass").val(),
        mobile: $("#mobilenumber").val(),
        emailId: $("#emailID").val(),
    };
    console.log("User Details for Signup:", userDetails);

    axios.post("/new/userSignup", userDetails)
        .then((result) => {
            resetSignupFields();
            if (result.data.msg === "Success") {
                alert("Your account has been created successfully. Please log in.");
            } else {
                alert("There was an error during signup. Please try again.");
            }
        })
        .catch((err) => {
            console.error("Signup Error:", err);
            alert("An error occurred while processing your request.");
        });
}

function resetSignupFields() {
    $("#signup_your_name").val('');
    $("#signup_user_name").val('');
    $("#createPass").val('');
    $("#confirmPass").val('');
    $("#mobilenumber").val('');
    $("#emailID").val('');
}