import { format } from 'date-fns';

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    name: string | null;
  } | null;
};

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <p className="text-gray-600">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                {comment.author?.name?.[0] || 'A'}
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium">{comment.author?.name || 'Anonymous'}</h4>
                <time className="text-xs text-gray-500" dateTime={comment.createdAt.toISOString()}>
                  {format(new Date(comment.createdAt), 'MMMM d, yyyy \at h:mm a')}
                </time>
              </div>
            </div>
          </div>
          <div className="prose prose-sm max-w-none">
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}