const checkPasswordLength = (password) => {
  if (password.length <= 7) {
    return "Password is to short. ";
  }
};

const checkPasswordLowercase = (password) => {
  var lowerCaseLetters = /[a-z]/g;
  if (!password.match(lowerCaseLetters)) {
    return "Password has no lower case. ";
  }
};

const checkPasswordUppercase = (password) => {
  var upperCaseLetters = /[A-Z]/g;
  if (!password.match(upperCaseLetters)) {
    return "Password has no upper case. ";
  }
};

const checkPasswordNumber = (password) => {
  var numbers = /[0-9]/g;
  if (!password.match(numbers)) {
    return "Password has no digit. ";
  }
};

const combinedCheck = (password) => {
  var message = ""

  if (checkPasswordLength(password)) {
    message += checkPasswordLength(password)
  }

  if (checkPasswordLowercase(password)) {
    message += checkPasswordLowercase(password)
  }

  if (checkPasswordUppercase(password)) {
    message += checkPasswordUppercase(password)
  }

  if (checkPasswordNumber(password)) {
    message += checkPasswordNumber(password)
  }
  
  return message;
};

const validyChecks = {
  checkPasswordLength,
  checkPasswordLowercase,
  checkPasswordUppercase,
  checkPasswordNumber,
  combinedCheck,
};

export { validyChecks };
