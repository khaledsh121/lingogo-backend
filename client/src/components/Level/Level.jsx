import "../Level/Level.css";
import PagesList from "../PagesList/PagesList";
import { NewWorld, Heart } from "../../AssetsFolder/Images";
// import { useLocation } from "react-router-dom";

const Level = () => {
  // const location = useLocation();
  // const curentLevel = location.state?.index || undefined;

  return (
    <div className="level-container">
      <PagesList active={3} />
      <div className="qustion-container">
        <div className="header">
          <div className="new-world-container">
            <img src={NewWorld} alt="circle" />
            <span>New Word</span>
          </div>
          <div className="horzntal-line" />
          <div className="lifes-container">
            <img src={Heart} alt="Heart" />
            <span>3</span>
          </div>
        </div>
        <h1>which of these is “milk” ?</h1>
        <div className="answer-container">
          <div className="answer-card">
            <img src="" alt="" />
            <span></span>
          </div>
          <div className="answer-card">
            <img src="" alt="" />
            <span></span>
          </div>
          <div className="answer-card">
            <img src="" alt="" />
            <span></span>
          </div>
        </div>
        <div className="btn-container">
          <button>next</button>
          <button>skip</button>
        </div>
      </div>
    </div>
  );
};

export default Level;
