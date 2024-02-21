export function getAuthorizationToken(){
    const token = localStorage.getItem("token");
    return token;
}

export function setAuthorizationToken(token){
    localStorage.setItem("token", token);
}

export function setAuthenticatedUsername(username){
    localStorage.setItem("username", username);
}

export function getAuthenticatedUserName(){
    const username = localStorage.getItem("username");
    return username;
}