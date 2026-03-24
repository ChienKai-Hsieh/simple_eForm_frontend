import { useEffect, useState } from 'react'
import '../App.css'
import { login } from "../utils/login";
import { setAuthToken } from "../utils/token";
import { useNavigate, useLocation } from "react-router-dom";

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


const Login =() => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // const [useremail, setUseremail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setErrorMessage(null);
    
    login(username, password).then((data) => {
      // console.log(data);
      setLoading(false);
      //localStorage.clear();

      if (data.response !== undefined && data.response.status === 401)
        return setErrorMessage(data.response.data);
      else  {
        setAuthToken(data);
        // clearAuthToken();
        // console.log(getAuthToken());

        if(from === '/')
          navigate("/index");
        else
          navigate(from, { replace: true });
      }
    });
  };

  /*const handleUseremail = (e) => {
    setUseremail(e.target.value);
  };*/

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }; 

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  
  const handleGoogleResponse = async (response) => {   
  	if (response.credential) {   
    	const decoded = jwtDecode(response.credential);
      	const email = decoded.email;
      	const name = decoded.name;
    	
    	/*
    	// 2. 前端（React）發送登入請求
    	// credentials: "include"
    	fetch('https://localhost:5001/auth/google/callback', {
       		method: 'POST',      
   			headers: {         
  				'Content-Type': 'application/json',  
       		},
       		credentials: "include", 
       		body: JSON.stringify({  
        		provider: 'google',         
  				providerId: response.credential,        
   				email: email, 
   				name: name
     		}),    
   		})         
		.then((res) => res.json())       
  		.then((data) => {         
  			// console.log(data.token);
  			console.log(data);   
  			
  			// navigate("/index");
    	})    
    	.catch((error) => console.log(error))
    	.finally(() => {
    		navigate("/index");
    	});
    	*/
    	
    	try	{
  			await fetch('https://localhost:5001/auth/google/callback', {
       			method: 'POST',      
   				headers: {         
  					'Content-Type': 'application/json',  
       			},
       			credentials: "include", 
       			body: JSON.stringify({  
        			provider: 'google',         
  					providerId: response.credential,        
   					email: email, 
   					name: name
     			}),    
   			});
        	
        	// navigate("/index");
        	// window.location.reload();
        	window.location.href = from;
  		} catch (error)	{
  			console.error("Error during login google:", error);
  		}
  	}
  };  

  return(
    <div className="hero bg-base-200 min-h-screen">
      <div className="justify-center"> 
        <div className="card">
          <div className="card-body"> 
            <div className="form-control mt-6">
              <h1 className="mb-10 text-3xl font-bold text-center">
                電子表單系統
              </h1>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">帳號</span>
              </label> 
              <input type="text" className="input input-bordered" value={username} onChange={handleUsername}/>
            </div>         
            <div className="form-control">
              <label className="label">
                <span className="label-text">密碼</span>
              </label> 
              <input className="input input-bordered" type="password" value={password} onChange={handlePassword}/> 
              <label className="label">
              </label>
            </div> 
            {errorMessage && <><small style={{ color: 'red' }}>{errorMessage}</small><br /></>}<br/>
            <div className="form-control mt-6">
              <input type="button" className="btn btn-success text-white" value={loading ? '登入中...' : '登入'} onClick={handleLogin} disabled={loading} />
            </div>
            
          	<div className="login-buttons">
          		<GoogleLogin
            		onSuccess={handleGoogleResponse}
            		onError={(error) => console.log(error)}
            		useOneTap
            		shape="pill"
            		theme="outline"
            		width="200px"
          		/>
        	</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
