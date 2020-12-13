
export const initialState = null


export const reducer = (state, action) => {
    //Protects user data from being lost when refreshed
    if(action.type === "USER") {
        //Sets the state to payload
        return action.payload
    }
    //Sets state to null, meaning the user has signed out
    if(action.type === "CLEAR") {
        return null
    }

    //Changes the state of the user, picture is modified, but the rest remains the same. 
    if(action.type === "UPDATEPIC") {
        return {
            ...state,
            pic:action.payload.pic
        }
    }


    return state
}