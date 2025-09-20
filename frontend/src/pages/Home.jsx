import React, { useContext } from "react";
import Login from '../components/Login';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';

const Home = () => {
const { authenticate, setAuthenticate } = useContext(Context);
  
  function ifAuth() {
    setAuthenticate(prev => !prev)
  }

  
  return (
    <div className="flex flex-col items-center">
      HOME PAGE
      {authenticate ? (
        <div>
          Signed In{" "}
          <button
            onClick={ifAuth}
            className="text-red-500 cursor-pointer hover:text-red-700"
          >
            Want to Log out
          </button>
        </div>
      ) : (
        <>
          <h1 className="flex gap-1">
            Not Logged In want to{" "}
            <Link to="/login">
              <button className="text-blue-500 cursor-pointer">
                Signing in
              </button>
            </Link>
          </h1>
        </>
      )}
    </div>
  );
}

export default Home