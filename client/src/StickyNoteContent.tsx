import { useState, useEffect } from "react";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./StickyNoteContent.css";

interface StickyNoteContentProps {
  description: string;
  editor: Editor;
}

function StickyNoteContent({ description, editor }: StickyNoteContentProps) {
  // setDescription({ description: description });
  return (
    // setDescription({ description: description });
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

export default ({ description }: StickyNoteContentProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    // content: "asdfsd",
    content: description,
    // content: ,
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <StickyNoteContent description={description} editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

//   return <div>{description}</div>;

// export default StickyNoteContent;
