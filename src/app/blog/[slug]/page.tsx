import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';
import CommentForm from '@/components/blog/CommentForm';
import CommentList from '@/components/blog/CommentList';

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      tags: true,
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Get approved comments for this post
  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
      isApproved: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <article className="prose lg:prose-xl max-w-none">
        <div className="relative mb-10">
          {post.coverImage ? (
            <div className="relative overflow-hidden rounded-xl shadow-md">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-40 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-8">
              <svg className="w-20 h-20 text-primary/20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
              </svg>
            </div>
          )}
        </div>
        
        <h1 className="text-4xl font-bold mb-6 text-foreground">{post.title}</h1>
        
        <div className="flex items-center text-foreground/60 mb-8">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2">
              {post.author?.name?.charAt(0) || 'A'}
            </div>
            <span>By {post.author?.name || 'Anonymous'}</span>
          </div>
          <span className="mx-2">•</span>
          <time dateTime={post.createdAt.toISOString()} className="text-foreground/60">
            {format(new Date(post.createdAt), 'MMMM d, yyyy')}
          </time>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span 
                key={tag.id} 
                className="inline-block bg-secondary hover:bg-secondary-hover transition-colors rounded-full px-3 py-1 text-sm font-medium text-foreground/80"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="mb-12 text-foreground/90 leading-relaxed">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>

      <div className="mt-16 border-t border-border pt-10">
        <h2 className="text-2xl font-bold mb-8 text-foreground">Comments</h2>
        <CommentForm postId={post.id} />
        <div className="mt-8">
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}