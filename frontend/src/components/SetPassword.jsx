import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { toast } from "react-toastify";
import axios from "axios";

const SetPassword = () => {
  const {
    password,
    setPassword,
    setAuthenticate,
    navigate,
    backendurl,
    emailorphone,
    setEmailorphone,
  } = useContext(Context);

  const [tempPassword, setTempPassword] = useState("");

  const datatosend = { password: password };

  if (isValidEmail(emailorphone)) {
    datatosend.email = emailorphone;
  } else if (isValidPhone(emailorphone)) {
    datatosend.phone = emailorphone;
  } else {
    // toast.error("Invalid Credentials");
    return;
  }

  async function formHandler(e) {
    e.preventDefault();
    try {
      if (password === tempPassword) {
        const response = await axios.post(
          backendurl + "/set-password",
          datatosend
        );

        if (response.data.success) {
          setPassword("");
          setTempPassword("");
          setEmailorphone("");
          toast.success("User Registered Successfully");
          setAuthenticate(true);
          navigate("/");
        }
      } else {
        toast.error("Passwords are not matching")
      }
      // 
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
          Set Password
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
            Enter New Password
          </label>
          <input
            type="text"
            className="border text-gray-700 rounded h-10 outline-none px-2 my-2 border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-3/4">
          <label className="text-lg text-gray-500" htmlFor="">
            Re-Enter Password
          </label>
          <input
            type="text"
            className="border text-gray-700 rounded h-10 outline-none px-2 my-2 border-gray-300"
            value={tempPassword}
            onChange={(e) => setTempPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="border rounded bg-gray-400 hover:bg-gray-500 px-4 py-2 text-gray-100 border-gray-500"
        >
          Set
        </button>
      </form>
    </div>
  );
};

export default SetPassword;
