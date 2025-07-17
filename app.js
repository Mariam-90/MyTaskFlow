// הגדרות שפה
const translations = {
  en: {
    title: "Welcome to MyTaskFlow",
    login: "Login",
    username: "Username:",
    password: "Password:",
    loginBtn: "Login",
    footer: `Don't have an account? <a href="#">Sign up</a>`,
    langBtn: "עברית"
  },
  he: {
    title: "ברוכים הבאים ל־MyTaskFlow",
    login: "התחברות",
    username: "שם משתמש:",
    password: "סיסמה:",
    loginBtn: "התחבר",
    footer: `אין לך חשבון? <a href="#">הרשמה</a>`,
    langBtn: "English"
  }
};

let currentLang = "en";

// אלמנטים בדף
const appTitle = document.getElementById("app-title");
const loginTitle = document.getElementById("login-title");
const usernameLabel = document.getElementById("username-label");
const passwordLabel = document.getElementById("password-label");
const loginButton = document.getElementById("login-button");
const footerText = document.getElementById("footer-text");
const langToggle = document.getElementById("language-toggle");

// החלפת שפה
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "he" : "en";
  applyTranslations();
});

function applyTranslations() {
  const t = translations[currentLang];
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "he" ? "rtl" : "ltr";

  appTitle.textContent = t.title;
  loginTitle.textContent = t.login;
  usernameLabel.textContent = t.username;
  passwordLabel.textContent = t.password;
  loginButton.textContent = t.loginBtn;
  footerText.innerHTML = t.footer;
  langToggle.textContent = t.langBtn;
}

// הפעלת תרגום כברירת מחדל
applyTranslations();
