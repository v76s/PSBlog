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
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
          Welcome to My Personal Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A place where I share my thoughts, ideas, and experiences.
        </p>
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Read the Blog
          </Link>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            View all posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt || post.content.substring(0, 150) + '...'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      By {post.author.name || 'Anonymous'}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
