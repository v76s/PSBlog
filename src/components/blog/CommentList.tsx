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
      <div className="bg-card/50 p-8 rounded-xl border border-border/50 text-center animate-fade-in">
        <svg className="w-12 h-12 mx-auto text-foreground/20 mb-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
        </svg>
        <p className="text-foreground/60">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment, index) => (
        <div 
          key={comment.id} 
          className="bg-card rounded-xl shadow-sm p-6 border border-border/50 animate-fade-in" 
          style={{ animationDelay: `${0.1 * (index % 5)}s` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                {comment.author?.name?.[0] || 'A'}
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-foreground">{comment.author?.name || 'Anonymous'}</h4>
                <time className="text-xs text-foreground/60" dateTime={comment.createdAt.toISOString()}>
                  {format(new Date(comment.createdAt), 'MMMM d, yyyy \at h:mm a')}
                </time>
              </div>
            </div>
          </div>
          <div className="prose prose-sm max-w-none text-foreground/80">
            <p className="whitespace-pre-line">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}