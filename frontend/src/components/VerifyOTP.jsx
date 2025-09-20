import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import { Context } from "../Context/Context";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyOTP = () => {
  const { otp, setOTP, navigate, backendurl, emailorphone } =
    useContext(Context);

  const datatosend = { otp: otp };

  if (isValidEmail(emailorphone)) {
    datatosend.email = emailorphone;
  } else if (isValidPhone(emailorphone)) {
    datatosend.phone = emailorphone;
  } else {
    toast.error("Invalid Credentials");
    return;
  }

  async function formHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(backendurl + "/verify-otp", datatosend);
      console.log(response);

      if (response.data.success) {
        toast.success("Verified");
        setOTP("");
        navigate("/setpassword");
      } else {
        toast.error("Invalid OTP, Please Re-Enter")
        return;
      }
    } catch (error) {
      console.log(error)
    }

    //here we are going to navigate from this page to setpassord page - navigate('/setpassword')
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
        <h2 className="text-xl text-gray-600 px-5 rounded py-2">Verify OTP</h2>
      </div>
      <form
        onSubmit={formHandler}
        className="flex w-full flex-col gap-6 items-center rounded py-4"
        action="submit"
      >
        <div className="flex flex-col w-3/4">
          <label className="text-lg text-gray-500">Enter OTP</label>
          <input
            type="text"
            className="border text-gray-700 rounded h-10 outline-none px-2 my-2 border-gray-300"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="border rounded bg-gray-400 hover:bg-gray-500 px-4 py-2 text-gray-100 border-gray-500"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
