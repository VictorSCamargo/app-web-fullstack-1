import { BackendPath } from "./BackendPath";

const URL_BACKEND_EXPRESS_MONGODB = "http://localhost:3333"
//const URL_BACKEND_SPRINGBOOT_POSTGRE = "http://localhost:8080/api"

/* Editar conforme backend que deseja utilizar */
const URL_BACKEND_PATH = URL_BACKEND_EXPRESS_MONGODB;

export class BackendPaths {

    static defaultUrl = new BackendPath(URL_BACKEND_PATH);

    static usersUrl = new BackendPath(this.defaultUrl + "/users");
    static verifyUserUrl = new BackendPath(this.usersUrl + "/verify-user");
    static updatePasswordUrl = new BackendPath(this.usersUrl + "/update-password");

    static postsUrl = new BackendPath(this.defaultUrl + "/posts");
}
