import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { alertService } from "./alert.service";

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `http://localhost:3000/api/users`;
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

function login(mail, password) {
  return fetchWrapper
    .post(`${baseUrl}/login`, { mail, password })
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));
      if (
        user.user.roles === "Administrateur" ||
        user.user.roles === "Moderateur"
      ) {
        console.log("admin");
        return user;
        // il faut annuler le localstorage ou le redirect en cas de pas admin
      } else {
        console.log("Pas administrateur");
        logout();
        return alertService.error("Vous n'êtes pas administrateur");
      }
    });
}

async function fetchToken() {
  const token = localStorage.setItem("token");
  console.log(token);

  const requestOptions = {
    method: "get",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${baseUrl}/me`, requestOptions)
    .then((res) => {
      const uid = JSON.parse(res);
      console.log(uid);
    })
    .catch((err) => console.log("No token"));
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/account/login");
}

// function register(user) {
//   return fetchWrapper.post(`${baseUrl}/register`, user);
// }

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function register(user) {
  return fetchWrapper.post(`${baseUrl}`, user);
}

// function update(id, params) {
//   return fetchWrapper.put(`${baseUrl}/${id}`, params);
// }

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
    // update stored user if the logged in user updated their own record
    if (id === userSubject.value.id) {
      // update local storage
      const user = { ...userSubject.value, ...params };
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user));

      // publish updated user to subscribers
      userSubject.next(user);
    }
    return x;
  });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
