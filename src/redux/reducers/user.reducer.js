import * as api from '../../api'


/* Types */

export const UserActionTypes = {
	LOGIN: "USER_LOGIN",
	SET_PROFILE: "SET_PROFILE",
	CHANGE_LOGGED: "CHANGE_LOGGED",
	LOADING_STARTED_USER: "LOADING_STARTED_USER",
	LOADING_FINISHED_USER: "LOADING_FINISHED_USER",
};

/* Reducer */

const initState = {
	isLoading: false,
	data: [],
	logged: false
};

export default (state = initState, action) => {
	switch (action.type) {

		/* LOGIN */
		case UserActionTypes.SET_PROFILE:
			return {
				...state,
				data: action.payload
			}
		case UserActionTypes.CHANGE_LOGGED:
			return {
				...state,
				logged: action.payload
			}
		/* LOADING */
		case UserActionTypes.LOADING_STARTED_USER:
			return {
				...state,
				isLoading: true
			}
		case UserActionTypes.LOADING_FINISHED_USER:
			return {
				...state,
				isLoading: false
			}
		/* DEFAULT */
		default:
			return state;

	}
};

/* Action creator */

export const UserActions = {
	loadOn: () => {
		return {
			type: UserActionTypes.LOADING_STARTED_USER,
		}
	},
	loadOff: () => {
		return {
			type: UserActionTypes.LOADING_FINISHED_USER,
		}
	},
	login: (login, password) =>
		async () => {
			try {
				const resp = await login(login, password);
				console.log(resp.data);
			} catch (err) {
				console.error("Ошибка авторизации.", err.message);
			}
		},
	setProfile: (data) => {
		return {
			type: UserActionTypes.SET_PROFILE,
			payload: data
		}
	},
	changeLogged: (value) => {
		return {
			type: UserActionTypes.CHANGE_LOGGED,
			payload: value
		}
	}
};

// Thunk Creators
export const thunksCreators = {
	getProfile: (user_token) => {
		return (dispatch) => {
			dispatch(UserActions.loadOn())
			api.getProfile(user_token).then(
				(res) => {
					dispatch(UserActions.loadOff())
					dispatch(UserActions.setProfile(res.data.result))
					console.log(res);
				}
			)

		}
	},
}