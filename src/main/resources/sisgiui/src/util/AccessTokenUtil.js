export function getAuthorizationToken(){
    const token = localStorage.getItem("token");
    return token;
}

export function setAuthorizationToken(token){
    localStorage.setItem("token", token);
}