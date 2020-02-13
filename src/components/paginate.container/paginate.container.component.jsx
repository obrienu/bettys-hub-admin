import React, { Component } from "react";
import "./paginate.container.style.scss";
import PaginateConsole from "../paginate.console/paginate.console.component";

export class PaginateContainer extends Component {
  render() {
    const { pages, onClick, active } = this.props;
    let console = [];
    for (let i = 0; i < pages; i++) {
      console.push(
        <PaginateConsole
          onClick={onClick}
          key={Math.random() * i}
          page={i + 1}
          active={active}
        />
      );
    }
    return <div className="PaginateContainer">{console}</div>;
  }
}

export default PaginateContainer;
