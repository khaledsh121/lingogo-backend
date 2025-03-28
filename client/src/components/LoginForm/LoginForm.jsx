import "../LoginForm/LoginForm.css";
import { UserIcon, PasswordIcon } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";
import ConnectWithSocial from "../ConnectWithSocial/ConnectWithSocial";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/dashboard");
  };

  const handleSignupClick = () => {
    navigate("/Signup");
  };

  return (
    <form className="login-form">
      <div className="creidntials-container">
        <h1 className="login-header">Login</h1>
        <div className="input-container">
          <input type="text" className="input" placeholder="Username" />
          <img src={UserIcon} alt="user icon" className="icns" />
        </div>
        <div className="input-container">
          <input type="password" className="input" placeholder="password" />
          <img src={PasswordIcon} alt="Password Icon" className="icns" />
        </div>
        <button className="login-btn" onClick={handleLoginClick}>
          Login Now
        </button>
        <div onClick={handleSignupClick} className="or-Signup">
          or Signup
        </div>
      </div>
      <ConnectWithSocial LOS={"Login"} />
    </form>
  );
};

export default LoginForm;
