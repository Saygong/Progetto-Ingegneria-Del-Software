import axios from "axios";

function signup(
  given_name,
  family_name,
  number,
  email,
  password,
  visible,
  deviceToken
) {
  const language = localStorage.getItem("language");
  return axios({
    url: "/api/users",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({
      given_name,
      family_name,
      number,
      email,
      password,
      visible,
      language,
      deviceToken
    })
  })
    .then(response => {

      // Family-Market: localStorage variable that indicates if the user already accepted the terms & conditions
      localStorage.setItem("disclaimer", "null");

      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    })
    .catch(error => Promise.reject(error));
}

const registrationServices = {
  signup
};

export default registrationServices;
