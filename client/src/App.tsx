import { useState, useEffect } from "react";
import { ObjectId } from "mongodb";
import Draggable from "react-draggable";
import "./App.css";
import StickyNote from "./StickyNote";
import Clock from "./ClockLayer";

/**
 * TODO:
 * We want to create an array that stores all the created sticky notes.
 * We then want to use array and display all the relevant sticky notes onto the page.
 * (Relevant means making sure that the date on the page and date on the sticky note matches)
 */
let dateTime = new Date();

interface StickyNoteProp {
  _id: string;
  name: string;
  description: string;
  date_created: Date;
  last_x_coord: number;
  last_y_coord: number;
}

function App() {
  const [stickyNotes, setStickyNotes] = useState<StickyNoteProp[]>([]);
  // const today = new Date().toDateString();

  // const handleStop = (data: any) => {
  //   console.log("stopped");
  // };

  useEffect(() => {
    fetch("/api/testGet", { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setStickyNotes(data.listCollection || []);
      })
      .catch((error) => console.error("Error fetching sticky notes:", error));
  }, []);

  return (
    <>
      <div className="appContainer">
        <div className="clockContainer">
          <div className="clockWrapper">
            <Clock />
          </div>
        </div>
        <div className="App">
          {stickyNotes.map((note) => (
            <StickyNote
              _id={note._id}
              name={note.name}
              description={note.description}
              date_created={new Date(note.date_created)}
              last_x_coord={note.last_x_coord}
              last_y_coord={note.last_y_coord}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
