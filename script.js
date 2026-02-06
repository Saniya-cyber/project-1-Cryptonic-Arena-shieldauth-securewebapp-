// ============================
// ShieldAuth Secure Login System
// ============================

// Fake database (for demo)
const usersDB = [
  {
    username: "admin",
    passwordHash: "ef92b778ba..." // placeholder
  }
];

// DOM elements
const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("message");
const logBox = document.getElementById("securityLogs");

// ----------------------------
// SECURITY LOGGER
// ----------------------------
function logSecurityEvent(event) {
  const time = new Date().toLocaleTimeString();
  logBox.innerHTML += `<p>[${time}] ${event}</p>`;
}

// ----------------------------
// INPUT SANITIZATION
// ----------------------------
function sanitize(input) {
  return input.replace(/[<>\/'"]/g, "");
}

// ----------------------------
// PASSWORD HASHING (SHA-256)
// ----------------------------
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// ----------------------------
// SESSION HANDLING
// ----------------------------
function createSession(username) {
  sessionStorage.setItem("user", username);
  logSecurityEvent(`Session created for ${username}`);
}

function destroySession() {
  sessionStorage.removeItem("user");
  logSecurityEvent("Session destroyed");
}

// ----------------------------
// LOGIN HANDLER
// ----------------------------
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let username = sanitize(document.getElementById("username").value);
  let password = sanitize(document.getElementById("password").value);

  logSecurityEvent("Login attempt detected");

  const passwordHash = await hashPassword(password);

  // Fake stored hash (password = admin123)
  const storedHash = await hashPassword("admin123");

  if (username === "admin" && passwordHash === storedHash) {
    createSession(username);
    messageBox.innerText = "✅ Login successful!";
    messageBox.style.color = "green";
    logSecurityEvent("Login successful");
  } else {
    messageBox.innerText = "❌ Invalid credentials!";
    messageBox.style.color = "red";
    logSecurityEvent("Failed login attempt");
  }
});
