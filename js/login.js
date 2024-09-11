let elLoginForm = document.querySelector(".login-form");
const isRegistered = JSON.parse(localStorage.getItem("isRegistered"))

elLoginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = {
        username: e.target.username.value,
        password: e.target.password.value
    }
    if(isRegistered){
        if(data.username == isRegistered.newUsername && data.password == isRegistered.newPassword){
            localStorage.setItem("loginData", JSON.stringify(data))
            location.pathname = "../admin.html";
        }
        else{
            alert("Invalid username or password");
        }
    }    
})