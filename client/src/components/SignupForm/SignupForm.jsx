import "../SignupForm/SignupForm.css";
import { UserIcon, PasswordIcon } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";
import ConnectWithSocial from "../ConnectWithSocial/ConnectWithSocial";
const SignupForm = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/dashboard");
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <form className="signup-form">
      <div className="creidntials-container">
        <h1 className="signup-header">sign up</h1>
        <div className="signup-inputs">
          <div className="inputs-container">
            <div className="input-container">
              <input type="text" className="input" placeholder="Username" />
              <img src={UserIcon} alt="user icon" className="icns" />
            </div>
            <div className="input-container">
              <input type="email" className="input" placeholder="Email" />
              <img src={UserIcon} alt="user icon" className="icns" />
            </div>
          </div>
          <div className="inputs-container">
            <div className="input-container">
              <input type="password" className="input" placeholder="password" />
              <img src={PasswordIcon} alt="Password Icon" className="icns" />
            </div>
            <div className="input-container">
              <input
                type="password"
                className="input"
                placeholder="Confirm Your Password"
              />
              <img src={PasswordIcon} alt="Password Icon" className="icns" />
            </div>
          </div>
        </div>
        <button className="signup-btn" onClick={handleSignupClick}>
          Sign up Now
        </button>
        <div onClick={handleLoginClick} className="or-login">
          or Log in
        </div>
      </div>
      <ConnectWithSocial LOS={"sign up"} />
    </form>
  );
};

export default SignupForm;
