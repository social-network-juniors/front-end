/* Reducer */

export const ChatActionTypes = {
    LOADING_STARTED_CHAT: "LOADING_STARTED_CHAT",
    LOADING_FINISHED_CHAT: "LOADING_FINISHED_CHAT",
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

        case ChatActionTypes.LOADING_STARTED_CHAT:
            return {
                ...state,
                isLoading: true
            }
        case ChatActionTypes.LOADING_FINISHED_CHAT:
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
export const ChatAction = {
    loadOn: () => {
        return {
            type: ChatActionTypes.LOADING_STARTED_CHAT,
        }
    },
    loadOff: () => {
        return {
            type: ChatActionTypes.LOADING_FINISHED_CHAT,
        }
    },
};


//thunks
export const thunksCreators = {

    getChats: (user_token) => {
        return (dispatch) => {
            dispatch(ChatAction.loadOn())
            // api.getFriends(user_token).then(
            //     (res) => {
            setTimeout(() => {
                dispatch(ChatAction.loadOff())
                // dispatch(ChatAction.setChats(res.data.result.data))
            }, 750);
            // }/
            //)
        }
    }
};