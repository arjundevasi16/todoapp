const userName = document.querySelector("#userName");
const userPassword = document.querySelector("#userPassword");
const userConfirmPass = document.querySelector("#userConfirmPass");
const signUpForm = document.querySelector("#signUpForm");
const ConfirmErrorMsg = document.querySelector("#ConfirmErrorMsg");
const userEmail = document.querySelector("#userEmail");
let userInfo = JSON.parse(localStorage.getItem("userData")) || [];
function saveUserInfo() {
  localStorage.setItem("userData", JSON.stringify(userInfo));
}
function testInput() {
  const nameRegex = /^[a-zA-Z]{3,}$/;
  return nameRegex.test(userName.value);
}
userName.addEventListener("blur", (e) => {
  if (testInput(e)) {
    document.querySelector("#error-msg").textContent = "";
    userName.classList.add("border-green-500");
    userName.classList.remove("border-red-500");
  } else {
    document.querySelector("#error-msg").textContent =
      "name should have min 3 character";
    userName.classList.add("border-red-500");
    userName.classList.remove("border-green-500");
  }
});
userName.addEventListener("input", (e) => {
  if (testInput(e)) {
    document.querySelector("#error-msg").textContent = "";
    userName.classList.add("border-green-500");
    userName.classList.add("focus:border-green-500");
    userName.classList.remove("border-red-500");
  } else {
    userName.classList.remove("focus:border-green-500");
    userName.classList.remove("border-green-500");
  }
});
const passReg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
function testPassword() {
  return passReg.test(userPassword.value);
}

userPassword.addEventListener("blur", (e) => {
  const errorMsg = document.querySelector("#passwordErrorMsg");
  if (testPassword(e)) {
    errorMsg.textContent = "";
    userPassword.classList.add("border-green-500");
    userPassword.classList.remove("border-red-500");
  } else {
    errorMsg.textContent =
      " min 8 letter password, with at least a symbol, upper and lower case letters and a number";
    userPassword.classList.add("border-red-500");
    userPassword.classList.remove("border-green-500");
  }
});
userPassword.addEventListener("input", (e) => {
  if (testPassword(e)) {
    const errorMsg = document.querySelector("#passwordErrorMsg");
    errorMsg.textContent = " ";
    userPassword.classList.remove("border-red-500");
    userPassword.classList.add("focus:border-green-500");
  } else {
    userPassword.classList.remove("border-green-500");
  }
});
function matchPassword() {
  const p1 = userPassword.value;
  const p2 = userConfirmPass.value;
  return p1 === p2 ? true : false;
}
userConfirmPass.addEventListener("blur", (e) => {
  const ConfirmErrorMsg = document.querySelector("#ConfirmErrorMsg");
  if (matchPassword()) {
    ConfirmErrorMsg.textContent = "";
    userConfirmPass.classList.add("border-green-500");
    userConfirmPass.classList.remove("border-red-500");
  } else {
    ConfirmErrorMsg.textContent = "password not match";
    userConfirmPass.classList.remove("border-green-500");
    userConfirmPass.classList.add("border-red-500");
  }
});
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (matchPassword() && testInput() && testPassword()) {
    let obj = {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    };
    userInfo.push(obj);
    saveUserInfo();
    alert("success fully sing up");
    window.location.href = "index.html";
  } else {
    alert("fill the form proper");
  }
});
