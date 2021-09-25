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
        
        case "EDIT_ENTRY":
            console.log(action.payload)
            return{
                ...state,
                data : action.payload.map(item => [{title : item.title , description : item.description , date : item.date , set_date : item.set_date , status:item.status} , item.tags])
            }

        case "DELETE_ENTRY":
            console.log(action.payload)
            console.log(state.data)
            return{
                ...state,
                data : state.data.filter(item => (item[0].set_date) !== (action.payload.set_date))
            }
    
        default:
            return state
    }
    

} 

export default reducer