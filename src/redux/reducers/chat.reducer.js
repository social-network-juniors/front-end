/* Reducer */

export const UserActionTypes = {
    LOADING_STARTED: "LOADING_STARTED",
    LOADING_FINISHED: "LOADING_FINISHED",
}

const initState = {
    isLoading: false,
    isInProcess: false,
    chatsList: [{
        id: 1,
        first_name: 'sahsa',
        last_name: 'hoo',
        lastMessage: 'sorry',
        isRead: true,
    }],
    currentChatMessages: [{
        text: 'sometext',
        author: 'me',
        date: 'someDate'
    }],
    currentInterlocutor: {
        fullname:
            'wu wang',
        onlineStatus: true,
        avatar: 'someUrl',
    }
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
        /* DEFAULT */
        default:
            return state;

    }
};

//chat actions
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
};


//thunks
export const thunksCreators = {

    getChats: (user_token) => {
        return (dispatch) => {
            dispatch(UserActions.loadOn())
            // api.getFriends(user_token).then(
            //     (res) => {
            setTimeout(() => {
                dispatch(UserActions.loadOff())
                // dispatch(UserActions.setChats(res.data.result.data))
            }, 750);
            // }/
            //)
        }
    }
};