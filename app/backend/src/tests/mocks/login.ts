import { UserInfo } from "os";
import ILogin from "../../interfaces/Ilogin";
import Users from "../../database/models/users";

const loginNoEmail = {
  email: "",
  password: "secret_admin"
} as ILogin

const invalidEmail = {
  email: "@exemplo.com",
  password: "secret_admin"
}

const validLogin = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const user =  {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: "secret_admin"
} as Users;

const role =  {
  role: 'admin',
} as Users;

export { loginNoEmail, invalidEmail , validLogin, user, role} 