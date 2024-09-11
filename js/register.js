let elRegisterForm = document.querySelector(".register-form")

elRegisterForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const newData = {
        newUsername: e.target.username.value,
        newPassword: e.target.password.value
    }
    localStorage.setItem("isRegistered", JSON.stringify(newData))
    location.pathname = "/"
})