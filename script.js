document.getElementById("loginBtn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageBox = document.getElementById("message");

    if (!email || !password) {
        messageBox.textContent = "Please Fill all required fields.";
        return;
    }

    // Fetching user data from JSON Server using promise

    fetch("http://localhost:5000/users")
    .then(response=>{
        if (!response.ok) {
            throw new Error("Failed to fetch users.");
        }
        return response.json();
    })
    .then(users => {
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            messageBox.style.color = "green";
            messageBox.textContent = "Login Successful! Welcome, " + user.name;
        } else {
            messageBox.style.color = "red";
            messageBox.textContent = "Invalid email or password!";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        messageBox.textContent = "Something went wrong. Please try again later.";
    });
});