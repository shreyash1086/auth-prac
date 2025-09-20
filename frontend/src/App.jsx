import Signup from "./components/Signup";
import Login from "./components/Login";
import {Routes, Route, Link} from "react-router-dom"
import SetPassword from "./components/SetPassword";
import Home from "./pages/Home";
import VerifyOTP from "./components/VerifyOTP";
import {ToastContainer} from "react-toastify"
import ForgotPassword from "./components/ForgotPassword";

function App() {

  return (
    <>
      <div className="flex justify-center h-[100vh] items-center">
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/setpassword" element={<SetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>        {/* <VerifyOTP/>   */}
      </div>
    </>
  );
}

export default App
