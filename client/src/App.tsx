import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./App.css";
import "./StickyNote.css";
// import StickyNote from "./StickyNoteMovableComponent";
import StickyNote from "./StickyNoteResizableComponent";

/**
 * TODO:
 * We want to create an array that stores all the created sticky notes.
 * We then want to use array and display all the relevant sticky notes onto the page.
 * (Relevant means making sure that the date on the page and date on the sticky note matches)
 */

function App() {
  return (
    <>
      <StickyNote />
    </>
  );
}

export default App;
