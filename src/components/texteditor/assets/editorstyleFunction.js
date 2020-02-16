import React from "react";
import { Entity } from "draft-js";

export const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
    color: "#fff"
  },
  HIGHLIGHT: {
    backgroundColor: "yellow"
  }
};

export const myBlockStyleFn = contentBlock => {
  const type = contentBlock.getType();
  if (type === "blockquote") {
    return "superFancyBlockquote";
  } else if (type === "unordered-list-item" || type === "ordered-list-item") {
    return "myUnorderedListItem";
  }
};

export const mediaBlockRenderer = block => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false
    };
  }
  return null;
};

const Image = props => {
  return <img src={props.src} alt="img" />;
};

const Media = props => {
  const entity = Entity.get(props.block.getEntityAt(0));

  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === "image") {
    media = <Image src={src} />;
  }

  return media;
};
