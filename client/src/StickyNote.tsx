import { useState, useEffect } from "react";
import { ObjectId } from "mongodb";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./StickyNote.css";

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

const StickyNoteDraggable: any = Draggable;

function StickyNote(StickyNoteProps: any) {
  const [stickyNoteState, setStickyNoteState] = useState({
    ...StickyNoteProps,
    position: {
      x: StickyNoteProps.last_x_coord,
      y: StickyNoteProps.last_y_coord,
    },
  });

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleStart = (e: any, data: any) => {
    // Calculate the offset between the cursor and the sticky note during the drag start
    const offsetX = data.x - e.clientX;
    const offsetY = data.y - e.clientY;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  // useEffect(() => {
  //   setStickyNoteState({
  //     ...StickyNoteProps,
  //   });
  // }, [StickyNoteProps]);

  // useEffect(()=>{})

  // const handleStart = (e: any, data: any) => {
  //   //console.log("Drag started", data);
  // };

  // const handleDrag = (data: any) => {
  //   //console.log("Dragging", data);
  //   setStickyNoteState((prevState: any) => ({
  //     ...prevState,
  //     position: { x: data.x, y: data.y }, // Update position during drag
  //   }));
  // };
  const handleDrag = (data: any) => {
    // Update the position dynamically during drag with the offset
    const adjustedX = data.x + dragOffset.x;
    const adjustedY = data.y + dragOffset.y;

    setStickyNoteState((prevState: any) => ({
      ...prevState,
      position: { x: adjustedX, y: adjustedY },
    }));
  };

  // const handleStop = (data: any) => {
  //   console.log("Drag stopped", data);
  // };

  // useEffect(() => {
  //   StickyNoteProps.last_x_coord = stickyNoteState.x;
  // }, []);

  function handleStop(data: any) {
    const adjustedX = data.x + dragOffset.x;
    const adjustedY = data.y + dragOffset.y;

    setStickyNoteState((prevState: any) => ({
      ...prevState,
      last_x_coord: adjustedX, // Save the adjusted position without the offset
      last_y_coord: adjustedY,
    }));

    // console.log("Drag stopped", data);
    console.log("last known coordinates: ", data.x);
    console.log("last known coordinates: ", data.y);
    //console.log("StickyNoteProps._id value: ", StickyNoteProps._id);
    console.log("StickyNoteProps._id value: ", StickyNoteProps._id);

    setStickyNoteState((prevState: any) => ({
      ...prevState,
      _id: StickyNoteProps._id,
      last_x_coord: data.x,
      last_y_coord: data.y,
    }));

    fetch("/api/updateCoords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: StickyNoteProps._id,
        last_x_coord: adjustedX,
        last_y_coord: adjustedY,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        //implement
        if (response.success) {
          console.log("Coords updated!");
        } else {
          console.error("Coords not updated.");
        }
      });
  }

  // const handleStop = (data: any) => {
  //   console.log("Drag stopped", data);

  // console.log(stickyNoteState.name);
  // console.log("Last_x_coord: ", stickyNoteState.last_x_coord);
  // console.log("Last_y_coord: ", stickyNoteState.last_y_coord);

  return (
    <div className="stickyNote">
      <StickyNoteDraggable
        bounds="body"
        // axis="x"
        handle=".handle"
        // defaultPosition={{
        //   x: stickyNoteState.last_x_coord,
        //   y: stickyNoteState.last_y_coord,
        // }}
        position={stickyNoteState.position}
        grid={[5, 5]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div className="stickyNoteWrapper">
          <ResizableBox
            className="box"
            width={350}
            height={400}
            // draggableOpts={{ grid: [25, 25] }}
            handle={<span className="custom-handle custom-handle-se" />}
            handleSize={[25, 25]}
            // minConstraints={[150, 150]}
            // maxConstraints={[500, 300]}
            minConstraints={[250, 300]}
            // maxConstraints={[600, 600]}
          >
            <div className="stickyNoteContainer">
              <div className="handle">{StickyNoteProps.name}</div>
              <div className="stickyNoteBody">
                <div>{StickyNoteProps.description}</div>
                {/* <div>{StickyNoteProps.Date}</div> */}
              </div>
            </div>
          </ResizableBox>
        </div>
      </StickyNoteDraggable>
    </div>
  );
}

export default StickyNote;
