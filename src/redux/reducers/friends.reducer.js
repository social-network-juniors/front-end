import { getFriends, getFollowers, getFollowed, findUsers } from '../../api/rest/friends'

export const UserActionTypes = {
    LOADING_STARTED: "LOADING_STARTED",
    LOADING_FINISHED: "LOADING_FINISHED",
    SET_FRIENDS: "SET_FRIENDS",
    // ADD_TO_FRIENDS: "ADD_TO_FRIENDS",
    // ACCEPT_FRIEND: "ACCEPT_FRIEND",
    // REMOVE_FROM_FRIENDS: "REMOVE_FROM_FRIENDS",
    // REJECT_INVITE: "REJECT_INVITE",
    SET_FOLLOWERS: "GET_FOLLOWERS",
    SET_FOLLOWED: "GET_FOLLOWED",
    SET_FOUND: "SET_FOUND_USERS",
};

/* Reducer */

const initState = {
    isLoading: false,
    friends: [],
    followers: [],
    followed: [],
    foundUsers: [],

};

export default (state = initState, action) => {
    switch (action.type) {

        case UserActionTypes.LOADING_STARTED:
            return {
                ...state,
                isLoading: true
            }
        case UserActionTypes.LOADING_FINISHED:
            return {
                ...state,
                isLoading: false
            }
        case UserActionTypes.SET_FRIENDS:
            return {
                ...state,
                friends: action.payload
            }
        case UserActionTypes.SET_FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            }
        case UserActionTypes.SET_FOLLOWED:
            return {
                ...state,
                followed: action.payload
            }
        case UserActionTypes.SET_FOUND:
            return {
                ...state,
                foundUsers: action.payload
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
            type: UserActionTypes.LOADING_STARTED,
        }
    },
    loadOff: () => {
        return {
            type: UserActionTypes.LOADING_FINISHED,
        }
    },
    setFriends: (friends) => {
        return {
            type: UserActionTypes.SET_FRIENDS,
            payload: friends,
        }
    },
    setFollowers: (followers) => {
        return {
            type: UserActionTypes.SET_FOLLOWERS,
            payload: followers,
        }
    },
    setFollowed: (followed) => {
        return {
            type: UserActionTypes.SET_FOLLOWED,
            payload: followed,
        }
    },
    setFound: (users) => {
        return {
            type: UserActionTypes.SET_FOUND,
            payload: users,
        }
    },

};

//thunks
export const thunksCreators = {

    getFriends: (user_token) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            getFriends(user_token).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.setFriends(res.data.result))
                }
            )

        }
    },
    getFollowers: (user_token) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            getFollowers(user_token).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.setFollowers(res.data.result))
                }
            )

        }
    },
    getFollowed: (user_token) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            getFollowed(user_token).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.setFollowed(res.data.result))
                }
            )

        }
    },
    searchPeople: (user_token, name) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            findUsers(user_token, name).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.setFound(res.data.result))
                    console.log(res.data.result)
                }
            )

        }
    },
    // removeFromFriends:
    //     addToFriends:
    //     acceptFriend
    // rejectInvite:

}
