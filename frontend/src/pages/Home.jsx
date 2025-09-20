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
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-4xl">Home Page</h1>
      <div className="flex flex-col items-center">
        {authenticate ? (
          <div className="flex flex-col items-center">
            <img
              className="w-100"
              src="https://cdn.dribbble.com/userupload/36123166/file/original-a9734bdd6be8e44d9dc67920bfd3d59c.png?resize=1504x1128&vertical=center"
              alt=""
            />
            Signed In{" "}
            <button
              onClick={ifAuth}
              className="text-red-500 cursor-pointer hover:text-red-700"
            >
              Want to Log out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              className="w-100"
              src="https://cdn.dribbble.com/userupload/36144685/file/original-ddd8c87cf90860f59880cefce697a888.png?resize=1600x1200&vertical=center"
              alt=""
            />
            <div className="flex flex-col items-center gap-1">
              Not Logged in want to{" "}
              <Link to="/login">
                <button className="text-blue-500 cursor-pointer">
                  Signing in
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home