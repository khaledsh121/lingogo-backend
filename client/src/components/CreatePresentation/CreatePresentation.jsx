import { useState } from "react";
import "../CreatePresentation/CreatePresentation.css";
import PagesList from "../PagesList/PagesList";
import { Profileimg } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";

const CreatePresentation = () => {
  const navigate = useNavigate();

  const [prevPresentation, setprevPresentation] = useState([
    {
      source: Profileimg,
      nativeLanguage: "profile",
      translation: "الملف الشخصي",
      id: 1,
    },
    {
      source: Profileimg,
      nativeLanguage: "profile",
      translation: "الملف الشخصي",
      id: 2,
    },
    {
      source: Profileimg,
      nativeLanguage: "profile",
      translation: "الملف الشخصي",
      id: 3,
    },
    {
      source: Profileimg,
      nativeLanguage: "profile",
      translation: "الملف الشخصي",
      id: 4,
    },
    {
      source: Profileimg,
      nativeLanguage: "profile",
      translation: "الملف الشخصي",
      id: 5,
    },
    {
      source: Profileimg,
      nativeLanguage: "profile",
      id: 6,
      translation: "الملف الشخصي",
    },
    {
      source: Profileimg,
      nativeLanguage: "profile",
      translation: "الملف الشخصي",
      id: 7,
    },
  ]);

  const handleFinishPresentationClick = () => {
    navigate("/SubmitPresentation", { state: { prevPresentation } });
  };
  const [nativeLanguageInput, setNativeLanguageInput] = useState("");
  const handleUserChangeInput = (event) => {
    setNativeLanguageInput(event.target.value);
  };

  return (
    <div className="create-presentation-container">
      <PagesList active={2} />
      <div className="create-proccess">
        <div className="show-all-slides">
          {prevPresentation.map((item) => {
            return (
              <div className="Previous-slide" key={item.id}>
                <img src={item.source} alt={item.nativeLanguage} />
              </div>
            );
          })}
          <button>+</button>
        </div>
        <div className="create-presentation-process">
          <div className="native-language-input-container">
            <select>
              <option>en</option>
              <option>ar</option>
            </select>
            <input
              type="text"
              value={nativeLanguageInput}
              onChange={handleUserChangeInput}
              placeholder="Write ..."
            />
          </div>
          <img src={null} alt={""} />
          <label>{"translation"}</label>
        </div>
        <div className="finsh-presentation-btn-container">
          <button onClick={handleFinishPresentationClick}>finish</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePresentation;
