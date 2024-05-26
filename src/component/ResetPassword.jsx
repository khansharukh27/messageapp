import React, { useState } from 'react'
import '../componentcss/login.css'

function ResetPassword() {
    const [email,setEmail] = useState('')
    const handleSubmit =async ()=>{
        try{
            const responce = await fetch('http://localhost:5000/forget-password',{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email})
            })
            if(responce.ok){
                alert('Password reset email sent successfully')
            }else{
                const data = responce.json()
                alert(data.message)
            }
        }catch(error){
            console.log('error:-',error)
        }
    }
    
  return (
    <form onSubmit={handleSubmit} className='card'>
        <div className='input-div'>
        <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email' className='input'/>

        </div>
      <div className='button-div'>
      <button className='submit'>Reset Password</button>
      </div>
      
    </form>
  )
}

export default ResetPassword
