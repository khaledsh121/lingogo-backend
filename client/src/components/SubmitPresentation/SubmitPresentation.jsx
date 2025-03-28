import "../SubmitPresentation/SubmitPresentation.css";
import PagesList from "../PagesList/PagesList";
import { useLocation, useNavigate } from "react-router-dom";

const SubmitPresentation = () => {
  const location = useLocation();
  const prevPresentation = location.state?.prevPresentation || [];
  const navigate = useNavigate();
  const handleSavePresentation = () => {
    navigate("/SubmitPresentation");
  };
  return (
    <div className="submit-presentation-container">
      <PagesList active={3} />
      <div className="scroll-div">
        {prevPresentation.map((item) => {
          return (
            <div className="image-container" key={item.id}>
              <img src={item.source} alt={item.nativeLanguage} />
            </div>
          );
        })}

        <div className="save-btn-container">
          <button
            className="save-presentation"
            onClick={handleSavePresentation}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPresentation;
