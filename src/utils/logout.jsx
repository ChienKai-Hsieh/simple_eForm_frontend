import { clearAuthToken } from "./token";
import { Navigate } from "react-router-dom";

import { useEffect, useState } from 'react';

const Logout = () => {
    // clearAuthToken();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
  		const removeData = async () => {
  			try	{
  				const response = await fetch('https://localhost:5001/auth/token/delete', {
  					method: "GET", 
  					credentials: "include"
  				});
  			} catch (error)	{
  				console.error("Error during token fetch:", error);
  			}	finally	{
  				setLoading(false);
  			}
  		};
  		
  		removeData();
  	}, []);
  	
  	if (loading)
  		return <p>驗證中...</p>;
    
    // return <Navigate to="/login" />
	window.location.href = "/login";
};

export default Logout
