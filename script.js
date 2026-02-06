// ====== SECURE USER DATABASE (SIMULATED) ======
const users = {
  admin: {
    passwordHash: "240be518fabd2724ddb6f04eeb1da596", // md5("admin123")
    role: "admin"
  }
};

// ====== ELEMENT REFERENCES ======
const loginBox = document.getElementById("loginBox");
const dashboardBox = document.getElementById("dashboardBox");
const message = document.getElementById("message");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// ====== LOGIN HANDLER ======
loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    message.textContent = "⚠ Please enter username and password";
    message.style.color = "orange";
    return;
  }

  if (!users[username]) {
    message.textContent = "❌ Invalid username or password";
    message.style.color = "red";
    return;
  }

  const enteredHash = md5(password);

  if (enteredHash !== users[username].passwordHash) {
    message.textContent = "❌ Invalid username or password";
    message.style.color = "red";
    return;
  }

  // SUCCESS
  sessionStorage.setItem("loggedInUser", username);
  showDashboard(username);
});

// ====== LOGOUT HANDLER ======
logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("loggedInUser");
  dashboardBox.style.display = "none";
  loginBox.style.display = "block";
  message.textContent = "✅ Logged out successfully";
  message.style.color = "lightgreen";
});

// ====== SHOW DASHBOARD ======
function showDashboard(username) {
  loginBox.style.display = "none";
  dashboardBox.style.display = "block";
  document.getElementById("userDisplay").textContent = username;
}

// ====== AUTO LOGIN CHECK ======
const savedUser = sessionStorage.getItem("loggedInUser");
if (savedUser) {
  showDashboard(savedUser);
}

// ====== SIMPLE MD5 FUNCTION (FOR DEMO PURPOSE ONLY) ======
function md5(string) {
  return CryptoJS.MD5(string).toString();
}

