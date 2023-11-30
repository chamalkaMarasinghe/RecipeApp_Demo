import { SET_USER, CLEAR_USER, ADD_REMOVE_RECIPE } from "./action";

const initialState = {
    user : null
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return { ...state, user : action.payload};
        case CLEAR_USER:
            return {...state, user : action.payload};
        case ADD_REMOVE_RECIPE:
            return {...state, 
                user : {
                    ...state.user,
                    ...action.payload
                }
            }
        default:
            return state;
    }

}

export default userReducer