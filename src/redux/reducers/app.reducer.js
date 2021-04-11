export const START_LOADING_APP = 'START_LOADING_APP'
export const FINISH_LOADING_APP = 'FINISH_LOADING_APP'

export const loadOn = () => ({
    type: START_LOADING_APP
})
export const loadOff = () => ({
    type: FINISH_LOADING_APP
})
const initialState = {
    isLoading: true
}

export default (state = initialState, action) => {
    switch (action) {
        case START_LOADING_APP:
            return {
                ...state,
                isLoading: true
            }
        case FINISH_LOADING_APP:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }
}


