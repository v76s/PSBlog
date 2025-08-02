'use client';

import { useState } from 'react';

export default function CommentForm({ postId }: { postId: string }) {
  const [guest, setGuest] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, content, guest }),
    });

    if (res.ok) {
      setMessage('Comment submitted! It will appear after approval.');
      setContent('');
      setGuest('');
    } else {
      setMessage('Failed to submit comment.');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-sm p-6 border border-border/50 animate-fade-in mt-8">
      <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
      <input
        type="text"
        placeholder="Your name (optional)"
        value={guest}
        onChange={e => setGuest(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-3"
      />
      <textarea
        placeholder="Your comment"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        className="border rounded px-2 py-1 w-full mb-3"
        rows={4}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/5 transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </button>
      {message && <p className="mt-4 text-primary">{message}</p>}
    </form>
  );
}