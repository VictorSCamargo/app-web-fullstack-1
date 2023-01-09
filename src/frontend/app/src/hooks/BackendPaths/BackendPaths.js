
const URL_BACKEND_EXPRESS_MONGODB = "http://localhost:3333"
//const URL_BACKEND_SPRINGBOOT_POSTGRE = "http://localhost:8080/api"

export class BackendPaths {

    //mudar conforme backend que deseja utilizar
    static defaultUrl = URL_BACKEND_EXPRESS_MONGODB;

    static usersUrl = this.defaultUrl + "/users";
    static verifyUserUrl = this.usersUrl + "/verify-user";
    static updatePasswordUrl = this.usersUrl + "/update-password";

    static postsUrl = this.defaultUrl + "/posts";
}
