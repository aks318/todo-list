const initialState = {
    tags : [],
    data : []
}

const reducer = (state = initialState , action) => {

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

        case "DELETE_ENTRY":
            return{
                ...state,
                data : state.data.filter(item => (item[0].title) !== (action.payload.title))
            }
    
        default:
            return state
    }
    

} 

export default reducer