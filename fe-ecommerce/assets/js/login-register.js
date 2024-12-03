function validationRegister() {
  const fullName = document.getElementById("fullname").value;
  const numberPhone = document.getElementById("numberphone").value;
  const address = document.getElementById("address").value;
  const userName = document.getElementById("username").value;
  const password = document.getElementById("pass").value;
  const confirmPassword = document.getElementById("confirm-pass").value;
  let checkValidation = true;

  const messageFullName = validateFullName(fullName);

  if (messageFullName) {
    document.getElementById("fullname-error").innerHTML = messageFullName;
    checkValidation = false;
  } else {
    document.getElementById("fullname-error").innerHTML = "";
  }

  const messageNumberPhone = validatePhone(numberPhone);
  if (messageNumberPhone) {
    document.getElementById("number-phone-error").innerHTML =
      messageNumberPhone;
    checkValidation = false;
  } else {
    document.getElementById("number-phone-error").innerHTML = "";
  }

  const messageAddress = validateAddress(address);
  if (messageAddress) {
    document.getElementById("address-error").innerHTML = messageAddress;
    checkValidation = false;
  } else {
    document.getElementById("address-error").innerHTML = "";
  }

  const messageUserName = validateUserName(userName);
  if (messageUserName) {
    document.getElementById("username-error").innerHTML = messageUserName;
    checkValidation = false;
  } else {
    document.getElementById("username-error").innerHTML = "";
  }

  const messagePassword = validatePassword(password);
  if (messagePassword) {
    document.getElementById("password-error").innerHTML = messagePassword;
    checkValidation = false;
  } else {
    document.getElementById("password-error").innerHTML = "";
  }

  const messageConfirmPassword = validateConfirmPassword(
    password,
    confirmPassword
  );
  if (messageConfirmPassword) {
    document.getElementById("confirm-password-error").innerHTML =
      messageConfirmPassword;
    checkValidation = false;
  } else {
    document.getElementById("confirm-password-error").innerHTML = "";
  }

  return checkValidation;
}

function validationLogin() {
  const userNameLogin = document.getElementById("username-login").value;
  const passwordLogin = document.getElementById("pass-login").value;
  let checkValidationLogin = true;

  const messageUserNameLogin = validateUserName(userNameLogin);
  if (messageUserNameLogin) {
    document.getElementById("username-login-error").innerHTML =
      messageUserNameLogin;
    checkValidationLogin = false;
  } else {
    document.getElementById("username-login-error").innerHTML = "";
  }

  const messagePasswordLogin = validatePassword(passwordLogin);
  if (messagePasswordLogin) {
    document.getElementById("password-error-login").innerHTML =
      messagePasswordLogin;
    checkValidationLogin = false;
  } else {
    document.getElementById("password-error-login").innerHTML = "";
  }
  return checkValidationLogin;
}

function validateFullName(fullName) {
  if (fullName.length < 5 || fullName.length > 50) {
    return "* Họ và tên phải từ 5 đến 50 ký tự*";
  }
  const fullNameRegex = /^[\p{L}\s]+$/u;
  if (!fullNameRegex.test(fullName)) {
    return "*Họ và tên chỉ được chứa chữ cái và khoảng trắng.*";
  }
}

function validatePhone(numberPhone) {
  const phoneRegex = /^(0[3|8|9])+([0-9]{8})$/;
  if (!phoneRegex.test(numberPhone) || numberPhone == " ")
    return "*Số điện thoại không hợp lệ*";
}

function validateAddress(address) {
  if (address === "") {
    return "*Vui lòng nhập địa chỉ của bạn.*";
  }
}

function validateUserName(userName) {
  if (userName == "") return "*Vui lòng nhập tên đăng nhập của bạn.*";
  const userNameRegex = /^[a-zA-Z0-9_]{5, 10}$/;
  if (userNameRegex.test(userName))
    return "*Tên đăng nhập từ 5 đến 10 ký tự, không chứa ký tự đặc biệt.*";
}

function validatePassword(password) {
  if (password.trim().length < 5 || password.trim().length >= 10) {
    return "*Mật khẩu từ 5 đến 10 ký tự*";
  }
  const passRegex = /^[^\s]+$/;
  if (!passRegex.test(password)) {
    return "*Mật khẩu không chưa khoảng trắng";
  }
}

function validateConfirmPassword(password, confirmPassword) {
  if (confirmPassword === "") {
    return "*Vui lòng xác nhận lại mật khẩu*";
  }
  if (password !== confirmPassword) {
    return "*Mật khấu không khớp*";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username-login").value;
      const password = document.getElementById("pass-login").value;

      axios
        .post("http://localhost:8080/authenticate", {
          username: username,
          password: password,
        })
        .then(response => {
          const token = response.data.token;
          const customerId = response.data.id;
          localStorage.setItem("customerId", customerId);
          const role = response.data.role;
          const cartId = response.data.cartId;
          localStorage.setItem("token", token);

          localStorage.setItem("cartId", cartId);
          if (role === "ROLE_USER") {
            window.location.href = "index-user.html";
          } else {
            window.location.href = "index-admin.html";
          }
        })
        .catch(error => {
          alert("Tên đăng nhập hoặc mật khẩu không đúng!");
        });
    });
  } else {
    console.error("loginForm không tồn tại trong DOM");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("fullname").value;
      const phoneNumber = document.getElementById("numberphone").value;
      const address = document.getElementById("address").value;
      const userName = document.getElementById("username").value;
      const password = document.getElementById("pass").value;

      const registerData = {
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        userName: userName,
        password: password,
      };

      axios
        .post("http://localhost:8080/register", registerData)
        .then(()=> {
          alert("Đăng ký thành công! Bạn có thể đăng nhập.");
        })
        .catch(() => {
          alert("Có lỗi xảy ra. Vui lòng thử lại!");
        });
    });
  } else {
    console.error("registerForm không tồn tại trong DOM");
  }
});
