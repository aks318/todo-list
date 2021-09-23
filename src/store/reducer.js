const initialState = {
    tags : []
}

const reducer = (state = initialState , action) => {
    const newState = {...state}
    
    if(action.type === "ADD_TAG"){
        newState.tags = action.payload
    }
        return newState
    

} 

export default reducer