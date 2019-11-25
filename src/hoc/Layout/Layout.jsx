import React from "react";
import classes from "./Layout.module.css";
import NavBar from "./../../components/Navigation/NavBar/NavBar";

const layout = props => (
  <React.Fragment>
    <header>
      <NavBar
        clickPrev={props.clickPrev}
        clickNext={props.clickNext}
        page={props.page}
      />
    </header>

    <main>{props.children}</main>
  </React.Fragment>
);

export default layout;
