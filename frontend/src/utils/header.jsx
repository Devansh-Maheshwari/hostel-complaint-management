export const GetAuthHeader = () => {
    return { "content-Type": "application/json" , "authorization" : localStorage.getItem("jwtToken") } 
 }      
 
 