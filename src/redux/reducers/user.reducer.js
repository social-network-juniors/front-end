/* Types */

export const UserActionTypes = {
	USER_REPLACE_PROFILE: "USER_REPLACE_PROFILE",
	USER_REPLACE_DATA: "USER_REPLACE_DATA",
	USER_CHANGE_LOGGED: "USER_CHANGE_LOGGED"
};

/* Reducer */

const initState = {
	profile: false,
	data: false,
	logged: false
};

export default (state = initState, action) => {
	switch (action.type) {

		/* USER_REPLACE_PROFILE */
		case UserActionTypes.USER_REPLACE_PROFILE:
			return {...state, profile: action.payload};

		/* USER_REPLACE_DATA */
		case UserActionTypes.USER_REPLACE_DATA:
			return {...state, data: action.payload};

		/* USER_CHANGE_LOGGED */
		case UserActionTypes.USER_CHANGE_LOGGED:
			return {...state, logged: action.payload};

		/* DEFAULT */
		default:
			return state;

	}
};

/* Action creator */

export const UserActions = {
	replaceProfile: (profile) => 
		async (dispatch) => dispatch({type: UserActionTypes.USER_REPLACE_PROFILE, payload: profile}),
	replaceData: (data) => 
		async (dispatch) => dispatch({type: UserActionTypes.USER_REPLACE_DATA, payload: data}),
	changeLogged: (value) => 
		async (dispatch) => dispatch({type: UserActionTypes.USER_CHANGE_LOGGED, payload: value})
};