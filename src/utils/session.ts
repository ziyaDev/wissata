import { IronSessionData, getIronSession } from "iron-session";
import { sessionOptions } from "./session-config";
declare module "iron-session" {
  interface IronSessionData {
    user: User;
  }
}
export default interface User {
  userID: string;
  firstName: string;
  lastName: string;
  role: Role;
  isAuthenticated: boolean;
}
// Define permissions as string literals
type Permission = "READ" | "WRITE" | "DELETE";
// Define roles with associated permissions
type Role = {
  name: string;
  permissions: Permission[];
};
// Define a set of roles
type Roles = {
  ADMIN: Role;
  EDITOR: Role;
  VIEWER: Role;
};
// Roles with associated permissions
const roles: Roles = {
  ADMIN: {
    name: "admin",
    permissions: ["READ", "WRITE", "DELETE"],
  },
  EDITOR: {
    name: "editor",
    permissions: ["READ", "WRITE"],
  },
  VIEWER: {
    name: "viewer",
    permissions: ["READ"],
  },
};
