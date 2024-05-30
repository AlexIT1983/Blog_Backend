// контроллер пользователя
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/generateToken.js");
const ROLES = require("../constans/roles.js");

// нужна register

async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty ");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user.id });

  return { user, token };
}

// login

async function login(login, password) {
  const user = User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Password not correct");
  }

  const token = generate({ id: user.id });

  return { token, user };
}

// получаем пользователей
function getUsers() {
  return User.find();
}

// роли пользователей
function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.MODERATOR, name: "Moderator" },
    { id: ROLES.USER, name: "User" },
  ];
}

// delete - удаление пользователей для администратор

function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

// edit (roles)

function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
}

// экспортируем контроллеры
module.exports = {
  register,
  login,
  getRoles,
  getUsers,
  deleteUser,
  updateUser,
};
