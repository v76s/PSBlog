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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="prose lg:prose-xl max-w-none">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}
        
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center text-gray-500 mb-8">
          <span>By {post.author?.name || 'Anonymous'}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.createdAt.toISOString()}>
            {format(new Date(post.createdAt), 'MMMM d, yyyy')}
          </time>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span 
                key={tag.id} 
                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="mb-12">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-8">Comments</h2>
        <CommentForm postId={post.id} />
        <div className="mt-8">
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}