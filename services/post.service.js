import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import { alertService } from "./alert.service";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/ressources`;

const postSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("posts"))
);

export const postService = {
  posts: postSubject.asObservable(),
  get ressourceValue() {
    return postSubject.value;
  },
  getAll,
  getById,
  update,
  delete: _delete,
};

// async function fetchToken() {
//   const token = localStorage.setItem("token");
//   console.log(token);

//   const requestOptions = {
//     method: "get",
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   };
//   return fetch(`${baseUrl}/me`, requestOptions)
//     .then((res) => {
//       const uid = JSON.parse(res);
//       console.log(uid);
//     })
//     .catch((err) => console.log("No token"));
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

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
    if (id === postSubject.value.id) {
      const ressource = { ...postSubject.value, ...params };
      postSubject.next(ressource);
    }
    return x;
  });
}

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
