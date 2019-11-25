import React from "react";
import classes from "./MemberDetail.module.css";
import Button from "../UI/Button/Button";

const memberDetail = props => {
  const addDefaultSrc = ev =>
    (ev.target.src = "http://localhost:5000/defaultUserImage.png");

  return (
    <div key={props.id} className={classes.MemberDetail}>
      <div className={classes.upperContainer}>
        <div className={classes.imgContainer}>
          <img
            src={props.image}
            alt={`${props.name} profile`}
            onError={addDefaultSrc}
          />
        </div>
        <div className={classes.textContainer}>
          <h3>Name:</h3>
          <p>{props.name}</p>
          <h3>Age:</h3>
          <p>{props.age}</p>
        </div>
      </div>
      <div className={classes.lowerContainer}>
        <h3>Bio:</h3>
        <p>{props.bio}</p>
        <Button clicked={props.clicked} btnType={"goBack"} className={classes.goBackBtn}>
          Go Back
        <span class="icon">
          <i class="fas fa-2x fa-times"></i>
        </span>
        </Button>
      </div>
    </div>
  );
};
export default memberDetail;
