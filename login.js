/*Login and registration Component: Mateo Vaquero and Jameell Adjei 
  Novel Contribution*/

var regName = document.getElementById("regUsername").value;
var regPW = document.getElementById("regPassword").value;

// storing input from register-form
function register() {
    localStorage.setItem("storedName", regName.value);
    localStorage.setItem("storedPass", regPW.value);
}

// check if stored data from register-form is equal to entered data in the   login-form
function login() {

    // stored data from the register-form
    var storedName = localStorage.getItem("storedName");
    var storedPw = localStorage.getItem("storedPass");

    // entered data from the login-form
    var userName = document.getElementById("username").value;
    var userPw = document.getElementById("password").value;

    // check if stored data from register-form is equal to data from login form
    if(userName.value == storedName && userPw.value == storedPw) {
        alert('You are logged in.');
    }else {
        alert('ERROR.');
    }
}
