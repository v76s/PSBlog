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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,white,transparent)] dark:[mask-image:linear-gradient(0deg,white,transparent)]" style={{ backgroundSize: '32px 32px' }}></div>
        <div className="relative">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">Blog <span className="text-primary">Posts</span></h1>
          <p className="text-lg text-foreground/70 max-w-2xl animate-slide-up">Explore the list of the blog posts on any of the Application Notes that might interest you.</p>
        </div>
      </div>

      <div className="grid gap-8">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <article 
              key={post.id} 
              className="group bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-border/50 hover:border-primary/20 flex flex-col md:flex-row animate-slide-up"
              style={{ animationDelay: `${0.1 * (index % 5)}s` }}
            >
              {post.coverImage ? (
                <div className="md:w-1/3 relative overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="md:w-1/3 bg-gradient-to-r from-primary/5 to-accent/5 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary/20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                  </svg>
                </div>
              )}
              <div className={`p-6 flex-1 ${!post.coverImage ? 'md:w-full' : 'md:w-2/3'}`}>
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <div className="flex items-center text-sm text-foreground/60 mb-4">
                  <span>By {post.author?.name || 'Anonymous'}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={post.createdAt.toISOString()} className="text-foreground/60">
                    {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                  </time>
                </div>
                <p className="text-foreground/70 mb-4 line-clamp-3">
                  {post.excerpt || post.content.substring(0, 200) + '...'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag.id} 
                      className="inline-block bg-secondary hover:bg-secondary-hover transition-colors rounded-full px-3 py-1 text-sm font-medium text-foreground/80"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary hover:text-primary-hover transition-colors font-medium inline-flex items-center group/link"
                >
                  Read more
                  <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-16 bg-card/50 rounded-xl border border-border/50">
            <svg className="w-16 h-16 mx-auto text-foreground/20 mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm0 2a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1V7a1 1 0 00-1-1H5z" clipRule="evenodd"></path>
            </svg>
            <p className="text-foreground/50 text-lg">No posts published yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}