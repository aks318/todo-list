const initialState = {
    tags : [],
    data : []
}

const reducer = (state = initialState , action) => {
    // const newState = {...state}
    
    // if(action.type === "ADD_TAG"){
    //     newState.tags = action.payload
    // }

    // if(action.type === "ADD_DATA"){
    //     newState.data = newState.data.push(action.payload)
    // }

    //     return newState

    switch(action.type){
        case "ADD_TAG":
            return{
                ...state,
                tags : action.payload
            }
        
        case "ADD_DATA":
            return{
                ...state,
                data : [...state.data , action.payload]
            }

        default:
            return state
    }
    

} 

export default reducer