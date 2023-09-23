import { createContext, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";

const Authcontext = createContext();


const AuthProvider = (props) => {

       const [auth, setAuth] = useState({
              user: null,
              token: "",
       });
       //default axios function;
axios.defaults.headers.common["Authorization"] = auth?.token;
       useEffect(() => {
              const data = localStorage.getItem('auth');
              if (data) {
                     const parsed = JSON.parse(data);
                     setAuth({
                            ...auth,
                            user: parsed.user,
                            token: parsed.token,
                     })
              }
              //eslint-disable-next-line
       }, []);

       return (
              <Authcontext.Provider value={[auth, setAuth]}>
                     {props.children}
              </Authcontext.Provider>

       )

};

const useAuth = () => useContext(Authcontext);

export { useAuth, AuthProvider }