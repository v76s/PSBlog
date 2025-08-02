'use client';

import { useState } from 'react';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

export default function SubmitBlogPage() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    coverImage: '',
    guestName: '',
    guestEmail: '',
  });
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  const [message, setMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle markdown changes
  const handleContentChange = (value: string) => {
    setForm(f => ({ ...f, content: value }));
  };

  // Drag-and-drop or button image upload
  const handleImageUpload = async function* (data: File | Array<File>) {
    setIsUploading(true);
    const files = Array.isArray(data) ? data : [data];
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const result = await res.json();
      yield result.url; // returns the image URL for markdown insertion
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage('Your post has been submitted for review!');
      setForm({
        title: '',
        content: '',
        excerpt: '',
        slug: '',
        coverImage: '',
        guestName: '',
        guestEmail: '',
      });
    } else {
      setMessage('Failed to submit post.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-card rounded-xl shadow border border-border/50">
      <h1 className="text-2xl font-bold mb-6">Submit a Blog Post as Guest</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Title" className="w-full p-2 border rounded" />
        <input name="slug" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required placeholder="Slug (unique)" className="w-full p-2 border rounded" />
        <textarea name="excerpt" value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Excerpt" className="w-full p-2 border rounded" />
        <div>
          <label className="block mb-2 font-medium">Content (Markdown)</label>
          <ReactMde
            value={form.content}
            onChange={handleContentChange}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
            }
            paste={{
              saveImage: handleImageUpload,
            }}
            childProps={{
              writeButton: {
                tabIndex: -1
              }
            }}
          />
          {isUploading && <span className="ml-2 text-primary">Uploading...</span>}
        </div>
        <input name="coverImage" value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))} placeholder="Cover Image URL" className="w-full p-2 border rounded" />
        <input name="guestName" value={form.guestName} onChange={e => setForm(f => ({ ...f, guestName: e.target.value }))} required placeholder="Your Name" className="w-full p-2 border rounded" />
        <input name="guestEmail" value={form.guestEmail} onChange={e => setForm(f => ({ ...f, guestEmail: e.target.value }))} required placeholder="Your Email" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Submit</button>
      </form>
      {message && <p className="mt-4 text-primary">{message}</p>}
    </div>
  );
}