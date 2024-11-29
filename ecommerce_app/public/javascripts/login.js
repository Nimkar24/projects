// var validToken = '';

var loginModal;
document.addEventListener("DOMContentLoaded", () => {
    loginModal = new bootstrap.Modal('#loginModal');
});

//-----------------------------------------------------Enter your name validation-----------------------------------------------------
function enterYourName(event) {
    const charCode = event.which || event.keyCode;
    const char = String.fromCharCode(charCode);
    const isValid = /^[a-zA-Z\s]$/.test(char);

    // Allow the character if it is a letter, number, or space; prevent otherwise
    if (!isValid) {
        event.preventDefault();
    }
}

//-----------------------------------------------------user name validation-----------------------------------------------------
const validateInput = (event) => {
    // Regular expression for allowed characters (lowercase letters, numbers, and underscore)
    const allowedKeys = /^[a-z0-9_]$/;

    // Check if the pressed key is valid
    if (!allowedKeys.test(event.key) && event.key !== "Backspace") {
        event.preventDefault(); // Prevent entering invalid characters
    }
}

const checkMinLength = () => {
    const userName = document.getElementById('signup_user_name').value;
    if (userName.length < 4) {
        alert("Username must be at least 4 characters long.");
        document.getElementById('signup_user_name').value = ''; // Clear the input field
    }
}

//-----------------------------------------------------password validation-----------------------------------------------------
function validatePassword() {
    const createPass = document.getElementById('createPass');
    const confirmPass = document.getElementById('confirmPass');
    const password = createPass.value;

    // Requirements
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&_~`\(\)\-=\+]/.test(password); // Includes specific special characters
    const isValidLength = password.length >= 8 && password.length <= 15;

    // Validate each condition
    if (!hasLowercase || !hasUppercase || !hasDigit || !hasSpecialChar || !isValidLength) {
        alert("Password must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, one number, and at least one special character.");
        createPass.value = '';
        confirmPass.value = '';
        return false;
    }

    // Check if the passwords match
    if (password !== confirmPass.value) {
        alert("Passwords do not match.");
        createPass.value = '';
        confirmPass.value = '';
        return false;
    }
    return true;
}




$(document).ready(function () {
    $("#togglePassword").on("click", function () {
        const passwordInput = $("#loginPassword");
        const eyeIcon = $("#eye-icon");

        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            eyeIcon.removeClass("bi-eye-fill").addClass("bi-eye-slash-fill");
        } else {
            passwordInput.attr("type", "password");
            eyeIcon.removeClass("bi-eye-slash-fill").addClass("bi-eye-fill");
        }
    });
});

$(document).ready(function () {
    // For Create Password
    $("#togglePasswordCreate").on("click", function () {
        const passwordInput = $("#createPass");
        const eyeIcon = $("#eye-icon-create");

        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");  // Show the password
            eyeIcon.removeClass("bi-eye-fill").addClass("bi-eye-slash-fill");  // Change icon to eye-slash
        } else {
            passwordInput.attr("type", "password");  // Hide the password
            eyeIcon.removeClass("bi-eye-slash-fill").addClass("bi-eye-fill");  // Change icon back to eye
        }
    });

    // For Confirm Password
    $("#togglePasswordConfirm").on("click", function () {
        const passwordInput = $("#confirmPass");
        const eyeIcon = $("#eye-icon-confirm");

        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");  // Show the password
            eyeIcon.removeClass("bi-eye-fill").addClass("bi-eye-slash-fill");  // Change icon to eye-slash
        } else {
            passwordInput.attr("type", "password");  // Hide the password
            eyeIcon.removeClass("bi-eye-slash-fill").addClass("bi-eye-fill");  // Change icon back to eye
        }
    });
});


//-----------------------------------------------------mobile number validation-----------------------------------------------------
// Function to validate key presses
function validateKey(event) {
    // Get the key code of the pressed key
    const keyCode = event.keyCode || event.which;

    // Allow only digits (0-9) and the Backspace key (key code 8)
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
        // If the key is not a number and not Backspace, prevent the default action
        event.preventDefault();
    }
}

// Function to validate the mobile number
var validateMobile = () => {
    var mobNumInput = document.getElementById("mobilenumber"); // Get the input element
    var mobileRegex = /^[0-9]{10}$/; // Regex to check input is exactly 10 digits

    // Validate mobile number format
    if (!mobileRegex.test(mobNumInput.value)) {
        alert("Mobile Number is invalid. Please enter a 10-digit number.");
        mobNumInput.value = ''; // Clear the input field if the mobile number is incorrect
    }
};

//-----------------------------------------------------email id validation-----------------------------------------------------
// Function to validate the email input
function validateEmail() {
    const emailField = document.getElementById("emailID");
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex for validating email format

    // Check if the email matches the regex
    if (!emailRegex.test(emailField.value)) {
        emailError.textContent = "Please enter a valid email address"; // Show error message
        emailError.style.display = "block"; // Display the error message
    } else {
        emailError.textContent = ""; // Clear error message
        emailError.style.display = "none"; // Hide the error message
    }
}


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   Validation End here   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


// Function to handle login validation and Remember me functionality
var validateLoginDetails = () => {
    var userData = {};
    userData.accountId = $("#loginUserId").val();
    userData.password = $("#loginPassword").val();

    // Clear previous error message
    $("#invalidMsg").text("");

    // POST request to validate credentials
    var apiUrl = '/validate/userCredentials';
    axios.post(apiUrl, userData).then((response) => {
        // console.log("response");
        console.log(response);
        // validToken = response.data.token;        
        if (response.data.msg === 'Invalid') {
            // Show the error message when credentials are invalid
            $("#invalidMsg").text("Invalid Credentials, Please Try Again!");
        } else if (response.data.msg === 'Success') {
            // Hide login block and show logout block
            $("#headerLoginBlock").hide();
            $("#headerLogoutBlock").show();

            // Hide the login modal
            loginModal.hide();

            // Load the product details page
            loadSeletedPage('pdetails');

            // Save login credentials to local storage if "Remember me" is checked
            if ($("#formCheck").is(":checked")) {
                localStorage.setItem("savedUserId", userData.accountId);
                localStorage.setItem("savedPassword", userData.password);
            } else {
                // Clear local storage if "Remember me" is not checked
                localStorage.removeItem("savedUserId");
                localStorage.removeItem("savedPassword");
            }
        }
    }).catch((err) => {
        // console.error(err);
        // In case of error, display a generic error message
        $("#invalidMsg").text("An error occurred, please try again.");
    });
};




// Function to pre-fill login credentials if saved in local storage
function prefillLoginData() {
    var savedUserId = localStorage.getItem("savedUserId");
    var savedPassword = localStorage.getItem("savedPassword");

    if (savedUserId && savedPassword) {
        $("#loginUserId").val(savedUserId);
        $("#loginPassword").val(savedPassword);
        $("#formCheck").prop("checked", true); // Check "Remember me" box if data is loaded
    }
}

// Call prefillLoginData when the login modal opens
$(document).ready(function () {
    // Attach prefillLoginData to show.bs.modal event for the login modal
    $('#loginModal').on('show.bs.modal', function () {
        prefillLoginData();
    });
});