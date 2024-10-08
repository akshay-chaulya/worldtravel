export const setToken = (token) => {
  localStorage.setItem("token", JSON.stringify("Bearer " + token));
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
