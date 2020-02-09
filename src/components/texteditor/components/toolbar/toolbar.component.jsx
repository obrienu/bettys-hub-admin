import "./toolbar.style.scss";
import React, { Component } from "react";
import Icons from "../icon/icon.component";
import { inlineStyle, BLOCK_TYPES } from "../../assets/toolbar.data";

export class ToolBar extends Component {
  render() {
    const inlineButtons = inlineStyle.map(icon => (
      <Icons
        key={icon.style}
        isActive={this.props.activeInline(icon.style)}
        style={icon.style}
        label={icon.label}
        onClick={this.props.inlineStyle}
      />
    ));
    const blockButtons = BLOCK_TYPES.map(icon => (
      <Icons
        key={icon.style}
        isActive={this.props.activeBlock(icon.style)}
        style={icon.style}
        label={icon.label}
        onClick={this.props.blockStyle}
      />
    ));
    return (
      <div className="ToolBar">
        {inlineButtons} {blockButtons}
      </div>
    );
  }
}

export default ToolBar;
