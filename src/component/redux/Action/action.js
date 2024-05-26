const getData = (userData)=>{
    console.log('data of Action',userData)
    return{
        type:'get_data',
        payload:userData
    }
    
}
export default getData