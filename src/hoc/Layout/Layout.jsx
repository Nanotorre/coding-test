import React from "react";
import NavBar from "./../../components/Navigation/NavBar/NavBar";

const layout = props => (
  <React.Fragment>
    <header>
      <NavBar
        clickPrev={props.clickPrev}
        clickNext={props.clickNext}
        page={props.page}
        lastPage={props.lastpage}
        clicked={props.clicked}
      />
    </header>

    <main>{props.children}</main>
  </React.Fragment>
);

export default layout;
