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
                data : state.data.filter(item => (item[0].title , item[0].description , item[0].date) !== (action.payload.title , action.payload.description , action.payload.date))
            }
    
        default:
            return state
    }
    

} 

export default reducer