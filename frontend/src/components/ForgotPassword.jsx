import React, { useContext } from "react";
import { Context } from "../Context/Context";
import axios from "axios";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { emailorphone, setEmailorphone, navigate, backendurl } =
    useContext(Context);
  async function formHandler(e) {
    e.preventDefault();

    const datatosend = {};

    if (isValidEmail(emailorphone)) {
      datatosend.email = emailorphone;
    } else if (isValidPhone(emailorphone)) {
      datatosend.phone = emailorphone;
    } else {
      toast.error("Invalid Credentials");
      setEmailorphone("");
      return;
    }

    try {
      // console.log("password changed Successfully");

      const response = await axios.post(backendurl + "/send-otp", datatosend);

      //here once user submitted then the user will redirected to Verify OTP if verified then the user is redirected to setPassword page once set then redirected to home page
      // toast.success("User Registered Successfully")
      if (response.data.success) {
        toast.success("OTP Sent");
        navigate("/verify-otp");
      } else {
        toast.error("Invalid Credential");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function isValidEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  }

  function isValidPhone(input) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(input);
  }

  return (
    <div className="flex flex-col items-center px-5 w-140 py-10 shadow-2xl rounded-2xl bg-gray-50">
      <div className="flex gap-7 mb-4">
        <h2 className="text-xl text-gray-600 px-5 rounded py-2">
          Forget Password
        </h2>
        {/* <h2 className="text-xl bg-gray-200 hover:bg-gray-300 px-5 border rounded py-2">Signup</h2> */}
      </div>
      <form
        onSubmit={formHandler}
        className="flex w-full flex-col gap-6 items-center rounded py-4"
        action="submit"
      >
        <div className="flex flex-col w-3/4">
          <label className="text-lg text-gray-500" htmlFor="">
            Enter Email/Number
          </label>
          <input
            type="text"
            className="border text-gray-700 rounded h-10 outline-none px-2 my-2 border-gray-300"
            value={emailorphone}
            onChange={(e) => setEmailorphone(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="border rounded bg-gray-400 hover:bg-gray-500 px-4 py-2 text-gray-100 border-gray-500"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
