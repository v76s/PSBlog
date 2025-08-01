import Link from 'next/link';
import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';

export default async function BlogPage() {
  // Get all published posts
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      <div className="grid gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
            >
              {post.coverImage && (
                <div className="md:w-1/3">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
              )}
              <div className={`p-6 flex-1 ${!post.coverImage ? 'md:w-full' : 'md:w-2/3'}`}>
                <h2 className="text-2xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>By {post.author?.name || 'Anonymous'}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={post.createdAt.toISOString()}>
                    {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                  </time>
                </div>
                <p className="text-gray-600 mb-4">
                  {post.excerpt || post.content.substring(0, 200) + '...'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag.id} 
                      className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Read more
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No posts published yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}