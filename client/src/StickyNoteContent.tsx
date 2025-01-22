import debounce from "lodash.debounce";
import { useState, useEffect } from "react";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./StickyNoteContent.css";

// Define the component props interface
interface StickyNoteContentProps {
  description: string;
  editor: Editor;
  _id: string;
}

function StickyNoteContent({
  description,
  editor,
  _id,
}: StickyNoteContentProps) {
  return (
    <div className="stickyNoteContent">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </button>
      </div>
    </div>
  );
}

export default ({ description, _id }: StickyNoteContentProps) => {
  // Local state for the description
  const [localDescription, setLocalDescription] = useState<string>(description);
  const [localID, setID] = useState<string>(_id);

  // Set up the editor instance
  const editor = useEditor({
    extensions: [StarterKit],
    content: description, // Initial content from the description
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
  });

  // Debounced function to handle updating the description in the database
  const updateDescription = debounce(
    async (newDescription: string, localID: string) => {
      console.log(newDescription);
      console.log(localID);

      await fetch("/api/testPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: localID, description: newDescription }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            console.log("Coords updated!");
          } else {
            console.error("Coords not updated.");
          }
        });
    },
    400
  ); // 1000ms debounce to limit the frequency of requests

  // Effect hook to update the content in the editor when the description changes
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(localDescription); // Update editor content when description changes
    }
  }, [localDescription, editor]);

  // Handle changes in the input field and update both the local state and the server
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    setLocalDescription(newDescription); // Update local state
    updateDescription(newDescription, localID); // Call the debounced function to update the server
  };

  // If editor is not initialized, return null
  if (!editor) {
    return null;
  }

  return (
    <>
      <StickyNoteContent
        description={localDescription}
        editor={editor}
        _id={localID}
      />
      <EditorContent editor={editor} />
      {/* <input
        type="text"
        value={localDescription}
        onChange={handleChange} // Attach the change handler
      /> */}
    </>
  );
};
