
const initialState = {
    getDatas:[]
}

const reducer = (state = initialState,action)=>{
    // console.log('data in reducer',)
    switch(action.type){
        case 'get_data':
            console.log('Payload received in reducer:', action.payload)
            return{...state,
                getDatas:[action.payload]
            }
            
            default:
                return state;
    }
}
export default reducer