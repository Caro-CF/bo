import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { alertService } from "./alert.service";

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `http://localhost:3000/api/users`;
const baseUrl = `${publicRuntimeConfig.apiUrl}/ressources`;

const ressourcesSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("ressources"))
);

export const ressourceService = {
  ressources: ressourcesSubject.asObservable(),
  get ressourceValue() {
    return ressourcesSubject.value;
  },
  getAll,
  getById,
  update,
  delete: _delete,
};

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

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
    // update stored user if the logged in user updated their own record
    if (id === ressourcesSubject.value.id) {
      // update local storage
      const ressource = { ...ressourcesSubject.value, ...params };

      // publish updated user to subscribers
      ressourcesSubject.next(ressource);
    }
    return x;
  });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
