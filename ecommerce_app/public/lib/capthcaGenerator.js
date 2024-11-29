let generatedCaptcha = "";

var showCaptcha = () => { 
    generatedCaptcha = getRandomVal() + getRandomChar("L") + getRandomChar("U") + getRandomVal() + getRandomChar("L");
    
    const canvas = document.getElementById("captchaCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "24px Arial";
    ctx.fillStyle = "#darker"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(generatedCaptcha, canvas.width / 2, canvas.height / 2);
}

// Function to generate random numbers
var getRandomVal = (min=0, max=9) => {
    let getVal = Math.floor(Math.random() * (max + 1));
    if (getVal < min) {
        getVal = Math.floor(Math.random() * (max - min) + min);
    }
    return getVal;
}

// Function to generate random characters
var getRandomChar = (type) => {
    let min, max;
    if (type == "L") {
        min = 97; max = 122; 
    } else if (type == "U") {
        min = 65; max = 90; 
    }
    return String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
}

