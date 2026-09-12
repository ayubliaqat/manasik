"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Link as LinkExt } from "@tiptap/extension-link"
import { Image as ImageExt } from "@tiptap/extension-image"
import { Placeholder } from "@tiptap/extension-placeholder"
import { CharacterCount } from "@tiptap/extensions"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { Underline } from "@tiptap/extension-underline"
import { TextAlign } from "@tiptap/extension-text-align"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Highlighter,
  List, ListOrdered, Quote, LinkIcon, ImageIcon, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Subscript as SubIcon,
  Superscript as SupIcon, Minus, Code, TableIcon, Trash2,
} from "lucide-react"
import { useState } from "react"

const headingOptions = [
  { label: "Paragraph", value: "paragraph" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Heading 4", value: "h4" },
  { label: "Heading 5", value: "h5" },
  { label: "Heading 6", value: "h6" },
]

export function TiptapEditor({
  content,
  onChange,
}: {
  content: string
  onChange: (html: string) => void
}) {
  const [tableMenuOpen, setTableMenuOpen] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      LinkExt.configure({ openOnClick: false }),
      ImageExt,
      Placeholder.configure({ placeholder: "Start writing your guide..." }),
      CharacterCount,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
      Subscript,
      Superscript,
      TextStyle,
      Color,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[360px] text-charcoal prose-headings:text-charcoal prose-a:text-emerald prose-table:border prose-td:border prose-th:border prose-td:border-soft-beige prose-th:border-soft-beige prose-th:bg-soft-beige/50",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  function ToolbarButton({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void
    active?: boolean
    children: React.ReactNode
    title: string
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={title}
        className={`h-8 w-8 flex items-center justify-center rounded-lg transition ${
          active
            ? "bg-emerald/15 text-emerald"
            : "text-muted-teal hover:bg-soft-beige/60 hover:text-charcoal"
        }`}
      >
        {children}
      </button>
    )
  }

  function currentHeadingValue() {
    for (let level = 1; level <= 6; level++) {
      if (editor.isActive("heading", { level })) return `h${level}`
    }
    return "paragraph"
  }

  function setHeading(value: string) {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run()
    } else {
      const level = parseInt(value.replace("h", "")) as 1 | 2 | 3 | 4 | 5 | 6
      editor.chain().focus().toggleHeading({ level }).run()
    }
  }

  return (
    <div className="rounded-xl border border-soft-beige overflow-hidden">
      <div className="flex items-center gap-0.5 flex-wrap border-b border-soft-beige bg-soft-beige/30 px-2 py-1.5">
        <select
          value={currentHeadingValue()}
          onChange={(e) => setHeading(e.target.value)}
          className="h-8 rounded-lg border border-soft-beige bg-card px-2 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald mr-1"
        >
          {headingOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="w-px h-5 bg-soft-beige mx-1" />

        <ToolbarButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Highlight" active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}>
          <Highlighter className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Subscript" active={editor.isActive("subscript")} onClick={() => editor.chain().focus().toggleSubscript().run()}>
          <SubIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Superscript" active={editor.isActive("superscript")} onClick={() => editor.chain().focus().toggleSuperscript().run()}>
          <SupIcon className="h-3.5 w-3.5" />
        </ToolbarButton>

        <div className="w-px h-5 bg-soft-beige mx-1" />

        <ToolbarButton title="Align Left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Align Center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Align Right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Justify" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
          <AlignJustify className="h-3.5 w-3.5" />
        </ToolbarButton>

        <div className="w-px h-5 bg-soft-beige mx-1" />

        <ToolbarButton title="Bullet List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Numbered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Code Block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-3.5 w-3.5" />
        </ToolbarButton>

        <div className="w-px h-5 bg-soft-beige mx-1" />

        <ToolbarButton
          title="Insert Link"
          active={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("Enter URL")
            if (url) editor.chain().focus().setLink({ href: url }).run()
          }}
        >
          <LinkIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          title="Insert Image"
          onClick={() => {
            const url = window.prompt("Enter image URL")
            if (url) editor.chain().focus().setImage({ src: url }).run()
          }}
        >
          <ImageIcon className="h-3.5 w-3.5" />
        </ToolbarButton>

        <div className="relative">
          <ToolbarButton title="Table" onClick={() => setTableMenuOpen(!tableMenuOpen)}>
            <TableIcon className="h-3.5 w-3.5" />
          </ToolbarButton>
          {tableMenuOpen && (
            <div className="absolute z-20 top-9 left-0 w-48 rounded-xl border border-soft-beige bg-card shadow-lg py-1.5">
              <button type="button" onClick={() => { editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); setTableMenuOpen(false) }} className="w-full text-left px-3 py-1.5 text-xs text-charcoal hover:bg-soft-beige/60">Insert 3x3 table</button>
              <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className="w-full text-left px-3 py-1.5 text-xs text-charcoal hover:bg-soft-beige/60">Add row</button>
              <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className="w-full text-left px-3 py-1.5 text-xs text-charcoal hover:bg-soft-beige/60">Add column</button>
              <button type="button" onClick={() => editor.chain().focus().deleteRow().run()} className="w-full text-left px-3 py-1.5 text-xs text-charcoal hover:bg-soft-beige/60">Delete row</button>
              <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()} className="w-full text-left px-3 py-1.5 text-xs text-charcoal hover:bg-soft-beige/60">Delete column</button>
              <button type="button" onClick={() => { editor.chain().focus().deleteTable().run(); setTableMenuOpen(false) }} className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-1.5"><Trash2 className="h-3 w-3" /> Delete table</button>
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-soft-beige mx-1" />

        <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-3.5 w-3.5" />
        </ToolbarButton>
      </div>

      <div className="px-4 py-3 bg-warm-white" onClick={() => setTableMenuOpen(false)}>
        <EditorContent editor={editor} />
      </div>

      <div className="border-t border-soft-beige bg-soft-beige/30 px-4 py-1.5 text-right">
        <span className="text-[11px] text-muted-teal">
          {editor.storage.characterCount.words()} words
        </span>
      </div>
    </div>
  )
}
