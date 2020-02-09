import React, { Component } from "react";
import {
  EditorState,
  Editor as DraftEditor,
  RichUtils,
  convertToRaw
} from "draft-js";
import "./editor.style.scss";
import ToolBar from "./components/toolbar/toolbar.component";
import { styleMap } from "./assets/editorstyleFunction";

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => {
      this.setState({ editorState });
      this.props.getEditorContent(
        JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
      );
    };
    this.handleinlineStyling = this.handleinlineStyling.bind(this);
    this.handleBlockStyle = this.handleBlockStyle.bind(this);
    this.checkActiveBlock = this.checkActiveBlock.bind(this);
    this.checkActiveInline = this.checkActiveInline.bind(this);
  }

  handleinlineStyling(style) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }
  handleBlockStyle(style) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
  }

  checkActiveInline(style) {
    const { editorState } = this.state;
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  }

  checkActiveBlock(style) {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    return style === blockType;
  }

  render() {
    return (
      <div className="EditorContainer">
        <ToolBar
          activeBlock={this.checkActiveBlock}
          activeInline={this.checkActiveInline}
          blockStyle={this.handleBlockStyle}
          inlineStyle={this.handleinlineStyling}
        />
        <div className="EditorWrapper">
          <DraftEditor
            customStyleMap={styleMap}
            placeholder="Explore Text ................"
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default Editor;
