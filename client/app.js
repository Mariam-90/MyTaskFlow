// אם המשתמש כבר מחובר (יש accessToken), להפנות לדף משימות
const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
  window.location.href = "dashboard.html"; // שנה לשם הדף הרצוי
}


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

// טיפול בשליחת טופס התחברות
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // מונע טעינת דף מחדש

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert(currentLang === "he" ? "נא למלא את כל השדות" : "Please fill in all fields");
    return;
  }

  // שלב עתידי: שליחת בקשת login לשרת Django
  // שליחת בקשת login אמיתית לשרת Django
 fetch("http://localhost:8000/accounts/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      // שמירה של ה־JWT ב־localStorage
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // הודעה על הצלחה
      alert(currentLang === "he" ? "התחברת בהצלחה!" : "Login successful!");
      // כאן אפשר לנווט לדף אחר או להציג משימות למשל
       window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert(currentLang === "he" ? "שגיאה בהתחברות. בדוק שם משתמש וסיסמה." : "Login failed. Please check your username and password.");
    });

});

// הפעלת תרגום כברירת מחדל
applyTranslations();
