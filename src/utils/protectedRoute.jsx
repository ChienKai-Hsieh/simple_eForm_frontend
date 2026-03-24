import { Navigate, useLocation } from "react-router-dom";
import { getAuthToken } from "./token";

// 1
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  // 2
  const [tokenString, checkToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
  	const fetchData = async () => {
  		try	{
  			const response = await fetch('https://localhost:5001/auth/token/check', {
  				method: "GET", 
  				credentials: "include"
  			});
  			
        	const jsonData = await response.json();
        	console.log(jsonData);
        	checkToken(jsonData);
  		} catch (error)	{
  			console.error("Error during token fetch:", error);
        	checkToken(null);
  		}	finally	{
  			setLoading(false);
  		}
  	};
  	
  	fetchData();
  }, []);
  
  // 3
  if (loading)
  	return <p>驗證中...</p>;
  
  const location = useLocation();
  // 4
  // const token = getAuthToken();
  console.log(tokenString);
  console.log(tokenString.message);

  if(!tokenString.message && location.pathname !== '/login')
    return <Navigate to="/login" state={{ from: location }} replace />;

  if(tokenString.message && location.pathname === '/login')
    return <Navigate to="/index" />
  else
    return children;
};

export default ProtectedRoute;
