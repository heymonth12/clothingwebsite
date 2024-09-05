import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state, setState] = useState("Login")
  const [formData,setformData] = useState({
    username:"",
    password:"",
    email:""
  })

const handleChange = (e)=>{
setformData({...formData,[e.target.name]:e.target.value})
}

  const login = async()=>{
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-type':'application/json'
    },
    body:JSON.stringify(formData),  
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if (responseData.success) {
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async()=>{
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-type':'application/json'
    },
    body:JSON.stringify(formData),  
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if (responseData.success) {
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className="loginsignup">
      <div className="container">
        <h1>{state}</h1>
        <div className="fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={handleChange} type="text" placeholder="Name" required/> : <></>}
          <input name='email' value={formData.email} onChange={handleChange} type="Email" placeholder="Email" required />
          <input name='password' value={formData.password} onChange={handleChange} type="Password" placeholder="Password" required />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>{state}</button>
        {state === "Sign Up" ? <p className="login">
          Already have an account?<span onClick={()=>setState("Login")}>Login</span>
        </p> : <p className="login">
          didn't have an account?<span onClick={()=>setState("Sign Up")}>Click here</span>
        </p>}
        <div className="agree">
          <input type="checkbox" id='' name='' required/>
          <p>By continuing , I agree to the term of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup