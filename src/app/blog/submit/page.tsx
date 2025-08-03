"use client";

import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import DOMPurify from "dompurify";

export default function SubmitBlogPage() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    slug: "",
    coverImage: "",
    guestName: "",
    guestEmail: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string>("");

  // Update preview whenever content changes
  useEffect(() => {
    import("marked").then(({ marked }) => {
      const raw = marked.parse(form.content || "");
      const clean = DOMPurify.sanitize(raw);
      setPreviewHtml(clean);
    });
  }, [form.content]);

  const handleImageUpload = async function* (data: File | Array<File>) {
    setIsUploading(true);
    const files = Array.isArray(data) ? data : [data];
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();
      yield result.url;
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("Your post has been submitted for review!");
      setForm({
        title: "",
        content: "",
        excerpt: "",
        slug: "",
        coverImage: "",
        guestName: "",
        guestEmail: "",
      });
      setPreviewHtml("");
    } else {
      const text = await res.text();
      setMessage("Failed to submit post. " + text);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-card rounded-xl shadow border border-border/50">
      <h1 className="text-2xl font-bold mb-6">Submit a Blog Post as Guest</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
          required
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <input
          name="slug"
          value={form.slug}
          onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
          required
          placeholder="Slug (unique)"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={(e) => setForm(f => ({ ...f, excerpt: e.target.value }))}
          placeholder="Excerpt"
          className="w-full p-2 border rounded"
        />
        <div>
          <label className="block mb-2 font-medium">Content (Markdown)</label>
          <div data-color-mode="light" className="mb-2">
            <MDEditor
              value={form.content}
              onChange={(val) => setForm(f => ({ ...f, content: val || "" }))}
              height={400}
            />
          </div>
          {isUploading && <span className="ml-2 text-primary">Uploading...</span>}
        </div>
        <input
          name="coverImage"
          value={form.coverImage}
          onChange={(e) => setForm(f => ({ ...f, coverImage: e.target.value }))}
          placeholder="Cover Image URL"
          className="w-full p-2 border rounded"
        />
        <input
          name="guestName"
          value={form.guestName}
          onChange={(e) => setForm(f => ({ ...f, guestName: e.target.value }))}
          required
          placeholder="Your Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="guestEmail"
          value={form.guestEmail}
          onChange={(e) => setForm(f => ({ ...f, guestEmail: e.target.value }))}
          required
          placeholder="Your Email"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {previewHtml && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <div
            className="prose max-w-none p-4 border rounded bg-white"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      )}

      {message && <p className="mt-4 text-primary">{message}</p>}
    </div>
  );
}
