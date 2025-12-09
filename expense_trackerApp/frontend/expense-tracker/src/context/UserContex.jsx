// import react ,{Children, createContext,useState} from "react"


// export const UserContext = createContext();

// const UserProvider = ({ Children }) => {
//     const [user,setUser]= useState(null);

//     //Function to update User Data
//     const updateUser = (userData) => {
//         setUser(userData);
//     };

//     //Function to clean User Data (e.g on logout)

//     const cleanUser = () =>{
//         setUser(null);
//     };

//     return(
//         <UserContext.Provider
//           value={{
//             user,
//             updateUser,
//             cleanUser,
//           }}
//           >
//          {Children}
//          </UserContext.Provider>
//     );
// }

// export default UserProvider;
import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to update User Data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clean User Data (e.g., on logout)
  const cleanUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        cleanUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
