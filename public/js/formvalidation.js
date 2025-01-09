// Show the modal popup
function showPopup() {
  document.getElementById("modal").style.display = "flex";
}

// Close the modal popup
function closePopup() {
  document.getElementById("modal").style.display = "none";
}

// Toggle between login and signup forms
function toggleForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  loginForm.style.display =
    loginForm.style.display === "none" ? "block" : "none";
  signupForm.style.display =
    signupForm.style.display === "none" ? "block" : "none";
}

// Signup validation and storage
function signup() {
  const email = document.getElementById("signupEmail").value;
  const name = document.getElementById("signupName").value;
  const phone = document.getElementById("signupPhone").value;
  const address = document.getElementById("signupAddress").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword"
  ).value;

  const emailError = document.getElementById("signupEmailError");
  const nameError = document.getElementById("signupNameError");
  const phoneError = document.getElementById("signupPhoneError");
  const addressError = document.getElementById("signupAddressError");
  const passwordError = document.getElementById("signupPasswordError");
  const confirmPasswordError = document.getElementById(
    "signupConfirmPasswordError"
  );
  //   by default hidden
  emailError.style.visibility =
    passwordError.style.visibility =
    confirmPasswordError.style.visibility =
      "hidden";

  if (!email.includes("@")) {
    emailError.textContent = "Please enter a valid email.";
    emailError.style.visibility = "visible";
    return;
  }

  if (name.length < 3) {
    nameError.textContent = "Name should be at least 3 characters.";
    nameError.style.visibility = "visible";
    return;
  }

  if (phone.length < 10) {
    phoneError.textContent = "Phone number should be at least 10 digits.";
    phoneError.style.visibility = "visible";
    return;
  }

  if (address.length < 10) {
    addressError.textContent = "Address should be at least 10 characters.";
    addressError.style.visibility = "visible";
    return;
  }

  if (password.length < 6) {
    passwordError.textContent = "Password should be at least 6 characters.";
    passwordError.style.visibility = "visible";
    return;
  }

  if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match.";
    confirmPasswordError.style.visibility = "visible";
    return;
  }

  fetch("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, phone, address }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.cookie = `token=${data.token}`;
        document.cookie = `username=${data.user.name}`;
        document.cookie = `userEmail=${data.user.email}`;
        document.cookie = `userId=${data.user._id}`;
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        emailError.textContent = data.message;
        emailError.style.visibility = "visible";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}

// Login validation
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const emailError = document.getElementById("loginEmailError");
  const passwordError = document.getElementById("loginPasswordError");

  emailError.style.visibility = passwordError.style.visibility = "hidden";

  if (!email) {
    emailError.textContent = "Email is required.";
    emailError.style.visibility = "visible";
    return;
  }

  if (!password) {
    passwordError.textContent = "Password is required.";
    passwordError.style.visibility = "visible";
    return;
  }

  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.cookie = `token=${data.token}`;
        document.cookie = `username=${data.user.name}`;
        document.cookie = `userEmail=${data.user.email}`;
        document.cookie = `userId=${data.user._id}`;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        emailError.textContent = data.message;
        emailError.style.visibility = "visible";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}

function logout() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  window.location.reload();
}
