import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const {
    emailorphone,
    setEmailorphone,
    setPassword,
    password,
    navigate,
    Change,
    setAuthenticate,
    backendurl,
  } = useContext(Context);

  // const [emailorphone, setEmailorphone] = useState("");
  // const [password, setPassword] = useState("");

  console.log("This is login component");

  async function formHandler(e) {
    e.preventDefault();

    const sendData = { password: password };

    if (isValidEmail(emailorphone)) {
      sendData.email = emailorphone;
    } else {
      sendData.phone = emailorphone;
    }

    try {
      const response = await axios.post(backendurl + "/signin", sendData);
      console.log(response);
      if (response.data.success) {
        toast.success("Logged in Successfuly");
        setEmailorphone("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Login failed");
      }
      console.log("Error at Login Component", error);
    }

    // alert(name +"\n"+ email);
    setAuthenticate((prev) => !prev);
  }

  function forgot() {
    navigate("/forgotpassword");
  }

  function isValidEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  }

  return (
    <div>
      <div className="flex flex-col items-center px-5 w-140 py-10 shadow-2xl rounded-2xl bg-gray-50">
        <div className="flex gap-7 mb-4">
          <h2 className="text-xl text-gray-600 px-5 rounded py-2">Login</h2>
          {/* <h2 className="text-xl bg-gray-200 hover:bg-gray-300 px-5 border rounded py-2">Signup</h2> */}
        </div>
        <form
          onSubmit={formHandler}
          className="flex w-full flex-col gap-6 items-center rounded py-4"
          action="submit"
        >
          <div className="flex flex-col w-3/4">
            <label className="text-lg text-gray-500" htmlFor="">
              Enter Email/Phone
            </label>
            <input
              type="text"
              className="border text-gray-700 rounded h-10 outline-none px-2 my-2 border-gray-300"
              value={emailorphone}
              onChange={(e) => setEmailorphone(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-3/4">
            <label className="text-lg text-gray-500" htmlFor="">
              Enter Password
            </label>
            <input
              type="text"
              className="border text-gray-700 rounded h-10 outline-none px-2 my-2 border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="border rounded bg-gray-400 hover:bg-gray-500 px-4 py-2 text-gray-100 border-gray-500"
          >
            Login
          </button>
        </form>
        {/* <div className="flex items-center gap-3 my-4">
        <hr className="border-none h-[1px] bg-gray-400 w-full" />
        <p>More</p>
        <hr className="border-none h-[1px] bg-gray-400 w-full" />
      </div> */}
        <div className="flex justify-evenly w-170">
          <p className="mt-3 text-xs">
            Not a Member{" "}
            <button onClick={Change} className="text-blue-700 cursor-pointer">
              Register
            </button>
          </p>
          <p className="mt-3 text-xs">
            <button onClick={forgot} className="text-blue-700 cursor-pointer">
              Forgot Password
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
