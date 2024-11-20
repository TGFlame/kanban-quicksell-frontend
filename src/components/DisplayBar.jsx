import React, { useState } from "react";
import ThreeDotMenu from "../assets/icons_FEtask/down.svg";
import Display from "../assets/icons_FEtask/Display.svg";
import { useNavigate } from "react-router-dom";
import "./DisplayBar.css";

const DisplayBarStyle = {
  background: "whitesmoke",
  padding: "0.5rem",
  paddingLeft: "7rem",
  display: "flex",
  alignItems: "center",
};

const DisplayBarItemsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "black",
  position: "relative",
  padding: "0 0.5rem",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "0.3rem",
};

const popupStyle = {
  position: "absolute",
  top: "2.5rem",
  left: "0",
  background: "white",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "0.25rem",
  padding: "1rem",
  zIndex: 1000,
  minWidth: "150px",
  height: "auto",
  width: "300px"
};

const DisplayBar = () => {
  const navigate = useNavigate();
  const [groupingValue, setGroupingValue] = useState("status");
  const [sortingValue, setSortingValue] = useState("priority"); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleGroupingChange = (event) => {
    const selectedValue = event.target.value;
    setGroupingValue(selectedValue);
    console.log("Selected grouping:", selectedValue);
    if (selectedValue === "status") {
      navigate("/");
    } else if (selectedValue === "priority") {
      navigate("/priority");
    } else if (selectedValue === "users") {
      navigate("users");
    }
    setIsPopupVisible(false);
  };

  const handleSortingChange = (event) => {
    const selectedValue = event.target.value;
    setSortingValue(selectedValue);
    console.log("Selected sorting:", selectedValue);

    if (selectedValue === "priority") {
      navigate("/sort/priority");
    }

    if (selectedValue === "title") {
      navigate("/sort/title");
    }
    setIsPopupVisible(false);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="navbar" style={DisplayBarStyle}>
      <div className="navbar-items" style={DisplayBarItemsStyle}>
        <div onClick={togglePopup} style={{ cursor: "pointer" }}>
          <img src={Display} alt="Display Icon" />
        </div>
        <div onClick={togglePopup} style={{ cursor: "pointer" }}>
          Display
        </div>
        <div>
          <img
            src={ThreeDotMenu}
            alt="Dropdown Menu"
            style={{ cursor: "pointer" }}
            onClick={togglePopup}
          />
          {isPopupVisible && (
            <div className="popup" style={popupStyle}>
              <div>
                <label htmlFor="grouping" style={{color:"grey"}}>Grouping:</label>
                <select
                  className="pop-select"
                  name="grouping"
                  id="grouping"
                  value={groupingValue}
                  onChange={handleGroupingChange}
                  style={{ fontSize: "0.9rem" }}
                >
                  <option value="status">Status</option>
                  <option value="priority">Priority</option>
                  <option value="users">User</option>
                </select>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="sorting" style={{ color:"grey"}}>Sorting: </label>
                <select
                  className="pop-select"
                  name="sorting"
                  id="sorting"
                  value={sortingValue}
                  onChange={handleSortingChange}
                  style={{ fontSize: "0.9rem" }}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayBar
