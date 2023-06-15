export const validatePassword = (password) => {
  return password.match(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/
  );
};

export const validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateName = (name) => {
  return name.match(/^[a-zA-Z가-힣\s]{2,20}$/);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Format date as 'YYYY-MM-DD'
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Format date as 'YYYY-MM-DD HH:MM:SS'
};