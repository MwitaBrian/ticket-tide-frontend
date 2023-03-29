import { createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
export const AuthContext = createContext();



export default function AuthProvider({children}) 
{
  
    const navigate = useNavigate()

    const [user, setUser] = useState(null);
    console.log(user)
    // login
    const login = (email, password) =>{
        fetch("/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        }
        )
        .then(res=>res.json())
        .then(response=>{
            // utilize
            console.log(response)
            if(response.errors){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.errors,
                  })
            }
            else if (response.user) {
                // set the user token in the session storage
                // Assume that `jwt` contains the JWT token received from the server
              sessionStorage.setItem('jwtToken', response.jwt);
               sessionStorage.setItem('level', response.user.level);
                // navigate to the home page
                navigate("/");
                // show success message 
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Logged in Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                    })

            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }
        })
    }

     // Register
//    const register = (last_name, first_name, phone, email, password) =>{
//     fetch("/users", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         last_name,
//         first_name,
//         phone,
//         email,
//         password
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data); // Update the state variable with the response data
     
//     })
  
// }

// check logged in user
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch("/loggedin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(response => {
        setUser(response);
      })
      .catch(error => console.error('Error:', error));
  }, []);



    
     // Logout
     const logout = () =>{
          sessionStorage.clear();
             navigate("/login");
     }
    
    

    const contextData = {
        login, logout
    }

  return (
    <>
     <AuthContext.Provider value={contextData}>
        {children}
     </AuthContext.Provider>
    </>
  )
}