import getConfig from "next/config";
import { userService } from "services";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// function post(url, body) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   };
//   return fetch(url, requestOptions).then(handleResponse);
// }

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    credentials: "omit",
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  console.log("Put");
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

// function authHeader(url) {
//   console.log("authHeader url " + url);
//   const token = localStorage.getItem("token");
//   // return auth header with jwt if user is logged in and request is to the api url
//   const user = userService.userValue;
//   const isLoggedIn = user && user.token;
//   const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
//   console.log("isLoggedIn ?" + isLoggedIn);
//   console.log("isApiUrl ?" + isApiUrl);
//   // if (isLoggedIn && isApiUrl) {
//   //   return { Authorization: `Bearer ${token}` };
//   // } else {
//   //   return { };
//   // }
//   return { Authorization: `Bearer ${token}` };
// }

// function authHeader(url) {
//   const token = localStorage.getItem("token");

//   console.log("authHeader url " + url);
//   const options = {
//     method: 'GET',
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   }
//   fetch(url, options).then((res) => {

//     console.log(uid);
//   })
//   .catch((err) => console.log("No token"));
// };
//   // return auth header with jwt if user is logged in and request is to the api url
//   const user = userService.userValue;
//   const isLoggedIn = user && user.token;
//   const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
//   if (isLoggedIn && isApiUrl) {
//       return { Authorization: `Bearer ${user.token}` };
//   } else {
//       return {};
//   }

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  const isLoggedIn = user && user.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${user.token}` };
  } else {
      return {};
  }
}


function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    console.log("handleResponse : " + data);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
