"use client";
import { useEffect, useState } from "react";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/comments?postId=${postId}`)
      .then((res) => (res.ok ? res.json() : Promise.resolve({ comments: [] })))
      .then((data) => setComments(data.comments || []))
      .catch(() => setComments([]));
  }, [postId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b pb-2">
            <span className="font-semibold">
              {comment.guestName || comment.author?.name || "Anonymous"}
            </span>
            <p>{comment.content}</p>
            <span className="text-xs text-foreground/50">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}