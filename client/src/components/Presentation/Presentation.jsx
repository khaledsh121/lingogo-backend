import "../Presentation/Presentation.css";
import PagesList from "../PagesList/PagesList";
import { ToDoList } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";

const Presentation = () => {
  const userPresentations = [];
  const navigate = useNavigate();

  const handleCreatePresentationClick = () => {
    navigate("/CreatePresentation");
  };

  return (
    <div className="presentation-container">
      <PagesList active={2} />
      <div className="create-presentation">
        <div
          className="create-presentation-start-btn"
          onClick={handleCreatePresentationClick}
        >
          <div className="create-presentation-start-text">
            <span>+</span>
            <p>Create presentation</p>
          </div>
        </div>
        {userPresentations.length > 0 ? (
          <scroll className="scroll">
            {userPresentations.map((item) => {
              return (
                <div className="pre">
                  {/* <img src={item[0].ImgSrc} alt="user presentation img" /> */}
                </div>
              );
            })}
          </scroll>
        ) : (
          <img src={ToDoList} alt="to Do List" />
        )}
      </div>
    </div>
  );
};

export default Presentation;
