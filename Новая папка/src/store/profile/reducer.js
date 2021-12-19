import { TOGGLE_CHECK_PROFILE } from './action';

const initialValue = {
    isCheck: false,
}

export const profileReducer = (state = initialValue, action) => {
    switch (action.type) {
        case TOGGLE_CHECK_PROFILE: {
            return {
                isCheck: !state.isCheck,
            }
        }
        default: { return state; }
    }
}