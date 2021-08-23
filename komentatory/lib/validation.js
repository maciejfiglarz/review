export const checkUrlIsImage = url => {
  if (url.match(/\.(jpeg|jpg|png)$/)) {
    return true;
  }
  return false;
};

export const isValidStringMaxLength = (string, number) => {
  if (string.length <= number) {
    return true;
  }
  return false;
};
export const isValidStringMinLength = (string, number) => {
  if (string.length < number) {
    return true;
  }
  return false;
};


export const youtubeParser = url => {
  let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  let match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    return false;
  }
};

export const emailValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const loginValid = (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  // data: formData,
  // type: "post",
  fetch("/api-login-valid", {
    body: formData,
    method: "POST"
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log("Przykład 2:");
      console.log(resp);
    });
};
