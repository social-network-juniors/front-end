import makeRequest from "../index";

export const login = (login, password) => makeRequest("auth/register", "POST", {login, password}, null, null);