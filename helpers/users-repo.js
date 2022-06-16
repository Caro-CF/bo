const fs = require("fs");

let users = require("data/users.json");

export const usersRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  console.log("getAll");
  return "http://linksforcitizens.local:3000/api/users/";
}

function getById(id) {
  console.log("getbyID");
  console.log(id);
  return users.find((x) => x.id.toString() === id.toString());
}

function create({ firstname, lastname, mail, password, roles }) {
  const user = { firstname, lastname, mail, password, roles };
  console.log("user : " + user);

  // validate
  if (users.find((x) => x.mail === user.mail))
    throw `User with the email ${user.mail} already exists`;

//   // generate new user id
//   user.usr_id = users.length ? Math.max(...users.map((x) => x.usr_id)) + 1 : 1;

  // set date created and updated
  user.created_at = new Date().toISOString();
//   user.dateUpdated = new Date().toISOString();

  // add and save user
  users.push(user);
  console.log("user create" + user);
  saveData();
}

function update(id, { pseudo, firstName, lastName, email, role, password }) {
  const params = { pseudo, firstName, lastName, email, role, password };
  const user = users.find((x) => x.id.toString() === id.toString());

  // validate
  if (
    params.email !== user.email &&
    users.find((x) => x.email === params.email)
  )
    throw `User with the email ${params.email} already exists`;

  // only update password if entered
  if (!params.password) {
    delete params.password;
  }

  // set date updated
  user.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(user, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted user and save
  users = users.filter((x) => x.id.toString() !== id.toString());
  getAll();
}

// private helper functions

function saveData() {
  fs.writeFileSync("data/users.json", JSON.stringify(users, null, 4));
  console.log("file + : " + data / users.JSON);
}
