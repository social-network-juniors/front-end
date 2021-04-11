import * as api from '../../api'
export const FriendsActionTypes = {
    LOADING_STARTED_FRIENDS: "LOADING_STARTED_FRIENDS",
    LOADING_FINISHED_FRIENDS: "LOADING_FINISHED_FRIENDS",
    SET_FRIENDS: "SET_FRIENDS",
    SET_FOLLOWERS: "GET_FOLLOWERS",
    SET_FOLLOWED: "GET_FOLLOWED",
    SET_REQUESTS: "SET_REQUESTS",
    SET_FOUND: "SET_FOUND_USERS",
    PROCESS_STARTED_FRIENDS: "PROCESS_STARTED_FRIENDS",
    PROCESS_FINISHED_FRIENDS: "PROCESS_FINISHED_FRIENDS",
};

/* Reducer */

const initState = {
    isLoading: 0,
    isInProcess: false,
    friends: [],
    followers: [],
    followed: [],
    requests: [],
    foundUsers: [],
};

export default (state = initState, action) => {
    switch (action.type) {

        case FriendsActionTypes.LOADING_STARTED_FRIENDS:
            return {
                ...state,
                isLoading: state.isLoading + 1
            }
        case FriendsActionTypes.LOADING_FINISHED_FRIENDS:
            return {
                ...state,
                isLoading: state.isLoading - 1
            }
        case FriendsActionTypes.SET_FRIENDS:
            return {
                ...state,
                friends: action.payload
            }
        case FriendsActionTypes.SET_FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            }
        case FriendsActionTypes.SET_FOLLOWED:
            return {
                ...state,
                followed: action.payload
            }
        case FriendsActionTypes.SET_FOUND:
            return {
                ...state,
                foundUsers: action.payload
            }
        case FriendsActionTypes.SET_REQUESTS:
            return {
                ...state,
                requests: action.payload
            }
        case FriendsActionTypes.PROCESS_STARTED_FRIENDS:
            return {
                ...state,
                isInProcess: true
            }
        case FriendsActionTypes.PROCESS_FINISHED_FRIENDS:
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

export const FriendsAction = {
    loadOn: () => {
        return {
            type: FriendsActionTypes.LOADING_STARTED_FRIENDS,
        }
    },
    loadOff: () => {
        return {
            type: FriendsActionTypes.LOADING_FINISHED_FRIENDS,
        }
    },
    setFriends: (friends) => {
        return {
            type: FriendsActionTypes.SET_FRIENDS,
            payload: friends,
        }
    },
    setFollowers: (followers) => {
        return {
            type: FriendsActionTypes.SET_FOLLOWERS,
            payload: followers,
        }
    },
    setFollowed: (followed) => {
        return {
            type: FriendsActionTypes.SET_FOLLOWED,
            payload: followed,
        }
    },
    setFound: (users) => {
        return {
            type: FriendsActionTypes.SET_FOUND,
            payload: users,
        }
    },
    setRequests: (requests) => {
        return {
            type: FriendsActionTypes.SET_REQUESTS,
            payload: requests,
        }
    },
    startProcess: () => {
        return {
            type: FriendsActionTypes.PROCESS_STARTED_FRIENDS,
        }
    },
    finishProcess: () => {
        return {
            type: FriendsActionTypes.PROCESS_FINISHED_FRIENDS,
        }
    },

};

//thunks
export const friendsThunk = {

    getFriends: (user_token) => {
        return (dispatch) => {
            dispatch(FriendsAction.loadOn())
            api.getFriends(user_token).then(
                (res) => {
                    dispatch(FriendsAction.loadOff())
                    dispatch(FriendsAction.setFriends(res.data.result))
                }
            )

        }
    },
    getFollowers: (user_token) => {
        return (dispatch) => {
            dispatch(FriendsAction.loadOn())
            api.getFollowers(user_token).then(
                (res) => {
                    dispatch(FriendsAction.loadOff())
                    dispatch(FriendsAction.setFollowers(res.data.result))
                }
            )

        }
    },
    getFollowed: (user_token) => {
        return (dispatch) => {
            dispatch(FriendsAction.loadOn())
            api.getFollowed(user_token).then(
                (res) => {
                    dispatch(FriendsAction.loadOff())
                    dispatch(FriendsAction.setFollowed(res.data.result))
                }
            )

        }
    },
    searchPeople: (user_token, name) => {
        return (dispatch) => {
            dispatch(FriendsAction.loadOn())
            api.findUsers(user_token, name).then(
                (res) => {
                    dispatch(FriendsAction.loadOff())
                    dispatch(FriendsAction.setFound(res.data.result))
                    console.log(res)
                }
            )

        }
    },
    addToFriends: (user_token, id) => {
        return (dispatch) => {
            dispatch(FriendsAction.loadOn())
            dispatch(FriendsAction.startProcess())
            api.addToFriends(user_token, id).then(
                (res) => {
                    dispatch(FriendsAction.loadOff())
                    dispatch(FriendsAction.finishProcess())
                }
            )
        }
    },
    followUser: (user_token, id) => {
        return (dispatch) => {
            dispatch(FriendsAction.loadOn())
            dispatch(FriendsAction.startProcess())
            api.followUser(user_token, id).then(
                (res) => {
                    dispatch(FriendsAction.loadOff())
                    dispatch(FriendsAction.finishProcess())
                }
            )
        }
    },
    unfollowUser: (user_token, id) => {
        return (dispatch) => {
            dispatch(FriendsAction.loadOn())
            dispatch(FriendsAction.startProcess())
            api.unfollowUser(user_token, id).then(
                (res) => {
                    dispatch(FriendsAction.loadOff())
                    dispatch(FriendsAction.finishProcess())
                }
            )
        }
    },
    getRequests: (user_token, id) => {
        return (dispatch) => {
            dispatch(FriendsAction.loadOn())
            api.getRequests(user_token, id).then(
                (res) => {
                    dispatch(FriendsAction.setRequests(res.data.result))
                    dispatch(FriendsAction.loadOff())
                }
            )
        }
    },
    rejectFriend: (user_token, id) => {
        return (dispatch) => {
            dispatch(FriendsAction.loadOn())
            dispatch(FriendsAction.startProcess())
            api.rejectFriend(user_token, id).then(
                (res) => {
                    dispatch(FriendsAction.loadOff())
                    dispatch(FriendsAction.finishProcess())
                }
            )
        }
    },
    acceptFriend: (user_token, id) => {
        return (dispatch) => {
            dispatch(FriendsAction.loadOn())
            dispatch(FriendsAction.startProcess())
            api.acceptFriend(user_token, id).then(
                (res) => {
                    dispatch(FriendsAction.loadOff())
                    dispatch(FriendsAction.finishProcess())
                }
            )
        }
    },
}
