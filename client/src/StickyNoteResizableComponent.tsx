import { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import StickyNoteMovableComponent from "./StickyNoteMovableComponent";
import "./StickyNoteResizableComponent.css";

/**
 * TODO:
 * Instead of hard coding the stick note values, create a new instance
 * of a sticky note for every new list item.
 *
 * We also want to be able to change the contents inside the sticky note,
 * such as deleting and editting.
 *
 * A newly created sticky note should be filled with filler data:
 * the header should be: add a title
 * and the body should be: start typing
 */

function StickyNoteResizableComponent() {
  return (
    <>
      <ResizableBox
        className="box"
        width={400}
        height={400}
        // draggableOpts={{ grid: [25, 25] }}
        handle={<span className="custom-handle custom-handle-se" />}
        handleSize={[25, 25]}
        // minConstraints={[150, 150]}
        // maxConstraints={[500, 300]}
        // minConstraints={[300, 300]}
        // maxConstraints={[600, 600]}
      >
        <span className="text">{/* <StickyNoteMovableComponent /> */}</span>
      </ResizableBox>
    </>
  );
}

export default StickyNoteResizableComponent;
