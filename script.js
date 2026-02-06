const users = {};
let loginAttempts = {};

function hashPassword(password) {
  return btoa(password); // basic encoding for demo (we'll upgrade later)
}

function strongPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password);
}

function register() {
  const user = regUser.value.trim();
  const pass = regPass.value;

  if (!user || !pass) {
    regMsg.textContent = "All fields required.";
    return;
  }

  if (!strongPassword(pass)) {
    regMsg.textContent = "Password must be 8+ chars, include uppercase, number & symbol.";
    return;
  }

  users[user] = hashPassword(pass);
  regMsg.textContent = "✅ Registered successfully!";
}

function login() {
  const user = loginUser.value.trim();
  const pass = loginPass.value;

  loginAttempts[user] = loginAttempts[user] || 0;

  if (loginAttempts[user] >= 3) {
    loginMsg.textContent = "❌ Account locked due to too many attempts.";
    return;
  }

  if (users[user] && users[user] === hashPassword(pass)) {
    loginMsg.textContent = "✅ Login successful!";
    dashboard.classList.remove("hidden");
  } else {
    loginAttempts[user]++;
    loginMsg.textContent = "❌ Invalid credentials.";
  }
}

function logout() {
  dashboard.classList.add("hidden");
  loginMsg.textContent = "Logged out.";
}
