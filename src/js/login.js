const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const userData = JSON.parse(localStorage.getItem("userData"));
const loginForm = document.querySelector("#loginForm");

console.log(userData);
function matchUserInfo() {
  const email = userEmail.value;
  const password = userPassword.value;
  const arr = userData.filter((arr) => {
    return arr.email === email && arr.password === password;
  });
  return arr.length;
}
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(matchUserInfo());
  if (matchUserInfo()) {
    window.location.href = "index.html";
  } else {
    alert("password and email not match");
  }
});
