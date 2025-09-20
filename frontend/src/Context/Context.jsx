import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Context = createContext();

export const AppContext = (props) => {
    const [emailorphone, setEmailorphone] = useState("");
    const [check, setCheck] = useState(false);
    const [password, setPassword] = useState("");
    const [authenticate, setAuthenticate] = useState(false);
    const [otp, setOTP] = useState(""); 
    const navigate = useNavigate();
    const backendurl = import.meta.env.VITE_BACKEND_URL;

  const Change = () => {
        const newCheck = !check;
        setCheck(newCheck);
        if (newCheck) {
          navigate("/signup");
        } else {
          navigate("/login");
        }
    };
    

    const value = {
      emailorphone,
      setEmailorphone,
      check,
      setCheck,
      password,
      setPassword,
      authenticate,
      setAuthenticate,
      otp,
      setOTP,
      navigate,
      Change,
      backendurl
    };


  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
