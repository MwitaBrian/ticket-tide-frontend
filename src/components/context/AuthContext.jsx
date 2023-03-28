import { createContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

export const AuthContext = createContext();



export default function AuthProvider({children}) 
{
    const navigate = useNavigate()
    // login
    const login = (username, password) =>{
        fetch("/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
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
                sessionStorage.setItem("userToken", response.user.token);
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
    const register = (last_name, first_name, phone, email,password) =>{
        fetch(`/users`, {
            method: "POST",
             headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                last_name,first_name,email, phone, password
            })
            
        })
            .then((res) => (res.json))
            .then(response => {
            console.log(response)
        })
    }
// check logged in user
    useEffect(() => {
        fetch("/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
           
        }
        )
            .then(res => res.json())
            .then(response => { })
    }, []);
     // Logout
     const logout = () =>{
           console.log("Hello from context")
     }
    
    

    const contextData = {
        login, register, logout
    }

  return (
    <>
     <AuthContext.Provider value={contextData}>
        {children}
     </AuthContext.Provider>
    </>
  )
}