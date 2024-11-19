import { useState, useEffect } from "react";
import Draggable from "react-draggable";

interface ListCollection {
  name: string;
  description: string;
  date_created: Date;
}

const StickyNoteTest: any = Draggable;

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

function StickyNoteMovableComponent() {
  const [listCol, setList] = useState<ListCollection[]>([]);

  function getList() {
    fetch("/api/testGet", { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data.name);
        // console.log(data.listCollection.name);
        setList(data.listCollection);
        // console.log(data.listCollection);
      })
      .catch((error) => console.error("Error fetching list:", error));
  }

  useEffect(() => {
    getList();
  }, []);

  const handleStart = (e: any, data: any) => {
    console.log("Drag started", data);
  };

  const handleDrag = (e: any, data: any) => {
    console.log("Dragging", data);
  };

  const handleStop = (e: any, data: any) => {
    console.log("Drag stopped", data);
  };

  return (
    <StickyNoteTest
      className="stickyNoteWrapper"
      bounds="body"
      // axis="x"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[5, 5]}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div className="stickyNoteContainer">
        {/* <div className="handle">Drag from here</div> */}

        <div className="handle">
          {listCol.map((list, index) => (
            <div key={index}>
              <div>Name: {list.name}</div>
            </div>
          ))}
        </div>

        <div className="stickyNoteBody">
          {" "}
          {listCol.map((list, index) => (
            <div key={index}>
              <div>Description: {list.description}</div>
              <div>Date Created: {list.date_created.toString()}</div>
            </div>
          ))}
        </div>
      </div>
    </StickyNoteTest>
  );
}

export default StickyNoteMovableComponent;
