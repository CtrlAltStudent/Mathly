"use client";

import { useEditor, EditorContent, Tiptap } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Mathematics } from "@tiptap/extension-mathematics";
import "katex/dist/katex.min.css";
import { useState } from "react";

type MaterialEditorProps = {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const [showMathModal, setShowMathModal] = useState(false);
  const [mathLatex, setMathLatex] = useState("");
  const [mathBlock, setMathBlock] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  if (!editor) return null;

  const addMath = () => {
    if (mathLatex.trim()) {
      if (mathBlock) {
        editor.chain().focus().insertBlockMath({ latex: mathLatex }).run();
      } else {
        editor.chain().focus().insertInlineMath({ latex: mathLatex }).run();
      }
      setMathLatex("");
      setShowMathModal(false);
    }
  };

  const addImage = () => {
    if (imageUrl.trim()) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageModal(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded px-2 py-1 text-sm ${editor.isActive("bold") ? "bg-mathly-200" : "hover:bg-slate-200"}`}
        title="Pogrubienie"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded px-2 py-1 text-sm ${editor.isActive("italic") ? "bg-mathly-200" : "hover:bg-slate-200"}`}
        title="Kursywa"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`rounded px-2 py-1 text-sm ${editor.isActive("heading", { level: 2 }) ? "bg-mathly-200" : "hover:bg-slate-200"}`}
        title="Nagłówek 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded px-2 py-1 text-sm ${editor.isActive("bulletList") ? "bg-mathly-200" : "hover:bg-slate-200"}`}
        title="Lista punktowana"
      >
        •
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded px-2 py-1 text-sm ${editor.isActive("orderedList") ? "bg-mathly-200" : "hover:bg-slate-200"}`}
        title="Lista numerowana"
      >
        1.
      </button>
      <span className="mx-1 w-px bg-slate-300" />
      <button
        type="button"
        onClick={() => setShowMathModal(true)}
        className="rounded px-2 py-1 text-sm hover:bg-slate-200"
        title="Wstaw równanie"
      >
        ∑
      </button>
      <button
        type="button"
        onClick={() => setShowImageModal(true)}
        className="rounded px-2 py-1 text-sm hover:bg-slate-200"
        title="Wstaw obrazek"
      >
        🖼
      </button>

      {showMathModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="font-semibold text-slate-800">Wstaw równanie (LaTeX)</h3>
            <input
              type="text"
              value={mathLatex}
              onChange={(e) => setMathLatex(e.target.value)}
              placeholder="np. x^2 + y^2 = r^2"
              className="mt-3 w-full rounded border border-slate-300 px-3 py-2"
              autoFocus
            />
            <label className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={mathBlock}
                onChange={(e) => setMathBlock(e.target.checked)}
              />
              <span className="text-sm">Równanie w bloku (display)</span>
            </label>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={addMath}
                className="rounded bg-mathly-600 px-4 py-2 text-white hover:bg-mathly-700"
              >
                Wstaw
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMathModal(false);
                  setMathLatex("");
                }}
                className="rounded border border-slate-300 px-4 py-2"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}

      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="font-semibold text-slate-800">Wstaw obrazek (URL)</h3>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="mt-3 w-full rounded border border-slate-300 px-3 py-2"
              autoFocus
            />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={addImage}
                className="rounded bg-mathly-600 px-4 py-2 text-white hover:bg-mathly-700"
              >
                Wstaw
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl("");
                }}
                className="rounded border border-slate-300 px-4 py-2"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function MaterialEditor({
  content,
  onChange,
}: MaterialEditorProps) {
  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        StarterKit,
        Image,
        Mathematics.configure({
          katexOptions: { output: "html", throwOnError: false },
        }),
      ],
      content: content || "",
      onUpdate: ({ editor: e }) => {
        onChange(e.getHTML());
      },
      editorProps: {
        attributes: {
          class:
            "prose prose-slate max-w-none min-h-[200px] p-4 outline-none focus:outline-none",
        },
      },
    },
    []
  );

  if (!editor) {
    return (
      <div className="min-h-[200px] animate-pulse rounded-lg border border-slate-200 bg-slate-50" />
    );
  }

  return (
    <Tiptap editor={editor}>
      <div className="rounded-lg border border-slate-200 overflow-hidden">
        <Toolbar editor={editor} />
        <Tiptap.Content />
      </div>
    </Tiptap>
  );
}
