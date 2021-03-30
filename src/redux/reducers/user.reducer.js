import * as api from "../../api";

/* Types */

export const UserActionTypes = {
	LOGIN: "USER_LOGIN",
};

/* Reducer */

const initState = {
	data: false,
	logged: false
};

export default (state = initState, action) => {
	switch (action.type) {

		/* LOGIN */
		case UserActionTypes.LOGIN:
			return {
				...state,
				data: action.payload
			};

		/* DEFAULT */
		default:
			return state;

	}
};

/* Action creator */

export const UserActions = {
	login: (login, password) =>
		async () => {
			try {
				const resp = await api.login(login, password);
				console.log(resp.data);
			
			} catch (err) {
				console.error("Ошибка атворизации.", err.message);
			}
		}
};