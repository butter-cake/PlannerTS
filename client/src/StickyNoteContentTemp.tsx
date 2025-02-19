import debounce from "lodash.debounce";
import { useState, useEffect } from "react";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import "./StickyNoteContentTemp.css";

import sanitizeHtml from "sanitize-html";

interface StickyNoteContentProps {
  description: string;
  _id: string;
}

function StickyNoteContentTemp({ description, _id }: StickyNoteContentProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
    onUpdate: ({ editor }) => {
      const currentContent = editor.getHTML();
      updateDescription(currentContent, _id);
    },
  });

  const updateDescription = debounce(
    async (newDescription: string, localID: string) => {
      // console.log(newDescription);
      // console.log(localID);
      const sanitizedDescription = sanitizeHtml(newDescription);

      await fetch("/api/testPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id, description: sanitizedDescription }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            // console.log("Coords updated!");
          } else {
            // console.error("Coords not updated.");
          }
        });
    },
    400
  );

  // Synchronizes editor content with description prop
  // Also updates description to database
  useEffect(() => {
    if (editor && description !== editor.getHTML()) {
      editor.commands.setContent(description);
    }
  }, [description, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="stickyNoteContentBody">
      <div className="stickyNoteButtons">
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
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            Left
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "is-active" : ""}
          >
            Highlight
          </button>
        </div>
      </div>
      <div className="stickyNoteText">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default StickyNoteContentTemp;
