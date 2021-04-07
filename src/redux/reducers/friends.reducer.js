import * as api from '../../api/rest/friends'

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
    SET_REQUESTS: "SET_REQUESTS",
    SET_FOUND: "SET_FOUND_USERS",
    PROCESS_STARTED: "PROCESS_STARTED",
    PROCESS_FINISHED: "PROCESS_FINISHED",

};

/* Reducer */

const initState = {
    isLoading: false,
    isInProcess: false,
    friends: [],
    followers: [],
    followed: [],
    requests: [],
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
        case UserActionTypes.SET_REQUESTS:
            return {
                ...state,
                requests: action.payload
            }
        case UserActionTypes.PROCESS_STARTED:
            return {
                ...state,
                isInProcess: true
            }
        case UserActionTypes.PROCESS_FINISHED:
            return {
                ...state,
                isInProcess: false
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
    setRequests: (requests) => {
        return {
            type: UserActionTypes.SET_REQUESTS,
            payload: requests,
        }
    },
    startProcess: () => {
        return {
            type: UserActionTypes.PROCESS_STARTED,
        }
    },
    finishProcess: () => {
        return {
            type: UserActionTypes.PROCESS_FINISHED,
        }
    },

};

//thunks
export const thunksCreators = {

    getFriends: (user_token) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            api.getFriends(user_token).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.setFriends(res.data.result.data))
                }
            )

        }
    },
    getFollowers: (user_token) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            api.getFollowers(user_token).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.setFollowers(res.data.result))
                    console.log(res)
                }
            )

        }
    },
    getFollowed: (user_token) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            api.getFollowed(user_token).then(
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
            api.findUsers(user_token, name).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.setFound(res.data.result))
                }
            )

        }
    },
    addToFriends: (user_token, id) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            dispatch(UserActions.startProcess())
            api.addToFriends(user_token, id).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.finishProcess())
                }
            )
        }
    },
    followUser: (user_token, id) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            dispatch(UserActions.startProcess())
            api.followUser(user_token, id).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.finishProcess())
                }
            )
        }
    },
    unfollowUser: (user_token, id) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            dispatch(UserActions.startProcess())
            api.unfollowUser(user_token, id).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.finishProcess())
                }
            )
        }
    },
    getRequests: (user_token, id) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            api.getRequests(user_token, id).then(
                (res) => {
                    dispatch(UserActions.setRequests(res.data.result))
                    dispatch(UserActions.loadOff())
                }
            )
        }
    },
    rejectFriend: (user_token, id) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            dispatch(UserActions.startProcess())
            api.rejectFriend(user_token, id).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.finishProcess())
                }
            )
        }
    },
    acceptFriend: (user_token, id) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            dispatch(UserActions.startProcess())
            api.acceptFriend(user_token, id).then(
                (res) => {
                    dispatch(UserActions.loadOff())
                    dispatch(UserActions.finishProcess())
                }
            )
        }
    },
    // removeFromFriends:

    //     acceptFriend
    // rejectInvite:

}
