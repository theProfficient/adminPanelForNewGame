import "./WorkCardStyle.css";
import React from 'react';
import { NavLink,useNavigate } from "react-router-dom";
import Cricket from "./games/Cricket"

const WorkCard = (props) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
        if (props.view === '/games/cricket') {
          navigate('/games/cricket');
        }else if(props.view === '/games/snakeLadder') {
            navigate('/games/snakeLadder')
        }else {
          // Handle navigation for other routes
          // For example, navigate to a different component
          // or redirect to a different page
          navigate('/some/other/route');
        }
      };
      
      const handleClickOnGroups = () => {

        if (props.Groups === '/games/cricket/Groups') {
          navigate('/games/cricket/Groups');
        }else if(props.Groups === '/games/snakeLadder/Groups') {
            navigate('/games/snakeLadder/Groups')
        }else {
          // Handle navigation for other routes
          // For example, navigate to a different component
          // or redirect to a different page
          navigate('/some/other/route');
        }
      };
      
  
    return (
      <div className="games-card">
        <img src={props.pc} alt="pc" />
        <h2 className="games-title">{props.title}</h2>
        <div className="pro-details">
          <p>{props.text}</p>
          <div className="pro-btns">
            <button className="btn" onClick={handleClick}>
              View
            </button>
            <button className="btn" onClick={handleClickOnGroups}>
              Groups
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default WorkCard;
  