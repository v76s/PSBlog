'use client';

import { useState } from 'react';

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
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        <input name="title" value={form.title} onChange={handleChange} required placeholder="Title" className="w-full p-2 border rounded" />
        <input name="slug" value={form.slug} onChange={handleChange} required placeholder="Slug (unique)" className="w-full p-2 border rounded" />
        <textarea name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" className="w-full p-2 border rounded" />
        <textarea name="content" value={form.content} onChange={handleChange} required placeholder="Content" className="w-full p-2 border rounded" rows={6} />
        <input name="coverImage" value={form.coverImage} onChange={handleChange} placeholder="Cover Image URL" className="w-full p-2 border rounded" />
        <input name="guestName" value={form.guestName} onChange={handleChange} required placeholder="Your Name" className="w-full p-2 border rounded" />
        <input name="guestEmail" value={form.guestEmail} onChange={handleChange} required placeholder="Your Email" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Submit</button>
      </form>
      {message && <p className="mt-4 text-primary">{message}</p>}
    </div>
  );
}