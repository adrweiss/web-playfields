const checkPasswordLength = (password) => {
  if (password.length > 7) {
    return true;
  } else {
    return false;
  }
};

const checkPasswordEqual = (password, passwordAgain) => {
  if (password === passwordAgain) {
    return true;
  } else {
    return false;
  }
};

const checkPasswordLowercase = (password) => {
    var lowerCaseLetters = /[a-z]/g;
    if (password.match(lowerCaseLetters)) {
      return true;
    } else {
      return false;
    }
  };

  const checkPasswordUppercase = (password) => {
    var upperCaseLetters = /[A-Z]/g;
    if (password.match(upperCaseLetters)) {
      return true;
    } else {
      return false;
    }
  };

  const checkPasswordNumber = (password) => {
    var numbers = /[0-9]/g;
    if (password.match(numbers)) {
      return true;
    } else {
      return false;
    }
  };

const validyChecks = {
  checkPasswordLength,
  checkPasswordEqual,
  checkPasswordLowercase,
  checkPasswordUppercase,
  checkPasswordNumber,
};

export default validyChecks;
