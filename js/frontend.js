const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const registerButton = document.getElementById("register-form-submit");
const registerForm = document.getElementById("register-form");
// const loginErrorMsg = document.getElementById("login-error-msg");
const textEncoder = new TextEncoder();

async function hashPassword(password) {
  const data = textEncoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hexHash;
}
// get users from localStorage
const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

// save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

if (loginButton) {
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const users = getUsers();

    // check if the user exists in the users array
    const foundUser = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (foundUser) {
      alert("You have successfully logged in.");
      window.location.href = "../html/home.html";
    } else {
      alert("Wrong username or password");
    }
  });
}

if (registerButton) {
  registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = registerForm.username.value;
    const password = registerForm.password.value;

    // create a new user object
    const newUser = {
      username: username,
      password: password,
    };

    const users = getUsers();
    // add the new user to the array
    users.push(newUser);
    saveUsers(users);

    console.log(users);

    alert("You have successfully registered!");

    // redirect to the login page
    window.location.href = "../html/login.html";
  });
}
