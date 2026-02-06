document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const message = document.getElementById("message");
  const dashboard = document.getElementById("dashboard");
  const loginSection = document.getElementById("login-section");

  const USER = "admin";
  const PASS = "admin123";

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === USER && password === PASS) {
      message.textContent = "✅ Login successful!";
      message.style.color = "lime";
      loginSection.style.display = "none";
      dashboard.style.display = "block";
    } else {
      message.textContent = "❌ Invalid credentials";
      message.style.color = "red";
    }
  });

  logoutBtn.addEventListener("click", () => {
    dashboard.style.display = "none";
    loginSection.style.display = "block";
    message.textContent = "";
  });
});
