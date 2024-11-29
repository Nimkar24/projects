var admissionFormTemplate = Handlebars.compile($("#admission-form-template").html());

//Check if any field is empty, if it found empty the admission form will not load
var checkEmptyFields = () => {
    var inputName = $("#sname").val();
    var inputAge = $("#sage").val();
    var inputTotalFees = $("#stotalfees").val();
    var inputSubject1 = $("#sub1").val();
    var inputSubject2 = $("#sub2").val();
    var inputSubject3 = $("#sub3").val();

    // Check if any field is empty using the correct variable names
    if (!inputName || !inputAge || !inputTotalFees || !inputSubject1 || !inputSubject2 || !inputSubject3) {
        alert("Please fill in all fields to load the admission form");
        return false; // Exit the function if any field is empty
    }
    return true; // Return true if all fields are filled
};

class StudentsDetails {
    constructor(sData) {
        this.csname = sData.name;
        this.csage = sData.age;
        this.csgender = sData.gender;
        this.cstotalfees = sData.totalfees;
        this.cssub1 = sData.sub1;
        this.cssub2 = sData.sub2;
        this.cssub3 = sData.sub3;
    }

    getTotalMarks() {
        this.totalMarks = (this.cssub1 + this.cssub2 + this.cssub3);
    }

    getPercentage() {
        this.percentage = (this.totalMarks / 300) * 100;
    }

    getDiscountOnFees() {
        this.discount = 0;
        if (this.csgender === 'Male') {
            if (this.percentage > 97) {
                this.discount = 100;
            }
            else if (this.percentage > 85) {
                this.discount = 50;
            }
            else if (this.percentage > 70) {
                this.discount = 30;
            }
            else if (this.percentage >= 55) {
                this.discount = 10;
            }
            else {
                this.discount = 0;
            }
        }
        else if (this.csgender === 'Female') {
            if (this.percentage > 98) {
                this.discount = 100;
            }
            else if (this.percentage >= 85) {
                this.discount = 60;
            }
            else if (this.percentage >= 70) {
                this.discount = 40;
            }
            else if (this.percentage >= 55) {
                this.discount = 20;
            }
            else {
                this.discount = 0;
            }
        }

        this.discountOnFees = (this.cstotalfees * this.discount) / 100;
        this.feesPaid = (this.cstotalfees - this.discountOnFees);
    }

    displayStudentDetails() {
        this.getTotalMarks();
        this.getPercentage();
        this.getDiscountOnFees();

        $("#dname").text(this.csname);
        $("#dage").text(this.csage + ' yrs');
        $("#dgender").text(this.csgender);
        $("#dtotalfees").text(this.cstotalfees + ' Rs');
        $("#dtotalmarks").text(this.totalMarks + ' marks');
        $("#dpercentage").text(this.percentage.toFixed(2) + '%');
        $("#discountonfees").text(this.discountOnFees + ' Rs, (' + this.discount + '% off)');
        $("#feestobepaid").text(this.feesPaid + ' Rs');

        if (this.csgender === 'Male') {
            $(".container2 img").attr({  // Male image
                "src": "raghav.png",
                "alt": "Image of " + this.csname
            });
        }
        else if (this.csgender === 'Female') {
            $(".container2 img").attr({  //Female image
                "src": "lina.png",
                "alt": "Image of " + this.csname
            });
        }
    }
}

let newStudent;
// Global variable to hold instances of StudentsDetails class
var studentFinalDetail = [];  // Array to hold multiple student data

// 1. Getting values from user input and creating instance of StudentsDetails
var loadAdmissionForm = () => {
    if (checkEmptyFields()) {
        var readStudentDetails = () => {
            let stdDetails = {
                name: $("#sname").val(),
                age: $("#sage").val(),
                gender: $("input[name = 'gender']:checked").val(),
                totalfees: parseInt($("#stotalfees").val()), // Convert fees to a number
                sub1: parseInt($("#sub1").val()),            // Convert marks to numbers
                sub2: parseInt($("#sub2").val()),
                sub3: parseInt($("#sub3").val())
            };
            return stdDetails; // Return the student details object
        }


        // 2. An instance of the StudentsDetails class is created using the input data
        let stdDetails = readStudentDetails(); // Call the function to get student data (After reading the form data, a new instance of the StudentsDetails class is created using the stdDetails object.)

        newStudent = new StudentsDetails(stdDetails);  // Creating instance of the class, constructor invokes here
        studentFinalDetail.push(newStudent);  // Add the new student data to the global array

        // console.log(studentFinalDetail);  Log the array to the console

        newStudent.displayStudentDetails();  // Display current student data, show on webpage

        $("#heading2").hide();
        $(".container").hide();
        $("#btnL").hide();

        $("#heading3").show();
        $(".container2").show();
        $("#btnRD").show();
        $("#btnS").show();
        $(".tbl").show();
    }
}

// Prepare student data for handlebars template
var studentHandle = (student) => {
    return {
        hBname: student.csname,  //constructor.csname
        hBage: student.csage + ' yrs',
        hBgender: student.csgender,
        hBtotalfees: student.cstotalfees + ' Rs',
        hBtotalmarks: student.totalMarks + ' marks',
        hBpercentage: student.percentage.toFixed(2) + '%',
        hBdiscount: student.discount,
        hBdiscountonfees: student.discountOnFees + ' Rs, (' + student.discount + '% off)',
        hBfeespaid: student.feesPaid + ' Rs',
        hBimage: student.csgender === 'Male' ? 'raghav.png' : 'lina.png'
    };
};

var addStudentData = (sData) => {
    $("#admissionForm").append(admissionFormTemplate(sData));
};

// 3. Summary button click to display all student details
var summary = () => {
    $("#admissionForm").empty();  // Clear the progress card to avoid duplicate entries

    console.log(studentFinalDetail); // Log the array to the console

    // Loop through all student data and display each student's details in reverse order
    for (var i = studentFinalDetail.length - 1; i >= 0; i--) {
        let studentDataOfArray = studentFinalDetail[i];
        let studentHbData = studentHandle(studentDataOfArray);  // Prepare student data, when function return so accept it by creating variable.
        addStudentData(studentHbData);  // Add it to the progress card
    }

    $("#heading3").hide();
    $(".container2").hide();
    $("#btnRD").hide();
    $("#btnS").hide();
    $(".tbl").hide();

    $("#heading4").show();
    $("#admissionForm").show();
    $("#btnA").show();
    $("#btnC").show();
    $(".btn-container-2").show();
};

var addition = () => {
    $("#heading4").hide();
    $("#admissionForm").hide();
    $("#btnA").hide();
    $("#btnC").hide();
    $(".btn-container-2").hide();

    // Clear input fields
    $("#sname").val(''); //To clear the value of an <input> element, always use the .val('') method
    $("#sage").val('');
    $("input[name='gender']").prop('checked', false); // Clear the gender radio buttons
    $("input[name='gender'][value='Male']").prop('checked', true);  // Set Male as default again
    $("#stotalfees").val('');
    $("#sub1").val('');
    $("#sub2").val('');
    $("#sub3").val('');

    $("#heading2").show();
    $(".container").show();
    $("#btnL").show();
};

var enter = () => {
    $("h1").hide();
    $("#collage").hide();
    $("#btnE").hide();

    $("#heading2").show();
    $(".container").show();
    $("#btnL").show();

    $("#sname").val('');
    $("#sage").val('');
    $("input[name='gender']").prop('checked', false);  // Clear the gender radio buttons
    $("input[name='gender'][value='Male']").prop('checked', true);  // Set default to Male
    $("#stotalfees").val('');
    $("#sub1").val('');
    $("#sub2").val('');
    $("#sub3").val('');
};

var resetData = () => {
    // Remove the last entry from the array if it exists
    if (studentFinalDetail.length > 0) {
        studentFinalDetail.pop();  // Remove the last student entry
    }

    $("#heading3").hide();
    $(".container2").hide();
    $("#btnRD").hide();
    $("#btnS").hide();
    $(".tbl").hide();

    $("#heading2").show();
    $(".container").show();
    $("#btnL").show();

    // Clear input fields
    $("#sname").val('');
    $("#sage").val('');
    $("input[name='gender']").prop('checked', false);
    $("input[name='gender'][value='Male']").prop('checked', true);  // Set Male as default again
    $("#stotalfees").val('');
    $("#sub1").val('');
    $("#sub2").val('');
    $("#sub3").val('');

    // Reset the image in container2 to blank 
    $(".container2 img").attr({
        "src": "",
        "alt": "Image not available"
    });

    // Update the progress card to reflect the remaining entries
    $("#admissionForm").empty();

    // Loop through remaining entries and re-add them to the progress card
    for (let studentDataOfArray of studentFinalDetail) {
        let studentHbData = studentHandle(studentDataOfArray);  // Prepare student data
        addStudentData(studentHbData);  // Add it to the progress card
    }
};

var clearData = () => {
    // Clear the array holding student data
    studentFinalDetail = [];  // Reset the array to an empty array

    $("#admissionForm").empty();

    $("#heading4").hide();
    $("#admissionForm").hide();
    $("#btnA").hide();
    $("#btnC").hide();
    $(".btn-container-2").hide();

    $("h1").show();
    $("#collage").show();
    $("#btnE").show();
}

//Data Validation
var validateName = (event) => {
    if (event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122 || event.charCode == 32) { // its alphabet
        return true;
    } else {
        return false;
    }
}
var validateNumber = () => {
    // Validation of age
    var ageInput = document.getElementById("sage");
    if (ageInput.value < 3 || ageInput.value > 100) {
        alert("Age must be between 3 years to 100 years.");
        ageInput.value = ''; // Clear the input if invalid
    }

    // Validation for Subject Marks
    var sub1Input = $("#sub1");
    var sub2Input = $("#sub2");
    var sub3Input = $("#sub3");

    if (sub1Input.val() > 100) {
        sub1Input.val('');
    }

    if (sub2Input.val() > 100) {
        sub2Input.val('');
    }

    if (sub3Input.val() > 100) {
        sub3Input.val('');
    }
};