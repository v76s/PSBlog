import Image from "next/image";
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  // Get the latest 3 published posts
  const latestPosts = await prisma.post.findMany({
    where: {
      published: true,
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
    take: 3,
  });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-100 to-gray-300 py-20 sm:py-32 rounded-3xl overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PCB background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/pcb-bg.png"
            alt="PCB background"
            className="w-full h-full object-cover opacity-10"
            style={{ zIndex: 1 }}
          />
        </div>
        {/* Existing grid overlay */}
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,white,transparent)] dark:[mask-image:linear-gradient(0deg,white,transparent)]"
          style={{ backgroundSize: '32px 32px', zIndex: 2 }}></div>
        <div className="relative max-w-3xl mx-auto text-center" style={{ zIndex: 3 }}>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 animate-fade-in">            
            <span className="text-primary">Projects for Yourself</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            A place to keep some re-usable Application Notes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/5 transition-colors"
            >              
              Blog List
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/5 transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border border-muted text-base font-medium rounded-md text-foreground/80 bg-transparent hover:bg-muted/10 transition-colors"
            >
              About
            </Link>
            {/* <Link
              href="/blog/submit"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/5 transition-colors"
            >
              Submit Blog (Guest)
            </Link> */}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.length > 0 ? (
            latestPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="group bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-border/50 hover:border-primary/20 animate-slide-up" 
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                {post.coverImage ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      width={800}
                      height={400}
                      alt={`Blog post cover image for "${post.title}"`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-r from-primary/5 to-accent/5 flex items-center justify-center">
                    <svg className="w-16 h-16 text-primary/20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`} className="block">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150) + '...'}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-border/50">
                    <span className="text-sm text-foreground/60 font-medium">
                      By {post.author.name || 'Anonymous'}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary hover:text-primary-hover text-sm font-medium inline-flex items-center group/link"
                    >
                      Read more
                      <svg className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16 bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl border border-border/50">
              <svg className="w-16 h-16 mx-auto text-foreground/20 mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm0 2a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1V7a1 1 0 00-1-1H5z" clipRule="evenodd"></path>
              </svg>
              <p className="text-foreground/50 text-lg">No posts published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
